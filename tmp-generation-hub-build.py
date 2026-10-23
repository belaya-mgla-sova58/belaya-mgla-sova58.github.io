from pathlib import Path
from bs4 import BeautifulSoup
import re

GENS={
1:[('jeronimo','Джеронимо','Пехота','Атакующий лидер · сборы'),('molly','Молли','Копейщики','Контроль · ранний PvP'),('natalia','Наталия','Пехота','Контроль · усиление войск'),('zinman','Зинман','Стрелки','Строительство · поддержка')],
2:[('alonso','Алонсо','Стрелки','Контроль · атакующий PvP'),('flint','Флинт','Пехота','Медведь · атакующий фронт'),('philly','Филли','Копейщики','Лечение · защита')],
3:[('greg','Грег','Стрелки','Контроль · универсальный PvP'),('logan','Логан','Пехота','Гарнизон · защита'),('mia','Миа','Копейщики','Случайный урон · сборы')],
4:[('ahmose','Ахмос','Пехота','Защита · фронтовик'),('lynn','Линн','Стрелки','Антиконтроль · PvP'),('reina','Рейна','Копейщики','Медведь · сборы')],
5:[('hector','Гектор','Пехота','Фронтовик · F2P'),('norah','Нора','Копейщики','Контроль · универсальный PvP'),('gwen','Гвен','Стрелки','Арена · атакующие сборы')],
6:[('renee','Рене','Копейщики','Колесо удачи · PvP'),('wayne','Уэйн','Стрелки','Криты · Арена'),('wu-ming','Ву Минг','Пехота','Гарнизон · защита')],
7:[('bradley','Бредли','Стрелки','Колесо удачи · урон'),('edith','Эдит','Пехота','Гарнизон · защита'),('gordon','Гордон','Копейщики','Ослабление · атакующие сборы')],
8:[('gatot','Гатот','Пехота','Колесо удачи · защита'),('hendrik','Хендрик','Стрелки','Ослабление защиты · сборы'),('sonya','Соня','Копейщики','Заморозка · PvP')],
9:[('fred','Фред','Копейщики','Колесо удачи · атакующий PvP'),('magnus','Магнус','Пехота','Медведь · участник сбора'),('xura','Ксура','Стрелки','Гарнизон · PvP')],
10:[('blanchette','Бланшетт','Стрелки','Колесо удачи · смертоносность'),('freya','Фрея','Копейщики','PvP · сборы'),('gregory','Грегори','Пехота','Гарнизон · защита')],
11:[('eleonora','Элеонора','Пехота','Колесо удачи · F2P'),('lloyd','Ллойд','Копейщики','Ослабление · PvP'),('rufus','Руфус','Стрелки','Урон · Медведь')],
12:[('hervor','Хервор','Пехота','Защита · смертоносность'),('karol','Кароль','Копейщики','Колесо удачи · универсальный марш'),('ligeia','Лигея','Стрелки','Ослабление защиты · гарнизон')]
}
SUMMARY={
1:('Старт игры','База ранней Арены, первых сборов и развития города.','Джеронимо остаётся важен дольше остальных, Зинман ценен строительством.'),
2:('Первый скачок','Герои заметно сильнее специализируются по ролям.','Флинт особенно полезен на Медведе, Филли даёт лечение и защиту.'),
3:('Баланс ролей','Сильнее раскрываются контроль, гарнизон и универсальные сборы.','Миа удобна через Колесо удачи, Логан ориентирован на защиту.'),
4:('Контроль и темп','Поколение усиливает контроль, защиту и обычные атаки.','Линн выгодна F2P, Рейна сильна как участник атакующих сборов.'),
5:('Новый стандарт','Герои заметно поднимают урон и живучесть маршей.','Гектор обычно главный F2P-приоритет поколения.'),
6:('Метки и крит','Появляются сильные циклические механики и критический урон.','Рене главный доступный приоритет, Уэйн силён на Арене.'),
7:('Стабильные баффы','Поколение хорошо делится на урон, защиту и ослабление врага.','Бредли особенно удобен F2P благодаря Колесу удачи.'),
8:('Щиты и дебаффы','Защита становится плотнее, а атакующие герои сильнее режут врага.','Гатот хорош F2P, Хендрик полезен атакующим сборам.'),
9:('Атакующий PvP','Много сильных дебаффов и бонусов к общему урону.','Фред доступнее, Магнус очень хорош участником сбора.'),
10:('Смертоносность','Поколение даёт сильные командные бонусы и защитные механики.','Бланшетт главный доступный F2P-герой через Колесо удачи.'),
11:('Циклы боя','Баффы всё чаще завязаны на конкретные ходы и серии атак.','Элеонора главный F2P-приоритет, Ллойд и Руфус дороже.'),
12:('Поздняя мета','Сильные командные дебаффы, защита и специализированный урон.','Кароль доступен через Колесо удачи, Хервор и Лигея дороже.')
}

base=Path('hero-generations.html').read_text(encoding='utf-8')

def portrait(g,slug): return f"assets/heroes/gen-{g:02d}/{slug}/portrait.webp"

