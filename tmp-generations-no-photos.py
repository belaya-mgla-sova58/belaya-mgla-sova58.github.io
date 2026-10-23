from pathlib import Path
import re
p=Path('hero-generations.html')
s=p.read_text(encoding='utf-8')
# Remove portrait blocks entirely so images are not requested by the page.
s=re.sub(r'<div class="hero-mini-img">\s*<img[^>]*>\s*</div>', '', s)
# Update user-facing instruction.
s=s.replace('Нажатие на аватар героя открывает его подробный гайд.', 'Нажатие на карточку героя открывает его подробный гайд.')
# Remove portrait from social preview metadata for this category page.
s=re.sub(r'<meta content="https://belaya-mgla-sova58\.github\.io/assets/heroes/[^\"]+/portrait\.webp" property="og:image"/>', '', s)
# Add text-only card overrides once.
marker='</style></head>'
css='''\n/* Text-only generation cards: portraits intentionally hidden on this overview. */\n.hero-mini{min-height:150px;display:flex;align-items:center;justify-content:center;padding:18px 12px;text-align:center}.hero-mini-caption{padding:0}.hero-mini-caption strong{font-size:20px}.hero-mini-caption span{margin-top:8px;font-size:12px}.hero-mini-img{display:none!important}@media(max-width:720px){.hero-mini{min-height:118px;padding:12px 6px}.hero-mini-caption strong{font-size:15px}.hero-mini-caption span{font-size:10px}}\n'''
if 'Text-only generation cards' not in s:
    s=s.replace(marker, css+marker, 1)
p.write_text(s,encoding='utf-8')
