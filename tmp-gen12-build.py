from pathlib import Path
import re, json, requests, io
from bs4 import BeautifulSoup
from PIL import Image
from urllib.parse import urljoin

BASE='https://belaya-mgla-sova58.github.io/'
DATE='2026-10-23'
TEMPLATE=Path('hero-lloyd.html').read_text(encoding='utf-8')

heroes={
'hervor':{
 'name':'Хервор','troop':'Пехота','subtitle':'Фронтовик · контроль · смертоносность всему маршу',
 'source_ru':'https://whiteout-survival.com/ru/heroes/hervor/','source_en':'https://whiteout-survival.com/heroes/hervor/',
 'obtain':'Зал героев, магазин Литейной и универсальные мифические осколки',
 'f2p':'Сильный второй приоритет 12 поколения после Кароль',
 'stats':['13 674','17 826','267 398','1 451,16%','1 451,16%'],
 'explore':[
  ('Землеройная машина','earthmover','Фронтальный урон · оглушение · устрашение','Наносит урон по области перед собой, оглушает на 1 секунду и накладывает Устрашение, снижая атаку врага на 25% на 3 секунды.','100 / 110 / 120 / 130 / 140% атаки'),
  ('Горная сила','mountain-strength','Устрашение · усиление входящего урона','Обычные атаки могут накладывать Устрашение. Отмеченная цель получает больше урона, эффект суммируется до 3 раз.','Шанс 5 / 10 / 15 / 20 / 25% · входящий урон +3 / 6 / 9 / 12 / 15% за заряд'),
  ('Каменные руки','stone-arms','Снижение урона · иммунитет к контролю','Снижает получаемый урон. В первые 9 секунд боя Хервор невосприимчива к оглушению, параличу, заморозке и другим эффектам контроля.','Получаемый урон −5 / 10 / 15 / 20 / 25%')],
 'expedition':[
  ('Призыв к крови','call-for-blood','Смертоносность всех войск','Постоянно повышает смертоносность всех войск в марше.','+5 / 10 / 15 / 20 / 25%'),
  ('Бессмертный','undying','Защита пехоты','Снижает урон, который пехота Хервор получает от обычных атак и навыков противника.','Обычные атаки −5 / 10 / 15 / 20 / 25% · навыки −6 / 12 / 18 / 24 / 30%'),
  ('Жаждущий битвы','bloodthirsty','Пехота · выживаемость и урон','Пехота получает меньше урона и одновременно наносит больше.','Получаемый урон −3 / 6 / 9 / 12 / 15% · наносимый урон +2 / 4 / 6 / 8 / 10%')],
 'gear':'Молот Сатлы','gear_slug':'hammer-of-sathla','gear_stats':'+2 770 атаки · +3 613 защиты · +54 202 здоровья · +362,5% смертоносности · +362,5% здоровья войск',
 'gear_skills':[('Знак вождя','mark-of-the-chieftain','На максимуме повышает скорость атаки на 30% и даёт обычным атакам +25% шанс наложить Устрашение.'),('Форт Рока','fort-of-rock','На максимуме повышает защиту войск защитника на 15%.')],
 'use':[('Арена','Один из лучших фронтовиков поколения: контроль, высокий запас здоровья и защита от контроля.'),('PvP','Сильная пехота для затяжных боёв, особенно благодаря снижению входящего урона.'),('Гарнизон','Очень полезна на передней линии и хорошо сочетается с защитными составами.'),('Свирепый медведь','Хороша как участник чужого сбора: первый навык Экспедиции даёт стабильные +25% смертоносности всему маршу.')],
 'verdict':'Хервор закрывает главную задачу пехоты 12 поколения: пережить фокус и удержать фронт. Для F2P обычно идёт после Кароль, но остаётся очень сильным вложением для PvP, гарнизона и Арены.',
 'pros':['Очень крепкая пехота','+25% смертоносности всем войскам','Сильная защита от контроля','Хороша в гарнизоне и PvP'],
 'cons':['Не герой Колеса удачи','Дороже Кароль для F2P','На Медведе ценнее как участник, а не лидер']},
'karol':{
 'name':'Кароль','troop':'Копейщики','subtitle':'Колесо удачи · снижение входящего урона · атакующие сборы',
 'source_ru':'https://whiteout-survival.com/ru/heroes/karol/','source_en':'https://whiteout-survival.com/heroes/karol/',
 'obtain':'Колесо удачи, магазин Литейной и универсальные мифические осколки',
 'f2p':'Главный F2P-приоритет 12 поколения благодаря Колесу удачи',
 'stats':['17 826','17 826','178 266','1 451,16%','1 451,16%'],
 'explore':[
  ('Атака рассвета','dawn-charge','Урон по области · снижение защиты','Наносит фронтальный урон и на 2 секунды снижает защиту поражённых врагов.','200 / 220 / 240 / 260 / 280% атаки · защита −5 / 10 / 15 / 20 / 25%'),
  ('Ощетинившийся натиск','bristling-strike','Урон по области','Проводит дополнительную атаку по области.','100 / 110 / 120 / 130 / 140% атаки'),
  ('Окрылённый победой','soaring-victory','Снежный ком · лечение','За каждого павшего вражеского героя Кароль усиливает атаку и восстанавливает часть здоровья.','Атака +4 / 6 / 8 / 10 / 12% · здоровье +2 / 4 / 6 / 8 / 10%')],
 'expedition':[
  ('Под крылом','in-the-wings','Снижение урона всему маршу','Постоянно снижает получаемый урон всех войск.','−4 / 8 / 12 / 16 / 20%'),
  ('Сокрушитель щитов','shieldbreaker','Контрпехота и контркопейщики','Повышает урон всех войск по вражеским копейщикам и пехоте.','По копейщикам +6 / 12 / 18 / 24 / 30% · по пехоте +5 / 10 / 15 / 20 / 25%'),
  ('Знамя веков','standard-of-ages','Атака и защита всех войск','Постоянно повышает атаку и защиту всего марша.','Атака +3 / 6 / 9 / 12 / 15% · защита +2 / 4 / 6 / 8 / 10%')],
 'gear':'Дух зимнего ветра','gear_slug':'spirit-of-winterwind','gear_stats':'+3 613 атаки · +3 613 защиты · +36 135 здоровья · +362,5% смертоносности · +362,5% здоровья войск',
 'gear_skills':[('Взмах орлиных крыльев','eagle-flutter','На максимуме после «Атаки рассвета» усиливает союзный отряд и резко повышает скорость передвижения на несколько секунд.'),('Триумфальный марш','triumphant-march','На максимуме повышает атаку войск сбора на 15%.')],
 'use':[('Арена','Сильный снежный ком: после падения врагов становится опаснее и лечится.'),('PvP','Один из лучших универсальных атакующих копейщиков поколения.'),('Сборы','Отлично подходит для атакующих сборов благодаря бонусам марша и эксклюзивному снаряжению.'),('Свирепый медведь','Не главный герой для Медведя. Её сильнейшая ценность в PvP и сборах, а не в роли специализированного лидера Медведя.')],
 'verdict':'Кароль является главным доступным героем 12 поколения для F2P. Колесо удачи делает её самым понятным первым вложением, а набор Экспедиции полезен почти в любом атакующем PvP-марше.',
 'pros':['Герой Колеса удачи','−20% получаемого урона всему маршу','Сильна против пехоты и копейщиков','Хорошее снаряжение для атакующего сбора'],
 'cons':['Не специализирована под Медведя','Часть силы зависит от состава противника','Для полного раскрытия нужно эксклюзивное снаряжение']},
'ligeia':{
 'name':'Лигея','troop':'Стрелки','subtitle':'Дебафф защиты · циклический урон стрелков · атакующие сборы',
 'source_ru':'https://whiteout-survival.com/ru/heroes/ligeia/','source_en':'https://whiteout-survival.com/heroes/ligeia/',
 'obtain':'Король ледяного поля, СВС, Зал вождей, ежедневные предложения, Геройское ралли, Литейная и универсальные мифические осколки',
 'f2p':'Сильна, но обычно идёт после Кароль и Хервор из-за более дорогого получения',
 'stats':['21 656','17 826','133 698','1 451,16%','1 451,16%'],
 'explore':[
  ('Кислотный рефлекс','acid-reflex','Тройной урон · снижение атаки','Запускает трёх механических пауков. Каждый наносит урон по области и на 2 секунды снижает атаку врага.','70 / 77 / 84 / 91 / 98% атаки · атака врага −5 / 10 / 15 / 20 / 25%'),
  ('Мадам Паук','spider-madam','Урон · ловушка резонанса','Наносит урон и может наложить ловушку Резонанса на 5 секунд, перенаправляя получаемый Лигеей урон в отмеченную цель.','50 / 55 / 60 / 65 / 70% атаки · шанс ловушки 20 / 40 / 60 / 80 / 100%'),
  ('Механические зубы','mechanical-teeth','Снятие дебаффа · усиление атаки','Расходует защитного паука, чтобы отразить негативный эффект, и на 10 секунд повышает атаку Лигеи.','Атака +8 / 12 / 16 / 20 / 24%')],
 'expedition':[
  ('Нерф Пойзон','nerf-poison','Снижение защиты противника','Постоянно снижает защиту всех вражеских войск.','−5 / 10 / 15 / 20 / 25%'),
  ('Коррозия','corrosion','Каждые 2 атаки · урон стрелков','Каждые 2 атаки стрелки наносят дополнительный урон и на 1 ход повышают получаемый целью урон.','Доп. урон +20 / 40 / 60 / 80 / 100% · получаемый урон +5 / 10 / 15 / 20 / 25%'),
  ('Токсичный совет','toxic-tip','Каждые 2 атаки · урон и ослабление','Каждые 2 атаки повышает урон стрелков по цели и на 1 ход снижает наносимый ею урон.','Урон +20 / 40 / 60 / 80 / 100% · урон цели −4 / 8 / 12 / 16 / 20%')],
 'gear':'Ткач судьбы','gear_slug':'fateweaver','gear_stats':'+4 384 атаки · +3 613 защиты · +27 101 здоровья · +362,5% смертоносности · +362,5% здоровья войск',
 'gear_skills':[('Королева пауков','spider-queen','Начинает бой с двумя защитными пауками; «Мадам Паук» может поражать дополнительную цель.'),('Гнездо-ловушка','trap-nest','На максимуме повышает смертоносность войск защитника на 15%.')],
 'use':[('Арена','Сильна за счёт ловушки Резонанса, снятия негативных эффектов и высокого урона.'),('PvP','Очень опасный стрелок благодаря постоянному снижению защиты противника.'),('Сборы','Отличный дебаффер для атакующих сборов и сильный вариант лидера стрелкового марша.'),('Свирепый медведь','Сильный участник чужого сбора: первый навык Экспедиции снижает защиту цели до 25%.')],
 'verdict':'Лигея добавляет 12 поколению мощный стрелковый дебафф. Снижение защиты противника делает её особенно ценной в сборах, но для F2P она обычно идёт после более доступной Кароль и фронтовой Хервор.',
 'pros':['−25% защиты всем войскам противника','Сильные циклические навыки стрелков','Полезна в сборах и на Медведе как участник','Высокий урон в Арене'],
 'cons':['Не герой Колеса удачи','Дороже для F2P','Эксклюзивное снаряжение больше про защиту города, чем атакующий сбор']}
}

