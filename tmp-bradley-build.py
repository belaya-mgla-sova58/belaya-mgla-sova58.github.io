from pathlib import Path
import re, requests
from bs4 import BeautifulSoup

ROOT=Path('.')
TEMPLATE=ROOT/'hero-wu-ming.html'
OUT=ROOT/'hero-bradley.html'
ASSET_DIR=ROOT/'assets/heroes/gen-07/bradley'
ASSET_DIR.mkdir(parents=True,exist_ok=True)
SRC='https://whiteout-survival.com/ru/heroes/bradley/'

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
    raise RuntimeError(f'asset not found {filename}; terms={terms}; sample={imgs[:60]}')

base='https://wos.h5joy-games.com/games/'
pick('portrait.webp',['bradley'],[base+'icon_hero_avatar_bradley.webp'])
pick('skill-destructor.webp',['destructor'],[base+'icon_hero_skill_destructor.webp'])
pick('skill-incendiary-shell.webp',['incendiary'],[base+'icon_hero_skill_incendiary_shell.webp'])
pick('skill-audacious.webp',['audacious'],[base+'icon_hero_skill_audacious.webp'])
pick('skill-veterans-might.webp',['veteran'],[base+'icon_hero_skill_veterans_might.webp'])
pick('skill-power-shot.webp',['power','shot'],[base+'icon_hero_skill_power_shot.webp'])
pick('skill-tactical-assistance.webp',['tactical'],[base+'icon_hero_skill_tactical_assistance.webp'])
pick('gear-thunder-cannon.webp',['thunder','cannon'],[base+'icon_hero_special_thunder_cannon.webp'])
pick('gear-onslaught.webp',['onslaught'],[base+'icon_hero_special_skill_onslaught.webp'])
pick('gear-siege-insight.webp',['siege'],[base+'icon_hero_special_skill_siege_insight.webp'])

src=TEMPLATE.read_text(encoding='utf-8')
head,rest=src.split('</head>',1); head+='</head>'
head=re.sub(r'<title>.*?</title>','<title>Бредли: навыки, Громовая пушка, плюсы и минусы | Белая мгла</title>',head,flags=re.S)
head=re.sub(r'<meta name="description" content=".*?"/>','<meta name="description" content="Подробный гайд по Бредли: герой 7 поколения, навыки Освоения и Экспедиции, Громовая пушка, PvP, сборы, Арена, Свирепый медведь, прокачка, плюсы и минусы."/>',head,flags=re.S)
head=re.sub(r'<link rel="canonical" href="[^"]+"/>','<link rel="canonical" href="https://belaya-mgla-sova58.github.io/hero-bradley.html"/>',head)
head=re.sub(r'<meta property="og:title" content=".*?"/>','<meta property="og:title" content="Бредли: полный гайд"/>',head)
head=re.sub(r'<meta property="og:description" content=".*?"/>','<meta property="og:description" content="Навыки, Громовая пушка, PvP, сборы, Арена, Свирепый медведь, плюсы и минусы Бредли."/>',head)
head=re.sub(r'<meta property="og:url" content="[^"]+"/>','<meta property="og:url" content="https://belaya-mgla-sova58.github.io/hero-bradley.html"/>',head)
head=re.sub(r'<meta property="og:image" content="[^"]+"/>','<meta property="og:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-07/bradley/portrait.webp"/>',head)
head=re.sub(r'<meta name="twitter:image" content="[^"]+"/>','<meta name="twitter:image" content="https://belaya-mgla-sova58.github.io/assets/heroes/gen-07/bradley/portrait.webp"/>',head)
head=re.sub(r'<script id="guide-article-schema-v625" type="application/ld\+json">.*?</script>','<script id="guide-article-schema-v625" type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Бредли: полный гайд","description":"Подробный гайд по Бредли: герой 7 поколения, навыки, Громовая пушка, PvP, сборы, Арена и прокачка.","url":"https://belaya-mgla-sova58.github.io/hero-bradley.html","mainEntityOfPage":{"@type":"WebPage","@id":"https://belaya-mgla-sova58.github.io/hero-bradley.html"},"author":{"@type":"Person","name":"SOVA58","url":"https://belaya-mgla-sova58.github.io/sova58.html","gender":"Female"},"isPartOf":{"@type":"WebSite","name":"Белая мгла · SOVA58","url":"https://belaya-mgla-sova58.github.io/"},"inLanguage":"ru","dateModified":"2026-10-23","image":["https://belaya-mgla-sova58.github.io/assets/heroes/gen-07/bradley/portrait.webp"]}</script>',head,flags=re.S)
head=re.sub(r'<script type="application/ld\+json">\{"@context":"https://schema.org","@type":"BreadcrumbList".*?</script>','<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://belaya-mgla-sova58.github.io/"},{"@type":"ListItem","position":2,"name":"Герои","item":"https://belaya-mgla-sova58.github.io/heroes.html"},{"@type":"ListItem","position":3,"name":"Бредли","item":"https://belaya-mgla-sova58.github.io/hero-bradley.html"}]}</script>',head,flags=re.S)

