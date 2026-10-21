from pathlib import Path
import re

TITLE='Банановый МОМ'
AUTHOR='[MOM]ΨКрестьянка Ψ'
DURATION='1:56'
DATE='21.10.2026'
PAGE='creative-bananovyi-mom.html'
AUDIO='assets/bananovyi-mom.mp3'
KEY='creative-bananovyi-mom-krestyanka-v1'

root=Path('.')
template=root/'creative-solnechny-zamok.html'
out=root/PAGE
s=template.read_text(encoding='utf-8')

s=s.replace('Солнечный замок', TITLE)
s=s.replace('[VgB]HiTmaN74', AUTHOR)
s=s.replace('4:54', DURATION)
s=s.replace('creative-solnechny-zamok-hitman74-v2', KEY)
s=s.replace('assets/solnechny-zamok-hitman74.mp3', AUDIO)
s=s.replace('creative-solnechny-zamok.html', PAGE)
s=s.replace('Песня «Банановый МОМ». Автор — '+AUTHOR+'. Творческий уголок государства 58.',
            'Игровая песня «Банановый МОМ». Автор — '+AUTHOR+'. Музыка государства 58.')
s=s.replace('<div class="creative-song-tags-v396"><span>Гос 58</span><span>1:56</span></div>',
            '<div class="creative-song-tags-v396"><span>Гос 58</span><span>1:56</span><span>21.10.2026</span></div>')
s=s.replace('class="is-news-route news-subpage news-top-creative site-hq-v407',
            'class="is-news-route news-subpage news-top-creative bananovyi-mom-v592 site-hq-v407',1)

cover='''<div aria-hidden="true" class="banana-cover-v592"><span class="banana-cover-icon-v592">🍌</span><div><b>БАНАНОВЫЙ МОМ</b><small>ПИВО · РОМ · ГОС 58</small></div></div>\n'''
s=s.replace('<header class="creative-song-head-v396">\n', '<header class="creative-song-head-v396">\n'+cover,1)

lyrics='''<div class="creative-song-lyrics-text-v396">
<p class="creative-song-chorus-v396"><strong>Мом, Мом, Мом, Мом, Мом, Мом, Мом, Мом,<br/>Любит пиво, пиво, любит Мом,<br/>Но пришел Банана и принес с собой ром.<br/>Банановый Мом пьет банановый ром.<br/>Банановый Мом пьет банановый ром.<br/>Пьет банановый ром.<br/>Пьет банановый ром.<br/>Пьет банановый ром.<br/>Банановый ром.</strong></p>
<p>Суетолог принес колу, стало сразу веселей.<br/>Обещали: сожгут снова, пусть идут, дадим люлей.<br/>Госпожа готовит пончики не затем, чтобы закусить.<br/>Наше время не окончено, всех накормим, будем жить.</p>
<p class="creative-song-chorus-v396"><strong>Мом, Мом, Мом, любит пиво,<br/>Пиво любит Мом,<br/>Но пришел Банана и принес с собой ром.<br/>Банановый Мом пьет банановый ром.<br/>Банановый Мом пьет банановый ром.<br/>Банановый ром.<br/>Пьет банановый ром.</strong></p>
<p>Закупаем памперсы, чтоб не наложить в трусы.<br/>А в Доминос давно готов много укатов трусов.</p>
<p class="creative-song-chorus-v396"><strong>Мом любит пиво,<br/>Пиво любит Мом,<br/>Но пришел Банана и принес с собой ром.<br/>Банановый Мом пьет банановый ром.<br/>Банановый Мом пьет банановый ром.<br/>Банановый Мом пьет банановый ром.<br/>Банановый Мом пьет банановый ром.</strong></p>
<p class="creative-song-finale-v396"><strong>Банановый Мом<br/>Пьет банановый ром.</strong></p>
</div>'''
s=re.sub(r'<div class="creative-song-lyrics-text-v396">.*?</div>\n</section>\n<footer class="creative-song-signature-v396">',
         lyrics+'\n</section>\n<footer class="creative-song-signature-v396">',s,flags=re.S,count=1)

