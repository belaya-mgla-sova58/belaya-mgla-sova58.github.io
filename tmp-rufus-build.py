from pathlib import Path
import re, requests, io
from PIL import Image

src=Path('hero-lloyd.html').read_text(encoding='utf-8')
repls=[
(r'<title>.*?</title>','<title>Руфус: навыки, Метеорный бластер, плюсы и минусы | Белая мгла</title>'),
(r'<meta name="description" content="[^"]*"/>','<meta name="description" content="Подробный гайд по Руфусу: герой 11 поколения, навыки Освоения и Экспедиции, Метеорный бластер, Свирепый медведь, PvP, Арена, прокачка, плюсы и минусы."/>'),
(r'<link rel="canonical" href="[^"]*"/>','<link rel="canonical" href="https://belaya-mgla-sova58.github.io/hero-rufus.html"/>'),
(r'<meta property="og:title" content="[^"]*"/>','<meta property="og:title" content="Руфус: полный гайд"/>'),
(r'<meta property="og:description" content="[^"]*"/>','<meta property="og:description" content="Навыки, Метеорный бластер, Свирепый медведь, PvP, Арена, плюсы и минусы Руфуса."/>'),
(r'<meta property="og:url" content="[^"]*"/>','<meta property="og:url" content="https://belaya-mgla-sova58.github.io/hero-rufus.html"/>'),
(r'<meta property="og:image" content="[^"]*"/>','<meta property="og:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-11/rufus/portrait.webp"/>'),
(r'<meta name="twitter:image" content="[^"]*"/>','<meta name="twitter:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-11/rufus/portrait.webp"/>')]
for pat,val in repls: src=re.sub(pat,val,src,1,flags=re.S)
src=re.sub(r'<script id="guide-article-schema-v625" type="application/ld\+json">.*?</script>','<script id="guide-article-schema-v625" type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Руфус: полный гайд","description":"Подробный гайд по Руфусу: герой 11 поколения, навыки, Метеорный бластер, PvP, Арена, Медведь и прокачка.","url":"https://belaya-mgla-sova58.github.io/hero-rufus.html","mainEntityOfPage":{"@type":"WebPage","@id":"https://belaya-mgla-sova58.github.io/hero-rufus.html"},"author":{"@type":"Person","name":"SOVA58","url":"https://belaya-mgla-sova58.github.io/sova58.html","gender":"Female"},"isPartOf":{"@type":"WebSite","name":"Белая мгла · SOVA58","url":"https://belaya-mgla-sova58.github.io/"},"inLanguage":"ru","dateModified":"2026-10-23","image":["https://belaya-mgla-sova58.github.io/assets/heroes/gen-11/rufus/portrait.webp"]}</script>',src,1,flags=re.S)
src=re.sub(r'<script type="application/ld\+json">\{"@context":"https://schema.org","@type":"BreadcrumbList".*?</script>','<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://belaya-mgla-sova58.github.io/"},{"@type":"ListItem","position":2,"name":"Герои","item":"https://belaya-mgla-sova58.github.io/heroes.html"},{"@type":"ListItem","position":3,"name":"Руфус","item":"https://belaya-mgla-sova58.github.io/hero-rufus.html"}]}</script>',src,1,flags=re.S)

