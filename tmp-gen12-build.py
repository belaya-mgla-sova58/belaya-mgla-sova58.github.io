from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from PIL import Image
import requests, io, re, json

BASE='https://belaya-mgla-sova58.github.io/'
DATE='2026-10-23'

heroes={
'hervor':{
'name':'Хервор','cls':'Пехота','source':'https://whiteout-survival.com/heroes/hervor/','ru_source':'https://whiteout-survival.com/ru/heroes/hervor/','lab':'https://whiteoutlab.ru/wiki/heroes/hervor',
'subtitle':'Фронтовик · смертоносность · стойкость пехоты','lead':'Хервор — пехотный герой 12 поколения для PvP и обороны. Она сочетает высокий запас здоровья, сопротивление контролю и сильные походные бонусы: повышает смертоносность всего марша и заметно снижает входящий урон своей пехоты.',
'get':'Зал героев, магазин Литейной, универсальные мифические фрагменты','f2p':'Сильна, но дороже Кароль; обычно второй приоритет поколения','stats':['13 674','17 826','267 398','1 451,16%','1 451,16%'],
'explore':[
('Сотрясатель земли','skill-earthmover.webp','Урон по фронту · оглушение','Наносит урон врагам перед собой, оглушает на 1 секунду и накладывает «Устрашение», снижающее атаку врага на 25% на 3 секунды.','100 / 110 / 120 / 130 / 140% атаки'),
('Сила гор','skill-mountain-strength.webp','Устрашение · уязвимость','Обычные атаки могут наложить «Устрашение». Эффект повышает получаемый врагом урон и суммируется до 3 раз.','Шанс 5 / 10 / 15 / 20 / 25% · уязвимость +3 / 6 / 9 / 12 / 15% за стак'),
('Каменные руки','skill-stone-arms.webp','Стойкость · иммунитет к контролю','Постоянно снижает получаемый Хервор урон. Первые 9 секунд боя она невосприимчива к оглушению, параличу, заморозке и другим эффектам контроля.','Получаемый урон −5 / 10 / 15 / 20 / 25%')],
'expedition':[
('Зов крови','skill-call-for-blood.webp','Смертоносность всего марша','Боевой клич Хервор повышает смертоносность всех войск.','+5 / 10 / 15 / 20 / 25%'),
('Неумирающая','skill-undying.webp','Защита пехоты','Снижает урон, который пехота Хервор получает от обычных атак и навыков противника.','Обычные атаки −5 / 10 / 15 / 20 / 25% · навыки −6 / 12 / 18 / 24 / 30%'),
('Жажда битвы','skill-battlethirsty.webp','Пехота · урон и стойкость','Одновременно снижает входящий урон пехоты и повышает наносимый ею урон.','Получаемый урон −3 / 6 / 9 / 12 / 15% · наносимый +2 / 4 / 6 / 8 / 10%')],
'gear':('Молот Сатлы','gear-hammer-of-sathla.webp','+2 770 атаки · +3 613 защиты · +54 202 здоровья · +362,5% смертоносности и здоровья войск'),
'gear_skills':[('Знак вождя','gear-mark-of-chieftain.webp','На максимуме повышает скорость атаки на 30% и шанс наложить «Устрашение» обычной атакой на 25%.'),('Каменная крепость','gear-fort-of-rock.webp','На максимуме повышает защиту войск защитника на 15%.')],
'priority':[('Зов крови','Универсальные +25% смертоносности всем войскам.'),('Неумирающая','Ключевая защита пехоты от обычных атак и навыков.'),('Жажда битвы','Ещё больше стойкости и урона пехоты.')],
'pros':['+25% смертоносности всему маршу.','Очень высокая живучесть и сопротивление контролю.','Сильная пехота в затяжном PvP и гарнизоне.','Хороший первый экспедиционный навык для участия в атакующих сборах.'],
'cons':['Нет Колеса удачи, поэтому дороже Кароль.','Большая часть защитной силы привязана именно к пехоте.','На Арене сильна как фронтовик, но не является чистым дамагером.'],
'verdict':'Хервор — мощный пехотный фронтовик 12 поколения. Для F2P Кароль обычно выгоднее из-за Колеса удачи, но развитая Хервор даёт маршу отличную смертоносность и очень крепкую переднюю линию.',
'alts':{'Hervor':'portrait.webp','Earthmover':'skill-earthmover.webp','Mountain Strength':'skill-mountain-strength.webp','Stone Arms':'skill-stone-arms.webp','Call For Blood':'skill-call-for-blood.webp','Undying':'skill-undying.webp','Battlethirsty':'skill-battlethirsty.webp','Hammer of Sathla':'gear-hammer-of-sathla.webp','Mark of the Chieftain (Lv. 5)':'gear-mark-of-chieftain.webp','Fort of Rock (Lv. 5)':'gear-fort-of-rock.webp'}},
'karol':{
'name':'Кароль','cls':'Копейщики','source':'https://whiteout-survival.com/heroes/karol/','ru_source':'https://whiteout-survival.com/ru/heroes/karol/','lab':'https://whiteoutlab.ru/wiki/heroes/karol',
'subtitle':'Колесо удачи · универсальный марш · ослабление защиты','lead':'Кароль — копейщик 12 поколения и главный доступный герой поколения для большинства F2P-игроков. Он снижает входящий урон всему маршу, усиливает атаку и защиту всех войск и получает сильные преимущества против вражеской пехоты и копейщиков.',
'get':'Колесо удачи, магазин Литейной, универсальные мифические фрагменты','f2p':'Главный F2P-приоритет 12 поколения благодаря Колесу удачи','stats':['17 826','17 826','178 266','1 451,16%','1 451,16%'],
'explore':[
('Атака рассвета','skill-dawn-charge.webp','Урон по области · снижение защиты','Пронзает врагов перед собой пикой и на 2 секунды снижает их защиту.','Урон 200 / 220 / 240 / 260 / 280% · защита −5 / 10 / 15 / 20 / 25%'),
('Ощетинившийся натиск','skill-bristling-strike.webp','Урон по области','Проводит стремительную серию ударов по врагам в выбранной области.','100 / 110 / 120 / 130 / 140% атаки'),
('Окрылённый победой','skill-soaring-victory.webp','Самоусиление · восстановление','За каждого павшего вражеского героя повышает свою атаку и восстанавливает часть здоровья.','Атака +4 / 6 / 8 / 10 / 12% · здоровье +2 / 4 / 6 / 8 / 10% за павшего героя')],
'expedition':[
('Под крылом','skill-in-the-wings.webp','Снижение урона всему маршу','Кавалерийские манёвры уменьшают получаемый всеми войсками урон.','−4 / 8 / 12 / 16 / 20%'),
('Сокрушитель щитов','skill-shieldbreaker.webp','Анти-пехота · анти-копейщики','Повышает урон всех войск по вражеским копейщикам и пехоте.','По копейщикам +6 / 12 / 18 / 24 / 30% · по пехоте +5 / 10 / 15 / 20 / 25%'),
('Знамя веков','skill-standard-of-ages.webp','Атака и защита всех войск','Постоянно усиливает атаку и защиту всего марша.','Атака +3 / 6 / 9 / 12 / 15% · защита +2 / 4 / 6 / 8 / 10%')],
'gear':('Дух зимнего ветра','gear-spirit-of-winterwind.webp','+3 613 атаки · +3 613 защиты · +36 135 здоровья · +362,5% смертоносности и здоровья войск'),
'gear_skills':[('Взмах орлиных крыльев','gear-eagle-flutter.webp','На максимуме после «Атаки рассвета» повышает атаку союзного отряда на 14% и скорость передвижения на 100% на 5 секунд.'),('Триумфальный марш','gear-triumphant-march.webp','На максимуме повышает атаку войск сбора на 15%.')],
'priority':[('Под крылом','Универсальное снижение входящего урона всему маршу.'),('Знамя веков','Стабильные атака и защита для всех войск.'),('Сокрушитель щитов','Сильное преимущество против пехоты и копейщиков.')],
'pros':['Герой Колеса удачи и лучший F2P-приоритет поколения.','До −20% получаемого урона всему маршу.','До +15% атаки и +10% защиты всех войск.','Сильный бонус против вражеской пехоты и копейщиков.','Эксклюзивное снаряжение даёт +15% атаки войск сбора.'],
'cons':['Не даёт такого сильного фронта, как Хервор.','Часть преимуществ зависит от состава противника.','На Медведе первый экспедиционный навык защитный, поэтому как участник сбора не лучший источник урона.'],
'verdict':'Кароль — главный F2P-выбор 12 поколения. Колесо удачи делает его намного доступнее Хервор и Лигеи, а универсальные бонусы к выживанию, атаке и защите позволяют использовать его почти во всех PvP-сценариях.',
'alts':{'Karol':'portrait.webp','Dawn Charge':'skill-dawn-charge.webp','Bristling Strike':'skill-bristling-strike.webp','Soaring Victory':'skill-soaring-victory.webp','In the Wings':'skill-in-the-wings.webp','Shieldbreaker':'skill-shieldbreaker.webp','Standard of Ages':'skill-standard-of-ages.webp','Spirit of Winterwind':'gear-spirit-of-winterwind.webp','Eagle Flutter (Lv. 5)':'gear-eagle-flutter.webp','Triumphant March (Lv. 5)':'gear-triumphant-march.webp'}},
'ligeia':{
'name':'Лигея','cls':'Стрелки','source':'https://whiteout-survival.com/heroes/ligeia/','ru_source':'https://whiteout-survival.com/ru/heroes/ligeia/','lab':'https://whiteoutlab.ru/wiki/heroes/ligeia',
'subtitle':'Снижение защиты · механические пауки · атакующие сборы','lead':'Лигея — стрелок 12 поколения с сильными дебаффами. Она снижает защиту всей вражеской армии, усиливает урон стрелков каждые две атаки и заставляет цель получать больше урона, поэтому особенно ценна в атакующих маршах и сборах.',
'get':'Зал вождей, Король ледяных полей, Сила государства, ежедневные предложения, Сбор героев, магазин Литейной','f2p':'Сильна, но дорогая; обычно после Кароль и ключевой пехоты','stats':['21 656','17 826','133 698','1 451,16%','1 451,16%'],
'explore':[
('Кислотный рефлекс','skill-acid-reflex.webp','Три удара · снижение атаки','Призывает трёх мех-пауков, наносящих урон по области, и на 2 секунды снижает атаку врага.','70 / 77 / 84 / 91 / 98% за удар · атака врага −5 / 10 / 15 / 20 / 25%'),
('Госпожа пауков','skill-spider-madam.webp','Резонанс · перенаправление урона','Наносит урон и может активировать ловушку «Резонанс» на 5 секунд, перенаправляющую на цель урон, направленный против Лигеи.','Урон 50 / 55 / 60 / 65 / 70% · шанс 20 / 40 / 60 / 80 / 100%'),
('Механические клыки','skill-mechanical-teeth.webp','Защита от дебаффа · усиление атаки','Тратит паука-стража, чтобы отразить отрицательный эффект, и получает усиление атаки на 10 секунд. Может держать до трёх пауков-стражей.','Атака +8 / 12 / 16 / 20 / 24%')],
'expedition':[
('Ослабляющий яд','skill-nerf-poison.webp','Снижение защиты всей армии','Механические пауки снижают защиту всех войск противника.','−5 / 10 / 15 / 20 / 25%'),
('Коррозия','skill-corrosion.webp','Каждые 2 атаки · уязвимость цели','Каждые две атаки стрелки наносят дополнительный урон, а цель на 1 ход получает больше урона.','Доп. урон +20 / 40 / 60 / 80 / 100% · получаемый целью урон +5 / 10 / 15 / 20 / 25%'),
('Ядовитое остриё','skill-toxic-tip.webp','Каждые 2 атаки · ослабление цели','Каждые две атаки усиливает урон стрелков по цели и на 1 ход снижает наносимый целью урон.','Урон стрелков +20 / 40 / 60 / 80 / 100% · урон цели −4 / 8 / 12 / 16 / 20%')],
'gear':('Ткачиха судеб','gear-fateweaver.webp','+4 384 атаки · +3 613 защиты · +27 101 здоровья · +362,5% смертоносности и здоровья войск'),
'gear_skills':[('Королева пауков','gear-spider-queen.webp','На максимуме начинает бой с 2 пауками-стражами, а «Госпожа пауков» гарантированно поражает ещё одну цель.'),('Гнездо ловушек','gear-trap-nest.webp','На максимуме повышает смертоносность войск защитника на 15%.')],
'priority':[('Ослабляющий яд','До −25% защиты всей армии противника.'),('Коррозия','Усиливает стрелков и повышает входящий урон по цели.'),('Ядовитое остриё','Ещё один сильный двухходовый цикл стрелков.')],
'pros':['До −25% защиты всех войск противника.','Очень сильные циклические бонусы стрелков каждые две атаки.','Повышает получаемый целью урон до +25%.','Сильна в атакующих маршах и сборах.'],
'cons':['Нет Колеса удачи, поэтому дорогая для F2P.','Максимальная ценность требует хорошо развитых стрелков.','Эксклюзивный походный бонус ориентирован на защиту, а не на атакующий сбор.'],
'verdict':'Лигея — сильный дебаффер и стрелок 12 поколения. Её снижение защиты на 25% и циклические усиления делают её очень опасной в PvP и сборах, но для большинства F2P она идёт после Кароль.',
'alts':{'Ligeia':'portrait.webp','Acid Reflex':'skill-acid-reflex.webp','Spider Madam':'skill-spider-madam.webp','Mechanical Teeth':'skill-mechanical-teeth.webp','Nerf Poison':'skill-nerf-poison.webp','Corrosion':'skill-corrosion.webp','Toxic Tip':'skill-toxic-tip.webp','Fateweaver':'gear-fateweaver.webp','Spider Queen (Lv. 5)':'gear-spider-queen.webp','Trap Nest (Lv. 5)':'gear-trap-nest.webp'}}
}

