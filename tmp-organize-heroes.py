from pathlib import Path
from bs4 import BeautifulSoup

p=Path('heroes.html')
html=p.read_text(encoding='utf-8')
soup=BeautifulSoup(html,'html.parser')

heroes={
1:[('Джеронимо','jeronimo','Пехота','Бой','Атакующий лидер · сборы'),('Молли','molly','Копейщики','Бой','Контроль · массовый урон'),('Наталия','natalia','Пехота','Бой','Фронтовик · ранний PvP'),('Зинман','zinman','Стрелки','Развитие','Строительство · развитие')],
2:[('Флинт','flint','Пехота','Бой','Фронтовик · Медведь'),('Филли','philly','Копейщики','Лечение','Лечение · поддержка'),('Алонсо','alonso','Стрелки','Бой','Контроль · Арена')],
3:[('Логан','logan','Пехота','Бой','Гарнизон · защита'),('Миа','mia','Копейщики','Бой','Случайные эффекты · сборы'),('Грег','greg','Стрелки','Бой','Контроль · PvP')],
4:[('Ахмос','ahmose','Пехота','Бой','Защита команды · фронт'),('Рейна','reina','Копейщики','Бой','Обычные атаки · сборы'),('Линн','lynn','Стрелки','Бой','Антиконтроль · поддержка')],
5:[('Гектор','hector','Пехота','Бой','Фронтовик · иммунитет к контролю'),('Нора','norah','Копейщики','Бой','Контроль · универсальный PvP'),('Гвен','gwen','Стрелки','Бой','Задняя линия · атакующие сборы')],
6:[('Ву Минг','wu-ming','Пехота','Бой','Танк · защита'),('Рене','renee','Копейщики','Бой','Метки грёз · PvP'),('Уэйн','wayne','Стрелки','Бой','Криты · двойной удар')],
7:[('Эдит','edith','Пехота','Бой','Гарнизон · защита'),('Гордон','gordon','Копейщики','Бой','Атакующие сборы · дебаффы'),('Бредли','bradley','Стрелки','Бой','Колесо удачи · массовый урон')],
8:[('Гатот','gatot','Пехота','Бой','Щиты · гарнизон'),('Соня','sonya','Копейщики','Бой','Заморозка · общий урон'),('Хендрик','hendrik','Стрелки','Бой','Снижение защиты · сборы')],
9:[('Магнус','magnus','Пехота','Бой','Усиление атаки · Медведь'),('Фред','fred','Копейщики','Бой','Колесо удачи · атакующий PvP'),('Ксура','xura','Стрелки','Бой','Гарнизон · PvP')],
10:[('Грегори','gregory','Пехота','Бой','Танк · снижение урона'),('Фрея','freya','Копейщики','Бой','Поддержка · лечение'),('Бланшетт','blanchette','Стрелки','Бой','Колесо удачи · массовый урон')],
11:[('Элеонора','eleonora','Пехота','Бой','Колесо удачи · универсальная защита'),('Ллойд','lloyd','Копейщики','Бой','Ослабление врага · всплески урона'),('Руфус','rufus','Стрелки','Бой','Атакующий урон · сборы')],
12:[('Хервор','hervor','Пехота','Бой','Танк · смертоносность · контроль'),('Кароль','karol','Копейщики','Бой','Колесо удачи · главный F2P приоритет'),('Лигея','ligeia','Стрелки','Бой','Снижение защиты · механические пауки')]
}

nav=''.join(f'<a href="#gen-{g}">{g}</a>' for g in range(1,13))
blocks=[]
for g,items in heroes.items():
    cards=[]
    for name,slug,troop,role,desc in items:
        cards.append(f'''<a class="hero-gen-card" href="hero-{slug}.html">
          <div class="hero-gen-img"><img src="assets/heroes/gen-{g:02d}/{slug}/portrait.webp" alt="{name}" loading="lazy" decoding="async"></div>
          <div class="hero-gen-info"><div class="hero-gen-top"><strong>{name}</strong><span>{troop}</span></div><div class="hero-gen-tags"><span>Мифический</span><span>{role}</span></div><p>{desc}</p><b>Открыть гайд →</b></div>
        </a>''')
    blocks.append(f'''<section class="hero-generation" id="gen-{g}"><div class="hero-generation-head"><div><span>Поколение</span><h3>{g}</h3></div><p>{len(items)} подробных {'героя' if len(items) in (2,3,4) else 'героев'}</p></div><div class="hero-generation-grid">{''.join(cards)}</div></section>''')

catalog=f'''<div class="hero-catalog-v700">
<div class="hero-catalog-intro"><div><span class="hero-catalog-kicker">Каталог героев</span><h3>Все герои по поколениям</h3><p>Выбери поколение, затем героя. Каждая карточка ведёт на отдельный подробный гайд с навыками, снаряжением, плюсами, минусами и применением.</p></div><div class="hero-gen-jump" aria-label="Переход к поколению">{nav}</div></div>
{''.join(blocks)}
</div>'''