body='''<div class="jero-crumbs"><a href="index.html">Главная</a> · <a href="heroes.html">Герои</a> · Руфус</div>
<section class="jero-hero">
  <div class="jero-portrait-wrap"><img class="jero-portrait" src="assets/heroes/gen-11/rufus/portrait.webp" alt="Руфус"></div>
  <div>
    <div class="jero-kicker"><span class="jero-chip gold">11 поколение</span><span class="jero-chip">Стрелки</span><span class="jero-chip">Мифический</span><span class="jero-chip">Бой</span></div>
    <h1>Руфус</h1>
    <p class="jero-subtitle">Массовый урон · горение · усиление атакующего сбора</p>
    <p class="jero-lead">Руфус — стрелок 11 поколения и главный дальний дамагер поколения. Он поджигает область в Арене, повышает атаку всего марша, усиливает атаки стрелков и увеличивает получаемый целью урон. Особенно ценен в атакующих сборах и на Свирепом медведе.</p>
    <div class="jero-quick"><div><b>Получение</b><span>Зал героев, Литейный цех и универсальные мифические осколки</span></div><div><b>Главная роль</b><span>Атакующий сбор, Свирепый медведь, PvP и Арена</span></div><div><b>Для F2P</b><span>Сильный, но дорогой герой без Колеса удачи; сначала обычно Элеонора</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div>
  </div>
</section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#explore">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#use">Применение</a><a href="#verdict">Итог</a></nav>

<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные значения героя по актуальным карточкам.</p><div class="jero-stats"><div class="jero-stat"><strong>18 042</strong><span>Атака героя</span></div><div class="jero-stat"><strong>14 850</strong><span>Защита героя</span></div><div class="jero-stat"><strong>111 388</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>1 281,02%</strong><span>Атака стрелков</span></div><div class="jero-stat"><strong>1 281,02%</strong><span>Защита стрелков</span></div></div></section>

<section class="jero-section" id="explore"><h2>Навыки Освоения</h2><p class="jero-section-lead">Руфус давит заднюю линию массовым уроном и горением, а затем добивает частыми критическими ударами.</p><div class="jero-skill-grid">
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/rufus/skill-starfall-impact.webp" alt="Удар звездопада"><div><h3>Удар звездопада</h3><small>Урон по области · горение</small></div></div><p>Руфус обрушивает гранаты на область. После взрыва земля горит ещё 2 секунды и наносит периодический урон каждые 0,5 секунды.</p><p class="jero-values">Взрыв 200 / 220 / 240 / 260 / 280% · горение 20 / 22,5 / 25 / 27,5 / 30%</p></article>
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/rufus/skill-splinter-blast.webp" alt="Осколочный взрыв"><div><h3>Осколочный взрыв</h3><small>Основная цель + соседние враги</small></div></div><p>Взрывная пуля наносит основной урон цели, а осколки поражают ближайших противников.</p><p class="jero-values">Цель 100 / 110 / 120 / 130 / 140% · рядом 50 / 55 / 60 / 65 / 70%</p></article>
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/rufus/skill-raging-fury.webp" alt="Бешеная ярость"><div><h3>Бешеная ярость</h3><small>Шанс критического удара</small></div></div><p>Постоянно повышает шанс критического удара Руфуса.</p><p class="jero-values">+7 / 10 / 13 / 16 / 20%</p></article>
</div></section>

<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><p class="jero-section-lead">Очень атакующий набор: постоянная атака всему маршу, усиление стрелков и дебафф, повышающий входящий урон цели.</p><div class="jero-skill-grid">
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/rufus/skill-inferno-regiment.webp" alt="Полк Инферно"><div><h3>Полк Инферно</h3><small>Атака всех войск</small></div></div><p>Постоянно повышает атаку всех войск в марше.</p><p class="jero-values">+5 / 10 / 15 / 20 / 25%</p></article>
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/rufus/skill-armor-crush.webp" alt="Разрушение брони"><div><h3>Разрушение брони</h3><small>Стрелки · усиление входящего урона</small></div></div><p>Атаки стрелков наносят дополнительный урон и на 1 ход заставляют цель получать больше урона от всех источников.</p><p class="jero-values">Доп. урон +12 / 24 / 36 / 48 / 60% · получаемый целью урон +5 / 10 / 15 / 20 / 25%</p></article>
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/rufus/skill-wrathful-quake.webp" alt="Гневное землетрясение"><div><h3>Гневное землетрясение</h3><small>20% шанс · снижение смертоносности</small></div></div><p>Атаки всех войск имеют 20% шанс запугать противника и на 2 хода снизить его смертоносность.</p><p class="jero-values">Смертоносность врага −10 / 20 / 30 / 40 / 50%</p></article>
</div><div class="jero-note"><strong>Уточнение по «Разрушению брони»:</strong> русская карточка источника содержит старую текстовую ошибку про пехоту. Несколько актуальных баз 2026 описывают механику как усиление атак стрелков, что совпадает с самим описанием бронебойных патронов Руфуса.</div></section>

<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="assets/heroes/gen-11/rufus/gear-meteor-blaster.webp" alt="Метеорный бластер"><div><h3 class="jero-gear-title">Метеорный бластер</h3><p class="jero-section-lead">Максимальные базовые бонусы карточки: +3 652 атаки, +3 010 защиты, +22 578 здоровья героя, +320% смертоносности и +320% здоровья войск.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="assets/heroes/gen-11/rufus/gear-ember-of-conflict.webp" alt="Уголёк конфликта"><div><b>Уголёк конфликта</b><span>На максимуме обычные атаки поджигают цель и наносят 30% атаки Руфуса в секунду в течение 2 секунд.</span></div></div><div class="jero-gear-skill"><img src="assets/heroes/gen-11/rufus/gear-blazing-legion.webp" alt="Пылающий легион"><div><b>Пылающий легион</b><span>На максимуме повышает атаку войск в сборе на 15%.</span></div></div></div></div></div></section>

<section class="jero-section" id="use"><h2>Где использовать Руфуса</h2><div class="jero-mode-grid"><div class="jero-mode"><b>Свирепый медведь</b><p>Одна из лучших ролей Руфуса. +25% атаки всему маршу, усиление стрелков, дебафф получаемого урона цели и +15% атаки сбора от эксклюзивки работают на чистый урон.</p></div><div class="jero-mode"><b>Атакующий сбор</b><p>Очень силён как лидер: повышает атаку, усиливает стрелков и открывает цель для дополнительного урона всего сбора.</p></div><div class="jero-mode"><b>PvP</b><p>Сочетает высокий урон с защитным дебаффом: 20% шанс снизить смертоносность врага до −50% на 2 хода.</p></div><div class="jero-mode"><b>Арена</b><p>Метеорный взрыв, горящая зона, осколки и до +20% к шансу крита дают мощный массовый урон с задней линии.</p></div></div></section>

<section class="jero-section"><h2>Приоритет прокачки</h2><div class="jero-priority"><div><b><span class="jero-rank">1</span>Полк Инферно</b><span>Стабильные +25% атаки всем войскам, особенно ценно в Медведе и сборах.</span></div><div><b><span class="jero-rank">2</span>Разрушение брони</b><span>Усиливает стрелков и заставляет цель получать до +25% урона.</span></div><div><b><span class="jero-rank">3</span>Удар звездопада</b><span>Главный массовый навык Руфуса для Арены и Освоения.</span></div></div></section>

<section class="jero-section"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul><li>До +25% атаки всем войскам.</li><li>Очень сильный герой для Свирепого медведя и атакующего сбора.</li><li>«Разрушение брони» повышает получаемый целью урон до +25%.</li><li>До −50% смертоносности врага при срабатывании «Гневного землетрясения».</li><li>Сильный массовый урон и горение в Арене.</li><li>Эксклюзивка даёт ещё +15% атаки войск сбора.</li></ul></div><div class="jero-box bad"><h3>Минусы</h3><ul><li>Нет Колеса удачи, поэтому для F2P значительно дороже Элеоноры.</li><li>Третий навык Экспедиции зависит от 20% шанса.</li><li>Для максимальной силы атакующего сбора важно эксклюзивное снаряжение.</li><li>На ранней прокачке может уступать уже хорошо развитому стрелку предыдущего поколения.</li></ul></div></div></section>

<section class="jero-section" id="verdict"><div class="jero-verdict"><h3>Итог</h3><p><strong>Руфус — главный атакующий стрелок 11 поколения и один из лучших кандидатов на вложения после Элеоноры.</strong> Если важны Свирепый медведь, атакующие сборы и высокий урон в PvP, он ценнее Ллойда. Для F2P порядок обычно такой: сначала доступная через Колесо удачи Элеонора, затем уже дорогой Руфус, если хватает ресурсов.</p></div><div class="jero-sources"><a href="https://whiteout-survival.com/ru/heroes/rufus/" target="_blank" rel="noopener">Источник: русская карточка Руфуса</a><a href="https://www.whiteoutsurvival-community.com/tools/wiki/heroes/rufus.html" target="_blank" rel="noopener">WSCO: актуальная проверка механики 2026</a><a href="https://wosguru.com/hero/rufus" target="_blank" rel="noopener">WoS Guru: применение в 11 поколении и Медведь</a><a href="https://www.whiteoutsurvival.wiki/heroes/rufus/" target="_blank" rel="noopener">Дополнительная сверка навыков</a></div><a class="jero-back" href="heroes.html">← Вернуться к героям</a></section>
<div class="jero-foot">Белая мгла · SOVA58 · актуализировано 23.10.2026</div>'''
src=re.sub(r'<div class="jero-crumbs">.*?<div class="jero-foot">.*?</div>',body,src,1,flags=re.S)
Path('hero-rufus.html').write_text(src,encoding='utf-8')