def download_assets(slug,d):
    r=requests.get(d['source'],headers={'User-Agent':'Mozilla/5.0'},timeout=30); r.raise_for_status()
    s=BeautifulSoup(r.text,'html.parser')
    imgs={}
    for im in s.find_all('img'):
        alt=(im.get('alt') or '').strip()
        src=im.get('data-lazy-src') or im.get('data-src') or im.get('src') or ''
        if alt in d['alts'] and src and not src.startswith('data:'):
            imgs[alt]=urljoin(d['source'],src)
    missing=[a for a in d['alts'] if a not in imgs]
    if missing: raise RuntimeError(f'{slug}: missing images {missing}; found {list(imgs)}')
    out=Path(f'assets/heroes/gen-12/{slug}'); out.mkdir(parents=True,exist_ok=True)
    for alt,fn in d['alts'].items():
        rr=requests.get(imgs[alt],headers={'User-Agent':'Mozilla/5.0','Referer':d['source']},timeout=30); rr.raise_for_status()
        img=Image.open(io.BytesIO(rr.content)).convert('RGBA')
        img.save(out/fn,'WEBP',quality=94,method=6)

def skill_card(slug,x):
    name,img,small,desc,vals=x
    return f'<article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-12/{slug}/{img}" alt="{name}"><div><h3>{name}</h3><small>{small}</small></div></div><p>{desc}</p><p class="jero-values">{vals}</p></article>'

