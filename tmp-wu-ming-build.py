from pathlib import Path
import re, requests
from bs4 import BeautifulSoup

ROOT=Path('.')
TEMPLATE=ROOT/'hero-wayne.html'
OUT=ROOT/'hero-wu-ming.html'
ASSET_DIR=ROOT/'assets/heroes/gen-06/wu-ming'
ASSET_DIR.mkdir(parents=True,exist_ok=True)
SRC='https://whiteout-survival.com/ru/heroes/wu-ming/'

s=requests.Session(); s.headers.update({'User-Agent':'Mozilla/5.0 SOVA58-site-builder/1.0'})
html=s.get(SRC,timeout=30).text
soup=BeautifulSoup(html,'html.parser')
imgs=[]
for im in soup.find_all('img'):
    src=im.get('src') or im.get('data-src') or im.get('data-lazy-src')
    alt=(im.get('alt') or '').strip()
    if src:
        if src.startswith('//'): src='https:'+src
        elif src.startswith('/'): src='https://whiteout-survival.com'+src
        imgs.append((alt,src))

def pick(filename, terms, fallbacks=()):
    candidates=[]
    for alt,url in imgs:
        hay=(alt+' '+url).lower().replace('_',' ').replace('-',' ')
        if all(t.lower() in hay for t in terms): candidates.append(url)
    candidates += list(fallbacks)
    for url in candidates:
        try:
            r=s.get(url,timeout=30); r.raise_for_status()
            if len(r.content)>900:
                (ASSET_DIR/filename).write_bytes(r.content); return url
        except Exception: pass
    raise RuntimeError(f'asset not found {filename}; terms={terms}; sample={imgs[:30]}')

base='https://wos.h5joy-games.com/games/'
pick('portrait.webp',['wu','ming'],[base+'icon_hero_avatar_wu_ming.webp',base+'icon_hero_avatar_wuming.webp'])
pick('skill-cyclone-barrier.webp',['barrier'],[base+'icon_hero_skill_cyclone_barrier.webp'])
pick('skill-inner-clarity.webp',['clarity'],[base+'icon_hero_skill_inner_clarity.webp'])
pick('skill-remote-impact.webp',['remote'],[base+'icon_hero_skill_remote_impact.webp'])
pick('skill-shadows-evasion.webp',['evasion'],[base+'icon_hero_skill_shadows_evasion.webp',base+'icon_hero_skill_shadow_evasion.webp'])
pick('skill-crescent-uplift.webp',['crescent'],[base+'icon_hero_skill_crescent_uplift.webp'])
pick('skill-elemental-resonance.webp',['resonance'],[base+'icon_hero_skill_elemental_resonance.webp'])
pick('gear-dragonslayer.webp',['dragon'],[base+'icon_hero_special_dragonslayer.webp',base+'icon_hero_special_dragonslayer.webp'])
pick('gear-martial-zenith.webp',['zenith'],[base+'icon_hero_special_skill_martial_zenith.webp'])
pick('gear-steel-discipline.webp',['steel'],[base+'icon_hero_special_skill_steel_discipline.webp'])

