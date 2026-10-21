from pathlib import Path
import re

page = Path('creative-bananovyi-mom.html')
s = page.read_text(encoding='utf-8')
pattern = r'<section aria-labelledby="songLyricsTitle" class="creative-song-lyrics-v396">.*?</section>'
s2, n = re.subn(pattern, '', s, count=1, flags=re.S)
if n != 1:
    raise SystemExit(f'lyrics block not found or ambiguous: {n}')
page.write_text(s2, encoding='utf-8')

sw = Path('service-worker.js')
w = sw.read_text(encoding='utf-8')
w = w.replace("belaya-mgla-v596", "belaya-mgla-v597").replace("belaya-mgla-v595", "belaya-mgla-v597")
sw.write_text(w, encoding='utf-8')