def hero_body(slug,d):
    st=d['stats']; gear=d['gear']; gs=d['gear_skills']
    pri=''.join(f'<div><b><span class="jero-rank">{i}</span>{n}</b><span>{t}</span></div>' for i,(n,t) in enumerate(d['priority'],1))
    pros=''.join(f'<li>{x}</li>' for x in d['pros']); cons=''.join(f'<li>{x}</li>' for x in d['cons'])
    return f'''<div class="jero-page">
<div class="jero-crumbs"><a href="index.html">Главная</a> · <a href="heroes.html">Герои</a> · <a href="hero-generations.html">Поколения героев</a> · {d['name']}</div>
<section class="jero-hero"><div class="jero-portrait-wrap"><img class="jero-portrait" src="assets/heroes/gen-12/{slug}/portrait.webp" alt="{d['name']}"></div><div><div class="jero-kicker"><span class="jero-chip gold">12 поколение</span><span class="jero-chip">{d['cls']}</span><span class="jero-chip">Мифический</span><span class="jero-chip">Бой</span></div><h1>{d['name']}</h1><p class="jero-subtitle">{d['subtitle']}</p><p class="jero-lead">{d['lead']}</p><div class="jero-quick"><div><b>Получение</b><span>{d['get']}</span></div><div><b>Главная роль</b><span>PvP, Арена и бои войск</span></div><div><b>Для F2P</b><span>{d['f2p']}</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div></div></section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#explore">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#use">Применение</a><a href="#verdict">Итог</a></nav>
<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные значения по актуальной базе 12 поколения.</p><div class="jero-stats"><div class="jero-stat"><strong>{st[0]}</strong><span>Атака героя</span></div><div class="jero-stat"><strong>{st[1]}</strong><span>Защита героя</span></div><div class="jero-stat"><strong>{st[2]}</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>{st[3]}</strong><span>Атака {d['cls'].lower()}</span></div><div class="jero-stat"><strong>{st[4]}</strong><span>Защита {d['cls'].lower()}</span></div></div></section>
<section class="jero-section" id="explore"><h2>Навыки Освоения</h2><div class="jero-skill-grid">{''.join(skill_card(slug,x) for x in d['explore'])}</div></section>
<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><div class="jero-skill-grid">{''.join(skill_card(slug,x) for x in d['expedition'])}</div></section>
<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="assets/heroes/gen-12/{slug}/{gear[1]}" alt="{gear[0]}"><div><h3 class="jero-gear-title">{gear[0]}</h3><p class="jero-section-lead">Максимальные характеристики: {gear[2]}.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="assets/heroes/gen-12/{slug}/{gs[0][1]}" alt="{gs[0][0]}"><div><b>{gs[0][0]}</b><span>{gs[0][2]}</span></div></div><div class="jero-gear-skill"><img src="assets/heroes/gen-12/{slug}/{gs[1][1]}" alt="{gs[1][0]}"><div><b>{gs[1][0]}</b><span>{gs[1][2]}</span></div></div></div></div></div></section>
<section class="jero-section" id="use"><h2>Где использовать {d['name']}</h2><div class="jero-mode-grid"><div class="jero-mode"><b>PvP</b><p>Основной режим: навыки Экспедиции напрямую влияют на войска и результат марша.</p></div><div class="jero-mode"><b>Арена</b><p>Навыки Освоения дают отдельный набор контроля, урона и выживаемости.</p></div><div class="jero-mode"><b>Сборы</b><p>Смотри прежде всего на первый навык Экспедиции и бонусы эксклюзивного снаряжения.</p></div><div class="jero-mode"><b>Свирепый медведь</b><p>Оценивай только атакующие походные бонусы; защитные эффекты здесь дают меньше пользы.</p></div></div></section>
<section class="jero-section"><h2>Приоритет прокачки</h2><div class="jero-priority">{pri}</div></section>
<section class="jero-section"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul>{pros}</ul></div><div class="jero-box bad"><h3>Минусы</h3><ul>{cons}</ul></div></div></section>
<section class="jero-section" id="verdict"><div class="jero-verdict"><h3>Итог</h3><p><strong>{d['verdict']}</strong></p></div><div class="jero-sources"><a href="{d['ru_source']}" target="_blank" rel="noopener">Источник: карточка героя</a><a href="{d['lab']}" target="_blank" rel="noopener">WOS Lab: русские названия и значения</a></div><a class="jero-back" href="hero-generations.html#gen-12">← Вернуться к 12 поколению</a></section>
<div class="jero-foot">Белая мгла · SOVA58 · актуализировано 23.10.2026</div></div>'''

