from pathlib import Path

p = Path('state-58.html')
s = p.read_text(encoding='utf-8')

replacements = {
    '<div class="guide-topics"><span class="topic-pill">👑 Президенты</span><span class="topic-pill">🏆 Победы</span><span class="topic-pill">🛡️ Альянсы</span></div>\n': '',
    'Будущий каталог альянсов с отдельными карточками и анкетами.': 'Альянсы, которые пишут историю 58-го.',
    'Хронология президентов государства 58. Только ник, дата и последовательность президентства.': 'Президенты, которые возглавляли государство 58.',
    'Здесь соберём крупные победы государства, битвы за Солнечный замок, результаты SvS и другие события, которые стоит сохранить в истории 58-го.': 'Главные победы, битвы за Солнечный замок, результаты SvS и другие памятные события 58-го.',
    '<div class="state58-note">Первую хронологию событий добавим вместе с точными датами и названиями соперников.</div>': '',
    'Этот блок подготовлен под карточки всех альянсов государства. У каждого альянса будет короткая карточка, а по нажатию откроется полная анкета.': 'Альянсы государства 58 и страницы их общей истории.',
    '.state58-note{padding:15px 17px;border-radius:16px;background:rgba(62,141,197,.1);border:1px dashed rgba(151,207,255,.28);line-height:1.55}': ''
}

for old, new in replacements.items():
    if old not in s:
        raise SystemExit(f'Marker not found: {old[:80]}')
    s = s.replace(old, new, 1)

p.write_text(s, encoding='utf-8')

sw = Path('service-worker.js')
w = sw.read_text(encoding='utf-8')
w = w.replace("const CACHE_NAME = 'belaya-mgla-v601';", "const CACHE_NAME = 'belaya-mgla-v602';", 1)
sw.write_text(w, encoding='utf-8')
