from pathlib import Path
import re, json, html as htmlmod, shutil

ROOT = Path(__file__).resolve().parents[1]
VERSION = '585'


def read(path):
    return (ROOT / path).read_text(encoding='utf-8')


def write(path, text):
    (ROOT / path).write_text(text, encoding='utf-8')


def strip_tags(s):
    s = re.sub(r'<script\b[^>]*>.*?</script>', ' ', s, flags=re.I | re.S)
    s = re.sub(r'<style\b[^>]*>.*?</style>', ' ', s, flags=re.I | re.S)
    s = re.sub(r'<[^>]+>', ' ', s)
    return re.sub(r'\s+', ' ', htmlmod.unescape(s)).strip()


html_files = sorted(ROOT.glob('*.html'))
secondary_menu = {'gear.html', 'experts.html', 'pets.html', 'state-positions.html', 'farm.html'}

for p in html_files:
    text = p.read_text(encoding='utf-8')
    nav_pat = re.compile(r'(<div class="nav-wrap"[^>]*>.*?<nav>)(.*?)(</nav>\s*</div>)', re.I | re.S)
    m = nav_pat.search(text)
    if m:
        middle = m.group(2)
        for href in secondary_menu:
            middle = re.sub(r'<a\b(?=[^>]*href="' + re.escape(href) + r'")[^>]*>.*?</a>', '', middle, flags=re.I | re.S)
        text = text[:m.start()] + m.group(1) + middle + m.group(3) + text[m.end():]

    text = re.sub(r'site-v269\.css\?v=\d+', 'site-v269-v585.min.css?v=585', text)
    text = re.sub(r'site-v269\.js\?v=\d+', 'site-v269.js?v=585', text)
    text = re.sub(r'pwa-install\.js\?v=\d+', 'pwa-install.js?v=585', text)

    if p.name == 'index.html':
        text = text.replace('class="pwa-install-v540"', 'class="pwa-install-v540 pwa-install-compact-v585"', 1)
        lm = re.search(r'(<div class="home-today-list-v581"[^>]*>)(.*?)(</div>)', text, flags=re.I | re.S)
        if lm:
            labels = re.findall(r'<label\b[^>]*home-today-item-v581[^>]*>.*?</label>', lm.group(2), flags=re.I | re.S)
            if len(labels) > 3:
                body = '\n' + '\n'.join(labels[:3]) + '\n'
                text = text[:lm.start()] + lm.group(1) + body + lm.group(3) + text[lm.end():]
    p.write_text(text, encoding='utf-8')

# Small search index is kept out of the main bundle and loaded only when search is used.
entries = []
for p in html_files:
    if p.name in {'404.html', 'maintenance.html', '_qa_article.html', '_qa_index.html'} or p.name.startswith('_qa_'):
        continue
    text = p.read_text(encoding='utf-8')
    tm = re.search(r'<title>(.*?)</title>', text, flags=re.I | re.S)
    title = strip_tags(tm.group(1)) if tm else p.stem
    title = re.sub(r'^Белая Мгла\s*[•|\-:]\s*', '', title).strip() or p.stem
    dm = re.search(r'<meta\b[^>]*name="description"[^>]*content="([^"]*)"[^>]*>', text, flags=re.I | re.S)
    if not dm:
        dm = re.search(r'<meta\b[^>]*content="([^"]*)"[^>]*name="description"[^>]*>', text, flags=re.I | re.S)
    desc = htmlmod.unescape(dm.group(1)).strip() if dm else ''
    heads = [strip_tags(x) for x in re.findall(r'<h[1-3]\b[^>]*>(.*?)</h[1-3]>', text, flags=re.I | re.S)]
    body = re.sub(r'<nav\b[^>]*>.*?</nav>', ' ', text, flags=re.I | re.S)
    body = strip_tags(body)
    keywords = ' '.join([title, desc] + heads[:10] + [body[:500]])
    entries.append({'title': title, 'url': p.name, 'description': desc[:150], 'keywords': keywords[:1200]})
