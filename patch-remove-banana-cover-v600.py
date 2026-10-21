from pathlib import Path
import re

p=Path('creative-bananovyi-mom.html')
s=p.read_text(encoding='utf-8')

# Remove the entire visual cover block.
s=re.sub(r'\n?<div aria-hidden="true" class="banana-cover-v592 banana-cover-v599">.*?</div>\s*\n<div class="creative-song-kicker-v396">', '\n<div class="creative-song-kicker-v396">', s, count=1, flags=re.S)

# Remove the embedded v599 cover CSS.
s=re.sub(r'\n?<style id="banana-cover-v599-style">.*?</style>\s*', '\n', s, count=1, flags=re.S)

# Remove old v592 cover-only CSS declarations, leaving song page color rules intact.
s=re.sub(r'\n?\.banana-cover-v592\{.*?@media\(max-width:640px\)\{\.banana-cover-v592\{.*?\}\}\s*', '\n', s, count=1, flags=re.S)

p.write_text(s, encoding='utf-8')

sw=Path('service-worker.js')
if sw.exists():
    t=sw.read_text(encoding='utf-8').replace("belaya-mgla-v599","belaya-mgla-v600")
    sw.write_text(t,encoding='utf-8')