banana_css='''
<style id="bananovyi-mom-v592-style">
body.bananovyi-mom-v592 .creative-song-head-v396{background:linear-gradient(145deg,rgba(55,48,18,.96),rgba(11,43,72,.98))!important;border-color:rgba(255,214,91,.34)!important}
body.bananovyi-mom-v592 .creative-song-head-v396::after{content:"🍌"!important;color:rgba(255,220,101,.13)!important;filter:saturate(.8)}
body.bananovyi-mom-v592 .creative-song-kicker-v396{color:#ffd96a!important}
body.bananovyi-mom-v592 .creative-song-tags-v396 span{border-color:rgba(255,217,105,.22)!important;background:rgba(94,76,17,.30)!important;color:#ffe8a3!important}
body.bananovyi-mom-v592 .creative-song-disc-v396{background:linear-gradient(135deg,#705d1d,#294d78)!important;color:#ffe57f!important;box-shadow:inset 0 0 0 1px rgba(255,226,120,.22)!important}
body.bananovyi-mom-v592 .creative-song-chorus-v396{background:linear-gradient(90deg,rgba(114,89,18,.34),rgba(12,47,81,.72))!important;border-left-color:#f5c94c!important}
body.bananovyi-mom-v592 .creative-song-finale-v396{color:#ffe17a!important}
.banana-cover-v592{position:relative;z-index:1;display:flex;align-items:center;gap:12px;width:max-content;max-width:100%;margin:0 0 15px;padding:9px 12px 9px 9px;border:1px solid rgba(255,218,100,.24);border-radius:15px;background:rgba(20,30,39,.42);backdrop-filter:blur(7px)}
.banana-cover-icon-v592{display:grid;place-items:center;width:44px;height:44px;flex:0 0 44px;border-radius:13px;background:linear-gradient(145deg,rgba(255,221,92,.22),rgba(255,183,43,.10));font-size:27px}
.banana-cover-v592 b{display:block;color:#fff0ac;font-size:12px;letter-spacing:.055em}.banana-cover-v592 small{display:block;margin-top:3px;color:#c8d8e5;font-size:9px;font-weight:800;letter-spacing:.08em}
@media(max-width:640px){.banana-cover-v592{margin-bottom:12px}.banana-cover-icon-v592{width:40px;height:40px;flex-basis:40px;font-size:24px}}
</style>
'''
s=s.replace('<script id="creative-song-view-v396-script">',banana_css+'<script id="creative-song-view-v396-script">',1)
out.write_text(s,encoding='utf-8')

# Replace the prepared premiere placeholder with the real song card.
corner=root/'creative-corner.html'
c=corner.read_text(encoding='utf-8')
placeholder=re.compile(r'<div class="creative-song-coming-v590" aria-label="Новая песня готовится к публикации">.*?</div>',re.S)
card=f'''<a aria-label="Открыть песню {TITLE}" class="creative-v349-card creative-song-card-v396 creative-song-new-v592" href="{PAGE}">
<div class="creative-v349-kind">♫ НОВАЯ ПРЕМЬЕРА</div>
<h2>{TITLE}</h2>
<div class="creative-v349-author">Автор — {AUTHOR}</div>
<div class="creative-song-meta-v396">{DURATION} · {DATE}</div>
<div class="creative-card-stats-v367">
<span aria-label="Поставить лайк песне {TITLE}" class="creative-card-like-v367 news-like-button" data-like-key="{KEY}" role="button" tabindex="0"><span aria-hidden="true" class="news-like-heart">♥</span><span class="news-like-count">0</span></span>
<span aria-label="Просмотры песни {TITLE}" class="creative-card-views-v367" data-creative-view="{KEY}"><span aria-hidden="true">👀</span><b>0</b></span>
</div>
<div aria-hidden="true" class="creative-v349-arrow">›</div>
</a>'''
if placeholder.search(c):
    c=placeholder.sub(card,c,count=1)
elif PAGE not in c:
    raise SystemExit('Premiere placeholder not found')
extra='''.creative-song-new-v592{border-color:rgba(255,210,79,.36)!important;background:linear-gradient(145deg,rgba(58,48,13,.94),rgba(8,42,73,.98))!important}.creative-song-new-v592 .creative-v349-kind{color:#ffd96a!important}.creative-song-new-v592::after{content:"🍌"!important;color:rgba(255,215,80,.15)!important}\n'''
if '.creative-song-new-v592{' not in c:
    c=c.replace('@media(max-width:700px){.creative-music-head-v590',extra+'@media(max-width:700px){.creative-music-head-v590',1)
corner.write_text(c,encoding='utf-8')

# Sitemap.
smap=root/'sitemap.xml'
sm=smap.read_text(encoding='utf-8')
url='  <url><loc>https://belaya-mgla-sova58.github.io/'+PAGE+'</loc></url>\n'
if PAGE not in sm:
    anchor='  <url><loc>https://belaya-mgla-sova58.github.io/creative-solnechny-zamok.html</loc></url>\n'
    sm=sm.replace(anchor,anchor+url,1)
smap.write_text(sm,encoding='utf-8')

# Refresh PWA cache and cache the HTML page. The MP3 stays runtime-cached after first playback.
sw=root/'service-worker.js'
w=sw.read_text(encoding='utf-8')
w=re.sub(r"const CACHE_NAME = 'belaya-mgla-v\d+';","const CACHE_NAME = 'belaya-mgla-v592';",w,count=1)
if "'./creative-bananovyi-mom.html'" not in w:
    w=w.replace("  './cheats.html',\n","  './cheats.html',\n  './creative-bananovyi-mom.html',\n",1)
sw.write_text(w,encoding='utf-8')