style='''
<style id="hero-generations-v700">
.hero-catalog-v700{display:grid;gap:18px}.hero-catalog-intro{padding:20px;border:1px solid rgba(125,204,246,.18);border-radius:22px;background:linear-gradient(145deg,rgba(8,37,65,.9),rgba(12,23,48,.92))}.hero-catalog-kicker{display:block;color:#7bdcff;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.12em}.hero-catalog-intro h3{margin:6px 0 8px;color:#fff;font-size:clamp(26px,4vw,38px)}.hero-catalog-intro p{margin:0;color:#a9c8da;line-height:1.55}.hero-gen-jump{display:flex;gap:7px;flex-wrap:wrap;margin-top:15px}.hero-gen-jump a{display:grid;place-items:center;min-width:36px;height:36px;padding:0 10px;border:1px solid rgba(130,211,255,.2);border-radius:11px;background:rgba(255,255,255,.05);color:#c9efff;text-decoration:none;font-weight:900}.hero-generation{scroll-margin-top:88px;padding:18px;border:1px solid rgba(135,205,244,.15);border-radius:22px;background:rgba(5,23,42,.74)}.hero-generation-head{display:flex;align-items:end;justify-content:space-between;gap:12px;margin-bottom:12px}.hero-generation-head span{display:block;color:#68d7ff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.12em}.hero-generation-head h3{margin:0;color:#fff;font-size:34px}.hero-generation-head p{margin:0;color:#789db5;font-size:12px}.hero-generation-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.hero-gen-card{display:grid;grid-template-columns:108px 1fr;min-height:150px;overflow:hidden;border:1px solid rgba(145,211,248,.14);border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.025));text-decoration:none;transition:transform .16s ease,border-color .16s ease,background .16s ease}.hero-gen-card:hover{transform:translateY(-2px);border-color:rgba(117,218,255,.38);background:linear-gradient(145deg,rgba(53,155,210,.12),rgba(255,255,255,.035))}.hero-gen-img{display:flex;align-items:flex-end;justify-content:center;background:radial-gradient(circle at 50% 30%,rgba(80,187,240,.14),transparent 66%);overflow:hidden}.hero-gen-img img{display:block;width:100%;height:100%;max-height:160px;object-fit:contain;object-position:center bottom}.hero-gen-info{padding:13px 13px 12px 10px;min-width:0}.hero-gen-top{display:flex;align-items:center;justify-content:space-between;gap:8px}.hero-gen-top strong{color:#fff;font-size:17px;line-height:1.15}.hero-gen-top>span{flex:0 0 auto;color:#8ddfff;font-size:10px;font-weight:850}.hero-gen-tags{display:flex;gap:5px;flex-wrap:wrap;margin-top:6px}.hero-gen-tags span{padding:3px 6px;border-radius:7px;background:rgba(255,255,255,.055);color:#93b8ce;font-size:9px;font-weight:800}.hero-gen-info p{margin:9px 0;color:#aac4d4;font-size:11px;line-height:1.42}.hero-gen-info>b{color:#ffe39b;font-size:10px}.hero-generation:first-of-type .hero-generation-grid{grid-template-columns:repeat(2,minmax(0,1fr))}@media(max-width:980px){.hero-generation-grid,.hero-generation:first-of-type .hero-generation-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:640px){.hero-generation{padding:12px}.hero-generation-grid,.hero-generation:first-of-type .hero-generation-grid{grid-template-columns:1fr}.hero-gen-card{grid-template-columns:96px 1fr;min-height:138px}.hero-gen-jump{flex-wrap:nowrap;overflow:auto;padding-bottom:3px}.hero-generation-head h3{font-size:29px}}
</style>
'''

if not soup.find(id='hero-generations-v700'):
    soup.head.append(BeautifulSoup(style,'html.parser'))
else:
    old=soup.find(id='hero-generations-v700')
    old.replace_with(BeautifulSoup(style,'html.parser'))

h=soup.find(id='section-6')
if not h:
    raise SystemExit('section-6 not found')
details=h.find_parent('details')
body=details.find(class_='guide-fold-body-v414')
if not body:
    raise SystemExit('section-6 body not found')
body.clear()
body.append(BeautifulSoup(catalog,'html.parser'))
details['open']=''

# Refresh intro copy and TOC wording without disturbing the rest of the guide.
heading=soup.select_one('.page-heading-v424 p')
if heading:
    heading.string='Все подробные гайды по героям, собранные по поколениям.'
for a in soup.select('.page-toc-links-v409 a'):
    if a.get('href')=='#section-6': a.string='Все герои по поколениям'

p.write_text(str(soup),encoding='utf-8')
print('Updated heroes.html with generations 1-12')
