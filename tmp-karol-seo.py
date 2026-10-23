from pathlib import Path
p=Path('hero-karol.html')
s=p.read_text(encoding='utf-8')
s=s.replace('Подробный гайд по Кароль:', 'Подробный гайд по Каролю:')
s=s.replace('плюсы и минусы Кароль', 'плюсы и минусы Кароля')
s=s.replace('карточка Кароль', 'карточка Кароля')
p.write_text(s,encoding='utf-8')