def card(g,h):
    slug,name,troop,role=h
    return f'''<a class="gen-hero-card" href="hero-{slug}.html"><div class="gen-hero-img"><img src="{portrait(g,slug)}" alt="{name}" loading="lazy"></div><div class="gen-hero-body"><span>{troop} · Мифический</span><h2>{name}</h2><p>{role}</p><b>Открыть полный гайд →</b></div></a>'''

STYLE='''<style id="hero-generation-pages-v704">
.hero-gens-page{width:min(1180px,calc(100% - 28px));margin:0 auto 72px;color:#eaf6ff}.gen-hub-hero,.gen-page-hero{padding:25px;border:1px solid rgba(137,207,246,.18);border-radius:25px;background:radial-gradient(circle at 10% 0,rgba(67,198,255,.20),transparent 34%),linear-gradient(145deg,rgba(8,37,65,.96),rgba(12,23,48,.96));box-shadow:0 18px 50px rgba(0,0,0,.22)}.gen-hub-hero h1,.gen-page-hero h1{margin:0;color:#fff;font-size:clamp(38px,6vw,64px);letter-spacing:-.04em}.gen-hub-hero p,.gen-page-hero p{max-width:820px;margin:10px 0 0;color:#a8c8da;line-height:1.6}.gen-hub-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px;margin-top:16px}.gen-hub-card{position:relative;overflow:hidden;min-height:190px;padding:18px;border:1px solid rgba(139,210,249,.16);border-radius:20px;background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.025));text-decoration:none}.gen-hub-card:hover,.gen-hero-card:hover{transform:translateY(-2px);border-color:rgba(117,218,255,.4)}.gen-hub-card small{color:#70d9ff;font-weight:900}.gen-hub-card h2{margin:5px 0 8px;color:#fff;font-size:30px}.gen-hub-card p{margin:0;color:#91b5ca;font-size:12px;line-height:1.45}.gen-hub-faces{display:flex;height:90px;margin:12px -8px -10px;align-items:end;justify-content:center}.gen-hub-faces img{width:31%;height:92px;object-fit:contain;object-position:center bottom}.gen-page-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:16px}.gen-page-grid.four{grid-template-columns:repeat(2,minmax(0,1fr))}.gen-hero-card{display:flex;min-width:0;flex-direction:column;overflow:hidden;border:1px solid rgba(145,211,248,.15);border-radius:21px;background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.025));text-decoration:none;transition:.16s ease}.gen-hero-img{height:330px;display:flex;align-items:flex-end;justify-content:center;background:radial-gradient(circle at 50% 28%,rgba(80,187,240,.15),transparent 65%)}.gen-hero-img img{width:100%;height:100%;object-fit:contain;object-position:center bottom;padding:10px 8px 0}.gen-hero-body{display:flex;flex:1;flex-direction:column;padding:15px 16px 17px}.gen-hero-body>span{color:#76dcff;font-size:11px;font-weight:850}.gen-hero-body h2{margin:4px 0 7px;color:#fff;font-size:27px}.gen-hero-body p{margin:0;color:#a8c3d4;font-size:12px;line-height:1.45}.gen-hero-body b{margin-top:auto;padding-top:14px;color:#ffe39b;font-size:12px}.gen-info-strips{display:grid;gap:10px;margin-top:15px}.gen-info-strip{padding:14px 16px;border:1px solid rgba(137,207,246,.14);border-radius:15px;background:linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.022))}.gen-info-strip b{display:block;color:#fff;font-size:13px}.gen-info-strip span{display:block;margin-top:4px;color:#9fbfd2;font-size:12px;line-height:1.5}.gen-back{display:inline-flex;margin-top:17px;padding:10px 13px;border:1px solid rgba(130,210,255,.20);border-radius:13px;background:rgba(82,181,235,.08);color:#aeeaff;text-decoration:none;font-weight:850}@media(max-width:900px){.gen-hub-grid,.gen-page-grid,.gen-page-grid.four{grid-template-columns:repeat(2,minmax(0,1fr))}.gen-hero-img{height:285px}}@media(max-width:620px){.hero-gens-page{width:min(100% - 16px,1180px)}.gen-hub-hero,.gen-page-hero{padding:16px;border-radius:19px}.gen-hub-grid,.gen-page-grid,.gen-page-grid.four{grid-template-columns:1fr}.gen-hero-img{height:260px}.gen-hub-card{min-height:170px}}
</style>'''

def set_meta(soup,title,desc,url):
    soup.title.string=title
    md=soup.find('meta',attrs={'name':'description'}); md['content']=desc
    can=soup.find('link',attrs={'rel':'canonical'}); can['href']=url
    for prop,val in [('og:title',title),('og:description',desc),('og:url',url)]:
        x=soup.find('meta',attrs={'property':prop})
        if x: x['content']=val