# exact filename aliases for source alt text
aliases={
'hervor':{'portrait':['Hervor'],'earthmover':['Earthmover'],'mountain-strength':['Mountain Strength'],'stone-arms':['Stone Arms'],'call-for-blood':['Call For Blood','Call for Blood'],'undying':['Undying'],'bloodthirsty':['Bloodthirsty'],'hammer-of-sathla':['Hammer of Sathla'],'mark-of-the-chieftain':['Mark of the Chieftain'],'fort-of-rock':['Fort of Rock']},
'karol':{'portrait':['Karol'],'dawn-charge':['Dawn Charge'],'bristling-strike':['Bristling Strike'],'soaring-victory':['Soaring Victory'],'in-the-wings':['In the Wings'],'shieldbreaker':['Shieldbreaker'],'standard-of-ages':['Standard of Ages'],'spirit-of-winterwind':['Spirit of Winterwind'],'eagle-flutter':['Eagle Flutter'],'triumphant-march':['Triumphant March']},
'ligeia':{'portrait':['Ligeia'],'acid-reflex':['Acid Reflex'],'spider-madam':['Spider Madam'],'mechanical-teeth':['Mechanical Teeth'],'nerf-poison':['Nerf Poison'],'corrosion':['Corrosion'],'toxic-tip':['Toxic Tip'],'fateweaver':['Fateweaver'],'spider-queen':['Spider Queen'],'trap-nest':['Trap Nest']}
}

