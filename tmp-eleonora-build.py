from pathlib import Path
import re, requests, io
from bs4 import BeautifulSoup
from PIL import Image
from urllib.parse import urljoin

src=Path('hero-gregory.html').read_text(encoding='utf-8')
# head/meta
src=re.sub(r'<title>.*?</title>','<title>Элеонора: навыки, Скипетр Соляриса, плюсы и минусы | Белая мгла</title>',src,1,flags=re.S)
src=re.sub(r'<meta name="description" content="[^"]*"/>','<meta name="description" content="Подробный гайд по Элеоноре: герой 11 поколения, навыки Освоения и Экспедиции, Скипетр Соляриса, PvP, Арена, гарнизон, прокачка, плюсы и минусы."/>',src,1)
src=re.sub(r'<link rel="canonical" href="[^"]*"/>','<link rel="canonical" href="https://belaya-mgla-sova58.github.io/hero-eleonora.html"/>',src,1)
src=re.sub(r'<meta property="og:title" content="[^"]*"/>','<meta property="og:title" content="Элеонора: полный гайд"/>',src,1)
src=re.sub(r'<meta property="og:description" content="[^"]*"/>','<meta property="og:description" content="Навыки, Скипетр Соляриса, PvP, Арена, гарнизон, плюсы и минусы Элеоноры."/>',src,1)
src=re.sub(r'<meta property="og:url" content="[^"]*"/>','<meta property="og:url" content="https://belaya-mgla-sova58.github.io/hero-eleonora.html"/>',src,1)
src=re.sub(r'<meta property="og:image" content="[^"]*"/>','<meta property="og:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-11/eleonora/portrait.webp"/>',src,1)
src=re.sub(r'<meta name="twitter:image" content="[^"]*"/>','<meta name="twitter:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-11/eleonora/portrait.webp"/>',src,1)
src=re.sub(r'<script id="guide-article-schema-v625" type="application/ld\+json">.*?</script>','<script id="guide-article-schema-v625" type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Элеонора: полный гайд","description":"Подробный гайд по Элеоноре: герой 11 поколения, навыки, Скипетр Соляриса, PvP, Арена и прокачка.","url":"https://belaya-mgla-sova58.github.io/hero-eleonora.html","mainEntityOfPage":{"@type":"WebPage","@id":"https://belaya-mgla-sova58.github.io/hero-eleonora.html"},"author":{"@type":"Person","name":"SOVA58","url":"https://belaya-mgla-sova58.github.io/sova58.html","gender":"Female"},"isPartOf":{"@type":"WebSite","name":"Белая мгла · SOVA58","url":"https://belaya-mgla-sova58.github.io/"},"inLanguage":"ru","dateModified":"2026-10-23","image":["https://belaya-mgla-sova58.github.io/assets/heroes/gen-11/eleonora/portrait.webp"]}</script>',src,1,flags=re.S)
src=re.sub(r'<script type="application/ld\+json">\{"@context":"https://schema.org","@type":"BreadcrumbList".*?</script>','<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://belaya-mgla-sova58.github.io/"},{"@type":"ListItem","position":2,"name":"Герои","item":"https://belaya-mgla-sova58.github.io/heroes.html"},{"@type":"ListItem","position":3,"name":"Элеонора","item":"https://belaya-mgla-sova58.github.io/hero-eleonora.html"}]}</script>',src,1,flags=re.S)