def make_hub():
    soup=BeautifulSoup(base,'html.parser')
    set_meta(soup,'Поколения героев | Белая мгла','Отдельная категория: выберите поколение героев, затем героя и откройте полный гайд.','https://belaya-mgla-sova58.github.io/hero-generations.html')
    old=soup.find('style');
    if old: old.replace_with(BeautifulSoup(STYLE,'html.parser'))
    crumbs=soup.select_one('.breadcrumbs-v409')
    if crumbs: crumbs.clear(); crumbs.append(BeautifulSoup('<a href="index.html">Главная</a><span class="breadcrumbs-sep-v409">›</span><a href="heroes.html">Герои</a><span class="breadcrumbs-sep-v409">›</span><span>Поколения героев</span>','html.parser'))
    cards=[]
    for g,heroes in GENS.items():
        faces=''.join(f'<img src="{portrait(g,h[0])}" alt="" loading="lazy">' for h in heroes[:3])
        cards.append(f'<a class="gen-hub-card" href="hero-generation-{g:02d}.html"><small>Поколение</small><h2>{g}</h2><p>{len(heroes)} героя · открыть состав поколения</p><div class="gen-hub-faces">{faces}</div></a>')
    html=f'<div class="hero-gens-page"><section class="gen-hub-hero"><h1>Поколения героев</h1><p>Выбери нужное поколение. На следующей странице увидишь героев этого поколения в карточках, а нажатие на героя откроет его полный подробный гайд.</p></section><div class="gen-hub-grid">{"".join(cards)}</div><a class="gen-back" href="heroes.html">← К разделу «Герои»</a></div>'
    target=soup.select_one('.hero-gens-page'); target.replace_with(BeautifulSoup(html,'html.parser'))
    Path('hero-generations.html').write_text(str(soup),encoding='utf-8')

def make_gen(g):
    soup=BeautifulSoup(base,'html.parser')
    title=f'{g} поколение героев | Белая мгла'
    desc=f'Герои {g} поколения: карточки героев и переход на подробные гайды.'
    url=f'https://belaya-mgla-sova58.github.io/hero-generation-{g:02d}.html'
    set_meta(soup,title,desc,url)
    old=soup.find('style');
    if old: old.replace_with(BeautifulSoup(STYLE,'html.parser'))
    crumbs=soup.select_one('.breadcrumbs-v409')
    if crumbs: crumbs.clear(); crumbs.append(BeautifulSoup(f'<a href="index.html">Главная</a><span class="breadcrumbs-sep-v409">›</span><a href="hero-generations.html">Поколения героев</a><span class="breadcrumbs-sep-v409">›</span><span>{g} поколение</span>','html.parser'))
    heroes=GENS[g]
    cls='gen-page-grid four' if len(heroes)==4 else 'gen-page-grid'
    label,main,note=SUMMARY[g]
    cards=''.join(card(g,h) for h in heroes)
    prev=f'<a class="gen-back" href="hero-generation-{g-1:02d}.html">← {g-1} поколение</a>' if g>1 else ''
    nxt=f'<a class="gen-back" href="hero-generation-{g+1:02d}.html">{g+1} поколение →</a>' if g<12 else ''
    html=f'''<div class="hero-gens-page"><section class="gen-page-hero"><h1>{g} поколение</h1><p>{label}. Выбери героя ниже. Карточка открывает полный гайд с навыками, снаряжением, применением, плюсами и минусами.</p></section><div class="{cls}">{cards}</div><div class="gen-info-strips"><div class="gen-info-strip"><b>Главное о поколении</b><span>{main}</span></div><div class="gen-info-strip"><b>Кого смотреть в первую очередь</b><span>{note}</span></div><div class="gen-info-strip"><b>Как пользоваться разделом</b><span>Сравни роли героев здесь, затем открой карточку нужного героя для полного гайда.</span></div></div><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="gen-back" href="hero-generations.html">← Все поколения</a>{prev}{nxt}</div></div>'''
    soup.select_one('.hero-gens-page').replace_with(BeautifulSoup(html,'html.parser'))
    Path(f'hero-generation-{g:02d}.html').write_text(str(soup),encoding='utf-8')

make_hub()
for g in GENS: make_gen(g)

# Hero page: replace old huge inline generation catalog with a clean category card.
p=Path('heroes.html'); soup=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
cat=soup.select_one('.hero-catalog-v700')
if cat:
    repl=BeautifulSoup('''<div class="hero-catalog-v700"><div class="hero-catalog-intro"><span class="hero-catalog-kicker">Отдельная категория</span><h3>Поколения героев</h3><p>Все поколения вынесены на отдельную страницу. Сначала выбираешь поколение, затем героя, после чего открывается полный гайд.</p><p style="margin-top:14px"><a class="gen-back" href="hero-generations.html">Открыть поколения героев →</a></p></div></div>''','html.parser')
    cat.replace_with(repl)
p.write_text(str(soup),encoding='utf-8')

# Sitemap entries.
sp=Path('sitemap.xml'); s=sp.read_text(encoding='utf-8')
urls=['hero-generations.html']+[f'hero-generation-{g:02d}.html' for g in GENS]
for name in urls:
    loc='https://belaya-mgla-sova58.github.io/'+name
    if loc not in s: s=s.replace('</urlset>',f'  <url><loc>{loc}</loc><lastmod>2026-10-23</lastmod></url>\n</urlset>')
sp.write_text(s,encoding='utf-8')