def get_source_images(slug,url):
    r=requests.get(url,headers={'User-Agent':'Mozilla/5.0'},timeout=40); r.raise_for_status()
    soup=BeautifulSoup(r.text,'html.parser')
    imgs=[]
    for im in soup.find_all('img'):
        src=im.get('data-lazy-src') or im.get('data-src') or im.get('src') or ''
        if not src or src.startswith('data:'): continue
        imgs.append((im.get('alt','').strip(),urljoin(url,src)))
    return imgs

def choose(imgs,names,slug,portrait=False):
    for alt,url in imgs:
        if any(alt.lower()==n.lower() for n in names): return url
    for alt,url in imgs:
        if any(n.lower() in alt.lower() for n in names): return url
    if portrait:
        for alt,url in imgs:
            low=url.lower()
            if slug in low and 'icon' not in low and 'skill' not in low: return url
    raise RuntimeError(f'No image for {slug}: {names}')

def save_webp(url,path):
    r=requests.get(url,headers={'User-Agent':'Mozilla/5.0'},timeout=40); r.raise_for_status()
    im=Image.open(io.BytesIO(r.content)).convert('RGBA')
    path.parent.mkdir(parents=True,exist_ok=True)
    im.save(path,'WEBP',quality=92,method=6)

def skill_card(folder,title,file,tag,desc,values):
    return f'''<article class="jero-skill"><div class="jero-skill-head"><img src="{folder}/{file}.webp" alt="{title}"><div><h3>{title}</h3><small>{tag}</small></div></div><p>{desc}</p><p class="jero-values">{values}</p></article>'''

