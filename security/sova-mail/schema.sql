-- SOVA mail: run once in a NEW Supabase project, never the existing public counters.
begin;
create schema if not exists sova_private;
revoke all on schema sova_private from public, anon, authenticated;
create table sova_private.admins (user_id uuid primary key references auth.users(id) on delete cascade);
revoke all on sova_private.admins from public, anon, authenticated;
create function public.sova_is_admin() returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from sova_private.admins where user_id = (select auth.uid()));
$$;
revoke all on function public.sova_is_admin() from public, anon;
grant execute on function public.sova_is_admin() to authenticated;
create table public.sova_tickets (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 nick text not null check (char_length(btrim(nick)) between 1 and 80),
 category text not null check(category in ('Ошибка','Предложение','Вопрос','Другое')),
 page text not null default '' check(char_length(page)<=300),
 status text not null default 'new' check(status in ('new','working','resolved')),
 created_at timestamptz not null default now()
);
create index sova_ticket_owner on public.sova_tickets(owner_id);
create table public.sova_messages (
 id uuid primary key default gen_random_uuid(),
 ticket_id uuid not null references public.sova_tickets(id) on delete cascade,
 sender_id uuid not null default auth.uid() references auth.users(id),
 body text not null check(char_length(btrim(body)) between 1 and 4000),
 attachments text[] not null default '{}' check(cardinality(attachments)<=3),
 created_at timestamptz not null default now()
);
create index sova_message_ticket on public.sova_messages(ticket_id,created_at);
alter table public.sova_tickets enable row level security;
alter table public.sova_messages enable row level security;
revoke all on public.sova_tickets, public.sova_messages from public, anon, authenticated;
grant select on public.sova_tickets, public.sova_messages to authenticated;
grant insert (nick,category,page) on public.sova_tickets to authenticated;
grant update (status) on public.sova_tickets to authenticated;
grant insert (ticket_id,body,attachments) on public.sova_messages to authenticated;
create policy ticket_read on public.sova_tickets for select to authenticated using (owner_id=(select auth.uid()) or (select public.sova_is_admin()));
create policy ticket_create on public.sova_tickets for insert to authenticated with check (owner_id=(select auth.uid()) and status='new' and not (select public.sova_is_admin()));
create policy ticket_update on public.sova_tickets for update to authenticated using ((select public.sova_is_admin())) with check ((select public.sova_is_admin()));
create policy message_read on public.sova_messages for select to authenticated using (exists(select 1 from public.sova_tickets t where t.id=ticket_id));
create policy message_create on public.sova_messages for insert to authenticated with check (sender_id=(select auth.uid()) and exists(select 1 from public.sova_tickets t where t.id=ticket_id and (t.status<>'resolved' or (select public.sova_is_admin()))));
-- Limits enforced in DB, not only in the browser. Per-user advisory lock prevents races.
create function sova_private.limit_ticket() returns trigger language plpgsql security definer set search_path='' as $$
begin
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.owner_id::text,0));
 if (select count(*) from public.sova_tickets where owner_id=new.owner_id and created_at>now()-interval '24 hours')>=5 then raise exception 'Daily ticket limit reached'; end if;
 return new;
end;$$;
create trigger sova_ticket_limit before insert on public.sova_tickets for each row execute function sova_private.limit_ticket();
create function sova_private.limit_message() returns trigger language plpgsql security definer set search_path='' as $$
declare p text;
begin
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.sender_id::text,1));
 if not public.sova_is_admin() and (select count(*) from public.sova_messages where sender_id=new.sender_id and created_at>now()-interval '1 hour')>=20 then raise exception 'Hourly message limit reached'; end if;
 foreach p in array new.attachments loop
  if p is null or split_part(p,'/',1)<>new.ticket_id::text or split_part(p,'/',2)<>new.sender_id::text or p !~ '^[0-9a-f-]+/[0-9a-f-]+/[0-9a-f-]+[.](png|jpg|webp)$' then raise exception 'Invalid attachment path'; end if;
 end loop;
 return new;
end;$$;
create trigger sova_message_limit before insert on public.sova_messages for each row execute function sova_private.limit_message();
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('sova-mail','sova-mail',false,5242880,array['image/png','image/jpeg','image/webp']);
create policy sova_file_read on storage.objects for select to authenticated using (
 bucket_id='sova-mail' and exists(select 1 from public.sova_tickets t where t.id::text=(storage.foldername(name))[1])
);
-- Bound uploads per authenticated player independently of message creation.
create function public.sova_upload_allowed() returns boolean language plpgsql volatile security definer set search_path='' as $
begin
 if auth.uid() is null then return false; end if;
 if public.sova_is_admin() then return true; end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(auth.uid()::text,2));
 return (select count(*) from storage.objects where bucket_id='sova-mail' and (storage.foldername(name))[2]=auth.uid()::text and created_at>now()-interval '24 hours') < 30;
end;$;
revoke all on function public.sova_upload_allowed() from public, anon;
grant execute on function public.sova_upload_allowed() to authenticated;
create policy sova_file_upload on storage.objects for insert to authenticated with check (
 bucket_id='sova-mail' and (storage.foldername(name))[2]=(select auth.uid())::text
 and (select public.sova_upload_allowed())
 and name ~ '^[0-9a-f-]+/[0-9a-f-]+/[0-9a-f-]+[.](png|jpg|webp)$'
 and exists(select 1 from public.sova_tickets t where t.id::text=(storage.foldername(name))[1] and (t.status<>'resolved' or (select public.sova_is_admin())))
);
-- No browser UPDATE/DELETE policies for messages or files. Admin cleanup via dashboard.
commit;
-- Only after creating your admin user in Authentication > Users, run separately:
-- insert into sova_private.admins(user_id) values ('YOUR-AUTH-USER-UUID');
