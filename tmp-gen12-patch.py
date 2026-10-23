from pathlib import Path
p=Path('tmp-gen12-build.py')
s=p.read_text(encoding='utf-8')
old='''    # replace current jero-page content using robust markers\n    start=src.find('<main class="jero-page">')\n    end=src.find('</main>',start)\n    if start<0 or end<0:\n        start=src.find('<div class="jero-page">'); end=src.find('</div>\\n',start)\n    if start<0: raise RuntimeError('template main not found')\n    opening=src[start:src.find('>',start)+1]\n    src=src[:start]+opening+body+'</main>'+src[end+7:] if opening.startswith('<main') else src\n    Path(f'hero-{slug}.html').write_text(src,encoding='utf-8')\n'''
new='''    # replace only the central hero content while preserving the current site shell\n    soup=BeautifulSoup(src,'html.parser')\n    page=soup.select_one('.jero-page')\n    if page is None: raise RuntimeError('template .jero-page not found')\n    page.clear()\n    frag=BeautifulSoup(body,'html.parser')\n    for node in list(frag.contents):\n        page.append(node)\n    src=str(soup)\n    Path(f'hero-{slug}.html').write_text(src,encoding='utf-8')\n'''
if old not in s:
    raise SystemExit('target replacement block not found')
s=s.replace(old,new)
p.write_text(s,encoding='utf-8')