src=TEMPLATE.read_text(encoding='utf-8')
head,rest=src.split('</head>',1); head+='</head>'
head=re.sub(r'<title>.*?</title>','<title>Ву Минг: навыки, Убийца драконов, плюсы и минусы | Белая мгла</title>',head,flags=re.S)
head=re.sub(r'<meta name="description" content=".*?"/>','<meta name="description" content="Подробный гайд по Ву Мингу: герой 6 поколения, навыки Освоения и Экспедиции, Убийца драконов, PvP, гарнизон, Арена, Свирепый медведь, прокачка, плюсы и минусы."/>',head,flags=re.S)
head=re.sub(r'<link rel="canonical" href="[^"]+"/>','<link rel="canonical" href="https://belaya-mgla-sova58.github.io/hero-wu-ming.html"/>',head)
head=head.replace('Уэйн: полный гайд','Ву Минг: полный гайд').replace('hero-wayne.html','hero-wu-ming.html').replace('assets/heroes/gen-06/wayne/portrait.webp','assets/heroes/gen-06/wu-ming/portrait.webp')
head=re.sub(r'<meta property="og:description" content=".*?"/>','<meta property="og:description" content="Навыки, Убийца драконов, PvP, гарнизон, Арена, Свирепый медведь, плюсы и минусы Ву Минга."/>',head)
head=re.sub(r'<script id="guide-article-schema-v625" type="application/ld\+json">.*?</script>','<script id="guide-article-schema-v625" type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Ву Минг: полный гайд","description":"Подробный гайд по Ву Мингу: герой 6 поколения, навыки, Убийца драконов, PvP, гарнизон, Арена и прокачка.","url":"https://belaya-mgla-sova58.github.io/hero-wu-ming.html","mainEntityOfPage":{"@type":"WebPage","@id":"https://belaya-mgla-sova58.github.io/hero-wu-ming.html"},"author":{"@type":"Person","name":"SOVA58","url":"https://belaya-mgla-sova58.github.io/sova58.html","gender":"Female"},"isPartOf":{"@type":"WebSite","name":"Белая мгла · SOVA58","url":"https://belaya-mgla-sova58.github.io/"},"inLanguage":"ru","dateModified":"2026-10-23","image":["https://belaya-mgla-sova58.github.io/assets/heroes/gen-06/wu-ming/portrait.webp"]}</script>',head,flags=re.S)
head=re.sub(r'<script type="application/ld\+json">\{"@context":"https://schema.org","@type":"BreadcrumbList".*?</script>','<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://belaya-mgla-sova58.github.io/"},{"@type":"ListItem","position":2,"name":"Герои","item":"https://belaya-mgla-sova58.github.io/heroes.html"},{"@type":"ListItem","position":3,"name":"Ву Минг","item":"https://belaya-mgla-sova58.github.io/hero-wu-ming.html"}]}</script>',head,flags=re.S)
body_start=rest.index('<body'); main_start=rest.index('<main id="appMain">'); mobile_bottom=rest.index('<nav aria-label="Быстрая мобильная навигация"')
shell_top=rest[body_start:main_start]; shell_bottom=rest[mobile_bottom:]
main='''<main id="appMain"><div class="route-page active" data-route="heroes"><div class="jero-page">
<nav aria-label="Хлебные крошки" class="jero-crumbs"><a href="index.html">Главная</a> › <a href="heroes.html">Герои</a> › <span>Ву Минг</span></nav>
<section class="jero-hero"><div class="jero-portrait-wrap"><img class="jero-portrait" src="assets/heroes/gen-06/wu-ming/portrait.webp" alt="Ву Минг"/></div><div><div class="jero-kicker"><span class="jero-chip">6 поколение</span><span class="jero-chip">Пехота</span><span class="jero-chip gold">Мифический</span><span class="jero-chip">Бой</span></div><h1>Ву Минг</h1><p class="jero-subtitle">Танк · снижение входящего урона · гарнизон</p><p class="jero-lead">Ву Минг — защитный герой пехоты 6 поколения. Он переживает первый взрывной урон благодаря неуязвимости, сильно режет входящий урон своей пехоты и одновременно усиливает общий и навыковый урон марша. Особенно хорош в гарнизоне, PvP и на Арене.</p><div class="jero-quick"><div><b>Получение</b><span>Зал героев и другие источники осколков 6 поколения</span></div><div><b>Главная роль</b><span>гарнизон, PvP, атакующий или защитный сбор</span></div><div><b>Для F2P</b><span>низкий приоритет: нет Колеса удачи, обычно выгоднее сначала Рене</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div></div></section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#exploration">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#priority">Прокачка</a><a href="#use">Применение</a><a href="#pros">Плюсы и минусы</a></nav>
<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные значения героя 6 поколения.</p><div class="jero-stats"><div class="jero-stat"><strong>4 546</strong><span>Атака героя</span></div><div class="jero-stat"><strong>5 926</strong><span>Защита героя</span></div><div class="jero-stat"><strong>88 910</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>540.43%</strong><span>Атака пехоты</span></div><div class="jero-stat"><strong>540.43%</strong><span>Защита пехоты</span></div></div><div class="jero-note"><strong>Главная особенность:</strong> «Барьер циклона» даёт 2 секунды полной неуязвимости, а «Уклонение Тени» на максимуме снижает входящий урон от обычных атак на 25% и от навыков на 30%.</div></section>
<section class="jero-section" id="exploration"><h2>Навыки Освоения</h2><p class="jero-section-lead">Набор для Арены и Освоения делает Ву Минга очень живучим фронтлайнером.</p><div class="jero-skill-grid"><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-06/wu-ming/skill-cyclone-barrier.webp" alt="Барьер циклона"/><div><h3>Барьер циклона</h3></div></div><p>Вращает посох, наносит урон по области и получает неуязвимость на 2 секунды.</p><p class="jero-values">100% / 110% / 120% / 130% / 140% атаки</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-06/wu-ming/skill-inner-clarity.webp" alt="Внутренняя ясность"/><div><h3>Внутренняя ясность</h3></div></div><p>На 4 секунды повышает собственные атаку и защиту.</p><p class="jero-values">Атака +8/12/16/20/24% · защита +16/24/32/40/48%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-06/wu-ming/skill-remote-impact.webp" alt="Удалённое воздействие"/><div><h3>Удалённое воздействие</h3></div></div><p>Каждая обычная атака дополнительно наносит урон случайному противнику.</p><p class="jero-values">20% / 22% / 24% / 26% / 28% атаки</p></article></div></section>
<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><p class="jero-section-lead">Главная ценность Ву Минга в больших боях — сочетание защиты и усиления урона.</p><div class="jero-skill-grid"><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-06/wu-ming/skill-shadows-evasion.webp" alt="Уклонение Тени"/><div><h3>Уклонение Тени</h3></div></div><p>Снижает урон, получаемый его пехотой от обычных атак и навыков.</p><p class="jero-values">Обычные атаки −5/10/15/20/25% · навыки −6/12/18/24/30%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-06/wu-ming/skill-crescent-uplift.webp" alt="Поднятие полумесяца"/><div><h3>Поднятие полумесяца</h3></div></div><p>Повышает весь урон, наносимый дружественными войсками.</p><p class="jero-values">+4% / +8% / +12% / +16% / +20%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-06/wu-ming/skill-elemental-resonance.webp" alt="Элементарный резонанс"/><div><h3>Элементарный резонанс</h3></div></div><p>Повышает урон, наносимый навыками всех войск.</p><p class="jero-values">+5% / +10% / +15% / +20% / +25%</p></article></div></section>
<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="assets/heroes/gen-06/wu-ming/gear-dragonslayer.webp" alt="Убийца драконов"/><div><h3 class="jero-gear-title">Убийца драконов</h3><p class="jero-section-lead">Максимальные характеристики: +921 атаки героя · +1 201 защиты · +18 022 здоровья · +133.5% смертоносности · +133.5% здоровья войск.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="assets/heroes/gen-06/wu-ming/gear-martial-zenith.webp" alt="Военный зенит"/><div><b>Военный зенит</b><span>На 5 уровне повышает наносимый Ву Мингом урон на 30%.</span></div></div><div class="jero-gear-skill"><img src="assets/heroes/gen-06/wu-ming/gear-steel-discipline.webp" alt="Стальная дисциплина"/><div><b>Стальная дисциплина</b><span>На 5 уровне повышает защиту обороняющихся войск на 15%.</span></div></div></div></div></div></section>
<section class="jero-section" id="priority"><h2>Приоритет прокачки</h2><div class="jero-two"><div class="jero-box"><h3>Арена / Освоение</h3><div class="jero-priority"><div><b><span class="jero-rank">1</span>Барьер циклона</b><span>AoE и 2 секунды неуязвимости</span></div><div><b><span class="jero-rank">2</span>Внутренняя ясность</b><span>Сильный краткий буст атаки и защиты</span></div><div><b><span class="jero-rank">3</span>Удалённое воздействие</b><span>Стабильный дополнительный урон</span></div></div></div><div class="jero-box"><h3>Экспедиция / PvP</h3><div class="jero-priority"><div><b><span class="jero-rank">1</span>Уклонение Тени</b><span>Ключевая выживаемость пехоты</span></div><div><b><span class="jero-rank">2</span>Поднятие полумесяца</b><span>До +20% общего урона войск</span></div><div><b><span class="jero-rank">3</span>Элементарный резонанс</b><span>До +25% урона навыков</span></div></div></div></div></section>
<section class="jero-section" id="use"><h2>Где применять</h2><div class="jero-mode-grid"><div class="jero-mode"><b>Гарнизон</b><p>Один из лучших сценариев: высокая живучесть, снижение входящего урона и +15% защиты обороняющихся войск от снаряжения.</p></div><div class="jero-mode"><b>PvP</b><p>Сильный фронтлайнер для сборов и маршей. Хорошо переживает навыковый burst и одновременно усиливает урон всей армии.</p></div><div class="jero-mode"><b>Арена</b><p>Две секунды неуязвимости позволяют пережить стартовый взрыв урона, а высокий показатель здоровья делает его надёжным танком.</p></div><div class="jero-mode"><b>Свирепый медведь</b><p>Не приоритет. Для Медведя Ву Минг не даёт преимущества, достаточного для замены Гектора; его сильные стороны больше про защиту и PvP.</p></div></div></section>
<section class="jero-section" id="pros"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul><li>2 секунды полной неуязвимости в Освоении</li><li>до −25% урона от обычных атак и −30% от навыков</li><li>до +20% общего урона дружественных войск</li><li>до +25% урона навыков всех войск</li><li>сильный гарнизонный бонус от особого снаряжения</li></ul></div><div class="jero-box bad"><h3>Минусы</h3><ul><li>дорогой герой без Колеса удачи</li><li>для F2P уступает по ценности более доступным героям поколения</li><li>не является приоритетной заменой Гектора на Медведе</li><li>часть его силы раскрывается только при серьёзной прокачке звёзд и снаряжения</li></ul></div></div><div class="jero-verdict"><h3>Итог</h3><p>Ву Минг — один из самых крепких танков 6 поколения. Для активно вкладывающихся игроков это сильная инвестиция в гарнизон, PvP и Арену: он одновременно режет входящий урон и усиливает наступление всего марша. Для F2P разумнее не распылять ресурсы и сначала закрывать более доступные цели поколения.</p></div></section>
<section class="jero-section"><h2>Источники</h2><div class="jero-sources"><a href="https://whiteout-survival.com/ru/heroes/wu-ming/" target="_blank" rel="noopener">Карточка героя</a><a href="https://whiteoutlab.ru/wiki/heroes/wu-ming" target="_blank" rel="noopener">WOS Lab · русская база героя</a><a href="https://wosguru.com/hero/wu-ming" target="_blank" rel="noopener">WOS Guru · применение и составы</a><a href="https://whiteoutdata.com/heroes/generation-6-heroes/" target="_blank" rel="noopener">Whiteout Data · навыки 6 поколения</a></div></section>
<a class="jero-back" href="heroes.html">← Все герои</a><div class="jero-foot">Белая мгла · SOVA58 · обновлено 23.10.2026</div></div></div></main>'''
OUT.write_text(head+shell_top+main+shell_bottom,encoding='utf-8')

sm=ROOT/'sitemap.xml'
text=sm.read_text(encoding='utf-8')
entry='  <url><loc>https://belaya-mgla-sova58.github.io/hero-wu-ming.html</loc><lastmod>2026-10-23</lastmod></url>\n'
if 'hero-wu-ming.html' not in text:
    text=text.replace('</urlset>',entry+'</urlset>')
    sm.write_text(text,encoding='utf-8')
print('built',OUT)