def make_page(slug,d):
    src=Path('hero-eleonora.html').read_text(encoding='utf-8')
    name=d['name']; url=BASE+f'hero-{slug}.html'; gear=d['gear'][0]
    src=re.sub(r'<title>.*?</title>',f'<title>{name}: навыки, {gear}, плюсы и минусы | Белая мгла</title>',src,1,flags=re.S)
    src=re.sub(r'<meta name="description" content="[^"]*"/>',f'<meta name="description" content="Подробный гайд по {name}: герой 12 поколения, навыки Освоения и Экспедиции, {gear}, PvP, Арена, прокачка, плюсы и минусы."/>',src,1)
    src=re.sub(r'<link rel="canonical" href="[^"]*"/>',f'<link rel="canonical" href="{url}"/>',src,1)
    src=re.sub(r'<meta property="og:title" content="[^"]*"/>',f'<meta property="og:title" content="{name}: полный гайд"/>',src,1)
    src=re.sub(r'<meta property="og:description" content="[^"]*"/>',f'<meta property="og:description" content="Навыки, {gear}, PvP, Арена, плюсы и минусы героя {name}."/>',src,1)
    src=re.sub(r'<meta property="og:url" content="[^"]*"/>',f'<meta property="og:url" content="{url}"/>',src,1)
    img=BASE+f'assets/heroes/gen-12/{slug}/portrait.webp'
    src=re.sub(r'<meta property="og:image" content="[^"]*"/>',f'<meta property="og:image" content="{img}"/>',src,1)
    src=re.sub(r'<meta name="twitter:image" content="[^"]*"/>',f'<meta name="twitter:image" content="{img}"/>',src,1)
    article={"@context":"https://schema.org","@type":"Article","headline":f"{name}: полный гайд","description":f"Подробный гайд по герою {name}: 12 поколение, навыки, {gear}, PvP и Арена.","url":url,"mainEntityOfPage":{"@type":"WebPage","@id":url},"author":{"@type":"Person","name":"SOVA58","url":BASE+'sova58.html',"gender":"Female"},"isPartOf":{"@type":"WebSite","name":"Белая мгла · SOVA58","url":BASE},"inLanguage":"ru","dateModified":DATE,"image":[img]}
    src=re.sub(r'(<script id="guide-article-schema-v625" type="application/ld\+json">).*?(</script>)',r'\1'+json.dumps(article,ensure_ascii=False,separators=(',',':'))+r'\2',src,1,flags=re.S)
    crumb={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":BASE},{"@type":"ListItem","position":2,"name":"Герои","item":BASE+'heroes.html'},{"@type":"ListItem","position":3,"name":"Поколения героев","item":BASE+'hero-generations.html'},{"@type":"ListItem","position":4,"name":name,"item":url}]}
    src=re.sub(r'(<script type="application/ld\+json">)\{"@context":"https://schema.org","@type":"BreadcrumbList".*?(</script>)',r'\1'+json.dumps(crumb,ensure_ascii=False,separators=(',',':'))+r'\2',src,1,flags=re.S)
    src=re.sub(r'data-hero="[^"]*"',f'data-hero="{slug}"',src,1)
    src=re.sub(r'(<div class="mobile-topbar-title"><strong>БЕЛАЯ МГЛА</strong><small>).*?(</small></div>)',r'\1'+name+r'\2',src,1,flags=re.S)
    src=re.sub(r'<div class="jero-page">.*?</div></main>',hero_body(slug,d)+'</main>',src,1,flags=re.S)
    Path(f'hero-{slug}.html').write_text(src,encoding='utf-8')

def make_generations():
    h=Path('heroes.html').read_text(encoding='utf-8')
    soup=BeautifulSoup(h,'html.parser')
    catalog=soup.select_one('.hero-catalog-v700')
    if not catalog: raise RuntimeError('generation catalog not found')
    # standalone category from same site shell
    out=BeautifulSoup(h,'html.parser')
    if out.title: out.title.string='Поколения героев | Белая мгла'
    desc=out.find('meta',attrs={'name':'description'}); desc['content']='Поколения героев Белой мглы: герои 1–12 поколений с переходом на подробные гайды.'
    canon=out.find('link',attrs={'rel':'canonical'}); canon['href']=BASE+'hero-generations.html'
    for prop,val in [('og:title','Поколения героев | Белая мгла'),('og:description','Герои Белой мглы по поколениям: 1–12 поколения и подробные гайды.'),('og:url',BASE+'hero-generations.html')]:
        m=out.find('meta',attrs={'property':prop})
        if m: m['content']=val
    route=out.select_one('.route-page')
    route.clear()
    frag=BeautifulSoup(f'''<nav aria-label="Хлебные крошки" class="breadcrumbs-v409"><a href="index.html">Главная</a><span aria-hidden="true" class="breadcrumbs-sep-v409">›</span><a href="heroes.html">Герои</a><span aria-hidden="true" class="breadcrumbs-sep-v409">›</span><span aria-current="page">Поколения героев</span></nav><section class="page-heading-v424 frost-header-v431"><h1>Поколения героев</h1><p>Все подробные гайды по героям, разделённые по поколениям.</p></section><div class="guide-page-v69"></div>''','html.parser')
    for x in list(frag.contents): route.append(x)
    gp=route.select_one('.guide-page-v69'); gp.append(BeautifulSoup(str(catalog),'html.parser'))
    Path('hero-generations.html').write_text(str(out),encoding='utf-8')
    # replace heavy catalog in Heroes page with a dedicated-category entry card
    hs=BeautifulSoup(h,'html.parser')
    title=hs.find(id='section-6')
    det=title.find_parent('details') if title else None
    if det:
        body=det.select_one('.guide-fold-body-v414'); body.clear()
        body.append(BeautifulSoup('''<div class="hero-catalog-intro"><span class="hero-catalog-kicker">Отдельная категория</span><h3>Поколения героев</h3><p>Герои собраны по поколениям от 1-го до 12-го. Внутри каждого поколения — карточки с типом войск, ролью и переходом на подробный гайд.</p><p style="margin-top:14px"><a class="jero-back" href="hero-generations.html">Открыть «Поколения героев» →</a></p></div>''','html.parser'))
    Path('heroes.html').write_text(str(hs),encoding='utf-8')

for slug,d in heroes.items():
    download_assets(slug,d)
    make_page(slug,d)
make_generations()
print('Built:', ', '.join(heroes), 'and hero-generations.html')
