from pathlib import Path
import re
import requests

ROOT = Path('.')
TEMPLATE = ROOT / 'hero-gwen.html'
OUT = ROOT / 'hero-renee.html'
ASSET_DIR = ROOT / 'assets/heroes/gen-06/renee'
ASSET_DIR.mkdir(parents=True, exist_ok=True)

session = requests.Session()
session.headers.update({'User-Agent': 'Mozilla/5.0 SOVA58-site-builder/1.0'})

assets = {
    'portrait.webp': 'https://wos.h5joy-games.com/games/icon_hero_avatar_renee.webp',
    'skill-illusion-cloud.webp': 'https://wos.h5joy-games.com/games/icon_hero_skill_illusion_cloud.webp',
    'skill-starpaint.webp': 'https://wos.h5joy-games.com/games/icon_hero_skill_starpaint.webp',
    'skill-dream-vision.webp': 'https://wos.h5joy-games.com/games/icon_hero_skill_dream_vision.webp',
    'skill-nightmare-trace.webp': 'https://wos.h5joy-games.com/games/icon_hero_skill_nightmare_trace.webp',
    'skill-dreamcatcher.webp': 'https://wos.h5joy-games.com/games/icon_hero_skill_dreamcatcher.webp',
    'skill-dreamslice.webp': 'https://wos.h5joy-games.com/games/icon_hero_skill_dreamslice.webp',
    'gear-illusion-magiball.webp': 'https://wos.h5joy-games.com/games/icon_hero_special_illusion_magiball.webp',
    'gear-dream-illusion.webp': 'https://wos.h5joy-games.com/games/icon_hero_special_skill_dream_illusion.webp',
    'gear-wistful-enchantment.webp': 'https://wos.h5joy-games.com/games/icon_hero_special_skill_wistful_enchantment.webp',
}

for filename, url in assets.items():
    r = session.get(url, timeout=30)
    r.raise_for_status()
    if len(r.content) < 1000:
        raise RuntimeError(f'Asset too small: {url} ({len(r.content)} bytes)')
    (ASSET_DIR / filename).write_bytes(r.content)

src = TEMPLATE.read_text(encoding='utf-8')
head, rest = src.split('</head>', 1)
head += '</head>'
# Keep canonical styling and site shell, replace only hero-specific metadata.
head = head.replace('Гвен', 'Рене')
head = head.replace('hero-gwen.html', 'hero-renee.html')
head = head.replace('assets/heroes/gen-05/gwen/portrait.webp', 'assets/heroes/gen-06/renee/portrait.webp')
head = head.replace('5 поколения', '6 поколения')
head = head.replace('Крылья надежды', 'Иллюзорный магический шар')

body_start = rest.index('<body')
main_start = rest.index('<main id="appMain">')
mobile_bottom = rest.index('<nav aria-label="Быстрая мобильная навигация"')
shell_top = rest[body_start:main_start]
shell_bottom = rest[mobile_bottom:]