write('search-index-v585.js', 'window.BM_SEARCH_INDEX=' + json.dumps(entries, ensure_ascii=False, separators=(',', ':')) + ';\n')

# Main JS: remove scroll observer and replace the embedded search index with a lazy loader.
core_path = ROOT / 'site-v269-core-v465.js'
core = core_path.read_text(encoding='utf-8')
first_end = core.find('})();')
if first_end != -1 and 'IntersectionObserver' in core[:first_end + 5] and "classList.add('reveal')" in core[:first_end + 5]:
    core = core[first_end + 5:].lstrip('\n')

marker = '/* ===== v426: ordinary site-wide search ===== */'
start = core.find(marker)
if start < 0:
    raise RuntimeError('search marker not found')
iife = core.find('(() => {', start)
end = core.find('\n})();', iife)
if iife < 0 or end < 0:
    raise RuntimeError('search block end not found')
end += len('\n})();')

lazy_search = r'''/* ===== v585: lazy site search ===== */
(() => {
  let indexPromise = null;
  const normalize = s => String(s || '').toLowerCase().replace(/ё/g,'е').replace(/[^\p{L}\p{N}\s-]/gu,' ').replace(/\s+/g,' ').trim();
  function loadIndex(){
    if(window.BM_SEARCH_INDEX) return Promise.resolve(window.BM_SEARCH_INDEX);
    if(indexPromise) return indexPromise;
    indexPromise = new Promise(resolve => {
      const s = document.createElement('script');
      s.src = 'search-index-v585.js?v=585';
      s.defer = true;
      s.onload = () => resolve(window.BM_SEARCH_INDEX || []);
      s.onerror = () => resolve([]);
      document.head.appendChild(s);
    });
    return indexPromise;
  }
  function init(){
    const root = document.querySelector('[data-site-search], .site-search-v426');
    if(!root) return;
    const input = root.querySelector('input[type="search"]');
    const results = root.querySelector('.site-search-results-v426');
    const clear = root.querySelector('.site-search-clear-v426');
    if(!input || !results) return;
    function close(){ results.innerHTML=''; results.classList.remove('is-open-v585'); input.setAttribute('aria-expanded','false'); }
    function render(q){
      const nq = normalize(q);
      if(nq.length < 2){ close(); return; }
      const words = nq.split(' ').filter(Boolean);
      const list = (window.BM_SEARCH_INDEX || []).map(item => {
        const title = normalize(item.title);
        const hay = normalize(item.keywords || (item.title+' '+(item.description||'')));
        let score = 0;
        words.forEach(w => { if(title.includes(w)) score += 8; if(hay.includes(w)) score += 2; });
        if(hay.includes(nq)) score += 6;
        return {item,score};
      }).filter(x => x.score > 0).sort((a,b) => b.score-a.score).slice(0,7);
      results.innerHTML='';
      if(!list.length){
        const d=document.createElement('div'); d.className='site-search-empty-v585'; d.textContent='Ничего не найдено'; results.appendChild(d);
      } else list.forEach(({item}) => {
        const a=document.createElement('a'); a.className='site-search-result-v585'; a.href=item.url;
        const b=document.createElement('b'); b.textContent=item.title;
        const s=document.createElement('small'); s.textContent=item.description || 'Открыть раздел';
        a.append(b,s); results.appendChild(a);
      });
      results.classList.add('is-open-v585'); input.setAttribute('aria-expanded','true');
    }
    input.addEventListener('focus', loadIndex, {once:true});
    input.addEventListener('input', async () => { await loadIndex(); render(input.value); });
    if(clear) clear.addEventListener('click', () => { input.value=''; close(); input.focus(); });
    document.addEventListener('click', e => { if(!root.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();'''
core = core[:start] + lazy_search + core[end:]
core_path.write_text(core, encoding='utf-8')

