from pathlib import Path
import re, requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

ROOT=Path('.')
TEMPLATE=ROOT/'hero-bradley.html'
OUT=ROOT/'hero-edith.html'
ASSET_DIR=ROOT/'assets/heroes/gen-07/edith'
ASSET_DIR.mkdir(parents=True,exist_ok=True)
SRC='https://wos.h5joy-games.com/heroes/s7/edith/'

s=requests.Session(); s.headers.update({'User-Agent':'Mozilla/5.0 SOVA58-site-builder/1.0'})
html=s.get(SRC,timeout=30).text
soup=BeautifulSoup(html,'html.parser')
imgs=[]
for im in soup.find_all('img'):
    src=im.get('src') or im.get('data-src') or im.get('data-lazy-src')
    alt=(im.get('alt') or '').strip()
    if src:
        imgs.append((alt,urljoin(SRC,src)))

def pick(filename, terms):
    for alt,url in imgs:
        hay=(alt+' '+url).lower().replace('_',' ').replace('-',' ')
        if all(t.lower() in hay for t in terms):
            try:
                r=s.get(url,timeout=30); r.raise_for_status()
                if len(r.content)>900:
                    (ASSET_DIR/filename).write_bytes(r.content)
                    return url
            except Exception:
                pass
    raise RuntimeError(f'asset not found {filename}; terms={terms}; sample={imgs[:40]}')

pick('portrait.webp',['edith'])
pick('skill-ironclad-punch.webp',['ironclad','punch'])
pick('skill-escape-capsule.webp',['escape','capsule'])
pick('skill-preemptive-alerts.webp',['preemptive','alerts'])
pick('skill-strategic-balance.webp',['strategic','balance'])
pick('skill-ironclad.webp',['ironclad'])
pick('skill-steel-sentinel.webp',['steel','sentinel'])
pick('gear-charm-toolkit.webp',['charm','toolkit'])
pick('gear-pocket-engineer.webp',['pocket','engineer'])
pick('gear-fortworks.webp',['fortworks'])

src=TEMPLATE.read_text(encoding='utf-8')
head,rest=src.split('</head>',1); head+='</head>'
head=re.sub(r'<title>.*?</title>','<title>Эдит: навыки, Чудесный набор инструментов, плюсы и минусы | Белая мгла</title>',head,flags=re.S)
head=re.sub(r'<meta name="description" content=".*?"/>','<meta name="description" content="Подробный гайд по Эдит: герой 7 поколения, навыки Освоения и Экспедиции, Чудесный набор инструментов, PvP, гарнизон, Арена, Свирепый медведь, прокачка, плюсы и минусы."/>',head,flags=re.S)
head=re.sub(r'<link rel="canonical" href="[^"]+"/>','<link rel="canonical" href="https://belaya-mgla-sova58.github.io/hero-edith.html"/>',head)
head=re.sub(r'<meta property="og:title" content=".*?"/>','<meta property="og:title" content="Эдит: полный гайд"/>',head)
head=re.sub(r'<meta property="og:description" content=".*?"/>','<meta property="og:description" content="Навыки, Чудесный набор инструментов, PvP, гарнизон, Арена, Свирепый медведь, плюсы и минусы Эдит."/>',head)
head=re.sub(r'<meta property="og:url" content="[^"]+"/>','<meta property="og:url" content="https://belaya-mgla-sova58.github.io/hero-edith.html"/>',head)
head=re.sub(r'<meta property="og:image" content="[^"]+"/>','<meta property="og:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-07/edith/portrait.webp"/>',head)
head=re.sub(r'<meta name="twitter:image" content="[^"]+"/>','<meta name="twitter:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-07/edith/portrait.webp"/>',head)
head=re.sub(r'<script id="guide-article-schema-v625" type="application/ld\+json">.*?</script>','<script id="guide-article-schema-v625" type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Эдит: полный гайд","description":"Подробный гайд по Эдит: герой 7 поколения, навыки, Чудесный набор инструментов, PvP, гарнизон, Арена и прокачка.","url":"https://belaya-mgla-sova58.github.io/hero-edith.html","mainEntityOfPage":{"@type":"WebPage","@id":"https://belaya-mgla-sova58.github.io/hero-edith.html"},"author":{"@type":"Person","name":"SOVA58","url":"https://belaya-mgla-sova58.github.io/sova58.html","gender":"Female"},"isPartOf":{"@type":"WebSite","name":"Белая мгла · SOVA58","url":"https://belaya-mgla-sova58.github.io/"},"inLanguage":"ru","dateModified":"2026-10-23","image":["https://belaya-mgla-sova58.github.io/assets/heroes/gen-07/edith/portrait.webp"]}</script>',head,flags=re.S)
head=re.sub(r'<script type="application/ld\+json">\{"@context":"https://schema.org","@type":"BreadcrumbList".*?</script>','<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://belaya-mgla-sova58.github.io/"},{"@type":"ListItem","position":2,"name":"Герои","item":"https://belaya-mgla-sova58.github.io/heroes.html"},{"@type":"ListItem","position":3,"name":"Эдит","item":"https://belaya-mgla-sova58.github.io/hero-edith.html"}]}</script>',head,flags=re.S)