body='''<div class="jero-crumbs"><a href="index.html">Главная</a> · <a href="heroes.html">Герои</a> · Элеонора</div>
<section class="jero-hero">
  <div class="jero-portrait-wrap"><img class="jero-portrait" src="assets/heroes/gen-11/eleonora/portrait.webp" alt="Элеонора"></div>
  <div>
    <div class="jero-kicker"><span class="jero-chip gold">11 поколение</span><span class="jero-chip">Пехота</span><span class="jero-chip">Мифический</span><span class="jero-chip">Бой</span></div>
    <h1>Элеонора</h1>
    <p class="jero-subtitle">Фронтовик · щиты · усиление живучести всего марша</p>
    <p class="jero-lead">Элеонора — пехотный герой 11 поколения и главный F2P-приоритет поколения благодаря Колесу удачи. Она создаёт мощный щит, отражает часть входящего урона, снижает защиту цели и в Экспедиции усиливает здоровье всего марша, пехоту и стрелков.</p>
    <div class="jero-quick"><div><b>Получение</b><span>Колесо удачи, магазин Литейной и универсальные мифические осколки</span></div><div><b>Главная роль</b><span>Фронтовик, PvP, гарнизон, Арена</span></div><div><b>Для F2P</b><span>Главный доступный герой 11 поколения</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div>
  </div>
</section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#explore">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#use">Применение</a><a href="#verdict">Итог</a></nav>

<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные значения героя по актуальным карточкам источников.</p><div class="jero-stats"><div class="jero-stat"><strong>11 392</strong><span>Атака героя</span></div><div class="jero-stat"><strong>14 850</strong><span>Защита героя</span></div><div class="jero-stat"><strong>222 776</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>1 281,02%</strong><span>Атака пехоты</span></div><div class="jero-stat"><strong>1 281,02%</strong><span>Защита пехоты</span></div></div></section>

<section class="jero-section" id="explore"><h2>Навыки Освоения</h2><p class="jero-section-lead">Элеонора сочетает щит, отражение урона, снижение защиты цели и постоянное усиление собственной живучести.</p><div class="jero-skill-grid">
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/eleonora/skill-shield-of-blaze.webp" alt="Пылающий щит"><div><h3>Пылающий щит</h3><small>Щит · отражение · массовый урон</small></div></div><p>Создаёт щит прочностью от атаки Элеоноры и отражает 30% получаемого урона. Через 3 секунды щит разрушается и наносит урон ближайшим врагам.</p><p class="jero-values">Щит 100 / 130 / 160 / 190 / 220% · взрыв 60 / 65 / 70 / 75 / 80%</p></article>
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/eleonora/skill-regal-sanction.webp" alt="Королевская кара"><div><h3>Королевская кара</h3><small>Урон · снижение защиты</small></div></div><p>Наносит удар тяжёлым молотом и снижает защиту цели на 2 секунды.</p><p class="jero-values">Урон 100 / 110 / 120 / 130 / 140% · защита цели −10 / 15 / 20 / 25 / 30%</p></article>
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/eleonora/skill-majestic-corona.webp" alt="Величественный венец"><div><h3>Величественный венец</h3><small>Пассивная стойкость</small></div></div><p>Одновременно снижает получаемый Элеонорой урон и повышает наносимый ею урон.</p><p class="jero-values">−5 / 7,5 / 10 / 12,5 / 15% получаемого · +5 / 7,5 / 10 / 12,5 / 15% наносимого</p></article>
</div></section>

<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><p class="jero-section-lead">Очень сильный набор для живучего смешанного марша: здоровье всем войскам, защита пехоты и усиление стрелков.</p><div class="jero-skill-grid">
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/eleonora/skill-scorching-sun.webp" alt="Палящее солнце"><div><h3>Палящее солнце</h3><small>Здоровье всех войск</small></div></div><p>Повышает здоровье всех войск.</p><p class="jero-values">+5 / 10 / 15 / 20 / 25%</p></article>
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/eleonora/skill-solaris-nexus.webp" alt="Единство Соляриса"><div><h3>Единство Соляриса</h3><small>Пехота + стрелки</small></div></div><p>Снижает получаемый пехотой урон и одновременно повышает наносимый стрелками урон.</p><p class="jero-values">Пехота: −2 / 4 / 6 / 8 / 10% урона · стрелки: +2 / 4 / 6 / 8 / 10% урона</p></article>
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/eleonora/skill-soaring-flame.webp" alt="Взмывающее пламя"><div><h3>Взмывающее пламя</h3><small>Циклический командный бафф</small></div></div><p>Каждые 5 атак пехоты на 2 хода усиливает урон всех войск и одновременно снижает получаемый ими урон.</p><p class="jero-values">+5 / 10 / 15 / 20 / 25% урона · −5 / 10 / 15 / 20 / 25% входящего урона</p></article>
</div><div class="jero-note"><strong>Важно:</strong> «Взмывающее пламя» срабатывает по циклу атак пехоты. На максимуме это очень сильное окно в 2 хода: весь марш одновременно бьёт сильнее и становится заметно крепче.</div></section>

<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="assets/heroes/gen-11/eleonora/gear-scepter-of-solaris.webp" alt="Скипетр Соляриса"><div><h3 class="jero-gear-title">Скипетр Соляриса</h3><p class="jero-section-lead">Максимальные бонусы: +2 308 атаки, +3 010 защиты, +45 157 здоровья героя, +320% смертоносности и +320% здоровья войск.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="assets/heroes/gen-11/eleonora/gear-hammer-and-shield.webp" alt="Молот и щит"><div><b>Молот и щит</b><span>На максимуме при здоровье выше 50% повышает атаку Элеоноры на 24%, а ниже 50% повышает её защиту на 75%.</span></div></div><div class="jero-gear-skill"><img src="assets/heroes/gen-11/eleonora/gear-last-fortress.webp" alt="Последняя крепость"><div><b>Последняя крепость</b><span>На максимуме повышает здоровье войск защитника на 15%.</span></div></div></div></div></div></section>

<section class="jero-section" id="use"><h2>Где использовать Элеонору</h2><div class="jero-mode-grid"><div class="jero-mode"><b>Арена</b><p>Один из сильнейших фронтовиков поколения: щит, отражение урона, взрыв по области и снижение защиты цели.</p></div><div class="jero-mode"><b>PvP</b><p>Сильна в затяжных боях благодаря +25% здоровья всему маршу и мощным циклическим баффам.</p></div><div class="jero-mode"><b>Гарнизон</b><p>Очень хороша за счёт высокой живучести, защитного эксклюзивного навыка и усиления здоровья защитников.</p></div><div class="jero-mode"><b>Свирепый медведь</b><p>Не лучший герой для вступления в чужой сбор: первый навык Экспедиции повышает здоровье, а не урон. Как лидер сильного собственного марша полезнее.</p></div></div></section>

<section class="jero-section"><h2>Приоритет прокачки</h2><div class="jero-priority"><div><b><span class="jero-rank">1</span>Палящее солнце</b><span>Универсальные +25% здоровья всем войскам.</span></div><div><b><span class="jero-rank">2</span>Взмывающее пламя</b><span>Сильнейшее окно урона и защиты всего марша.</span></div><div><b><span class="jero-rank">3</span>Единство Соляриса</b><span>Особенно полезно для маршей с сильной пехотой и стрелками.</span></div></div></section>

<section class="jero-section"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul><li>Герой Колеса удачи и лучший F2P-приоритет 11 поколения.</li><li>До +25% здоровья всем войскам.</li><li>Сильный щит и отражение 30% урона в Освоении.</li><li>До −30% защиты цели в Арене.</li><li>Одновременно усиливает пехоту и стрелков.</li><li>Очень сильна в гарнизоне и затяжном PvP.</li></ul></div><div class="jero-box bad"><h3>Минусы</h3><ul><li>Не ориентирована на чистый взрывной урон.</li><li>Первый навык Экспедиции не даёт атакующего бонуса для Медведя.</li><li>Часть максимальной силы «Взмывающего пламени» требует набрать цикл из 5 атак пехоты.</li><li>Для полного потенциала гарнизона важно эксклюзивное снаряжение.</li></ul></div></div></section>

<section class="jero-section" id="verdict"><div class="jero-verdict"><h3>Итог</h3><p><strong>Элеонора — главный F2P-герой 11 поколения и один из самых сильных фронтовиков своего этапа игры.</strong> Колесо удачи делает её доступнее Ллойда и Руфуса, а набор из щитов, здоровья, снижения входящего урона и командного усиления позволяет долго держать переднюю линию в PvP, гарнизоне и Арене.</p></div><div class="jero-sources"><a href="https://whiteout-survival.com/ru/heroes/eleonora/" target="_blank" rel="noopener">Источник: карточка Элеоноры</a><a href="https://whiteoutlab.ru/wiki/heroes/eleonora" target="_blank" rel="noopener">WOS Lab: русские названия и значения</a><a href="https://www.whiteoutsurvival-community.com/tools/wiki/heroes/eleonora.html" target="_blank" rel="noopener">Дополнительная проверка механики</a></div><a class="jero-back" href="heroes.html">← Вернуться к героям</a></section>
<div class="jero-foot">Белая мгла · SOVA58 · актуализировано 23.10.2026</div>'''

