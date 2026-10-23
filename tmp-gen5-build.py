from pathlib import Path
from io import BytesIO
import html
import re
import requests
from bs4 import BeautifulSoup
from PIL import Image

ROOT = "https://belaya-mgla-sova58.github.io/"
DATE = "2026-10-23"
BASE = Path("hero-reina.html").read_text(encoding="utf-8")
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; SOVA58-site-builder/1.0)"}

HEROES = {
    "hector": {
        "name": "Гектор",
        "english": "Hector",
        "troop": "Пехота",
        "troop_attack": "Атака пехоты",
        "troop_defense": "Защита пехоты",
        "subtitle": "Передняя линия · иммунитет к контролю · герой Колеса удачи",
        "source": "https://whiteout-survival.com/heroes/hector/",
        "lab": "https://whiteoutlab.ru/wiki/heroes/hector",
        "stats": ["3 780", "4 928", "73 926", "444.35%", "444.35%"],
        "obtain": "Колесо удачи, Зал героев, Ежедневные предложения, универсальные мифические фрагменты",
        "role": "Пехотный фронтовик для Арены, PvP и гарнизона",
        "f2p": "Главный доступный приоритет 5 поколения благодаря Колесу удачи",
        "lead": "Гектор — мифический герой пехоты 5 поколения и один из главных ориентиров для игроков без крупных покупок. В Освоении он резко ускоряет атаки, получает иммунитет к контролю и становится опаснее при низком здоровье. В Экспедиции сочетает выживаемость всей армии с мощным усилением пехоты и стрелков.",
        "skills_exploration": [
            ("Вихрь мечей", "skill-sword-whirlwind.webp", "Повышает скорость атаки на 80%/90%/100%/110%/120% и даёт иммунитет к заморозке, оглушению и другим эффектам контроля на 4 секунды."),
            ("Сорвиголова", "skill-desperado.webp", "Когда здоровье Гектора ниже 50%, получаемый им урон уменьшается на 20%/30%/40%/50%/60%."),
            ("Прилив адреналина", "skill-adrenaline-surge.webp", "Когда здоровье Гектора ниже 50%, его атака повышается на 16%/24%/32%/40%/48%.")
        ],
        "skills_expedition": [
            ("Инстинкт выживания", "skill-survival-instincts.webp", "С вероятностью 40% уменьшает получаемый всеми войсками урон на 10%/20%/30%/40%/50%."),
            ("Неудержимость", "skill-rampant.webp", "Повышает наносимый пехотой урон на 100%/125%/150%/175%/200%, а стрелками — на 20%/40%/60%/80%/100%. Эффект постепенно ослабевает с каждой атакой и действует серией атак."),
            ("Блиц", "skill-blitz.webp", "Даёт 25% шанс при атаке нанести 120%/140%/160%/180%/200% урона.")
        ],
        "gear_name": "Стальные клыки",
        "gear_file": "gear-steel-fangs.webp",
        "gear_stats": "+765 атаки героя · +999 защиты · +14 985 здоровья · +111% смертоносности · +111% здоровья войск",
        "gear1": ("Объятия жнеца", "gear-reapers-embrace.webp", "На 5 уровне продлевает «Вихрь мечей» на 1,5 секунды и восстанавливает Гектору здоровье в размере 15% нанесённого урона."),
        "gear2": ("Голиаф", "gear-goliath.webp", "На 5 уровне повышает атаку обороняющихся войск на 15%."),
        "priority_exploration": ["Вихрь мечей", "Сорвиголова", "Прилив адреналина"],
        "priority_expedition": ["Инстинкт выживания", "Неудержимость", "Блиц"],
        "modes": [
            ("Арена", "Очень сильный фронтовик: иммунитет к контролю, резкое ускорение атак и высокая живучесть при падении здоровья."),
            ("PvP", "Сильная пехота 5 поколения для атакующих и оборонительных маршей."),
            ("Гарнизон", "Эксклюзивное снаряжение повышает атаку обороняющихся войск до +15%."),
            ("Свирепый медведь", "Не лучший первый герой для присоединения к чужому сбору: его первый походный навык защитный. Как лидер сильного сбора полезен за счёт общей силы героя.")
        ],
        "pros": ["доступен через Колесо удачи", "до −50% получаемого урона всей армией по шансу", "очень сильный фронтовик Арены", "мощное усиление пехоты и стрелков"],
        "cons": ["первый походный навык защитный и слаб для чужого сбора на Медведя", "часть эффектов зависит от шанса или низкого здоровья", "позднее вытесняется более новыми поколениями"],
        "verdict": "Да. Для большинства игроков Гектор — главный приоритет 5 поколения и естественная замена более старой пехоте, особенно если есть запас самоцветов на Колесо удачи.",
        "alts": {
            "portrait.webp": ["Hector"],
            "skill-sword-whirlwind.webp": ["Sword Whirlwind"],
            "skill-desperado.webp": ["Desperado"],
            "skill-adrenaline-surge.webp": ["Adrenaline Surge"],
            "skill-survival-instincts.webp": ["Survival Instincts"],
            "skill-rampant.webp": ["Rampant"],
            "skill-blitz.webp": ["Blitz"],
            "gear-steel-fangs.webp": ["Steel Fangs"],
            "gear-reapers-embrace.webp": ["Reaper's Embrace"],
            "gear-goliath.webp": ["Goliath"]
        }
    },
    "norah": {
        "name": "Нора",
        "english": "Norah",
        "troop": "Копейщики",
        "troop_attack": "Атака копейщиков",
        "troop_defense": "Защита копейщиков",
        "subtitle": "Контроль · усиление пехоты и стрелков · универсальный PvP",
        "source": "https://whiteout-survival.com/heroes/norah/",
        "lab": "https://whiteoutlab.ru/wiki/heroes/norah",
        "stats": ["4 928", "4 928", "49 284", "444.35%", "444.35%"],
        "obtain": "Король ледяного поля, подготовка к СВС и другие соревновательные источники; позднее Зал героев",
        "role": "Контроль и универсальное усиление марша в PvP",
        "f2p": "Сильна, но значительно дороже Гектора для игрока без покупок",
        "lead": "Нора — мифический герой-копейщик 5 поколения с сильным сочетанием контроля, усиления союзных типов войск и темповых эффектов. Она особенно хорошо раскрывается в PvP и Арене, где гранаты дают контроль, а походные навыки одновременно повышают урон и снижают входящий урон.",
        "skills_exploration": [
            ("Заградительный огонь", "skill-barrage.webp", "Обрушивает каскад из 5 гранат по случайной цели, сначала по героям, нанося урон по области в размере 60%/66%/72%/78%/84% атаки."),
            ("Светошумовая граната", "skill-flashbang.webp", "Наносит 50%/55%/60%/65%/70% атаки и оглушает цель на 1,5 секунды."),
            ("Клич валькирии", "skill-valkyrie-cry.webp", "Повышает атаку всех войск на 3%/3.5%/4%/4.5%/5%.")
        ],
        "skills_expedition": [
            ("Общевойсковой бой", "skill-combined-arms.webp", "Для пехоты и стрелков снижает получаемый урон на 3%/6%/9%/12%/15% и одновременно повышает наносимый урон на 3%/6%/9%/12%/15%."),
            ("Скрытный удар", "skill-sneak-strike.webp", "Даёт 20% шанс при атаке нанести всем врагам 20%/40%/60%/80%/100% дополнительного урона."),
            ("Напор", "skill-momentum.webp", "Каждые 5 атак копейщиков на 2 хода повышает наносимый всеми войсками урон на 5%/10%/15%/20%/25% и снижает получаемый ими урон на те же 5%/10%/15%/20%/25%.")
        ],
        "gear_name": "Снежный крейсер",
        "gear_file": "gear-snow-cruiser.webp",
        "gear_stats": "+999 атаки героя · +999 защиты · +9 990 здоровья · +111% смертоносности · +111% здоровья войск",
        "gear1": ("Дезорганизатор", "gear-disruptor.webp", "На 5 уровне гранаты «Заградительного огня» получают 35% шанс оглушить цель на 1 секунду."),
        "gear2": ("Истинная стойкость", "gear-true-grit.webp", "На 5 уровне повышает защиту обороняющихся войск на 15%."),
        "priority_exploration": ["Заградительный огонь", "Светошумовая граната", "Клич валькирии"],
        "priority_expedition": ["Общевойсковой бой", "Напор", "Скрытный удар"],
        "modes": [
            ("Арена", "Серия гранат и оглушение делают Нору сильным контроллером и источником урона по площади."),
            ("PvP", "Один из самых универсальных героев поколения: одновременно усиливает урон и выживаемость."),
            ("Гарнизон", "Эксклюзивное снаряжение повышает защиту обороняющихся войск до +15%."),
            ("Свирепый медведь", "Может быть полезна при высокой прокачке, но её первый походный навык усиливает именно пехоту и стрелков, а не одинаково все типы войск.")
        ],
        "pros": ["сильный контроль в Арене", "одновременно усиливает пехоту и стрелков", "до +25% урона и −25% входящего урона темповым эффектом", "хорошо сохраняет ценность несколько поколений"],
        "cons": ["не является основным героем Колеса удачи", "дороже для F2P", "часть урона зависит от шанса и числа атак копейщиков"],
        "verdict": "Сильный второй выбор 5 поколения. Нора особенно хороша для PvP и обороны, но игроку без покупок разумнее сначала закончить Гектора.",
        "alts": {
            "portrait.webp": ["Norah"],
            "skill-barrage.webp": ["Barrage"],
            "skill-flashbang.webp": ["Flashbang"],
            "skill-valkyrie-cry.webp": ["Valkyrie Cry"],
            "skill-combined-arms.webp": ["Combined Arms"],
            "skill-sneak-strike.webp": ["Sneak Strike"],
            "skill-momentum.webp": ["Momentum"],
            "gear-snow-cruiser.webp": ["Snow Cruiser"],
            "gear-disruptor.webp": ["Disruptor"],
            "gear-true-grit.webp": ["True Grit"]
        }
    },
    "gwen": {
        "name": "Гвен",
        "english": "Gwen",
        "troop": "Стрелки",
        "troop_attack": "Атака стрелков",
        "troop_defense": "Защита стрелков",
        "subtitle": "Урон по задней линии · ослабление цели · герой атакующих сборов",
        "source": "https://whiteout-survival.com/heroes/gwen/",
        "lab": "https://whiteoutlab.ru/wiki/heroes/gwen",
        "stats": ["5 987", "4 928", "36 962", "444.35%", "444.35%"],
        "obtain": "Зал героев, Ежедневные предложения, универсальные мифические фрагменты",
        "role": "Стрелок задней линии для Арены, PvP и атакующих сборов",
        "f2p": "Сильна, но обычно идёт после Гектора; выбор между Гвен и Норой зависит от роли аккаунта",
        "lead": "Гвен — мифический стрелок 5 поколения с сильным уроном по задней линии и несколькими источниками усиленного урона. В Освоении она снижает скорость атаки противника, может удваивать точечный удар и поджигает область. В Экспедиции повышает получаемый целью урон и добавляет периодические всплески урона армии.",
        "skills_exploration": [
            ("Залп", "skill-salvo.webp", "Наносит задней линии урон по области в размере 180%/198%/216%/234%/252% атаки и снижает скорость атаки цели на 50% на 2 секунды."),
            ("Небесный снайпер", "skill-sky-sniper.webp", "Наносит 100%/110%/120%/130%/140% атаки с вероятностью 50% нанести двойной урон."),
            ("Адское пламя", "skill-hellfire.webp", "Поджигает все цели в области на 3 секунды, нанося 35%/38.5%/42%/45.5%/49% атаки каждую секунду.")
        ],
        "skills_expedition": [
            ("Орлиное зрение", "skill-eagle-vision.webp", "Повышает получаемый целью урон на 5%/10%/15%/20%/25%."),
            ("Господство в воздухе", "skill-air-dominance.webp", "Раз в 5 атак наносит 20%/40%/60%/80%/100% дополнительного урона и усиливает следующую атаку из любого источника на 5%/7.5%/10%/12.5%/15%."),
            ("Мастер взрывов", "skill-blastmaster.webp", "Раз в 4 атаки наносит всем врагам 10%/20%/30%/40%/50% дополнительного урона.")
        ],
        "gear_name": "Крылья надежды",
        "gear_file": "gear-wings-of-hope.webp",
        "gear_stats": "+1 212 атаки героя · +999 защиты · +7 492 здоровья · +111% смертоносности · +111% здоровья войск",
        "gear1": ("Огневая поддержка", "gear-fire-support-unit.webp", "На 5 уровне при применении навыка автоматическое вторичное оружие атакует случайную цель, в первую очередь героев, нанося 70% атаки."),
        "gear2": ("Мародёр", "gear-marauder.webp", "На 5 уровне повышает смертоносность войск в сборе на 15%."),
        "priority_exploration": ["Залп", "Небесный снайпер", "Адское пламя"],
        "priority_expedition": ["Орлиное зрение", "Господство в воздухе", "Мастер взрывов"],
        "modes": [
            ("Арена", "Очень сильный стрелок задней линии: AoE, снижение скорости атаки и точечный взрыв."),
            ("PvP", "Стабильно повышает входящий по цели урон и добавляет периодические атаки всей армии."),
            ("Атакующие сборы", "Эксклюзивное снаряжение повышает смертоносность войск в сборе до +15%."),
            ("Свирепый медведь", "Полезна прежде всего как лидер сильного сбора. «Орлиное зрение» повышает получаемый целью урон, но при присоединении всегда учитывай правила выбора первого походного навыка героя.")
        ],
        "pros": ["до +25% получаемого целью урона", "сильный урон по задней линии", "эксклюзивное снаряжение усиливает смертоносность сбора", "очень хороша в Арене и PvP"],
        "cons": ["не является основным героем Колеса удачи", "дороже для F2P", "часть бонусного урона завязана на циклы атак"],
        "verdict": "Очень сильный стрелок 5 поколения, особенно для Арены и атакующих сборов. Для F2P после Гектора выбор между Гвен и Норой зависит от того, нужна ли аккаунту атака или более универсальная поддержка.",
        "alts": {
            "portrait.webp": ["Gwen"],
            "skill-salvo.webp": ["Salvo"],
            "skill-sky-sniper.webp": ["Sky Sniper"],
            "skill-hellfire.webp": ["Hellfire"],
            "skill-eagle-vision.webp": ["Eagle Vision"],
            "skill-air-dominance.webp": ["Air Dominance"],
            "skill-blastmaster.webp": ["Blastmaster"],
            "gear-wings-of-hope.webp": ["Wings of Hope"],
            "gear-fire-support-unit.webp": ["Fire Support Unit"],
            "gear-marauder.webp": ["Marauder"]
        }
    }
}


