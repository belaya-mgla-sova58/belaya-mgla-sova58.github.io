from pathlib import Path
import re, requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

ROOT=Path('.')
TEMPLATE=ROOT/'hero-edith.html'
OUT=ROOT/'hero-gordon.html'
ASSET_DIR=ROOT/'assets/heroes/gen-07/gordon'
ASSET_DIR.mkdir(parents=True,exist_ok=True)
SRC='https://wos.h5joy-games.com/heroes/s7/gordon/'

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
            try:
                r=s.get(url,timeout=30); r.raise_for_status()
                if len(r.content)>900:
                    (ASSET_DIR/filename).write_bytes(r.content); return url
            except Exception: pass
    raise RuntimeError(f'asset not found {filename}; terms={terms}; sample={imgs[:50]}')

pick('portrait.webp',['gordon'])
pick('skill-poison-blast.webp',['poison','blast'])
pick('skill-toxic-molotov.webp',['toxic','molotov'])
pick('skill-tolerization.webp',['tolerization'])
pick('skill-venom-infusion.webp',['venom','infusion'])
pick('skill-chemical-terror.webp',['chemical','terror'])
pick('skill-toxic-release.webp',['toxic','release'])
pick('gear-bonecrux-venom.webp',['bonecrux','venom'])
pick('gear-potion-1325.webp',['potion','1325'])
pick('gear-bio-assault.webp',['bio','assault'])

src=TEMPLATE.read_text(encoding='utf-8')
head,rest=src.split('</head>',1); head+='</head>'
head=re.sub(r'<title>.*?</title>','<title>Гордон: навыки, Яд костного скелета, плюсы и минусы | Белая мгла</title>',head,flags=re.S)
head=re.sub(r'<meta name="description" content=".*?"/>','<meta name="description" content="Подробный гайд по Гордону: герой 7 поколения, навыки Освоения и Экспедиции, Яд костного скелета, PvP, сборы, Арена, Свирепый медведь, прокачка, плюсы и минусы."/>',head,flags=re.S)
head=re.sub(r'<link rel="canonical" href="[^"]+"/>','<link rel="canonical" href="https://belaya-mgla-sova58.github.io/hero-gordon.html"/>',head)
head=re.sub(r'<meta property="og:title" content=".*?"/>','<meta property="og:title" content="Гордон: полный гайд"/>',head)
head=re.sub(r'<meta property="og:description" content=".*?"/>','<meta property="og:description" content="Навыки, Яд костного скелета, PvP, сборы, Арена, Свирепый медведь, плюсы и минусы Гордона."/>',head)
head=re.sub(r'<meta property="og:url" content="[^"]+"/>','<meta property="og:url" content="https://belaya-mgla-sova58.github.io/hero-gordon.html"/>',head)
head=re.sub(r'<meta property="og:image" content="[^"]+"/>','<meta property="og:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-07/gordon/portrait.webp"/>',head)
head=re.sub(r'<meta name="twitter:image" content="[^"]+"/>','<meta name="twitter:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-07/gordon/portrait.webp"/>',head)
head=re.sub(r'<script id="guide-article-schema-v625" type="application/ld\+json">.*?</script>','<script id="guide-article-schema-v625" type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Гордон: полный гайд","description":"Подробный гайд по Гордону: герой 7 поколения, навыки, Яд костного скелета, PvP, сборы, Арена и прокачка.","url":"https://belaya-mgla-sova58.github.io/hero-gordon.html","mainEntityOfPage":{"@type":"WebPage","@id":"https://belaya-mgla-sova58.github.io/hero-gordon.html"},"author":{"@type":"Person","name":"SOVA58","url":"https://belaya-mgla-sova58.github.io/sova58.html","gender":"Female"},"isPartOf":{"@type":"WebSite","name":"Белая мгла · SOVA58","url":"https://belaya-mgla-sova58.github.io/"},"inLanguage":"ru","dateModified":"2026-10-23","image":["https://belaya-mgla-sova58.github.io/assets/heroes/gen-07/gordon/portrait.webp"]}</script>',head,flags=re.S)
head=re.sub(r'<script type="application/ld\+json">\{"@context":"https://schema.org","@type":"BreadcrumbList".*?</script>','<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://belaya-mgla-sova58.github.io/"},{"@type":"ListItem","position":2,"name":"Герои","item":"https://belaya-mgla-sova58.github.io/heroes.html"},{"@type":"ListItem","position":3,"name":"Гордон","item":"https://belaya-mgla-sova58.github.io/hero-gordon.html"}]}</script>',head,flags=re.S)

body_start=rest.index('<body')
main_start=rest.index('<main id="appMain">')
mobile_bottom=rest.index('<nav aria-label="Быстрая мобильная навигация"')
shell_top=rest[body_start:main_start]
shell_bottom=rest[mobile_bottom:]