src=re.sub(r'<div class="jero-crumbs">.*?<div class="jero-foot">.*?</div>',body,src,1,flags=re.S)
Path('hero-eleonora.html').write_text(src,encoding='utf-8')

# assets: parse source page and match by alt/src text, convert to webp
url='https://whiteout-survival.com/ru/heroes/eleonora/'
r=requests.get(url,timeout=30,headers={'User-Agent':'Mozilla/5.0'}); r.raise_for_status()
soup=BeautifulSoup(r.text,'html.parser')
imgs=[]
for im in soup.find_all('img'):
    u=im.get('data-src') or im.get('src') or ''
    if not u: continue
    u=urljoin(url,u)
    label=((im.get('alt') or '')+' '+u).lower().replace('_','-')
    imgs.append((label,u))

mapping={
'portrait.webp':['eleonora'],
'skill-shield-of-blaze.webp':['shield-of-blaze','пылающий-щит'],
'skill-regal-sanction.webp':['regal-sanction','королевская-кара'],
'skill-majestic-corona.webp':['majestic-corona','величественный-венец'],
'skill-scorching-sun.webp':['scorching-sun','палящее-солнце'],
'skill-solaris-nexus.webp':['solaris-nexus','единство-соляриса'],
'skill-soaring-flame.webp':['soaring-flame','взмывающее-пламя'],
'gear-scepter-of-solaris.webp':['scepter-of-solaris','скипетр-соляриса'],
'gear-hammer-and-shield.webp':['hammer-shield','hammer-and-shield','молот-и-щит'],
'gear-last-fortress.webp':['last-fortress','последняя-крепость']}
out=Path('assets/heroes/gen-11/eleonora'); out.mkdir(parents=True,exist_ok=True)
used=set()
for name,tokens in mapping.items():
    cand=None
    for label,u in imgs:
        norm=label.replace(' ','-')
        if any(t in norm for t in tokens) and u not in used:
            cand=u; break
    if not cand:
        raise SystemExit(f'asset not found: {name}\n'+ '\n'.join(x[1] for x in imgs if 'wp-content' in x[1])[:8000])
    rr=requests.get(cand,timeout=30,headers={'User-Agent':'Mozilla/5.0'}); rr.raise_for_status(); used.add(cand)
    im=Image.open(io.BytesIO(rr.content)).convert('RGBA')
    im.save(out/name,'WEBP',quality=92,method=6)

# sitemap
p=Path('sitemap.xml'); s=p.read_text(encoding='utf-8')
entry='  <url><loc>https://belaya-mgla-sova58.github.io/hero-eleonora.html</loc><lastmod>2026-10-23</lastmod></url>\n'
if 'hero-eleonora.html' not in s: s=s.replace('</urlset>',entry+'</urlset>')
p.write_text(s,encoding='utf-8')
