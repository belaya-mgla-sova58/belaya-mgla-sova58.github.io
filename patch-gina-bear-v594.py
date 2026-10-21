from pathlib import Path
p=Path('events.html')
s=p.read_text(encoding='utf-8')
marker='</style>\n</head><body class="is-events-route'
css='''</style>
<style id="gina-bear-card-fix-v594">
body.is-events-route .event-group-grid-v522{align-items:start!important;}
body.is-events-route .event-group-grid-v522>.guide-nav-card{align-self:start!important;width:100%!important;}
body.is-events-route .guide-nav-card.gina-event-card-v587{box-sizing:border-box!important;display:flex!important;align-items:center!important;gap:12px!important;width:100%!important;min-height:0!important;height:auto!important;aspect-ratio:1024/341!important;padding:12px 14px!important;border:1px solid rgba(126,207,249,.24)!important;border-radius:14px!important;background:radial-gradient(circle at 88% 12%,rgba(245,184,73,.18),transparent 36%),linear-gradient(145deg,rgba(8,34,62,.98),rgba(4,19,38,.99))!important;box-shadow:0 10px 24px rgba(0,0,0,.20)!important;overflow:hidden!important;}
body.is-events-route .gina-event-icon-v587{flex:0 0 clamp(34px,4.3vw,52px)!important;width:clamp(34px,4.3vw,52px)!important;height:clamp(34px,4.3vw,52px)!important;border-radius:12px!important;font-size:clamp(20px,2.5vw,29px)!important;}
body.is-events-route .gina-event-copy-v587{gap:2px!important;overflow:hidden!important;}
body.is-events-route .gina-event-copy-v587 strong{font-size:clamp(13px,1.7vw,19px)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;}
body.is-events-route .gina-event-copy-v587 small{font-size:clamp(8px,.95vw,11px)!important;line-height:1.25!important;display:-webkit-box!important;-webkit-line-clamp:2!important;-webkit-box-orient:vertical!important;overflow:hidden!important;}
body.is-events-route .gina-event-badge-v587{padding:2px 6px!important;font-size:clamp(7px,.72vw,9px)!important;}
body.is-events-route .guide-nav-card.bear-event-card-v499{width:100%!important;height:auto!important;aspect-ratio:1024/341!important;overflow:hidden!important;}
body.is-events-route .guide-nav-card.bear-event-card-v499 img{width:100%!important;height:100%!important;object-fit:cover!important;}
@media(max-width:820px){body.is-events-route .guide-nav-card.gina-event-card-v587{gap:6px!important;padding:5px 7px!important;border-radius:8px!important;}body.is-events-route .gina-event-icon-v587{flex-basis:28px!important;width:28px!important;height:28px!important;border-radius:8px!important;font-size:17px!important;}body.is-events-route .gina-event-copy-v587{gap:1px!important;}body.is-events-route .gina-event-copy-v587 strong{font-size:11px!important;}body.is-events-route .gina-event-copy-v587 small{display:none!important;}body.is-events-route .gina-event-badge-v587{font-size:6px!important;padding:1px 4px!important;}body.is-events-route .guide-nav-card.bear-event-card-v499{border-radius:8px!important;}body.is-events-route .guide-nav-card.bear-event-card-v499 img{border-radius:7px!important;}}
</style>
</head><body class="is-events-route'''
if 'gina-bear-card-fix-v594' not in s:
    if marker not in s:
        raise SystemExit('marker not found')
    s=s.replace(marker,css,1)
p.write_text(s,encoding='utf-8')
