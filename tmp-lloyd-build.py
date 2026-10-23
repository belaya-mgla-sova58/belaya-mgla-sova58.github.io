from pathlib import Path
import re, requests, io
from PIL import Image

src=Path('hero-eleonora.html').read_text(encoding='utf-8')
# metadata
repls=[
(r'<title>.*?</title>','<title>Ллойд: навыки, Сокровище мастерства, плюсы и минусы | Белая мгла</title>'),
(r'<meta name="description" content="[^"]*"/>','<meta name="description" content="Подробный гайд по Ллойду: герой 11 поколения, навыки Освоения и Экспедиции, Сокровище мастерства, PvP, Арена, гарнизон, прокачка, плюсы и минусы."/>'),
(r'<link rel="canonical" href="[^"]*"/>','<link rel="canonical" href="https://belaya-mgla-sova58.github.io/hero-lloyd.html"/>'),
(r'<meta property="og:title" content="[^"]*"/>','<meta property="og:title" content="Ллойд: полный гайд"/>'),
(r'<meta property="og:description" content="[^"]*"/>','<meta property="og:description" content="Навыки, Сокровище мастерства, PvP, Арена, гарнизон, плюсы и минусы Ллойда."/>'),
(r'<meta property="og:url" content="[^"]*"/>','<meta property="og:url" content="https://belaya-mgla-sova58.github.io/hero-lloyd.html"/>'),
(r'<meta property="og:image" content="[^"]*"/>','<meta property="og:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-11/lloyd/portrait.webp"/>'),
(r'<meta name="twitter:image" content="[^"]*"/>','<meta name="twitter:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-11/lloyd/portrait.webp"/>')]
for pat,val in repls: src=re.sub(pat,val,src,1,flags=re.S)
src=re.sub(r'<script id="guide-article-schema-v625" type="application/ld\+json">.*?</script>','<script id="guide-article-schema-v625" type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Ллойд: полный гайд","description":"Подробный гайд по Ллойду: герой 11 поколения, навыки, Сокровище мастерства, PvP, Арена и прокачка.","url":"https://belaya-mgla-sova58.github.io/hero-lloyd.html","mainEntityOfPage":{"@type":"WebPage","@id":"https://belaya-mgla-sova58.github.io/hero-lloyd.html"},"author":{"@type":"Person","name":"SOVA58","url":"https://belaya-mgla-sova58.github.io/sova58.html","gender":"Female"},"isPartOf":{"@type":"WebSite","name":"Белая мгла · SOVA58","url":"https://belaya-mgla-sova58.github.io/"},"inLanguage":"ru","dateModified":"2026-10-23","image":["https://belaya-mgla-sova58.github.io/assets/heroes/gen-11/lloyd/portrait.webp"]}</script>',src,1,flags=re.S)
src=re.sub(r'<script type="application/ld\+json">\{"@context":"https://schema.org","@type":"BreadcrumbList".*?</script>','<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://belaya-mgla-sova58.github.io/"},{"@type":"ListItem","position":2,"name":"Герои","item":"https://belaya-mgla-sova58.github.io/heroes.html"},{"@type":"ListItem","position":3,"name":"Ллойд","item":"https://belaya-mgla-sova58.github.io/hero-lloyd.html"}]}</script>',src,1,flags=re.S)