body_start=rest.index('<body')
main_start=rest.index('<main id="appMain">')
mobile_bottom=rest.index('<nav aria-label="Быстрая мобильная навигация"')
shell_top=rest[body_start:main_start]
shell_bottom=rest[mobile_bottom:]

main='''<main id="appMain"><div class="route-page active" data-route="heroes"><div class="jero-page">
<nav aria-label="Хлебные крошки" class="jero-crumbs"><a href="index.html">Главная</a> › <a href="heroes.html">Герои</a> › <span>Эдит</span></nav>
<section class="jero-hero"><div class="jero-portrait-wrap"><img class="jero-portrait" src="assets/heroes/gen-07/edith/portrait.webp" alt="Эдит"/></div><div><div class="jero-kicker"><span class="jero-chip">7 поколение</span><span class="jero-chip">Пехота</span><span class="jero-chip gold">Мифический</span><span class="jero-chip">Бой</span></div><h1>Эдит</h1><p class="jero-subtitle">Танк поддержки · гарнизон · защита всего марша</p><p class="jero-lead">Эдит и Мистер Жестянка — защитная связка 7 поколения. В Освоении она выдерживает сильный фокус благодаря снижению входящего урона, оглушению и аварийному эффекту при падении здоровья. В Экспедиции Эдит одновременно прикрывает стрелков, усиливает копейщиков, снижает урон по пехоте и повышает здоровье всех войск.</p><div class="jero-quick"><div><b>Получение</b><span>Зал вождей, Король ледяных полей, Сила государства, Ежедневные предложения, Сбор героев</span></div><div><b>Главная роль</b><span>гарнизон, оборона города, защитный PvP-марш</span></div><div><b>Для F2P</b><span>дорогая инвестиция без Колеса удачи; особенно интересна, если пропущен Ву Минг</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div></div></section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#exploration">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#priority">Прокачка</a><a href="#use">Применение</a><a href="#pros">Плюсы и минусы</a></nav>
<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные базовые значения Эдит 7 поколения.</p><div class="jero-stats"><div class="jero-stat"><strong>5 466</strong><span>Атака героя</span></div><div class="jero-stat"><strong>7 126</strong><span>Защита героя</span></div><div class="jero-stat"><strong>106 892</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>650.52%</strong><span>Атака пехоты</span></div><div class="jero-stat"><strong>650.52%</strong><span>Защита пехоты</span></div></div><div class="jero-note"><strong>Главная особенность:</strong> Эдит не просто защищает пехоту. Её Экспедиция распределяет бонусы по всему маршу: стрелки получают меньше урона, копейщики наносят больше урона, а здоровье повышается у всех войск.</div></section>
<section class="jero-section" id="exploration"><h2>Навыки Освоения</h2><p class="jero-section-lead">На Арене Эдит работает как тяжёлый фронтовик с контролем и несколькими слоями выживаемости.</p><div class="jero-skill-grid"><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/edith/skill-ironclad-punch.webp" alt="Стальной кулак"/><div><h3>Стальной кулак</h3></div></div><p>Мистер Жестянка бьёт всех врагов в веерообразной области, оглушает их на 1 секунду и на 2 секунды повышает собственную атаку.</p><p class="jero-values">Урон 100/110/120/130/140% · атака +20/40/60/80/100%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/edith/skill-escape-capsule.webp" alt="Спасательная капсула"/><div><h3>Спасательная капсула</h3></div></div><p>При падении здоровья до 0 Мистер Жестянка выбрасывает ядро и взрывает корпус, нанося урон ближайшим противникам.</p><p class="jero-values">200% / 220% / 240% / 260% / 280% атаки</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/edith/skill-preemptive-alerts.webp" alt="Раннее предупреждение"/><div><h3>Раннее предупреждение</h3></div></div><p>Даёт шанс уменьшить получаемый Мистером Жестянкой урон на 50%.</p><p class="jero-values">Шанс 10% / 20% / 30% / 40% / 50%</p></article></div></section>
<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><p class="jero-section-lead">Здесь раскрывается главная ценность Эдит в гарнизоне и защитном PvP.</p><div class="jero-skill-grid"><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/edith/skill-strategic-balance.webp" alt="Стратегическое равновесие"/><div><h3>Стратегическое равновесие</h3></div></div><p>Снижает получаемый стрелками урон и одновременно повышает наносимый копейщиками урон.</p><p class="jero-values">Стрелки −4/8/12/16/20% · копейщики +4/8/12/16/20%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/edith/skill-ironclad.webp" alt="Стальная броня"/><div><h3>Стальная броня</h3></div></div><p>Металлический корпус Мистера Жестянки снижает урон, получаемый пехотой.</p><p class="jero-values">−4% / −8% / −12% / −16% / −20%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/edith/skill-steel-sentinel.webp" alt="Стальной страж"/><div><h3>Стальной страж</h3></div></div><p>Передвижная оборонительная система повышает здоровье всех дружественных войск.</p><p class="jero-values">+5% / +10% / +15% / +20% / +25%</p></article></div></section>
<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="assets/heroes/gen-07/edith/gear-charm-toolkit.webp" alt="Чудесный набор инструментов"/><div><h3 class="jero-gear-title">Чудесный набор инструментов</h3><p class="jero-section-lead">На максимальном уровне даёт +1 107 атаки, +1 444 защиты и +21 667 здоровья героя, а также +160.50% смертоносности и +160.50% здоровья войск.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="assets/heroes/gen-07/edith/gear-pocket-engineer.webp" alt="Карманный инженер"/><div><b>Карманный инженер</b><span>При первом падении здоровья ниже 50% восстанавливает до 35% максимального здоровья и повышает защиту до +30% до конца боя.</span></div></div><div class="jero-gear-skill"><img src="assets/heroes/gen-07/edith/gear-fortworks.webp" alt="Укрепления"/><div><b>Укрепления</b><span>На 5 уровне повышает здоровье обороняющихся войск на 15%.</span></div></div></div></div></div></section>
<section class="jero-section" id="priority"><h2>Приоритет прокачки</h2><div class="jero-priority"><div><span class="jero-rank">1</span><b>Стальной страж</b><span>Самый универсальный навык: до +25% здоровья всему маршу.</span></div><div><span class="jero-rank">2</span><b>Стратегическое равновесие</b><span>Одновременно защищает стрелков и повышает урон копейщиков.</span></div><div><span class="jero-rank">3</span><b>Стальная броня</b><span>До −20% входящего урона пехоте, особенно ценно в обороне.</span></div></div><div class="jero-note"><strong>Для Арены:</strong> сначала усиливай «Стальной кулак» и «Раннее предупреждение». Эксклюзивное снаряжение заметно повышает живучесть после активации «Карманного инженера».</div></section>
<section class="jero-section" id="use"><h2>Где использовать</h2><div class="jero-mode-grid"><div class="jero-mode"><b>Гарнизон</b><p>Одна из главных ролей Эдит. Она снижает входящий урон сразу двум ключевым типам войск и добавляет всему маршу здоровье.</p></div><div class="jero-mode"><b>PvP</b><p>Очень сильна в затяжных боях, особенно когда важнее выживаемость марша, чем чистый взрывной урон.</p></div><div class="jero-mode"><b>Арена</b><p>Хороший фронтовик: оглушение по области, шанс вдвое сократить входящий урон и опасный взрыв при падении здоровья до нуля.</p></div><div class="jero-mode"><b>Свирепый медведь</b><p>Низкий приоритет. Большая часть её Экспедиции защитная, поэтому для набора урона есть заметно более подходящие лидеры и присоединяющиеся герои.</p></div></div></section>
<section class="jero-section" id="pros"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul><li>до −20% входящего урона стрелкам;</li><li>до −20% входящего урона пехоте;</li><li>до +20% урона копейщиков;</li><li>до +25% здоровья всем войскам;</li><li>сильный набор для гарнизона и Арены;</li><li>эксклюзивное снаряжение добавляет аварийное лечение и +15% здоровья обороняющихся войск.</li></ul></div><div class="jero-box bad"><h3>Минусы</h3><ul><li>не герой Колеса удачи, поэтому дорогая для F2P;</li><li>на Медведе её защитные навыки почти не помогают набивать урон;</li><li>часть силы в Освоении завязана на шанс срабатывания «Раннего предупреждения»;</li><li>лучше раскрывается в обороне, чем в чисто атакующей сборке.</li></ul></div></div></section>
<section class="jero-section"><div class="jero-verdict"><h3>Итог</h3><p><strong>Эдит — сильный защитный герой 7 поколения.</strong> Если нужен гарнизонный пехотный лидер или ты пропустила Ву Минга, она представляет большой интерес. Для F2P её главный минус — стоимость получения и развития без Колеса удачи. Для Свирепого медведя приоритет низкий, а вот в оборонительном PvP и на Арене её набор работает гораздо убедительнее.</p></div><div class="jero-sources"><a href="https://whiteout-survival.com/ru/heroes/edith/" target="_blank" rel="noopener">Источник: профиль Эдит</a><a href="https://whiteoutlab.ru/wiki/heroes/edith" target="_blank" rel="noopener">WOS Lab: русские названия и значения навыков</a><a href="https://wos.h5joy-games.com/heroes/s7/edith/" target="_blank" rel="noopener">H5Joy: характеристики, навыки и снаряжение</a><a href="https://wosguru.com/hero/edith" target="_blank" rel="noopener">WoS Guru: применение и оценка героя</a></div><a class="jero-back" href="heroes.html">← Вернуться к героям</a></section>
<div class="jero-foot">Белая мгла · SOVA58 · данные проверены по актуальным источникам</div></div></div></main>'''

out=head+shell_top+main+shell_bottom
out=out.replace('<body class="is-heroes-page', '<body class="is-heroes-page')
OUT.write_text(out,encoding='utf-8')

sm=ROOT/'sitemap.xml'
text=sm.read_text(encoding='utf-8')
entry='  <url><loc>https://belaya-mgla-sova58.github.io/hero-edith.html</loc><lastmod>2026-10-23</lastmod></url>\n'
if 'hero-edith.html' not in text:
    text=text.replace('</urlset>',entry+'</urlset>')
    sm.write_text(text,encoding='utf-8')
print('built', OUT, 'assets', len(list(ASSET_DIR.iterdir())))