main = '''<main id="appMain"><div class="route-page active" data-route="heroes"><div class="jero-page">
<nav aria-label="Хлебные крошки" class="jero-crumbs"><a href="index.html">Главная</a> › <a href="heroes.html">Герои</a> › <span>Рене</span></nav>
<section class="jero-hero"><div class="jero-portrait-wrap"><img class="jero-portrait" src="assets/heroes/gen-06/renee/portrait.webp" alt="Рене"/></div><div><div class="jero-kicker"><span class="jero-chip">6 поколение</span><span class="jero-chip">Копейщики</span><span class="jero-chip gold">Мифический</span><span class="jero-chip">Бой</span></div><h1>Рене</h1><p class="jero-subtitle">Метки грёз · усиление урона копейщиков · контроль на Арене</p><p class="jero-lead">Рене — мифический герой копейщиков 6 поколения и герой Колеса удачи. Её Освоение построено вокруг дезориентации и Звёздной метки, а Экспедиция — вокруг Меток грёз: они создают мощные всплески урона копейщиков и усиливают урон всей армии по отмеченной цели.</p><div class="jero-quick"><div><b>Получение</b><span>Колесо удачи 6 поколения и последующие источники осколков героя</span></div><div><b>Главная роль</b><span>Арена, PvP и лидер сборов с упором на копейщиков</span></div><div><b>F2P</b><span>Главный доступный герой 6 поколения: для большинства игроков приоритетнее платных героев поколения</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div></div></section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#exploration">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#priority">Прокачка</a><a href="#use">Применение</a><a href="#pros">Плюсы и минусы</a></nav>
<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные значения героя для 6 поколения.</p><div class="jero-stats"><div class="jero-stat"><strong>5 926</strong><span>Атака героя</span></div><div class="jero-stat"><strong>5 926</strong><span>Защита героя</span></div><div class="jero-stat"><strong>59 274</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>540.43%</strong><span>Атака копейщиков</span></div><div class="jero-stat"><strong>540.43%</strong><span>Защита копейщиков</span></div></div><div class="jero-note"><strong>Ключевая механика:</strong> не путай Звёздную метку из Освоения и Метку грёз из Экспедиции. Это разные эффекты для разных режимов боя.</div></section>
<section class="jero-section" id="exploration"><h2>Навыки Освоения</h2><p class="jero-section-lead">Навыки, которые работают в Освоении и на Арене.</p><div class="jero-skill-grid"><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-06/renee/skill-illusion-cloud.webp" alt="Облако иллюзий"/><div><h3>Облако иллюзий</h3></div></div><p>Разноцветный шар взрывается и наносит врагам по площади 100%/110%/120%/130%/140% атаки. Цели дезориентируются на 1 секунду и могут атаковать всех вокруг, включая своих.</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-06/renee/skill-starpaint.webp" alt="Звёздная краска"/><div><h3>Звёздная краска</h3></div></div><p>Наносит 50%/55%/60%/65%/70% атаки и оставляет Звёздную метку. Отмеченная цель получает на 2%/3%/4%/5%/6% больше урона в течение 4 секунд.</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-06/renee/skill-dream-vision.webp" alt="Видение грёз"/><div><h3>Видение грёз</h3></div></div><p>Повышает атаку Рене на 8%/12%/16%/20%/24% и увеличивает её урон по целям со Звёздной меткой на 4%/6%/8%/10%/12%.</p></article></div></section>
<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><p class="jero-section-lead">Основная связка Рене в маршах и сборах строится вокруг Меток грёз.</p><div class="jero-skill-grid"><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-06/renee/skill-nightmare-trace.webp" alt="След кошмара"/><div><h3>След кошмара</h3></div></div><p>Раз в 2 хода копейщики Рене ставят цели Метку грёз. На следующем ходу она один раз добавляет 40%/80%/120%/160%/200% урона копейщиков. Метка действует 1 ход.</p><p class="jero-values">Важно: актуальная механика 2026 года — раз в 2 хода.</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-06/renee/skill-dreamcatcher.webp" alt="Ловец снов"/><div><h3>Ловец снов</h3></div></div><p>Метки грёз подсвечивают уязвимости противника и увеличивают урон копейщиков по отмеченным целям на 30%/60%/90%/120%/150%.</p></article><article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-06/renee/skill-dreamslice.webp" alt="Рассечение грёз"/><div><h3>Рассечение грёз</h3></div></div><p>Увеличивает урон всех типов войск по целям с Меткой грёз на 15%/30%/45%/60%/75%. Именно этот навык делает Рене полезной не только в чисто копейщицкой армии.</p></article></div></section>
<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="assets/heroes/gen-06/renee/gear-illusion-magiball.webp" alt="Иллюзорный магический шар"/><div><h3 class="jero-gear-title">Иллюзорный магический шар</h3><p class="jero-section-lead">Максимальные характеристики: +1 201 атаки героя · +1 201 защиты · +12 015 здоровья · +133.5% смертоносности · +133.5% здоровья войск.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="assets/heroes/gen-06/renee/gear-dream-illusion.webp" alt="Грёзная иллюзия"/><div><b>Грёзная иллюзия</b><span>На 5 уровне обычные атаки получают 8% шанс дезориентировать цель на 1 секунду. Дезориентированная цель может атаковать как врагов, так и союзников вокруг себя.</span></div></div><div class="jero-gear-skill"><img src="assets/heroes/gen-06/renee/gear-wistful-enchantment.webp" alt="Тоскливые чары"/><div><b>Тоскливые чары</b><span>На 5 уровне повышает смертоносность войск в сборе на 15%.</span></div></div></div></div></div></section>
<section class="jero-section" id="priority"><h2>Приоритет прокачки</h2><div class="jero-two"><div class="jero-box"><h3>Освоение / Арена</h3><div class="jero-priority"><div><b><span class="jero-rank">1</span>Звёздная краска</b><span>Метка усиливает входящий по цели урон и запускает синергию набора</span></div><div><b><span class="jero-rank">2</span>Видение грёз</b><span>Усиливает атаку Рене и урон по отмеченным целям</span></div><div><b><span class="jero-rank">3</span>Облако иллюзий</b><span>Сильный AoE и дезориентация</span></div></div></div><div class="jero-box"><h3>Экспедиция / PvP</h3><div class="jero-priority"><div><b><span class="jero-rank">1</span>След кошмара</b><span>Создаёт Метки грёз и основной всплеск урона копейщиков</span></div><div><b><span class="jero-rank">2</span>Ловец снов</b><span>Максимально усиливает копейщиков по отмеченной цели</span></div><div><b><span class="jero-rank">3</span>Рассечение грёз</b><span>Распространяет усиление урона на всю армию</span></div></div></div></div></section>
<section class="jero-section" id="use"><h2>Где применять</h2><div class="jero-mode-grid"><div class="jero-mode"><b>Арена</b><p>Сильный контроль через дезориентацию, AoE и связку Звёздной метки с усилением урона.</p></div><div class="jero-mode"><b>PvP</b><p>Особенно хороша в более длинных боях, где Метки грёз успевают повторно сработать.</p></div><div class="jero-mode"><b>Лидер сбора</b><p>Лучший сценарий для её полного набора: работают все три походных навыка и бонус снаряжения к смертоносности сбора.</p></div><div class="jero-mode"><b>Свирепый медведь</b><p>Не является автоматической заменой Мии: два ключевых усиления Рене завязаны на копейщиков, тогда как типичная медвежья армия ориентирована на стрелков. Как присоединяющийся герой тоже не приоритет.</p></div></div></section>
<section class="jero-section" id="pros"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul><li>герой Колеса удачи и лучший доступный F2P-вход в 6 поколение</li><li>до +200% дополнительного урона копейщиков по циклу Метки грёз</li><li>до +150% урона копейщиков по отмеченной цели</li><li>до +75% урона всех войск по отмеченной цели</li><li>сильный контроль и дебаффы в Арене</li><li>снаряжение даёт до +15% смертоносности войск в сборе</li></ul></div><div class="jero-box bad"><h3>Минусы</h3><ul><li>полный потенциал раскрывается не мгновенно, а через цикл меток</li><li>два главных походных усиления сильнее всего работают именно с копейщиками</li><li>для Свирепого медведя не является очевидным улучшением по сравнению с Мией</li><li>как участник чужого сбора использует заметно меньшую часть полного набора</li></ul></div></div><div class="jero-verdict"><h3>Итог</h3><p>Рене — главный F2P-герой 6 поколения. Для большинства игроков Колесо удачи делает её самым разумным вложением поколения: она заметно усиливает копейщиков, хорошо работает на Арене и становится особенно опасной как лидер затяжного PvP-сбора. Для Медведя её не стоит автоматически ставить вместо Мии.</p></div></section>
<section class="jero-section"><h2>Источники</h2><div class="jero-sources"><a href="https://whiteout-survival.com/ru/heroes/renee/" target="_blank" rel="noopener">Карточка героя</a><a href="https://www.papazot.com/ru/heroes/renee" target="_blank" rel="noopener">Русская база героя</a><a href="https://www.whiteoutsurvival-community.com/tools/wiki/heroes/renee.html" target="_blank" rel="noopener">WSCO Wiki · обновление 2026</a><a href="https://wosheroes.com/heroes/renee/" target="_blank" rel="noopener">WOS Heroes · характеристики и механика</a></div></section>
<a class="jero-back" href="heroes.html">← Все герои</a><div class="jero-foot">Белая мгла · SOVA58 · обновлено 23.10.2026</div></div></div></main>
'''

OUT.write_text(head + '\n' + shell_top + main + shell_bottom, encoding='utf-8')

# Add to sitemap once.
sitemap = ROOT / 'sitemap.xml'
s = sitemap.read_text(encoding='utf-8')
url = 'https://belaya-mgla-sova58.github.io/hero-renee.html'
if url not in s:
    entry = f'  <url><loc>{url}</loc><lastmod>2026-10-23</lastmod></url>\n'
    s = s.replace('</urlset>', entry + '</urlset>')
    sitemap.write_text(s, encoding='utf-8')

# Guard against template leakage.
out = OUT.read_text(encoding='utf-8')
for forbidden in ['hero-gwen.html', 'gen-05/gwen', '>Гвен<', 'Крылья надежды']:
    if forbidden in out:
        raise RuntimeError(f'Template leak: {forbidden}')
print('Renee page built:', OUT)
print('Assets:', len(list(ASSET_DIR.glob('*.webp'))))