body='''<div class="jero-crumbs"><a href="index.html">Главная</a> · <a href="heroes.html">Герои</a> · Ллойд</div>
<section class="jero-hero">
  <div class="jero-portrait-wrap"><img class="jero-portrait" src="assets/heroes/gen-11/lloyd/portrait.webp" alt="Ллойд"></div>
  <div>
    <div class="jero-kicker"><span class="jero-chip gold">11 поколение</span><span class="jero-chip">Копейщики</span><span class="jero-chip">Мифический</span><span class="jero-chip">Бой</span></div>
    <h1>Ллойд</h1>
    <p class="jero-subtitle">Ослабление противника · всплески урона копейщиков · механические бомбы</p>
    <p class="jero-lead">Ллойд — герой копейщиков 11 поколения. Его сила не только в личном уроне: он снижает смертоносность противника, открывает слабости цели и каждые 3 хода резко усиливает атаку копейщиков. Для F2P он полезен, но заметно дороже Элеоноры, потому что не является героем Колеса удачи.</p>
    <div class="jero-quick"><div><b>Получение</b><span>Король ледяного поля, СВС, Зал вождей, ежедневные предложения, Геройское ралли и Литейный цех</span></div><div><b>Главная роль</b><span>PvP, атакующие марши, Арена и ослабление противника</span></div><div><b>Для F2P</b><span>Второй приоритет 11 поколения после Элеоноры</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div>
  </div>
</section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#explore">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#use">Применение</a><a href="#verdict">Итог</a></nav>

<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные значения героя по актуальной карточке.</p><div class="jero-stats"><div class="jero-stat"><strong>14 850</strong><span>Атака героя</span></div><div class="jero-stat"><strong>14 850</strong><span>Защита героя</span></div><div class="jero-stat"><strong>148 518</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>1 281,02%</strong><span>Атака копейщиков</span></div><div class="jero-stat"><strong>1 281,02%</strong><span>Защита копейщиков</span></div></div></section>

<section class="jero-section" id="explore"><h2>Навыки Освоения</h2><p class="jero-section-lead">В Арене Ллойд сочетает массовый урон, дебафф получаемого урона цели и высокую скорость обычных атак.</p><div class="jero-skill-grid">
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/lloyd/skill-rapid-bombardment.webp" alt="Быстрая бомбардировка"><div><h3>Быстрая бомбардировка</h3><small>Тройной урон по области</small></div></div><p>Ллойд запускает три пропеллерные бомбы. Каждая наносит урон по области от его атаки.</p><p class="jero-values">70 / 77 / 84 / 91 / 98% за каждую из 3 бомб</p></article>
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/lloyd/skill-weakness-focus.webp" alt="Фокус на слабости"><div><h3>Фокус на слабости</h3><small>Урон · увеличение входящего урона</small></div></div><p>Наносит урон и на 3 секунды раскрывает слабости цели. В это время цель получает больше урона от всех источников.</p><p class="jero-values">Урон 100 / 110 / 120 / 130 / 140% · получаемый целью урон +10 / 12,5 / 15 / 17,5 / 20%</p></article>
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/lloyd/skill-practiced-perfection.webp" alt="Практикуемое совершенство"><div><h3>Практикуемое совершенство</h3><small>Скорость атаки</small></div></div><p>Постоянно повышает скорость атаки Ллойда.</p><p class="jero-values">+10 / 15 / 20 / 25 / 30%</p></article>
</div></section>

<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><p class="jero-section-lead">Главная ценность Ллойда в большом бою: снижение смертоносности врага, циклический всплеск атаки копейщиков и шанс усилить смертоносность всего марша.</p><div class="jero-skill-grid">
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/lloyd/skill-bird-invasion.webp" alt="Нашествие птиц"><div><h3>Нашествие птиц</h3><small>Ослабление смертоносности врага</small></div></div><p>Механические птицы мешают противнику и снижают смертоносность всех его войск.</p><p class="jero-values">−4 / 8 / 12 / 16 / 20%</p></article>
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/lloyd/skill-iceflare-bomb.webp" alt="Бомба с ледяным свечением"><div><h3>Бомба с ледяным свечением</h3><small>Каждые 3 хода · копейщики</small></div></div><p>Каждые 3 хода специальная бомба резко усиливает атаку копейщиков и на 1 ход дополнительно снижает смертоносность противника.</p><p class="jero-values">Атака копейщиков +30 / 60 / 90 / 120 / 150% · смертоносность врага −6 / 12 / 18 / 24 / 30%</p></article>
  <article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-11/lloyd/skill-ingenious-mastery.webp" alt="Гениальное мастерство"><div><h3>Гениальное мастерство</h3><small>40% шанс · смертоносность всего марша</small></div></div><p>Каждая атака даёт 40% шанс повысить смертоносность всех войск.</p><p class="jero-values">+10 / 20 / 30 / 40 / 50%</p></article>
</div><div class="jero-note"><strong>Важно:</strong> «Бомба с ледяным свечением» работает по фиксированному циклу каждые 3 хода. На максимуме это +150% атаки копейщиков и одновременно −30% смертоносности противника на 1 ход.</div></section>

<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="assets/heroes/gen-11/lloyd/gear-mastercraft-treasure.webp" alt="Сокровище мастерства"><div><h3 class="jero-gear-title">Сокровище мастерства</h3><p class="jero-section-lead">Максимальные бонусы по карточке источника: +3 010 атаки, +3 010 защиты, +30 105 здоровья героя, +320% смертоносности и +320% здоровья войск.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="assets/heroes/gen-11/lloyd/gear-frosty-whisper.webp" alt="Морозный шепот"><div><b>Морозный шепот</b><span>На максимуме обычные атаки наносят дополнительно 15% атаки и на 2 секунды снижают скорость атаки цели на 15%. Эффекты не суммируются.</span></div></div><div class="jero-gear-skill"><img src="assets/heroes/gen-11/lloyd/gear-steel-maze.webp" alt="Стальной лабиринт"><div><b>Стальной лабиринт</b><span>На максимуме повышает атаку войск защитника на 15%.</span></div></div></div></div></div></section>

<section class="jero-section" id="use"><h2>Где использовать Ллойда</h2><div class="jero-mode-grid"><div class="jero-mode"><b>Арена</b><p>Сильный урон по области, +20% входящего урона по отмеченной цели и высокая скорость атаки делают его опасным дамагером.</p></div><div class="jero-mode"><b>PvP</b><p>Очень полезен против сильных маршей благодаря постоянному снижению смертоносности и циклическим дебаффам.</p></div><div class="jero-mode"><b>Гарнизон</b><p>Эксклюзивный «Стальной лабиринт» даёт +15% атаки защитникам, поэтому герой хорошо вписывается в оборонительные составы.</p></div><div class="jero-mode"><b>Свирепый медведь</b><p>Не идеальный герой для вступления в чужой сбор: первый навык Экспедиции снижает смертоносность врага, но не даёт прямого бонуса к урону. Как лидер собственного сильного марша полезнее.</p></div></div></section>

<section class="jero-section"><h2>Приоритет прокачки</h2><div class="jero-priority"><div><b><span class="jero-rank">1</span>Гениальное мастерство</b><span>До +50% смертоносности всех войск при срабатывании.</span></div><div><b><span class="jero-rank">2</span>Бомба с ледяным свечением</b><span>Главный циклический всплеск копейщиков и сильный дебафф врага.</span></div><div><b><span class="jero-rank">3</span>Нашествие птиц</b><span>Постоянно режет смертоносность всего вражеского марша.</span></div></div></section>

<section class="jero-section"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul><li>До −20% смертоносности всех войск противника постоянным навыком.</li><li>Каждые 3 хода до +150% атаки копейщиков.</li><li>Дополнительное снижение смертоносности врага до −30% на 1 ход.</li><li>40% шанс повысить смертоносность всего марша до +50%.</li><li>В Арене заставляет цель получать до +20% дополнительного урона.</li><li>Эксклюзивка усиливает оборону города и гарнизона.</li></ul></div><div class="jero-box bad"><h3>Минусы</h3><ul><li>Нет Колеса удачи, поэтому для F2P заметно дороже Элеоноры.</li><li>Часть силы зависит от 40% срабатывания «Гениального мастерства».</li><li>Главный взрывной навык Экспедиции ориентирован именно на копейщиков.</li><li>Первый навык Экспедиции не является прямым бонусом урона для Медведя.</li></ul></div></div></section>

<section class="jero-section" id="verdict"><div class="jero-verdict"><h3>Итог</h3><p><strong>Ллойд — сильный герой 11 поколения для копейщиков, PvP и ослабления противника.</strong> Он особенно ценен в затяжных боях: режет смертоносность врага, каждые 3 хода создаёт мощное окно для копейщиков и может поднимать смертоносность всего марша. Для F2P сначала выгоднее закрыть Элеонору через Колесо удачи, а уже затем вкладываться в Ллойда.</p></div><div class="jero-sources"><a href="https://whiteout-survival.com/ru/heroes/lloyd/" target="_blank" rel="noopener">Источник: русская карточка Ллойда</a><a href="https://www.whiteoutsurvival-community.com/tools/wiki/heroes/lloyd.html" target="_blank" rel="noopener">Дополнительная проверка механики</a><a href="https://wosheroes.com/heroes/lloyd/" target="_blank" rel="noopener">WOS Heroes: поколение и навыки</a></div><a class="jero-back" href="heroes.html">← Вернуться к героям</a></section>
<div class="jero-foot">Белая мгла · SOVA58 · актуализировано 23.10.2026</div>'''

