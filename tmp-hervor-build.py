from pathlib import Path
import re, requests, io
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from PIL import Image

SRC='https://whiteout-survival.com/ru/heroes/hervor/'
html=requests.get(SRC,headers={'User-Agent':'Mozilla/5.0'},timeout=30).text
soup=BeautifulSoup(html,'html.parser')
imgs=[]
for im in soup.find_all('img'):
    src=im.get('data-lazy-src') or im.get('data-src') or im.get('src') or ''
    if not src or src.startswith('data:'): continue
    imgs.append((im.get('alt','').strip().lower(),urljoin(SRC,src)))

def pick(*needles):
    needles=[n.lower() for n in needles]
    for alt,u in imgs:
        if any(n in alt for n in needles): return u
    for alt,u in imgs:
        lu=u.lower()
        if any(n.replace(' ','-') in lu or n.replace(' ','_') in lu for n in needles): return u
    raise RuntimeError('Image not found: '+str(needles))

def save(url,path):
    r=requests.get(url,headers={'User-Agent':'Mozilla/5.0'},timeout=30); r.raise_for_status()
    im=Image.open(io.BytesIO(r.content)).convert('RGBA')
    Path(path).parent.mkdir(parents=True,exist_ok=True)
    im.save(path,'WEBP',quality=92,method=6)

assets={
'portrait.webp':('hervor',),
'skill-earthmover.webp':('землеройная машина','earthmover'),
'skill-mountain-strength.webp':('горная сила','mountain strength'),
'skill-stone-arms.webp':('каменные армсы','каменные руки','stone arms'),
'skill-call-for-blood.webp':('призыв к крови','зов крови','call for blood'),
'skill-undying.webp':('бессмертный','неумирающая','undying'),
'skill-battlethirsty.webp':('жаждущий битвы','жаждущая битвы','battlethirsty'),
'gear-hammer-of-sathla.webp':('молот сатлы','hammer of sathla'),
'gear-mark-of-chieftain.webp':('знак вождя','mark of the chieftain'),
'gear-fort-of-rock.webp':('форт рока','fort of rock'),
}
for fn,needles in assets.items(): save(pick(*needles),f'assets/heroes/gen-12/hervor/{fn}')

src=Path('hero-lloyd.html').read_text(encoding='utf-8')
repls=[
(r'<title>.*?</title>','<title>Хервор: навыки, Молот Сатлы, плюсы и минусы | Белая мгла</title>'),
(r'<meta name="description" content="[^"]*"/>','<meta name="description" content="Подробный гайд по Хервор: герой 12 поколения, навыки Освоения и Экспедиции, Молот Сатлы, PvP, гарнизон, Арена, Медведь, прокачка, плюсы и минусы."/>'),
(r'<link rel="canonical" href="[^"]*"/>','<link rel="canonical" href="https://belaya-mgla-sova58.github.io/hero-hervor.html"/>'),
(r'<meta property="og:title" content="[^"]*"/>','<meta property="og:title" content="Хервор: полный гайд"/>'),
(r'<meta property="og:description" content="[^"]*"/>','<meta property="og:description" content="Навыки, Молот Сатлы, PvP, гарнизон, Арена, Свирепый медведь, плюсы и минусы Хервор."/>'),
(r'<meta property="og:url" content="[^"]*"/>','<meta property="og:url" content="https://belaya-mgla-sova58.github.io/hero-hervor.html"/>'),
(r'<meta property="og:image" content="[^"]*"/>','<meta property="og:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-12/hervor/portrait.webp"/>'),
(r'<meta name="twitter:image" content="[^"]*"/>','<meta name="twitter:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-12/hervor/portrait.webp"/>')]
for pat,val in repls: src=re.sub(pat,val,src,1,flags=re.S)
src=re.sub(r'<script id="guide-article-schema-v625" type="application/ld\+json">.*?</script>','<script id="guide-article-schema-v625" type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Хервор: полный гайд","description":"Подробный гайд по Хервор: герой 12 поколения, навыки, Молот Сатлы, PvP, гарнизон, Арена и прокачка.","url":"https://belaya-mgla-sova58.github.io/hero-hervor.html","mainEntityOfPage":{"@type":"WebPage","@id":"https://belaya-mgla-sova58.github.io/hero-hervor.html"},"author":{"@type":"Person","name":"SOVA58","url":"https://belaya-mgla-sova58.github.io/sova58.html","gender":"Female"},"isPartOf":{"@type":"WebSite","name":"Белая мгла · SOVA58","url":"https://belaya-mgla-sova58.github.io/"},"inLanguage":"ru","dateModified":"2026-10-23","image":["https://belaya-mgla-sova58.github.io/assets/heroes/gen-12/hervor/portrait.webp"]}</script>',src,1,flags=re.S)
src=re.sub(r'<script type="application/ld\+json">\{"@context":"https://schema.org","@type":"BreadcrumbList".*?</script>','<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://belaya-mgla-sova58.github.io/"},{"@type":"ListItem","position":2,"name":"Герои","item":"https://belaya-mgla-sova58.github.io/heroes.html"},{"@type":"ListItem","position":3,"name":"Хервор","item":"https://belaya-mgla-sova58.github.io/hero-hervor.html"}]}</script>',src,1,flags=re.S)
src=re.sub(r'data-hero="[^"]+"','data-hero="hervor"',src,1)

