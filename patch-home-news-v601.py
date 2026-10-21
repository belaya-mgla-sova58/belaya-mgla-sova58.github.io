from pathlib import Path

p = Path('index.html')
s = p.read_text(encoding='utf-8')

news_start = '<section class="modern-panel-v424 home-news-v442">'
if news_start not in s:
    raise SystemExit('News block not found')

start = s.index(news_start)
end = s.index('</section>', start) + len('</section>')
news = s[start:end]
s = s[:start] + s[end:]

hero_start = '<section aria-label="Белая Мгла" class="modern-home-hero-v424 home-stamped-hero-v441">'
if hero_start not in s:
    raise SystemExit('Hero block not found')
hero_pos = s.index(hero_start)
hero_end = s.index('</section>', hero_pos) + len('</section>')

s = s[:hero_end] + '\n\n' + news + s[hero_end:]
p.write_text(s, encoding='utf-8')

sw = Path('service-worker.js')
text = sw.read_text(encoding='utf-8')
import re
text = re.sub(r"const CACHE_NAME = 'belaya-mgla-v\d+';", "const CACHE_NAME = 'belaya-mgla-v601';", text, count=1)
sw.write_text(text, encoding='utf-8')
