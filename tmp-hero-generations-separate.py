from pathlib import Path
import re
p=Path('heroes.html')
s=p.read_text(encoding='utf-8')
replacement='''<details class="guide-section guide-fold-v414" data-guide-fold="6" open=""><summary class="guide-fold-summary-v414"><h2 class="guide-fold-title-v414" id="section-6"> Поколения героев</h2><span aria-hidden="true" class="guide-fold-action-v414">Подробнее</span></summary><div class="guide-fold-body-v414"><div class="hero-catalog-intro"><div><span class="hero-catalog-kicker">Отдельная категория</span><h3>Поколения героев</h3><p>Все подробные гайды теперь собраны на отдельной странице и разделены по поколениям от 1 до 12.</p></div><div style="margin-top:14px"><a href="hero-generations.html" style="display:inline-flex;padding:11px 14px;border-radius:13px;border:1px solid rgba(130,211,255,.24);background:rgba(82,181,235,.10);color:#c8f0ff;text-decoration:none;font-weight:900">Открыть поколения героев →</a></div></div></div></details>\n'''
pat=r'<details class="guide-section guide-fold-v414" data-guide-fold="6".*?(?=<details class="guide-section guide-fold-v414" data-guide-fold="7")'
s2,n=re.subn(pat,replacement,s,count=1,flags=re.S)
if n!=1: raise SystemExit(f'section6 replace count={n}')
s2=s2.replace('<a href="#section-6">Все герои по поколениям</a>','<a href="#section-6">Поколения героев</a>',1)
p.write_text(s2,encoding='utf-8')
sp=Path('sitemap.xml'); sm=sp.read_text(encoding='utf-8')
url='https://belaya-mgla-sova58.github.io/hero-generations.html'
if url not in sm:
    sm=sm.replace('</urlset>',f'  <url><loc>{url}</loc><lastmod>2026-10-23</lastmod></url>\n</urlset>')
sp.write_text(sm,encoding='utf-8')
