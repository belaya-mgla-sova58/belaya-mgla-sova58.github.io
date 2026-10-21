from pathlib import Path
p=Path('creative-bananovyi-mom.html')
s=p.read_text(encoding='utf-8')
old='<div aria-hidden="true" class="banana-cover-v592"><span class="banana-cover-icon-v592">🍌</span><div><b>БАНАНОВЫЙ МОМ</b><small>ПИВО · РОМ · ГОС 58</small></div></div>'
new='''<div aria-hidden="true" class="banana-cover-v592 banana-cover-v599">
  <span class="banana-prop banana-prop-left">🍌</span>
  <span class="banana-prop banana-prop-beer">🍺</span>
  <span class="banana-prop banana-prop-rum">🥃</span>
  <svg class="banana-minion-v599" viewBox="0 0 220 300" role="img" aria-label="Жёлтый герой в очках и синем комбинезоне">
    <defs>
      <linearGradient id="minionYellow599" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffe95a"/><stop offset="1" stop-color="#f3c61f"/></linearGradient>
      <linearGradient id="minionBlue599" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#3b84c6"/><stop offset="1" stop-color="#174b74"/></linearGradient>
      <filter id="minionShadow599"><feDropShadow dx="0" dy="8" stdDeviation="6" flood-opacity=".35"/></filter>
    </defs>
    <g filter="url(#minionShadow599)">
      <ellipse cx="110" cy="148" rx="72" ry="112" fill="url(#minionYellow599)"/>
      <path d="M52 154h116v81c0 28-23 51-51 51h-14c-28 0-51-23-51-51z" fill="url(#minionBlue599)"/>
      <path d="M72 148v48M148 148v48" stroke="#1d4e77" stroke-width="14" stroke-linecap="round"/>
      <rect x="70" y="173" width="80" height="72" rx="18" fill="#2c70aa" stroke="#173e60" stroke-width="5"/>
      <circle cx="110" cy="112" r="40" fill="#747d86" stroke="#343a40" stroke-width="8"/>
      <circle cx="110" cy="112" r="29" fill="#f8f8f4"/>
      <circle cx="110" cy="112" r="12" fill="#6f9e36"/>
      <circle cx="110" cy="112" r="6" fill="#222"/>
      <circle cx="106" cy="108" r="2.5" fill="#fff"/>
      <path d="M44 108h26M150 108h26" stroke="#343a40" stroke-width="9" stroke-linecap="round"/>
      <path d="M82 143q28 24 56 0" fill="none" stroke="#8a5a24" stroke-width="6" stroke-linecap="round"/>
      <path d="M52 215q-28 14-34-9M168 215q28 14 34-9" fill="none" stroke="#f2c41e" stroke-width="18" stroke-linecap="round"/>
      <path d="M77 284v12M143 284v12" stroke="#25384a" stroke-width="16" stroke-linecap="round"/>
    </g>
  </svg>
  <div class="banana-eq-v599" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
  <div class="banana-notes-v599" aria-hidden="true">♪ ♫ ♪</div>
</div>'''
if old in s:
    s=s.replace(old,new,1)
elif 'banana-cover-v599' not in s:
    raise SystemExit('cover marker not found')