main='''<main id="appMain"><div class="route-page active" data-route="heroes"><div class="jero-page">
<nav aria-label="Хлебные крошки" class="jero-crumbs"><a href="index.html">Главная</a> › <a href="heroes.html">Герои</a> › <span>Гордон</span></nav>
<section class="jero-hero"><div class="jero-portrait-wrap"><img class="jero-portrait" src="assets/heroes/gen-07/gordon/portrait.webp" alt="Гордон"/></div><div><div class="jero-kicker"><span class="jero-chip">7 поколение</span><span class="jero-chip">Копейщики</span><span class="jero-chip gold">Мифический</span><span class="jero-chip">Бой</span></div><h1>Гордон</h1><p class="jero-subtitle">Яд · дебаффы · атакующие сборы</p><p class="jero-lead">Гордон — агрессивный копейщик 7 поколения, построенный вокруг яда и циклических дебаффов. В Освоении он наносит длительный урон и повышает получаемый целью урон. В Экспедиции усиливает копейщиков, ослабляет урон противника и особенно хорошо раскрывается в атакующих сборах.</p><div class="jero-quick"><div><b>Получение</b><span>Зал героев и источники осколков 7 поколения</span></div><div><b>Главная роль</b><span>атакующие сборы, PvP, копейный марш</span></div><div><b>Для F2P</b><span>низкий приоритет среди троицы 7 поколения; обычно после Брэдли и Эдит</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div></div></section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#exploration">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#priority">Прокачка</a><a href="#use">Применение</a><a href="#pros">Плюсы и минусы</a></nav>
<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные базовые значения Гордона 7 поколения.</p><div class="jero-stats"><div class="jero-stat"><strong>7 126</strong><span>Атака героя</span></div><div class="jero-stat"><strong>7 126</strong><span>Защита героя</span></div><div class="jero-stat"><strong>71 262</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>650.52%</strong><span>Атака копейщиков</span></div><div class="jero-stat"><strong>650.52%</strong><span>Защита копейщиков</span></div></div><div class="jero-note"><strong>Главная особенность:</strong> Гордон не даёт постоянный простой бонус. Его Экспедиция работает циклами: каждая 2-я атака копейщиков, каждый 3-й и каждый 4-й ход запускают отдельные эффекты.</div></section>
<section class="jero-section" id="exploration"><h2>Навыки Освоения</h2><p class="jero-section-lead">На Арене Гордон давит постепенным уроном и усиливает фокус по отмеченной цели.</p><div class="jero-skill-grid"><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/gordon/skill-poison-blast.webp" alt="Ядовитый взрыв"/><div><h3>Ядовитый взрыв</h3></div></div><p>Бросает сосуд, который превращается в токсичный туман и наносит урон ближайшим врагам каждые 0,5 секунды в течение 3 секунд.</p><p class="jero-values">50% / 55% / 60% / 65% / 70% атаки за тик</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/gordon/skill-toxic-molotov.webp" alt="Токсичный Молотов"/><div><h3>Токсичный Молотов</h3></div></div><p>Отравляет цель периодическим уроном и на 2 секунды увеличивает весь получаемый ею урон.</p><p class="jero-values">25/27.5/30/32.5/35% за тик · получаемый урон +5/10/15/20/25%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/gordon/skill-tolerization.webp" alt="Толеризация"/><div><h3>Толеризация</h3></div></div><p>Организм Гордона адаптирован к токсинам, что постоянно повышает его защиту.</p><p class="jero-values">Защита +25% / +37.5% / +50% / +62.5% / +75%</p></article></div></section>
<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><p class="jero-section-lead">Основная ценность Гордона. Здесь он усиливает копейщиков и одновременно режет эффективность противника.</p><div class="jero-skill-grid"><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/gordon/skill-venom-infusion.webp" alt="Инфузия яда"/><div><h3>Инфузия яда</h3></div></div><p>Каждые две атаки копейщики наносят дополнительный урон и отравляют цель на 1 ход. Отравленная цель наносит меньше урона.</p><p class="jero-values">Доп. урон +20/40/60/80/100% · урон цели −4/8/12/16/20%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/gordon/skill-chemical-terror.webp" alt="Химический террор"/><div><h3>Химический террор</h3></div></div><p>Каждые 3 хода на 1 ход резко повышает урон копейщиков и снижает урон всех войск противника.</p><p class="jero-values">Урон копейщиков +30/60/90/120/150% · урон врага −6/12/18/24/30%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/gordon/skill-toxic-release.webp" alt="Выброс токсичных веществ"/><div><h3>Выброс токсичных веществ</h3></div></div><p>Каждые 4 хода на 2 хода повышает получаемый вражеской пехотой урон и снижает урон вражеских стрелков.</p><p class="jero-values">Пехота получает +6/12/18/24/30% · урон стрелков −6/12/18/24/30%</p></article></div><div class="jero-note"><strong>Важно:</strong> эффекты не следует складывать в один «постоянный» бонус. Они срабатывают по разным условиям и ходам, поэтому реальная сила Гордона особенно заметна в длинных боях и сборах.</div></section>
<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="assets/heroes/gen-07/gordon/gear-bonecrux-venom.webp" alt="Яд костного скелета"/><div><h3 class="jero-gear-title">Яд костного скелета</h3><p class="jero-section-lead">На максимальном уровне: +1 444 атаки, +1 444 защиты, +14 445 здоровья, +160.50% летальности и +160.50% здоровья копейщиков.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="assets/heroes/gen-07/gordon/gear-potion-1325.webp" alt="Зелье №1325"/><div><b>Зелье №1325</b><span>На 5 уровне повышает наносимый Гордоном урон на 25% и снижает атаку отравленной цели на 15%.</span></div></div><div class="jero-gear-skill"><img src="assets/heroes/gen-07/gordon/gear-bio-assault.webp" alt="Био-атака"/><div><b>Био-атака</b><span>На 5 уровне повышает летальность войск атакующего сбора на 15%.</span></div></div></div></div></div></section>
<section class="jero-section" id="priority"><h2>Приоритет прокачки</h2><div class="jero-priority"><div><b><span class="jero-rank">1</span>Инфузия яда</b><span>Основной стабильный источник силы копейщиков в Экспедиции.</span></div><div><b><span class="jero-rank">2</span>Химический террор</b><span>Сильный периодический всплеск урона и мощный дебафф всей армии противника.</span></div><div><b><span class="jero-rank">3</span>Токсичный Молотов</b><span>Полезен в Освоении благодаря увеличению получаемого целью урона.</span></div></div></section>
<section class="jero-section" id="use"><h2>Где использовать</h2><div class="jero-mode-grid"><div class="jero-mode"><b>Атакующий сбор</b><p>Лучшее применение. Эксклюзивное снаряжение даёт до +15% летальности войскам сбора.</p></div><div class="jero-mode"><b>PvP</b><p>Силен в длинных боях, где успевают повторяться циклические эффекты Экспедиции.</p></div><div class="jero-mode"><b>Свирепый медведь</b><p>Полезен как лидер сильного копейного марша, но как обычный присоединяющийся герой уступает героям со стабильным первым бонусом.</p></div><div class="jero-mode"><b>Арена</b><p>Даёт длительный урон и повышает получаемый целью урон, но не является главным аргументом для дорогой прокачки.</p></div></div></section>
<section class="jero-section" id="pros"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul><li>До +100% дополнительного урона каждой второй атаки копейщиков.</li><li>До +150% урона копейщиков каждые 3 хода.</li><li>Снижает урон всей армии противника до 30% на ключевых ходах.</li><li>Ослабляет стрелков и делает вражескую пехоту уязвимее.</li><li>Эксклюзивное снаряжение даёт +15% летальности сбору.</li></ul></div><div class="jero-box bad"><h3>Минусы</h3><ul><li>Зал героев, без дешёвого пути через Колесо удачи.</li><li>Большая часть силы привязана к циклам и условиям.</li><li>Для F2P обычно третий приоритет среди героев 7 поколения.</li><li>Требует хорошей прокачки, чтобы полностью раскрыть роль лидера сбора.</li></ul></div></div></section>
<section class="jero-section"><div class="jero-verdict"><h3>Стоит ли прокачивать?</h3><p><strong>Да, если вы ведёте атакующие сборы и строите сильный копейный марш 7 поколения.</strong> Гордон хорошо сочетается с Эдит и Брэдли, но для большинства F2P он не должен быть первым вложением универсальных мифических осколков. Сначала обычно выгоднее закрыть более универсальные цели поколения.</p></div><div class="jero-sources"><a href="https://whiteout-survival.com/ru/heroes/gordon/" target="_blank" rel="noopener">Источник с русскими названиями и значениями</a><a href="https://www.whiteoutsurvival-community.com/tools/wiki/heroes/gordon.html" target="_blank" rel="noopener">WSCO: актуальный гайд 2026</a><a href="https://whiteoutdata.com/heroes/generation-7-heroes/" target="_blank" rel="noopener">Whiteout Data: механика навыков и снаряжения</a></div></section>
<a class="jero-back" href="heroes.html">← Назад к героям</a><p class="jero-foot">Белая мгла · SOVA58 · данные перепроверены 23.10.2026</p>
</div></div></main>'''

OUT.write_text(head+rest[:body_start]+shell_top+main+shell_bottom,encoding='utf-8')
sm=ROOT/'sitemap.xml'; text=sm.read_text(encoding='utf-8'); url='https://belaya-mgla-sova58.github.io/hero-gordon.html'
if url not in text:
    text=text.replace('</urlset>',f'  <url><loc>{url}</loc><lastmod>2026-10-23</lastmod></url>\n</urlset>')
    sm.write_text(text,encoding='utf-8')
print('built',OUT,'assets',len(list(ASSET_DIR.iterdir())))
