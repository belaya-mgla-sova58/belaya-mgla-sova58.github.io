from pathlib import Path
from bs4 import BeautifulSoup
import json

first={1:'jeronimo',2:'alonso',3:'greg',4:'ahmose',5:'hector',6:'renee',7:'bradley',8:'gatot',9:'fred',10:'blanchette',11:'eleonora',12:'hervor'}
for g,slug in first.items():
    p=Path(f'hero-generation-{g:02d}.html')
    soup=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
    url=f'https://belaya-mgla-sova58.github.io/hero-generation-{g:02d}.html'
    img=f'https://belaya-mgla-sova58.github.io/assets/heroes/gen-{g:02d}/{slug}/portrait.webp'
    for key in ('og:image',):
        m=soup.find('meta',attrs={'property':key})
        if m: m['content']=img
    tw=soup.find('meta',attrs={'name':'twitter:image'})
    if tw: tw['content']=img
    schema=soup.find('script',attrs={'type':'application/ld+json'})
    if schema:
        try:
            data=json.loads(schema.string or schema.get_text())
            if data.get('@type')=='CollectionPage':
                data['name']=f'{g} поколение героев'
                data['description']=f'Герои {g} поколения Белой мглы с переходом на подробные гайды.'
                data['url']=url
                schema.string=json.dumps(data,ensure_ascii=False,separators=(',',':'))
        except Exception:
            pass
    p.write_text(str(soup),encoding='utf-8')

# Make the category button on heroes.html visibly button-like without relying on page-specific CSS.
p=Path('heroes.html')
soup=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
a=soup.find('a',href='hero-generations.html')
if a:
    a['style']='display:inline-flex;padding:10px 13px;border:1px solid rgba(130,210,255,.20);border-radius:13px;background:rgba(82,181,235,.08);color:#aeeaff;text-decoration:none;font-weight:850'
p.write_text(str(soup),encoding='utf-8')