def norm(s):
    return re.sub(r"\s+", " ", (s or "").strip()).lower()


def resolve_src(img):
    src = img.get("data-lazy-src") or img.get("data-src") or img.get("src") or ""
    if src.startswith("//"):
        src = "https:" + src
    elif src.startswith("/"):
        src = "https://whiteout-survival.com" + src
    return src


def find_image(soup, keys, portrait=False):
    images = soup.find_all("img")
    if portrait:
        exact = norm(keys[0])
        for img in images:
            if norm(img.get("alt")) == exact:
                src = resolve_src(img)
                if src.startswith("http"):
                    return src
    for img in images:
        alt = norm(img.get("alt"))
        if any(norm(k) in alt for k in keys):
            src = resolve_src(img)
            if src.startswith("http"):
                return src
    for key in keys:
        node = soup.find(string=re.compile(re.escape(key), re.I))
        if node:
            prev_img = node.find_previous("img")
            next_img = node.find_next("img")
            for img in (prev_img, next_img):
                if img:
                    src = resolve_src(img)
                    if src.startswith("http"):
                        return src
    if portrait:
        meta = soup.find("meta", property="og:image")
        if meta and meta.get("content"):
            return meta["content"]
    return None


def save_webp(url, target):
    r = requests.get(url, headers=HEADERS, timeout=40)
    r.raise_for_status()
    im = Image.open(BytesIO(r.content))
    target.parent.mkdir(parents=True, exist_ok=True)
    if im.mode in ("RGBA", "LA") or "transparency" in im.info:
        im = im.convert("RGBA")
    else:
        im = im.convert("RGB")
    im.save(target, "WEBP", quality=92, method=6)


