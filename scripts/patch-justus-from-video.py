from pathlib import Path

path = Path('news-update-2026-10-19.html')
text = path.read_text(encoding='utf-8')

start_marker = '<h3 class="update-subheading">📚 Навыки Юстуса</h3>'
end_marker = '<h3 class="update-subheading">⭐ Чем интересен Юстус</h3>'
start = text.find(start_marker)
end = text.find(end_marker, start)
if start == -1 or end == -1:
    raise SystemExit('Justus skills block markers not found')

skills = '''<h3 class="update-subheading">📚 Навыки Юстуса</h3>
<div class="update-note"><span>✅</span><div><strong>Данные обновлены по новому видео с актуальным русским интерфейсом.</strong> Ниже указаны реальные русские названия и значения, которые видны в игре.</div></div>
<div class="update-skill-grid">
<div class="update-skill wide"><h3>🏛 Слава прошлого</h3><p>Талант отношений Юстуса. Позволяет периодически получать <strong>«Ящики чести династии»</strong> в награду за исследование. На показанном <strong>5 уровне</strong>: каждые <strong>140 мин.</strong> выдаётся <strong>2 ящика</strong>, дневной лимит <strong>5</strong>. На максимальном <strong>11 уровне</strong>: каждые <strong>60 мин.</strong> выдаётся <strong>3 ящика</strong>, дневной лимит <strong>10</strong>.</p></div>
<div class="update-skill"><h3>💎 Славные достижения</h3><p>Увеличивает добычу <strong>светящихся камней в рейдах Лабиринта</strong>. Уровни 1–5: <strong>+4% / +8% / +12% / +16% / +20%</strong>.</p></div>
<div class="update-skill"><h3>🐾 Искатель сокровищ</h3><p>Даёт дополнительные ежедневные приключения питомца и шанс удвоенной награды. Уровни 1–5: шанс <strong>15% / 20% / 25% / 30% / 35%</strong>; дополнительных попыток <strong>+1 / +1 / +1 / +1 / +2</strong>.</p></div>
<div class="update-skill"><h3>🤝 Мастер-дипломат</h3><p>За каждый <strong>звериный рейд</strong> можно получить «Ящики чести династии». Уровни 1–5 дают за рейд <strong>1 / 2 / 3 / 4 / 5 ящиков</strong>, а дневной лимит растёт: <strong>3 / 4 / 6 / 8 / 10</strong>.</p></div>
<div class="update-skill wide"><h3>🧭 Странник удачи</h3><p>За определённое число завершённых событий похода выдаются «Ящики чести династии». В видео показаны уровни 2–10: <strong>ур.2</strong> — каждые 10 событий, 1 ящик, лимит 4; <strong>ур.3</strong> — 8 / 1 / 5; <strong>ур.4</strong> — 8 / 2 / 6; <strong>ур.5</strong> — 6 / 2 / 8; <strong>ур.6</strong> — 5 / 2 / 10; <strong>ур.7</strong> — 5 / 3 / 12; <strong>ур.8</strong> — 5 / 3 / 15; <strong>ур.9</strong> — 4 / 3 / 18; <strong>ур.10</strong> — 4 / 4 / 20.</p></div>
</div>
<h3 class="update-subheading">🎁 Что выпадает из «Ящика чести династии»</h3>
<div class="update-copy"><p>Ящик содержит <strong>один случайный предмет</strong>. В новом видео показана полная таблица шансов:</p></div>
<div class="update-skill-grid">
<div class="update-skill"><h3>⏱ Ускорение изучения 8 ч. ×1</h3><p><strong>0,7%</strong></p></div>
<div class="update-skill"><h3>⛵ Парусник-захватчик ×2</h3><p><strong>1,8%</strong></p></div>
<div class="update-skill"><h3>💠 Обычная печать эксперта ×1</h3><p><strong>3,5%</strong></p></div>
<div class="update-skill"><h3>📚 Книга знаний ×100</h3><p><strong>5%</strong></p></div>
<div class="update-skill"><h3>⏱ Ускорение изучения 1 ч. ×1</h3><p><strong>11%</strong></p></div>
<div class="update-skill"><h3>⏳ Ускорение изучения 5 мин. ×5</h3><p><strong>30%</strong></p></div>
<div class="update-skill wide"><h3>🧭 Компас ×6</h3><p><strong>48%</strong></p></div>
</div>
'''
text = text[:start] + skills + text[end:]

old_warning = '<div class="update-warning"><strong>⚠️ Важно про цифры.</strong> В видео Tonton Gaming точные значения навыков и стоимость прокачки Юстуса ещё не были известны. Автор отдельно подчёркивает, что их нельзя считать подтверждёнными. Поэтому указанные ниже запасы — <strong>ориентир для подготовки, а не цена прокачки Юстуса</strong>.</div>'
new_warning = '<div class="update-warning"><strong>⚠️ Раздел обновлён.</strong> Старые предварительные названия и значения навыков заменены на данные, показанные в новом видео с русским интерфейсом. Рекомендации по запасам ресурсов ниже относятся к подготовительному видео Tonton Gaming и остаются ориентиром, а не стоимостью прокачки Юстуса.</div>'
if old_warning in text:
    text = text.replace(old_warning, new_warning, 1)

path.write_text(text, encoding='utf-8')
print('Patched exact Justus skills from new video.')