assets={
'portrait.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Rufus.webp',
'skill-starfall-impact.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Starfall-Impact.webp',
'skill-splinter-blast.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Splinter-Blast.webp',
'skill-raging-fury.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Raging-Fury.webp',
'skill-inferno-regiment.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Inferno-Regiment.webp',
'skill-armor-crush.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Armor-Crush.webp',
'skill-wrathful-quake.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Wrathful-Quake.webp',
'gear-meteor-blaster.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Meteor-Blaster.webp',
'gear-ember-of-conflict.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Ember-of-Conflict.webp',
'gear-blazing-legion.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Blazing-Legion.webp'}
out=Path('assets/heroes/gen-11/rufus'); out.mkdir(parents=True,exist_ok=True)
for name,url in assets.items():
    r=requests.get(url,headers={'User-Agent':'Mozilla/5.0'},timeout=30); r.raise_for_status()
    data=r.content
    try:
        im=Image.open(io.BytesIO(data)); im.save(out/name,'WEBP',quality=92,method=6)
    except Exception:
        (out/name).write_bytes(data)

p=Path('sitemap.xml'); s=p.read_text(encoding='utf-8')
entry='  <url><loc>https://belaya-mgla-sova58.github.io/hero-rufus.html</loc><lastmod>2026-10-23</lastmod></url>\n'
if 'hero-rufus.html' not in s: s=s.replace('</urlset>',entry+'</urlset>')
p.write_text(s,encoding='utf-8')