# replace page-specific inner content, preserving shell
start=src.index('<div class="jero-crumbs">')
end=src.index('</div></main><nav aria-label="Быстрая мобильная навигация"')
src=src[:start]+body+src[end:]
Path('hero-lloyd.html').write_text(src,encoding='utf-8')

assets={
'portrait.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Lloyd.webp',
'skill-rapid-bombardment.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Rapid-Bombardment.webp',
'skill-weakness-focus.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Weakness-Focus.webp',
'skill-practiced-perfection.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Practiced-Perfection.webp',
'skill-bird-invasion.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Bird-Invasion.webp',
'skill-iceflare-bomb.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Iceflare-Bomb.webp',
'skill-ingenious-mastery.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Ingenious-Mastery.webp',
'gear-mastercraft-treasure.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Mastercraft-Treasure.webp',
'gear-frosty-whisper.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Frosty-Whisper.webp',
'gear-steel-maze.webp':'https://whiteout-survival.com/wp-content/uploads/2025/07/Steel-Maze.webp'}
out=Path('assets/heroes/gen-11/lloyd'); out.mkdir(parents=True,exist_ok=True)
for fn,u in assets.items():
    r=requests.get(u,headers={'User-Agent':'Mozilla/5.0'},timeout=30); r.raise_for_status()
    im=Image.open(io.BytesIO(r.content)).convert('RGBA')
    im.save(out/fn,'WEBP',quality=92,method=6)

p=Path('sitemap.xml'); s=p.read_text(encoding='utf-8')
entry='  <url><loc>https://belaya-mgla-sova58.github.io/hero-lloyd.html</loc><lastmod>2026-10-23</lastmod></url>\n'
if 'hero-lloyd.html' not in s: s=s.replace('</urlset>',entry+'</urlset>')
p.write_text(s,encoding='utf-8')