style='''\n<style id="banana-cover-v599-style">
.banana-cover-v599{position:relative!important;display:block!important;width:100%!important;max-width:none!important;aspect-ratio:16/7!important;min-height:205px!important;margin:0 0 18px!important;padding:0!important;overflow:hidden!important;border:1px solid rgba(255,214,82,.38)!important;border-radius:22px!important;background:radial-gradient(circle at 50% 43%,rgba(255,213,71,.22) 0 12%,rgba(255,184,34,.08) 24%,transparent 44%),radial-gradient(circle at 15% 18%,rgba(255,217,85,.16),transparent 25%),radial-gradient(circle at 82% 18%,rgba(163,70,255,.19),transparent 28%),radial-gradient(circle at 78% 82%,rgba(27,171,255,.15),transparent 30%),linear-gradient(145deg,#110c20 0%,#24112f 33%,#09283f 72%,#061622 100%)!important;box-shadow:0 18px 42px rgba(0,0,0,.34),inset 0 0 44px rgba(255,200,44,.06)!important}
.banana-minion-v599{position:absolute;left:50%;top:49%;transform:translate(-50%,-50%);width:clamp(126px,19vw,178px);height:auto;z-index:3;filter:drop-shadow(0 12px 16px rgba(0,0,0,.36))}
.banana-prop{position:absolute;z-index:2;filter:drop-shadow(0 8px 10px rgba(0,0,0,.42));line-height:1}.banana-prop-left{left:14%;top:20%;font-size:clamp(54px,8vw,88px);transform:rotate(-18deg)}.banana-prop-beer{left:17%;bottom:12%;font-size:clamp(46px,7vw,76px)}.banana-prop-rum{right:17%;bottom:12%;font-size:clamp(46px,7vw,76px)}
.banana-eq-v599{position:absolute;left:7%;right:7%;bottom:7%;height:34px;display:flex;align-items:flex-end;justify-content:space-between;gap:5px;opacity:.72;z-index:1}.banana-eq-v599 i{display:block;width:5%;border-radius:6px 6px 0 0;background:linear-gradient(#ffe071,#f2b720);box-shadow:0 0 12px rgba(255,204,54,.15)}.banana-eq-v599 i:nth-child(1){height:35%}.banana-eq-v599 i:nth-child(2){height:72%}.banana-eq-v599 i:nth-child(3){height:48%}.banana-eq-v599 i:nth-child(4){height:88%}.banana-eq-v599 i:nth-child(5){height:58%}.banana-eq-v599 i:nth-child(6){height:95%}.banana-eq-v599 i:nth-child(7){height:66%}.banana-eq-v599 i:nth-child(8){height:82%}.banana-eq-v599 i:nth-child(9){height:43%}.banana-eq-v599 i:nth-child(10){height:76%}.banana-eq-v599 i:nth-child(11){height:54%}.banana-eq-v599 i:nth-child(12){height:91%}
.banana-notes-v599{position:absolute;right:7%;top:12%;color:rgba(255,231,127,.68);font-size:clamp(18px,3vw,34px);letter-spacing:10px;transform:rotate(8deg);text-shadow:0 0 12px rgba(255,205,74,.22)}
@media(max-width:640px){.banana-cover-v599{aspect-ratio:16/9!important;min-height:170px!important;border-radius:16px!important}.banana-minion-v599{width:112px;top:48%}.banana-prop-left{left:8%;top:20%;font-size:49px}.banana-prop-beer{left:10%;font-size:39px}.banana-prop-rum{right:10%;font-size:39px}.banana-notes-v599{right:4%;top:9%;font-size:17px;letter-spacing:5px}.banana-eq-v599{left:4%;right:4%;height:28px}}
</style>\n'''
if 'banana-cover-v599-style' not in s:
    s=s.replace('<script id="creative-song-view-v396-script">',style+'<script id="creative-song-view-v396-script">',1)
p.write_text(s,encoding='utf-8')

# remove global external cover loader; page now owns its cover
j=Path('site-v269.js')
js=j.read_text(encoding='utf-8')
start="  var bananaCover=document.createElement('link');\n  bananaCover.rel='stylesheet';\n  bananaCover.href='banana-song-cover-v596.css?v=598';\n  document.head.appendChild(bananaCover);\n\n"
js=js.replace(start,'')
j.write_text(js,encoding='utf-8')

sw=Path('service-worker.js')
t=sw.read_text(encoding='utf-8').replace("belaya-mgla-v598","belaya-mgla-v599")
t=t.replace("  './banana-song-cover-v596.css?v=598',\n",'')
sw.write_text(t,encoding='utf-8')