def build_page(slug,h):
    src=TEMPLATE
    title=f"{h['name']}: навыки, {h['gear']}, плюсы и минусы | Белая мгла"
    desc=f"Подробный гайд по {h['name']}: герой 12 поколения, навыки Освоения и Экспедиции, {h['gear']}, PvP, Арена, сборы, прокачка, плюсы и минусы."
    url=BASE+f'hero-{slug}.html'; folder=f'assets/heroes/gen-12/{slug}'
    reps=[
      (r'<title>.*?</title>',f'<title>{title}</title>'),
      (r'<meta name="description" content="[^"]*"/>',f'<meta name="description" content="{desc}"/>'),
      (r'<link rel="canonical" href="[^"]*"/>',f'<link rel="canonical" href="{url}"/>'),
      (r'<meta property="og:title" content="[^"]*"/>',f'<meta property="og:title" content="{h["name"]}: полный гайд"/>'),
      (r'<meta property="og:description" content="[^"]*"/>',f'<meta property="og:description" content="Навыки, {h["gear"]}, PvP, Арена, сборы, плюсы и минусы {h["name"]}."/>'),
      (r'<meta property="og:url" content="[^"]*"/>',f'<meta property="og:url" content="{url}"/>'),
      (r'<meta property="og:image" content="[^"]*"/>',f'<meta property="og:image" content="{BASE}{folder}/portrait.webp"/>'),
      (r'<meta name="twitter:image" content="[^"]*"/>',f'<meta name="twitter:image" content="{BASE}{folder}/portrait.webp"/>')]
    for pat,val in reps: src=re.sub(pat,val,src,1,flags=re.S)
    article={"@context":"https://schema.org","@type":"Article","headline":f"{h['name']}: полный гайд","description":desc,"url":url,"mainEntityOfPage":{"@type":"WebPage","@id":url},"author":{"@type":"Person","name":"SOVA58","url":BASE+'sova58.html',"gender":"Female"},"isPartOf":{"@type":"WebSite","name":"Белая мгла · SOVA58","url":BASE},"inLanguage":"ru","dateModified":DATE,"image":[BASE+folder+'/portrait.webp']}
    src=re.sub(r'<script id="guide-article-schema-v625" type="application/ld\+json">.*?</script>',f'<script id="guide-article-schema-v625" type="application/ld+json">{json.dumps(article,ensure_ascii=False,separators=(",",":"))}</script>',src,1,flags=re.S)
    crumbs={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":BASE},{"@type":"ListItem","position":2,"name":"Герои","item":BASE+'heroes.html'},{"@type":"ListItem","position":3,"name":h['name'],"item":url}]}
    src=re.sub(r'<script type="application/ld\+json">\{"@context":"https://schema.org","@type":"BreadcrumbList".*?</script>',f'<script type="application/ld+json">{json.dumps(crumbs,ensure_ascii=False,separators=(",",":"))}</script>',src,1,flags=re.S)
    e=''.join(skill_card(folder,*x) for x in h['explore'])
    x=''.join(skill_card(folder,*x) for x in h['expedition'])
    modes=''.join(f'<div class="jero-mode"><b>{a}</b><p>{b}</p></div>' for a,b in h['use'])
    pros=''.join(f'<li>{x}</li>' for x in h['pros']); cons=''.join(f'<li>{x}</li>' for x in h['cons'])
    body=f'''<div class="jero-crumbs"><a href="index.html">Главная</a> · <a href="heroes.html">Герои</a> · {h['name']}</div>
<section class="jero-hero"><div class="jero-portrait-wrap"><img class="jero-portrait" src="{folder}/portrait.webp" alt="{h['name']}"></div><div><div class="jero-kicker"><span class="jero-chip gold">12 поколение</span><span class="jero-chip">{h['troop']}</span><span class="jero-chip">Мифический</span><span class="jero-chip">Бой</span></div><h1>{h['name']}</h1><p class="jero-subtitle">{h['subtitle']}</p><p class="jero-lead">{h['verdict']}</p><div class="jero-quick"><div><b>Получение</b><span>{h['obtain']}</span></div><div><b>Главная роль</b><span>PvP, Арена и бои сборов</span></div><div><b>Для F2P</b><span>{h['f2p']}</span></div><div><b>Проверено</b><span>23 октября 2026</span></div></div></div></section>
<nav class="jero-nav"><a href="#stats">Характеристики</a><a href="#explore">Освоение</a><a href="#expedition">Экспедиция</a><a href="#gear">Снаряжение</a><a href="#use">Применение</a><a href="#verdict">Итог</a></nav>
<section class="jero-section" id="stats"><h2>Характеристики</h2><p class="jero-section-lead">Максимальные значения героя по актуальным карточкам.</p><div class="jero-stats"><div class="jero-stat"><strong>{h['stats'][0]}</strong><span>Атака героя</span></div><div class="jero-stat"><strong>{h['stats'][1]}</strong><span>Защита героя</span></div><div class="jero-stat"><strong>{h['stats'][2]}</strong><span>Здоровье героя</span></div><div class="jero-stat"><strong>{h['stats'][3]}</strong><span>Атака типа войск</span></div><div class="jero-stat"><strong>{h['stats'][4]}</strong><span>Защита типа войск</span></div></div></section>
<section class="jero-section" id="explore"><h2>Навыки Освоения</h2><p class="jero-section-lead">Навыки для Арены и Исследования.</p><div class="jero-skill-grid">{e}</div></section>
<section class="jero-section" id="expedition"><h2>Навыки Экспедиции</h2><p class="jero-section-lead">Ключевые боевые эффекты для марша, сборов и крупных PvP-сражений.</p><div class="jero-skill-grid">{x}</div></section>
<section class="jero-section" id="gear"><h2>Эксклюзивное снаряжение</h2><div class="jero-gear-layout"><img class="jero-gear-img" src="{folder}/gear-{h['gear_slug']}.webp" alt="{h['gear']}"><div><h3 class="jero-gear-title">{h['gear']}</h3><p class="jero-section-lead">Максимальные бонусы: {h['gear_stats']}.</p><div class="jero-gear-skills"><div class="jero-gear-skill"><img src="{folder}/gear-{h['gear_skills'][0][1]}.webp" alt="{h['gear_skills'][0][0]}"><div><b>{h['gear_skills'][0][0]}</b><span>{h['gear_skills'][0][2]}</span></div></div><div class="jero-gear-skill"><img src="{folder}/gear-{h['gear_skills'][1][1]}.webp" alt="{h['gear_skills'][1][0]}"><div><b>{h['gear_skills'][1][0]}</b><span>{h['gear_skills'][1][2]}</span></div></div></div></div></div></section>
<section class="jero-section" id="use"><h2>Где использовать {h['name']}</h2><div class="jero-mode-grid">{modes}</div></section>
<section class="jero-section"><h2>Приоритет прокачки</h2><div class="jero-priority"><div><b><span class="jero-rank">1</span>Первый навык Экспедиции</b><span>Главный командный эффект героя для больших боёв.</span></div><div><b><span class="jero-rank">2</span>Второй навык Экспедиции</b><span>Развивает ключевую специализацию типа войск.</span></div><div><b><span class="jero-rank">3</span>Основной навык Освоения</b><span>Приоритет для Арены и Исследования.</span></div></div></section>
<section class="jero-section" id="verdict"><h2>Плюсы и минусы</h2><div class="jero-two"><div class="jero-box good"><h3>Плюсы</h3><ul>{pros}</ul></div><div class="jero-box bad"><h3>Минусы</h3><ul>{cons}</ul></div></div><div class="jero-verdict" style="margin-top:14px"><h3>Итог</h3><p>{h['verdict']}</p></div><div class="jero-sources"><a href="{h['source_ru']}" rel="noopener noreferrer" target="_blank">Карточка героя и игровые значения</a></div><a class="jero-back" href="heroes.html">← Ко всем героям</a></section><div class="jero-foot">Белая мгла · гайд SOVA58 · данные проверены 23 октября 2026</div>'''
    # replace current jero-page content using robust markers
    start=src.find('<main class="jero-page">')
    end=src.find('</main>',start)
    if start<0 or end<0:
        start=src.find('<div class="jero-page">'); end=src.find('</div>\n',start)
    if start<0: raise RuntimeError('template main not found')
    opening=src[start:src.find('>',start)+1]
    src=src[:start]+opening+body+'</main>'+src[end+7:] if opening.startswith('<main') else src
    Path(f'hero-{slug}.html').write_text(src,encoding='utf-8')

    imgs=get_source_images(slug,h['source_en'])
    names=aliases[slug]
    filemap={'portrait':'portrait'}
    for _,key,_,_,_ in h['explore']+h['expedition']: filemap[key]='skill-'+key
    filemap[h['gear_slug']]='gear-'+h['gear_slug']
    for _,key,_ in h['gear_skills']: filemap[key]='gear-'+key
    for key,outname in filemap.items():
        u=choose(imgs,names[key],slug,portrait=(key=='portrait'))
        save_webp(u,Path(folder)/(outname+'.webp'))

for slug,h in heroes.items(): build_page(slug,h)

# sitemap entries
p=Path('sitemap.xml'); s=p.read_text(encoding='utf-8')
for slug in heroes:
    loc=BASE+f'hero-{slug}.html'
    if loc not in s: s=s.replace('</urlset>',f'  <url><loc>{loc}</loc><lastmod>{DATE}</lastmod></url>\n</urlset>')
p.write_text(s,encoding='utf-8')