def download_assets(slug, hero):
    r = requests.get(hero["source"], headers=HEADERS, timeout=40)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")
    out = Path(f"assets/heroes/gen-05/{slug}")
    missing = []
    for filename, keys in hero["alts"].items():
        url = find_image(soup, keys, portrait=(filename == "portrait.webp"))
        if not url:
            missing.append((filename, keys))
            continue
        try:
            save_webp(url, out / filename)
        except Exception as exc:
            missing.append((filename, [str(exc)]))
    if missing:
        raise RuntimeError(f"Missing assets for {slug}: {missing}")


def skill_cards(slug, skills):
    return "".join(
        f'<article class="jero-skill"><div class="jero-skill-head"><img src="assets/heroes/gen-05/{slug}/{img}" alt="{html.escape(name)}"/><div><h3>{html.escape(name)}</h3></div></div><p>{desc}</p></article>'
        for name, img, desc in skills
    )


def priority_cards(items):
    return "".join(
        f'<div><b><span class="jero-rank">{i}</span>{html.escape(name)}</b><span>{"Первый приоритет" if i == 1 else "Следующий приоритет"}</span></div>'
        for i, name in enumerate(items, 1)
    )


def build_main(slug, hero):
    name = hero["name"]
    se = skill_cards(slug, hero["skills_exploration"])
    sx = skill_cards(slug, hero["skills_expedition"])
    modes = "".join(f'<div class="jero-mode"><b>{a}</b><p>{b}</p></div>' for a, b in hero["modes"])
    pros = "".join(f"<li>{x}</li>" for x in hero["pros"])
    cons = "".join(f"<li>{x}</li>" for x in hero["cons"])
    pe = priority_cards(hero["priority_exploration"])
    px = priority_cards(hero["priority_expedition"])
    g1n, g1i, g1d = hero["gear1"]
    g2n, g2i, g2d = hero["gear2"]
    st = hero["stats"]
    return f'''<main id="appMain"><div class="route-page active" data-route="heroes"><div class="jero-page">
<nav aria-label="Хлебные крошки" class="jero-crumbs"><a href="index.html">Главная</a> › <a href="heroes.html">Герои</a> › <span>{name}</span></nav>
<section class="jero-hero"><div class="jero-portrait-wrap"><img class="jero-portrait" src="assets/heroes/gen-05/{slug}/portrait.webp" alt="{name}"/></div><div><div class="jero-kicker"><span class="jero-chip">5 поколение</span><span class="jero-chip">{hero['troop']}</span><span class="jero-chip gold">Мифический</span><span class="jero-chip">Бой</span></div><h1>{name}</h1><p class="jero-subtitle">{hero['subtitle']}</p><p class="jero-lead">{hero['lead']}</p><div class="jero-quick"><div><b>Получение</b><span>{hero['obtain']}</span></div><div><b>Главная роль</b><span>{hero['role']}</span></div><div><b>F2P</b><span>{hero['f2p']}</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div></div></section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#exploration">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#priority">Прокачка</a><a href="#use">Применение</a><a href="#pros">Плюсы и минусы</a></nav>
<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные значения героя для 5 поколения.</p><div class="jero-stats"><div class="jero-stat"><strong>{st[0]}</strong><span>Атака героя</span></div><div class="jero-stat"><strong>{st[1]}</strong><span>Защита героя</span></div><div class="jero-stat"><strong>{st[2]}</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>{st[3]}</strong><span>{hero['troop_attack']}</span></div><div class="jero-stat"><strong>{st[4]}</strong><span>{hero['troop_defense']}</span></div></div></section>
<section class="jero-section" id="exploration"><h2>Навыки Освоения</h2><p class="jero-section-lead">Навыки, которые работают в Освоении и на Арене.</p><div class="jero-skill-grid">{se}</div></section>
<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><p class="jero-section-lead">Ключевые эффекты для маршей, сборов, гарнизона и массовых боёв.</p><div class="jero-skill-grid">{sx}</div></section>
<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="assets/heroes/gen-05/{slug}/{hero['gear_file']}" alt="{hero['gear_name']}"/><div><h3 class="jero-gear-title">{hero['gear_name']}</h3><p class="jero-section-lead">Максимальные характеристики: {hero['gear_stats']}.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="assets/heroes/gen-05/{slug}/{g1i}" alt="{g1n}"/><div><b>{g1n}</b><span>{g1d}</span></div></div><div class="jero-gear-skill"><img src="assets/heroes/gen-05/{slug}/{g2i}" alt="{g2n}"/><div><b>{g2n}</b><span>{g2d}</span></div></div></div></div></div></section>
<section class="jero-section" id="priority"><h2>Приоритет прокачки</h2><div class="jero-two"><div class="jero-box"><h3>Освоение / Арена</h3><div class="jero-priority">{pe}</div></div><div class="jero-box"><h3>Экспедиция / PvP</h3><div class="jero-priority">{px}</div></div></div></section>
<section class="jero-section" id="use"><h2>Где применять</h2><div class="jero-mode-grid">{modes}</div></section>
<section class="jero-section" id="pros"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul>{pros}</ul></div><div class="jero-box bad"><h3>Минусы</h3><ul>{cons}</ul></div></div><div class="jero-verdict"><h3>Итог</h3><p>{hero['verdict']}</p></div></section>
<section class="jero-section"><h2>Источники</h2><div class="jero-sources"><a href="{hero['source']}" target="_blank" rel="noopener">Карточка героя</a><a href="{hero['lab']}" target="_blank" rel="noopener">WOS Lab</a></div></section>
<a class="jero-back" href="heroes.html">← Все герои</a><div class="jero-foot">Белая мгла · SOVA58 · обновлено 23.10.2026</div></div></div></main>'''