body='''<div class="jero-crumbs"><a href="index.html">Главная</a> · <a href="heroes.html">Герои</a> · Хервор</div>
<section class="jero-hero">
<div class="jero-portrait-wrap"><img class="jero-portrait" src="assets/heroes/gen-12/hervor/portrait.webp" alt="Хервор"></div>
<div><div class="jero-kicker"><span class="jero-chip gold">12 поколение</span><span class="jero-chip">Пехота</span><span class="jero-chip">Мифический</span><span class="jero-chip">Бой</span></div><h1>Хервор</h1><p class="jero-subtitle">Танк · смертоносность всего марша · контроль и устрашение</p><p class="jero-lead">Хервор — пехотный фронтовик 12 поколения. Она переживает мощный фокус, первые 9 секунд почти не боится контроля, ослабляет противника и даёт всему маршу стабильную смертоносность. В большой битве её ценность — держать переднюю линию живой, пока стрелки и копейщики делают свою работу.</p><div class="jero-quick"><div><b>Получение</b><span>Зал героев, Литейный цех и универсальные мифические осколки</span></div><div><b>Главная роль</b><span>Гарнизон, PvP, фронт атакующего марша и сборы</span></div><div><b>Для F2P</b><span>Сильная, но без Колеса удачи; обычно после доступного героя Колеса 12 поколения</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div></div></section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#explore">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#use">Применение</a><a href="#verdict">Итог</a></nav>
<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные значения по актуальной карточке героя.</p><div class="jero-stats"><div class="jero-stat"><strong>13 674</strong><span>Атака героя</span></div><div class="jero-stat"><strong>17 826</strong><span>Защита героя</span></div><div class="jero-stat"><strong>267 398</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>1 451,16%</strong><span>Атака пехоты</span></div><div class="jero-stat"><strong>1 451,16%</strong><span>Защита пехоты</span></div></div></section>
<section class="jero-section" id="explore"><h2>Навыки Освоения</h2><p class="jero-section-lead">На Арене Хервор играет роль живой стены: оглушает, режет атаку врага и постепенно делает цель уязвимее.</p><div class="jero-skill-grid">
<article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-12/hervor/skill-earthmover.webp" alt="Землеройная машина"><div><h3>Землеройная машина</h3><small>Фронтальный удар · оглушение</small></div></div><p>Удар молотом по фронтальным врагам наносит урон, оглушает на 1 секунду и накладывает Устрашение, снижая атаку противника на 25% на 3 секунды.</p><p class="jero-values">100 / 110 / 120 / 130 / 140% атаки</p></article>
<article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-12/hervor/skill-mountain-strength.webp" alt="Горная сила"><div><h3>Горная сила</h3><small>Устрашение · до 3 стаков</small></div></div><p>Обычные атаки могут наложить Устрашение, увеличивающее получаемый противником урон. Эффект суммируется до 3 раз.</p><p class="jero-values">Шанс 5 / 10 / 15 / 20 / 25% · получаемый урон +3 / 6 / 9 / 12 / 15% за стак</p></article>
<article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-12/hervor/skill-stone-arms.webp" alt="Каменные руки"><div><h3>Каменные руки</h3><small>Выживаемость · иммунитет к контролю</small></div></div><p>Снижает получаемый Хервор урон. В первые 9 секунд боя она невосприимчива к оглушению, параличу, заморозке и другим эффектам контроля.</p><p class="jero-values">Получаемый урон −5 / 10 / 15 / 20 / 25%</p></article>
</div></section>
<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><p class="jero-section-lead">Здесь раскрывается главная ценность Хервор: стабильный бонус всему маршу и очень плотная пехота.</p><div class="jero-skill-grid">
<article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-12/hervor/skill-call-for-blood.webp" alt="Призыв к крови"><div><h3>Призыв к крови</h3><small>Смертоносность всех войск</small></div></div><p>Боевой клич повышает смертоносность всех войск марша.</p><p class="jero-values">+5 / 10 / 15 / 20 / 25%</p></article>
<article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-12/hervor/skill-undying.webp" alt="Бессмертный"><div><h3>Бессмертный</h3><small>Пехота · защита от двух типов урона</small></div></div><p>Пехота Хервор получает меньше урона от обычных атак и отдельно меньше урона от вражеских навыков.</p><p class="jero-values">Обычные атаки −5 / 10 / 15 / 20 / 25% · навыки −6 / 12 / 18 / 24 / 30%</p></article>
<article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-12/hervor/skill-battlethirsty.webp" alt="Жаждущий битвы"><div><h3>Жаждущий битвы</h3><small>Пехота · защита и урон</small></div></div><p>Ещё сильнее укрепляет пехоту: одновременно снижает получаемый ею урон и повышает наносимый.</p><p class="jero-values">Получаемый урон −3 / 6 / 9 / 12 / 15% · наносимый урон +2 / 4 / 6 / 8 / 10%</p></article>
</div><div class="jero-note"><strong>Для сборов:</strong> первый навык Хервор даёт стабильные +25% смертоносности всему маршу. Поэтому она полезна не только как танк лидера, но и как участник сбора, если правила события учитывают первый экспедиционный навык героя.</div></section>
<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="assets/heroes/gen-12/hervor/gear-hammer-of-sathla.webp" alt="Молот Сатлы"><div><h3 class="jero-gear-title">Молот Сатлы</h3><p class="jero-section-lead">Максимальные бонусы: +2 770 атаки, +3 613 защиты, +54 202 здоровья героя, +362,5% смертоносности и +362,5% здоровья войск.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="assets/heroes/gen-12/hervor/gear-mark-of-chieftain.webp" alt="Знак вождя"><div><b>Знак вождя</b><span>На 5 уровне повышает скорость атаки Хервор на 30% и шанс Устрашения от обычных атак ещё на 25%.</span></div></div><div class="jero-gear-skill"><img src="assets/heroes/gen-12/hervor/gear-fort-of-rock.webp" alt="Форт Рока"><div><b>Форт Рока</b><span>На 5 уровне повышает защиту войск защитника на 15%.</span></div></div></div></div></div></section>
<section class="jero-section" id="use"><h2>Где использовать Хервор</h2><div class="jero-mode-grid"><div class="jero-mode"><b>Гарнизон</b><p>Одна из её лучших ролей: высокий запас здоровья, снижение урона пехоте и +15% защиты защитников от эксклюзивки.</p></div><div class="jero-mode"><b>PvP</b><p>Очень сильный фронтовик. Устрашение снижает давление врага и помогает команде быстрее пробивать отмеченные цели.</p></div><div class="jero-mode"><b>Арена</b><p>Оглушение, иммунитет к контролю первые 9 секунд и стаки повышенного входящего урона делают её неприятной передней линией.</p></div><div class="jero-mode"><b>Свирепый медведь</b><p>Полезна как участник сбора благодаря первому навыку Экспедиции: до +25% смертоносности всем войскам. Как лидер её защитная часть менее важна, чем на PvP.</p></div></div></section>
<section class="jero-section"><h2>Приоритет прокачки</h2><div class="jero-priority"><div><b><span class="jero-rank">1</span>Призыв к крови</b><span>Стабильные +25% смертоносности всему маршу.</span></div><div><b><span class="jero-rank">2</span>Бессмертный</b><span>Ключевая выживаемость пехоты против обычных атак и навыков.</span></div><div><b><span class="jero-rank">3</span>Жаждущий битвы</b><span>Ещё один слой защиты плюс прирост урона пехоты.</span></div></div></section>
<section class="jero-section"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul><li>До +25% смертоносности всем войскам постоянным навыком.</li><li>Очень высокая живучесть пехоты.</li><li>До −30% урона от вражеских навыков по пехоте.</li><li>Иммунитет к контролю в первые 9 секунд Арены.</li><li>Устрашение может одновременно снижать давление врага и повышать входящий по цели урон.</li><li>Эксклюзивка усиливает гарнизон.</li></ul></div><div class="jero-box bad"><h3>Минусы</h3><ul><li>Нет Колеса удачи, поэтому для F2P она дороже героя Колеса 12 поколения.</li><li>Низкая личная атака относительно роли дамагера.</li><li>Два из трёх экспедиционных навыков ориентированы именно на пехоту.</li><li>Полный потенциал Устрашения на Арене требует времени и обычных атак.</li></ul></div></div></section>
<section class="jero-section" id="verdict"><div class="jero-verdict"><h3>Итог</h3><p><strong>Хервор — мощный пехотный танк 12 поколения для гарнизона и серьёзного PvP.</strong> Она не пытается выиграть бой одной цифрой урона: её задача — пережить фокус, ослабить противника и дать всему маршу +25% смертоносности. Для F2P сначала разумно закрывать более доступного героя Колеса 12 поколения, а Хервор добирать через Зал героев и Литейный цех.</p></div><div class="jero-sources"><a href="https://whiteout-survival.com/ru/heroes/hervor/" target="_blank" rel="noopener">Источник: русская карточка Хервор</a><a href="https://www.whiteoutsurvival-community.com/tools/wiki/heroes/hervor.html" target="_blank" rel="noopener">Дополнительная проверка поколения и механики</a><a href="https://wosheroes.com/heroes/hervor/" target="_blank" rel="noopener">WOS Heroes: поколение и снаряжение</a></div><a class="jero-back" href="heroes.html">← Вернуться к героям</a></section>
<div class="jero-foot">Белая мгла · SOVA58 · актуализировано 23.10.2026</div>'''
src=re.sub(r'<main><div class="jero-page">.*?</div></main>', '<main><div class="jero-page">'+body+'</div></main>', src, count=1, flags=re.S)
Path('hero-hervor.html').write_text(src,encoding='utf-8')

p=Path('sitemap.xml'); sm=p.read_text(encoding='utf-8')
entry='  <url><loc>https://belaya-mgla-sova58.github.io/hero-hervor.html</loc><lastmod>2026-10-23</lastmod></url>\n'
if 'hero-hervor.html' not in sm: sm=sm.replace('</urlset>',entry+'</urlset>')
p.write_text(sm,encoding='utf-8')