# CSS keeps the same look but removes reveal work and compacts PWA/search UI.
css_path = ROOT / 'site-v269.css'
css = css_path.read_text(encoding='utf-8')
css += '''\n/* v585 lean mode */\n.reveal{opacity:1!important;transform:none!important;transition:none!important}\n.pwa-install-compact-v585{padding:8px 10px!important;gap:8px!important;min-height:auto!important;border-radius:16px!important}\n.pwa-install-compact-v585 .pwa-install-copy-v540 img{width:34px!important;height:34px!important}\n.pwa-install-compact-v585 .pwa-install-copy-v540 b{font-size:13px!important}\n.pwa-install-compact-v585 .pwa-install-copy-v540 small{font-size:10.5px!important;line-height:1.25!important}\n.pwa-install-compact-v585 #pwaInstallButton{padding:8px 11px!important;min-height:34px!important;font-size:12px!important}\n.site-search-results-v426.is-open-v585{display:grid!important;gap:6px!important;padding:8px!important}\n.site-search-result-v585{display:grid;gap:2px;padding:9px 11px;border-radius:12px;text-decoration:none!important;background:rgba(255,255,255,.045);border:1px solid rgba(120,205,246,.12)}\n.site-search-result-v585 b{color:#eefaff;font-size:13px}\n.site-search-result-v585 small{color:#86abc5;font-size:11px;line-height:1.3}\n.site-search-empty-v585{padding:10px;color:#8fb1c9;font-size:12px;text-align:center}\n@media(max-width:620px){.pwa-install-compact-v585 .pwa-install-copy-v540 small{display:none}.pwa-install-compact-v585{margin:8px 0!important}.home-today-v581{padding:11px!important}}\n'''
css_path.write_text(css, encoding='utf-8')

# Simple safe CSS whitespace minifier. Main JS is slimmed by removing its large embedded search payload.
min_css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
min_css = re.sub(r'\s+', ' ', min_css)
min_css = re.sub(r'\s*([{}:;,>+~])\s*', r'\1', min_css).strip()
write('site-v269-v585.min.css', min_css)
write('site-v269-core-v585.min.js', core)
write('site-v269.js', "(function(){\n  var core=document.createElement('script');\n  core.src='site-v269-core-v585.min.js?v=585';\n  core.async=false;\n  document.head.appendChild(core);\n})();\n")

pwa = read('pwa-install.js')
pwa = re.sub(r'service-worker\.js\?v=\d+', 'service-worker.js?v=585', pwa)
write('pwa-install.js', pwa)

sw = read('service-worker.js')
sw = re.sub(r"const CACHE_NAME = 'belaya-mgla-v\d+';", "const CACHE_NAME = 'belaya-mgla-v585';", sw)
sw = re.sub(r"const CORE = \[.*?\];", """const CORE = [\n  './',\n  './index.html',\n  './cheats.html',\n  './site-v269-v585.min.css?v=585',\n  './site-v269.js?v=585',\n  './site-v269-core-v585.min.js?v=585',\n  './ui-cheats-v583.svg',\n  './manifest-v541.webmanifest',\n  './app-icon-192-v541.png',\n  './app-icon-512-v541.png',\n  './assets/home-hero-polish-v446.webp',\n  './assets/ui-home-v534.webp'\n];""", sw, flags=re.S)
write('service-worker.js', sw)

# Repository cleanup: generated QA/temp files and superseded duplicate PWA assets.
for rel in ['_qa_article.html','_qa_index.html','v413_toc_fix_report.txt','manifest.webmanifest','app-icon-192.png','app-icon-512.png','app-icon-maskable-512.png']:
    (ROOT / rel).unlink(missing_ok=True)
shutil.rmtree(ROOT / '.tmp', ignore_errors=True)
for rel in ['.github/workflows/v477-bear-cachefix.yml','.github/workflows/v479-prestige.yml','.github/workflows/v483-prestige-crops.yml','.github/workflows/v497-bear-art.yml']:
    (ROOT / rel).unlink(missing_ok=True)

print('HTML pages:', len(html_files))
print('Search entries:', len(entries))
print('CSS source/min:', len(css.encode()), len(min_css.encode()))
print('JS optimized:', len(core.encode()))
print('Search index:', (ROOT/'search-index-v585.js').stat().st_size)