def metadata(page, slug, hero):
    name = hero["name"]
    gear = hero["gear_name"]
    url = ROOT + f"hero-{slug}.html"
    img = ROOT + f"assets/heroes/gen-05/{slug}/portrait.webp"
    description = f"Подробный гайд по {name}: герой 5 поколения, навыки Освоения и Экспедиции, {gear}, PvP, Арена, Свирепый медведь, прокачка, плюсы и минусы."
    page = re.sub(r"<title>.*?</title>", f"<title>{name}: навыки, {gear}, плюсы и минусы | Белая мгла</title>", page, count=1, flags=re.S)
    page = re.sub(r'<meta name="description" content="[^"]*"/>', f'<meta name="description" content="{description}"/>', page, count=1)
    page = re.sub(r'<link rel="canonical" href="[^"]*"/>', f'<link rel="canonical" href="{url}"/>', page, count=1)
    page = re.sub(r'<meta property="og:title" content="[^"]*"/>', f'<meta property="og:title" content="{name}: полный гайд"/>', page, count=1)
    page = re.sub(r'<meta property="og:description" content="[^"]*"/>', f'<meta property="og:description" content="Навыки, {gear}, PvP, Арена, Свирепый медведь, плюсы и минусы {name}."/>', page, count=1)
    page = re.sub(r'<meta property="og:url" content="[^"]*"/>', f'<meta property="og:url" content="{url}"/>', page, count=1)
    page = re.sub(r'<meta property="og:image" content="[^"]*"/>', f'<meta property="og:image" content="{img}"/>', page, count=1)
    page = re.sub(r'<meta name="twitter:image" content="[^"]*"/>', f'<meta name="twitter:image" content="{img}"/>', page, count=1)
    article = f'<script id="guide-article-schema-v625" type="application/ld+json">{{"@context":"https://schema.org","@type":"Article","headline":"{name}: полный гайд","description":"{description}","url":"{url}","mainEntityOfPage":{{"@type":"WebPage","@id":"{url}"}},"author":{{"@type":"Person","name":"SOVA58","url":"{ROOT}sova58.html","gender":"Female"}},"isPartOf":{{"@type":"WebSite","name":"Белая мгла · SOVA58","url":"{ROOT}"}},"inLanguage":"ru","dateModified":"{DATE}","image":["{img}"]}}</script>'
    page = re.sub(r'<script id="guide-article-schema-v625" type="application/ld\+json">.*?</script>', article, page, count=1, flags=re.S)
    breadcrumb = f'<script type="application/ld+json">{{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{{"@type":"ListItem","position":1,"name":"Главная","item":"{ROOT}"}},{{"@type":"ListItem","position":2,"name":"Герои","item":"{ROOT}heroes.html"}},{{"@type":"ListItem","position":3,"name":"{name}","item":"{url}"}}]}}</script>'
    page = re.sub(r'<script type="application/ld\+json">\{"@context":"https://schema.org","@type":"BreadcrumbList".*?</script>', breadcrumb, page, count=1, flags=re.S)
    return page


for slug, hero in HEROES.items():
    download_assets(slug, hero)
    page = metadata(BASE, slug, hero)
    page = re.sub(r'<main id="appMain">.*?</main>', build_main(slug, hero), page, count=1, flags=re.S)
    if "Рейна" in page or "hero-reina" in page or "gen-04/reina" in page:
        raise RuntimeError(f"Clone residue detected in {slug}")
    Path(f"hero-{slug}.html").write_text(page, encoding="utf-8")

sitemap = Path("sitemap.xml")
s = sitemap.read_text(encoding="utf-8")
s = re.sub(r'\s*<url><loc>[^<]*tmp-[^<]*</loc><lastmod>[^<]*</lastmod></url>', '', s)
for slug in HEROES:
    url = ROOT + f"hero-{slug}.html"
    if url not in s:
        s = s.replace("</urlset>", f'  <url><loc>{url}</loc><lastmod>{DATE}</lastmod></url>\n</urlset>')
sitemap.write_text(s, encoding="utf-8")

print("Generation 5 pages built successfully")
