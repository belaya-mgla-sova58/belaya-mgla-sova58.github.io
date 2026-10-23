import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
u='https://whiteout-survival.com/ru/heroes/karol/'
r=requests.get(u,headers={'User-Agent':'Mozilla/5.0'},timeout=30); r.raise_for_status()
s=BeautifulSoup(r.text,'html.parser')
out=['TITLE: '+(s.title.get_text(' ',strip=True) if s.title else ''),'\nTEXT:\n'+s.get_text('\n',strip=True),'\nIMAGES:']
for i,im in enumerate(s.find_all('img')):
    src=im.get('data-lazy-src') or im.get('data-src') or im.get('src') or ''
    alt=im.get('alt','')
    if src and not src.startswith('data:'):
        out.append(f'{i}\tALT={alt}\tURL={urljoin(u,src)}')
open('tmp-karol-source.txt','w',encoding='utf-8').write('\n'.join(out))
