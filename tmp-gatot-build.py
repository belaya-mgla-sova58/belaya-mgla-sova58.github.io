from pathlib import Path
import re, requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

ROOT=Path('.')
TEMPLATE=ROOT/'hero-gordon.html'
OUT=ROOT/'hero-gatot.html'
ASSET_DIR=ROOT/'assets/heroes/gen-08/gatot'
ASSET_DIR.mkdir(parents=True,exist_ok=True)
SRC='https://wos.h5joy-games.com/heroes/s8/gatot/'

s=requests.Session(); s.headers.update({'User-Agent':'Mozilla/5.0 SOVA58-site-builder/1.0'})
html=s.get(SRC,timeout=30).text
soup=BeautifulSoup(html,'html.parser')
imgs=[]
for im in soup.find_all('img'):
    src=im.get('src') or im.get('data-src') or im.get('data-lazy-src')
    alt=(im.get('alt') or '').strip()
    if src: imgs.append((alt,urljoin(SRC,src)))

def pick(filename, terms):
    for alt,url in imgs:
        hay=(alt+' '+url).lower().replace('_',' ').replace('-',' ')
        if all(t.lower() in hay for t in terms):
            r=s.get(url,timeout=30); r.raise_for_status()
            if len(r.content)>900:
                (ASSET_DIR/filename).write_bytes(r.content); return
    raise RuntimeError(f'asset not found {filename}; sample={imgs[:60]}')

pick('portrait.webp',['gatot'])
pick('skill-kings-resolve.webp',['king','resolve'])
pick('skill-royal-authority.webp',['royal','authority'])
pick('skill-regal-dance.webp',['regal','dance'])
pick('skill-golden-guard.webp',['golden','guard'])
pick('skill-kings-bestowal.webp',['king','bestowal'])
pick('skill-royal-legion.webp',['royal','legion'])
pick('gear-golden-fang.webp',['golden','fang'])
pick('gear-kings-punishment.webp',['king','punishment'])
pick('gear-indestructible-city.webp',['indestructible','city'])