body_start=rest.index('<body')
main_start=rest.index('<main id="appMain">')
mobile_bottom=rest.index('<nav aria-label="Быстрая мобильная навигация"')
shell_top=rest[body_start:main_start]
shell_bottom=rest[mobile_bottom:]
main='''<main id="appMain"><div class="route-page active" data-route="heroes"><div class="jero-page">
<nav aria-label="Хлебные крошки" class="jero-crumbs"><a href="index.html">Главная</a> › <a href="heroes.html">Герои</a> › <span>Бредли</span></nav>
<section class="jero-hero"><div class="jero-portrait-wrap"><img class="jero-portrait" src="assets/heroes/gen-07/bradley/portrait.webp" alt="Бредли"/></div><div><div class="jero-kicker"><span class="jero-chip">7 поколение</span><span class="jero-chip">Стрелки</span><span class="jero-chip gold">Мифический</span><span class="jero-chip">Бой</span></div><h1>Бредли</h1><p class="jero-subtitle">AoE-урон · атакующий сбор · универсальные усиления войск</p><p class="jero-lead">Бредли — один из самых выгодных героев 7 поколения. Он доступен через Колесо удачи, наносит мощный урон по области и усиливает весь марш сразу тремя навыками Экспедиции. Особенно хорош в атакующих сборах, на Свирепом медведе, в PvP и на Арене.</p><div class="jero-quick"><div><b>Получение</b><span>Колесо удачи и более поздние источники осколков поколения</span></div><div><b>Главная роль</b><span>атакующий сбор, PvP, Свирепый медведь</span></div><div><b>Для F2P</b><span>очень высокий приоритет: основной герой Колеса удачи 7 поколения</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div></div></section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#exploration">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#priority">Прокачка</a><a href="#use">Применение</a><a href="#pros">Плюсы и минусы</a></nav>
<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные значения героя 7 поколения.</p><div class="jero-stats"><div class="jero-stat"><strong>8 656</strong><span>Атака героя</span></div><div class="jero-stat"><strong>7 126</strong><span>Защита героя</span></div><div class="jero-stat"><strong>53 446</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>650.52%</strong><span>Атака стрелков</span></div><div class="jero-stat"><strong>650.52%</strong><span>Защита стрелков</span></div></div><div class="jero-note"><strong>Главная особенность:</strong> все три навыка Экспедиции работают на весь марш. Бредли даёт постоянную атаку, дополнительный урон против пехоты и копейщиков и периодическое усиление общего урона.</div></section>
<section class="jero-section" id="exploration"><h2>Навыки Освоения</h2><p class="jero-section-lead">На Арене Бредли играет роль дальнего AoE-бойца и особенно опасен, когда противники стоят плотной группой.</p><div class="jero-skill-grid"><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/bradley/skill-destructor.webp" alt="Разрушитель"/><div><h3>Разрушитель</h3></div></div><p>Заряжает артиллерию мощным снарядом и наносит большой урон по области.</p><p class="jero-values">300% / 330% / 360% / 390% / 420% атаки</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/bradley/skill-incendiary-shell.webp" alt="Зажигательный снаряд"/><div><h3>Зажигательный снаряд</h3></div></div><p>Наносит урон по области и оставляет пылающую воронку на 2 секунды. Она наносит дополнительный урон каждые 0.5 секунды.</p><p class="jero-values">Удар 60/66/72/78/84% · горение 17/19/21/23/25%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/bradley/skill-audacious.webp" alt="Дерзость"/><div><h3>Дерзость</h3></div></div><p>Пассивно повышает собственную атаку Бредли.</p><p class="jero-values">+10% / +14% / +18% / +22% / +26%</p></article></div></section>
<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><p class="jero-section-lead">Именно этот набор делает Бредли одним из лучших стрелков поколения для больших боёв.</p><div class="jero-skill-grid"><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/bradley/skill-veterans-might.webp" alt="Мощь ветерана"/><div><h3>Мощь ветерана</h3></div></div><p>Постоянно повышает атаку всех дружественных войск.</p><p class="jero-values">+5% / +10% / +15% / +20% / +25%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/bradley/skill-power-shot.webp" alt="Мощный выстрел"/><div><h3>Мощный выстрел</h3></div></div><p>Увеличивает урон всех войск против вражеских копейщиков и пехоты. Бонус относится к типу цели, а не к типу ваших войск.</p><p class="jero-values">По копейщикам +6/12/18/24/30% · по пехоте +5/10/15/20/25%</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-07/bradley/skill-tactical-assistance.webp" alt="Тактическая поддержка"/><div><h3>Тактическая поддержка</h3></div></div><p>Каждые 4 хода на 2 хода повышает наносимый всеми войсками урон.</p><p class="jero-values">+6% / +12% / +18% / +24% / +30%</p></article></div></section>
<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="assets/heroes/gen-07/bradley/gear-thunder-cannon.webp" alt="Громовая пушка"/><div><h3 class="jero-gear-title">Громовая пушка</h3><p class="jero-section-lead">Максимальные характеристики: +1 752 атаки героя · +1 444 защиты · +10 833 здоровья · +160.50% смертоносности · +160.50% здоровья войск.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="assets/heroes/gen-07/bradley/gear-onslaught.webp" alt="Натиск"/><div><b>Натиск</b><span>На 5 уровне после «Разрушителя» скорость атаки героев и бойцов сопровождения повышается на 14% на 5 секунд.</span></div></div><div class="jero-gear-skill"><img src="assets/heroes/gen-07/bradley/gear-siege-insight.webp" alt="Знаток осады"/><div><b>Знаток осады</b><span>На 5 уровне повышает атаку обороняющихся войск на 15%.</span></div></div></div></div></div></section>
<section class="jero-section" id="priority"><h2>Приоритет прокачки</h2><div class="jero-priority"><div><b><span class="jero-rank">1</span>Мощь ветерана</b><span>Самый стабильный бонус для Экспедиции и присоединения к сбору.</span></div><div><b><span class="jero-rank">2</span>Тактическая поддержка</b><span>Сильное периодическое усиление общего урона всего марша.</span></div><div><b><span class="jero-rank">3</span>Разрушитель</b><span>Главный источник взрывного AoE-урона на Арене.</span></div></div><div class="jero-note"><strong>Для F2P:</strong> основной путь получения Бредли — Колесо удачи. Обычно выгоднее тратить на него самоцветы, а универсальные мифические осколки сохранять для героев без Колеса.</div></section>
<section class="jero-section" id="use"><h2>Где использовать</h2><div class="jero-mode-grid"><div class="jero-mode"><b>Свирепый медведь</b><p><strong>Отлично.</strong> «Мощь ветерана» и «Тактическая поддержка» усиливают общий урон. «Мощный выстрел» против Медведя не даёт классового бонуса.</p></div><div class="jero-mode"><b>Атакующий сбор</b><p><strong>Одна из лучших ролей.</strong> Три навыка Экспедиции усиливают весь марш и хорошо масштабируются в больших боях.</p></div><div class="jero-mode"><b>Гарнизон</b><p><strong>Хорошо.</strong> Основной набор универсален, а «Знаток осады» дополнительно даёт до +15% атаки обороняющихся войск.</p></div><div class="jero-mode"><b>Арена</b><p><strong>Очень хорошо.</strong> «Разрушитель» наносит 420% AoE-урона, а зажигательный снаряд оставляет опасную зону.</p></div></div></section>
<section class="jero-section" id="pros"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul><li>Колесо удачи: очень выгодный герой для F2P.</li><li>+25% атаки всех войск постоянно.</li><li>До +30% общего урона на 2 хода каждые 4 хода.</li><li>Сильный дополнительный урон по пехоте и копейщикам.</li><li>420% AoE-удар на Арене.</li><li>Полезен в атакующем сборе, Медведе, PvP и гарнизоне.</li></ul></div><div class="jero-box bad"><h3>Минусы</h3><ul><li>«Мощный выстрел» не усиливает урон по целям без класса, включая Медведя.</li><li>«Тактическая поддержка» работает не постоянно, а по циклу.</li><li>Нет отдельного эксклюзивного бонуса именно для атакующего сбора.</li><li>На Арене нуждается в хорошем фронте, чтобы успеть реализовать AoE.</li></ul></div></div></section>
<section class="jero-section"><div class="jero-verdict"><h3>Вердикт</h3><p><strong>Бредли — один из самых важных героев 7 поколения для большинства игроков.</strong> Его стоит активно собирать через Колесо удачи. Для F2P он особенно ценен: заменяет старых стрелков, усиливает весь марш и остаётся полезным далеко за пределами своего поколения.</p></div><div class="jero-sources"><a href="https://whiteout-survival.com/ru/heroes/bradley/" rel="nofollow noopener" target="_blank">Исходная карточка героя</a><a href="https://whiteoutlab.ru/wiki/heroes/bradley" rel="nofollow noopener" target="_blank">WOS Lab</a><a href="https://www.whiteoutsurvival-community.com/tools/wiki/heroes-db.html" rel="nofollow noopener" target="_blank">WSCO Wiki</a><a href="https://wosguru.com/hero/bradley" rel="nofollow noopener" target="_blank">WoS Guru</a></div><a class="jero-back" href="heroes.html">← Ко всем героям</a></section>
<div class="jero-foot">Белая мгла · SOVA58 · данные перепроверены по нескольким актуальным источникам</div>
</div></div></main>'''
OUT.write_text(head+shell_top+main+shell_bottom,encoding='utf-8')

sm=ROOT/'sitemap.xml'
text=sm.read_text(encoding='utf-8')
url='https://belaya-mgla-sova58.github.io/hero-bradley.html'
if url not in text:
    entry=f'  <url><loc>{url}</loc><lastmod>2026-10-23</lastmod></url>\n'
    text=text.replace('</urlset>',entry+'</urlset>')
    sm.write_text(text,encoding='utf-8')

print('Bradley page built:', OUT, 'assets:', len(list(ASSET_DIR.iterdir())))
