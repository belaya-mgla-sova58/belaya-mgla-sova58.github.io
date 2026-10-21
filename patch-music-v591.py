from pathlib import Path
p=Path('creative-corner.html')
s=p.read_text(encoding='utf-8')
start='<section class="creative-music-v590" aria-labelledby="creativeMusicTitleV590">'
song_start='<a aria-label="Открыть песню Солнечный замок" class="creative-v349-card creative-song-card-v396" href="creative-solnechny-zamok.html">'
roman='<a class="creative-v349-card" href="creative-roman48.html">'
if start not in s or song_start not in s or roman not in s:
    raise SystemExit('Required markers not found')
pre=s[:s.index(start)]
segment=s[s.index(start):]
ss=segment.index(song_start)
rr=segment.index(roman)
song=segment[ss:rr].rstrip()
rest=segment[rr:]
# Remove any accidental closing tags/placeholders from extracted song tail, if present.
for marker in ['<div class="creative-song-coming-v590"', '</div></section>']:
    if marker in song:
        song=song[:song.index(marker)].rstrip()
section='''<section class="creative-music-v590" aria-labelledby="creativeMusicTitleV590">
<div class="creative-music-head-v590"><div><h2 id="creativeMusicTitleV590">♫ Музыка 58-го</h2><p>Песни игроков государства 58. Для каждого трека — отдельная страница с плеером, автором, текстом, лайками и просмотрами.</p></div><span class="creative-music-badge-v590">НОВАЯ ПЕСНЯ ГОТОВИТСЯ</span></div>
<div class="creative-music-grid-v590">
'''+song+'''
<div class="creative-song-coming-v590" aria-label="Новая песня готовится к публикации"><span>♫ СЛЕДУЮЩАЯ ПРЕМЬЕРА</span><strong>Новая песня</strong><small>Место уже подготовлено: обложка, название, автор, аудио, дата, длительность, описание и полный текст песни.</small></div>
</div>
</section>
'''
p.write_text(pre+section+rest,encoding='utf-8')