src=TEMPLATE.read_text(encoding='utf-8')
head,rest=src.split('</head>',1); head+='</head>'
head=re.sub(r'<title>.*?</title>','<title>Гатот: навыки, Золотой Клык, плюсы и минусы | Белая мгла</title>',head,flags=re.S)
head=re.sub(r'<meta name="description" content=".*?"/>','<meta name="description" content="Подробный гайд по Гатоту: герой 8 поколения, навыки Освоения и Экспедиции, Золотой Клык, PvP, гарнизон, Арена, Свирепый медведь, прокачка, плюсы и минусы."/>',head,flags=re.S)
head=re.sub(r'<link rel="canonical" href="[^"]+"/>','<link rel="canonical" href="https://belaya-mgla-sova58.github.io/hero-gatot.html"/>',head)
head=re.sub(r'<meta property="og:title" content=".*?"/>','<meta property="og:title" content="Гатот: полный гайд"/>',head)
head=re.sub(r'<meta property="og:description" content=".*?"/>','<meta property="og:description" content="Навыки, Золотой Клык, PvP, гарнизон, Арена, Свирепый медведь, плюсы и минусы Гатота."/>',head)
head=re.sub(r'<meta property="og:url" content="[^"]+"/>','<meta property="og:url" content="https://belaya-mgla-sova58.github.io/hero-gatot.html"/>',head)
head=re.sub(r'<meta property="og:image" content="[^"]+"/>','<meta property="og:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-08/gatot/portrait.webp"/>',head)
head=re.sub(r'<meta name="twitter:image" content="[^"]+"/>','<meta name="twitter:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-08/gatot/portrait.webp"/>',head)
head=re.sub(r'<script id="guide-article-schema-v625" type="application/ld\+json">.*?</script>','<script id="guide-article-schema-v625" type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Гатот: полный гайд","description":"Подробный гайд по Гатоту: герой 8 поколения, навыки, Золотой Клык, PvP, гарнизон, Арена и прокачка.","url":"https://belaya-mgla-sova58.github.io/hero-gatot.html","mainEntityOfPage":{"@type":"WebPage","@id":"https://belaya-mgla-sova58.github.io/hero-gatot.html"},"author":{"@type":"Person","name":"SOVA58","url":"https://belaya-mgla-sova58.github.io/sova58.html","gender":"Female"},"isPartOf":{"@type":"WebSite","name":"Белая мгла · SOVA58","url":"https://belaya-mgla-sova58.github.io/"},"inLanguage":"ru","dateModified":"2026-10-23","image":["https://belaya-mgla-sova58.github.io/assets/heroes/gen-08/gatot/portrait.webp"]}</script>',head,flags=re.S)
head=re.sub(r'<script type="application/ld\+json">\{"@context":"https://schema.org","@type":"BreadcrumbList".*?</script>','<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://belaya-mgla-sova58.github.io/"},{"@type":"ListItem","position":2,"name":"Герои","item":"https://belaya-mgla-sova58.github.io/heroes.html"},{"@type":"ListItem","position":3,"name":"Гатот","item":"https://belaya-mgla-sova58.github.io/hero-gatot.html"}]}</script>',head,flags=re.S)
body_start=rest.index('<body')
main_start=rest.index('<main id="appMain">')
mobile_bottom=rest.index('<nav aria-label="Быстрая мобильная навигация"')
shell_top=rest[body_start:main_start]
shell_bottom=rest[mobile_bottom:]
main='''<main id="appMain"><div class="route-page active" data-route="heroes"><div class="jero-page">
<nav aria-label="Хлебные крошки" class="jero-crumbs"><a href="index.html">Главная</a> › <a href="heroes.html">Герои</a> › <span>Гатот</span></nav>
<section class="jero-hero"><div class="jero-portrait-wrap"><img class="jero-portrait" src="assets/heroes/gen-08/gatot/portrait.webp" alt="Гатот"/></div><div><div class="jero-kicker"><span class="jero-chip">8 поколение</span><span class="jero-chip">Пехота</span><span class="jero-chip gold">Мифический</span><span class="jero-chip">Бой</span></div><h1>Гатот</h1><p class="jero-subtitle">Щиты · гарнизон · снижение атаки врага</p><p class="jero-lead">Гатот — защитный пехотный герой 8 поколения. Его сила не в Свирепом медведе, а в выживаемости: мощный щит, уклонение, повышение защиты пехоты и постоянное снижение атаки противника делают его одним из лучших бесплатных защитников своего поколения.</p><div class="jero-quick"><div><b>Получение</b><span>Колесо удачи и мифические универсальные осколки</span></div><div><b>Главная роль</b><span>гарнизон, защита города, PvP и Арена</span></div><div><b>Для F2P</b><span>очень выгоден благодаря Колесу удачи</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div></div></section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#exploration">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#priority">Прокачка</a><a href="#use">Применение</a><a href="#pros">Плюсы и минусы</a></nav>
<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные базовые значения Гатота 8 поколения.</p><div class="jero-stats"><div class="jero-stat"><strong>6 573</strong><span>Атака героя</span></div><div class="jero-stat"><strong>8 568</strong><span>Защита героя</span></div><div class="jero-stat"><strong>128 538</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>780.62%</strong><span>Атака пехоты</span></div><div class="jero-stat"><strong>780.62%</strong><span>Защита пехоты</span></div></div><div class="jero-note"><strong>Главная особенность:</strong> Гатот создан как стена. Его набор усиливает защиту пехоты, выдаёт ей щиты и режет атаку всей вражеской армии.</div></section>
<section class="jero-section" id="exploration"><h2>Навыки Освоения</h2><p class="jero-section-lead">В Арене Гатот особенно силён на передней линии.</p><div class="jero-skill-grid"><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-08/gatot/skill-kings-resolve.webp" alt="Королевская решимость"/><div><h3>Королевская решимость</h3></div></div><p>Создаёт щит на 5 секунд. Щит поглощает урон первым.</p><p class="jero-values">Щит: 220% / 260% / 300% / 340% / 380% от атаки</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-08/gatot/skill-royal-authority.webp" alt="Королевская власть"/><div><h3>Королевская власть</h3></div></div><p>Запугивает всех врагов, снижая их атаку, и одновременно усиливает атаку Гатота за каждого запуганного героя на 3 секунды.</p><p class="jero-values">−1/2/3/4/5% атаки врага · +1/2/3/4/5% атаки за каждого врага</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-08/gatot/skill-regal-dance.webp" alt="Королевский танец"/><div><h3>Королевский танец</h3></div></div><p>Даёт шанс полностью уклониться от обычной атаки и повышает шанс критического удара.</p><p class="jero-values">Уклонение 3/6/9/12/15% · крит 4/8/12/16/20%</p></article></div></section>
<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><p class="jero-section-lead">Здесь раскрывается его главная специализация: оборона гарнизона и живучесть марша.</p><div class="jero-skill-grid"><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-08/gatot/skill-golden-guard.webp" alt="Золотая гвардия"/><div><h3>Золотая гвардия</h3></div></div><p>Постоянно повышает защиту пехоты Гатота.</p><p class="jero-values">Защита пехоты +6 / +12 / +18 / +24 / +30%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-08/gatot/skill-kings-bestowal.webp" alt="Королевское дарование"/><div><h3>Королевское дарование</h3></div></div><p>Каждая атака пехоты создаёт для неё щит на 1 ход.</p><p class="jero-values">Щит: 6 / 12 / 18 / 24 / 30% от атаки</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-08/gatot/skill-royal-legion.webp" alt="Королевский легион"/><div><h3>Королевский легион</h3></div></div><p>Снижает атаку всех войск противника.</p><p class="jero-values">Атака врага −5 / −10 / −15 / −20 / −25%</p></article></div><div class="jero-note"><strong>Для присоединения к чужому сбору:</strong> работает только первый навык Экспедиции, поэтому Гатот даёт защиту пехоты, а не атакующий бонус. Для Медведя это слабее специализированных атакующих героев.</div></section>
<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="assets/heroes/gen-08/gatot/gear-golden-fang.webp" alt="Золотой Клык"/><div><h3 class="jero-gear-title">Золотой Клык</h3><p class="jero-section-lead">На максимуме: +1 331 атаки, +1 737 защиты, +26 055 здоровья, +193% летальности пехоты и +193% здоровья пехоты.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="assets/heroes/gen-08/gatot/gear-kings-punishment.webp" alt="Наказание короля"/><div><b>Наказание короля</b><span>Усиливает «Королевскую решимость»: дополнительный щит до 95% атаки и отражение до 30% урона, пока щит активен.</span></div></div><div class="jero-gear-skill"><img src="assets/heroes/gen-08/gatot/gear-indestructible-city.webp" alt="Несокрушимый город"/><div><b>Несокрушимый город</b><span>На 5 уровне повышает защиту войск в обороне на 15%.</span></div></div></div></div></div></section>
<section class="jero-section" id="priority"><h2>Приоритет прокачки</h2><div class="jero-priority"><div><b><span class="jero-rank">1</span>Королевский легион</b><span>Сильное снижение атаки всей армии противника.</span></div><div><b><span class="jero-rank">2</span>Королевское дарование</b><span>Постоянные щиты делают пехоту заметно живучее.</span></div><div><b><span class="jero-rank">3</span>Королевская решимость</b><span>Ключевой навык для Арены и Освоения.</span></div></div></section>
<section class="jero-section" id="use"><h2>Где использовать</h2><div class="jero-mode-grid"><div class="jero-mode"><b>Гарнизон ★★★★★</b><p>Одна из лучших ролей Гатота. Щиты, защита пехоты и дебафф атаки работают именно на выживаемость.</p></div><div class="jero-mode"><b>PvP ★★★★★</b><p>Очень силён в затяжных боях и оборонительных маршах.</p></div><div class="jero-mode"><b>Арена ★★★★★</b><p>Крепкий фронтовик с мощным щитом, уклонением и снижением атаки врагов.</p></div><div class="jero-mode"><b>Медведь ★★☆☆☆</b><p>Защитный набор почти не увеличивает счёт. Гектор обычно полезнее для атакующего пехотного слота.</p></div></div></section>
<section class="jero-section" id="pros"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul><li>Колесо удачи, очень хороший F2P-доступ.</li><li>Сильный щит и высокая базовая живучесть.</li><li>До +30% защиты пехоты.</li><li>Щит пехоте после каждой атаки.</li><li>До −25% атаки всей вражеской армии.</li><li>Отличен в гарнизоне и на Арене.</li></ul></div><div class="jero-box bad"><h3>Минусы</h3><ul><li>Почти не усиливает урон на Свирепом медведе.</li><li>Первый навык Экспедиции при присоединении к сбору защитный.</li><li>Большая часть ценности раскрывается именно в оборонительных сценариях.</li><li>Поздние поколения постепенно вытесняют его с позиции основного танка.</li></ul></div></div><div class="jero-verdict" style="margin-top:12px"><h3>Стоит ли прокачивать?</h3><p><strong>Да, особенно F2P.</strong> Гатот — один из самых выгодных героев 8 поколения благодаря Колесу удачи. Для Медведя он не замена Гектору, но для гарнизона, Арены и оборонительного PvP это очень сильное обновление пехоты.</p></div></section>
<section class="jero-section"><h2>Источники</h2><div class="jero-sources"><a href="https://whiteout-survival.com/ru/heroes/gatot/" target="_blank" rel="noopener">Русская карточка Гатота</a><a href="https://wos.h5joy-games.com/heroes/s8/gatot/" target="_blank" rel="noopener">Свежая база характеристик и игровых изображений</a><a href="https://www.whiteoutsurvival-community.com/tools/wiki/heroes/gatot.html" target="_blank" rel="noopener">Актуальная база героев, обновление 2026</a></div></section>
<a class="jero-back" href="heroes.html">← Назад к героям</a><p class="jero-foot">Белая мгла · SOVA58 · данные проверены 23 октября 2026</p></div></div></main>'''
OUT.write_text(head+shell_top+main+shell_bottom,encoding='utf-8')
sm=ROOT/'sitemap.xml'; text=sm.read_text(encoding='utf-8')
url='  <url><loc>https://belaya-mgla-sova58.github.io/hero-gatot.html</loc><lastmod>2026-10-23</lastmod></url>'
if 'hero-gatot.html' not in text:
    text=text.replace('</urlset>',url+'\n</urlset>')
    sm.write_text(text,encoding='utf-8')
print('built',OUT,'assets',len(list(ASSET_DIR.iterdir())))