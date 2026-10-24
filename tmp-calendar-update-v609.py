from pathlib import Path
import re

p = Path('events.html')
s = p.read_text(encoding='utf-8')

new_block = r'''<style id="event-schedule-v609-colors">
body.is-events-route .event-week-v608.event-week-v609{min-width:860px;grid-template-columns:180px repeat(8,minmax(72px,1fr))}
body.is-events-route .event-cell-v608.on.event-snow,body.is-events-route .event-soon-chip-v608.event-snow{background:linear-gradient(145deg,rgba(78,190,239,.84),rgba(91,108,224,.78));border-color:rgba(133,220,255,.42);color:#d9f5ff}
body.is-events-route .event-cell-v608.on.event-raid,body.is-events-route .event-soon-chip-v608.event-raid{background:linear-gradient(145deg,rgba(239,95,82,.82),rgba(190,61,105,.76));border-color:rgba(255,150,139,.42);color:#ffd0c9}
body.is-events-route .event-cell-v608.on.event-treasure,body.is-events-route .event-soon-chip-v608.event-treasure{background:linear-gradient(145deg,rgba(229,166,55,.88),rgba(175,108,31,.78));border-color:rgba(255,211,115,.42);color:#ffe3a1}
body.is-events-route .event-cell-v608.on.event-gina,body.is-events-route .event-soon-chip-v608.event-gina{background:linear-gradient(145deg,rgba(73,217,138,.80),rgba(44,143,105,.76));border-color:rgba(123,239,174,.42);color:#baf7d3}
body.is-events-route .event-cell-v608.on.event-officer,body.is-events-route .event-soon-chip-v608.event-officer{background:linear-gradient(145deg,rgba(157,108,239,.84),rgba(89,77,201,.78));border-color:rgba(196,159,255,.42);color:#decaff}
@media(max-width:760px){body.is-events-route .event-week-v608.event-week-v609{min-width:790px;grid-template-columns:165px repeat(8,minmax(68px,1fr))}}
</style>
<section class="event-schedule-v608" aria-label="График событий 26 октября – 2 ноября 2026">
  <div class="event-schedule-head-v608">
    <div><h2>📅 График событий</h2><p>26 октября – 2 ноября 2026 · подтверждено по игровому календарю</p></div>
    <span class="event-schedule-msk-v608">Игровой календарь</span>
  </div>
  <div class="event-active-v608">
    <div class="event-active-card-v608"><b>26 октября</b><span>Снегоуборщики · Героический рейд · Сокровища путешествия · Месть Джины · Обучение офицеров</span></div>
    <div class="event-active-card-v608"><b>Долгие события</b><span>Снегоуборщики и Обучение офицеров · 26.10–02.11</span></div>
    <div class="event-active-card-v608"><b>Битвы за форт</b><span>27.10 · 29.10 · 31.10 · 02.11</span></div>
  </div>
  <div class="event-week-wrap-v608"><div class="event-week-v608 event-week-v609">
    <div class="corner">Событие</div><div class="event-day-v608">Пн<br>26</div><div class="event-day-v608">Вт<br>27</div><div class="event-day-v608">Ср<br>28</div><div class="event-day-v608">Чт<br>29</div><div class="event-day-v608">Пт<br>30</div><div class="event-day-v608">Сб<br>31</div><div class="event-day-v608">Вс<br>1</div><div class="event-day-v608">Пн<br>2</div>
    <div class="event-row-name-v608 event-snow">Снегоуборщики</div><div class="event-cell-v608 on event-snow"></div><div class="event-cell-v608 on event-snow"></div><div class="event-cell-v608 on event-snow"></div><div class="event-cell-v608 on event-snow"></div><div class="event-cell-v608 on event-snow"></div><div class="event-cell-v608 on event-snow"></div><div class="event-cell-v608 on event-snow"></div><div class="event-cell-v608 on event-snow"></div>
    <div class="event-row-name-v608 event-raid">Героический рейд</div><div class="event-cell-v608 on event-raid"></div><div class="event-cell-v608 on event-raid"></div><div class="event-cell-v608 on event-raid"></div><div class="event-cell-v608"></div><div class="event-cell-v608"></div><div class="event-cell-v608"></div><div class="event-cell-v608"></div><div class="event-cell-v608"></div>
    <div class="event-row-name-v608 event-treasure">Сокровища путешествия</div><div class="event-cell-v608 on event-treasure"></div><div class="event-cell-v608 on event-treasure"></div><div class="event-cell-v608 on event-treasure"></div><div class="event-cell-v608"></div><div class="event-cell-v608"></div><div class="event-cell-v608"></div><div class="event-cell-v608"></div><div class="event-cell-v608"></div>
    <div class="event-row-name-v608 event-gina">Месть Джины</div><div class="event-cell-v608 on event-gina"></div><div class="event-cell-v608 on event-gina"></div><div class="event-cell-v608 on event-gina"></div><div class="event-cell-v608 on event-gina"></div><div class="event-cell-v608"></div><div class="event-cell-v608"></div><div class="event-cell-v608"></div><div class="event-cell-v608"></div>
    <div class="event-row-name-v608 event-officer">Обучение офицеров</div><div class="event-cell-v608 on event-officer"></div><div class="event-cell-v608 on event-officer"></div><div class="event-cell-v608 on event-officer"></div><div class="event-cell-v608 on event-officer"></div><div class="event-cell-v608 on event-officer"></div><div class="event-cell-v608 on event-officer"></div><div class="event-cell-v608 on event-officer"></div><div class="event-cell-v608 on event-officer"></div>
    <div class="event-row-name-v608 event-fort">Битвы за форт</div><div class="event-cell-v608"></div><div class="event-cell-v608 on event-fort"></div><div class="event-cell-v608"></div><div class="event-cell-v608 on event-fort"></div><div class="event-cell-v608"></div><div class="event-cell-v608 on event-fort"></div><div class="event-cell-v608"></div><div class="event-cell-v608 on event-fort"></div>
  </div></div>
  <div class="event-soon-v608">
    <h3>⏳ Ближайшие даты</h3>
    <div class="event-soon-list-v608"><span class="event-soon-chip-v608 event-snow">26.10 · Снегоуборщики</span><span class="event-soon-chip-v608 event-raid">26–28.10 · Героический рейд</span><span class="event-soon-chip-v608 event-treasure">26–28.10 · Сокровища путешествия</span><span class="event-soon-chip-v608 event-gina">26–29.10 · Месть Джины</span><span class="event-soon-chip-v608 event-officer">26.10–02.11 · Обучение офицеров</span><span class="event-soon-chip-v608 event-fort">27.10 · 29.10 · 31.10 · 02.11 · Битвы за форт</span></div>
  </div>
  <div class="event-schedule-note-v608">В график внесены только даты, подтверждённые по игровому календарю из присланного видео.</div>
</section>'''

pattern = re.compile(r'(?:<style id="event-schedule-v609-colors">.*?</style>\s*)?<section class="event-schedule-v608".*?</section>', re.S)
if not pattern.search(s):
    raise SystemExit('event schedule block not found')
s, n = pattern.subn(new_block, s, count=1)
if n != 1:
    raise SystemExit(f'unexpected replacements: {n}')
p.write_text(s, encoding='utf-8')
print('calendar updated')
