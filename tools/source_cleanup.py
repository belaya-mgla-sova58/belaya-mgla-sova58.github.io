#!/usr/bin/env python3
"""Apply small, safe source cleanups to user-facing HTML before audit/indexing."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REPLACEMENTS = {
    "МУЗЫКАЛЬНАЯ ПУБЛИКАЦИЯ": "Песня",
    "НОВАЯ ПРЕМЬЕРА": "Песня",
    "Whiteout Survival": "Белая мгла",
}

# Xura's generation card referenced a local portrait that is not present in the repo.
# The detailed hero page already uses this public portrait URL.
XURA_MISSING = 'src="assets/heroes/gen-09/xura/portrait.webp"'
XURA_REMOTE = 'src="https://whiteout-survival.com/wp-content/uploads/2025/07/Xura.webp"'


def main() -> None:
    changed = []
    for path in sorted(ROOT.glob("*.html")):
        try:
            text = path.read_text(encoding="utf-8")
        except OSError:
            continue
        original = text
        for old, new in REPLACEMENTS.items():
            text = text.replace(old, new)
        if path.name == "hero-generation-09.html":
            text = text.replace(XURA_MISSING, XURA_REMOTE)
        if text != original:
            path.write_text(text, encoding="utf-8")
            changed.append(path.name)
    print("Source cleanup:", ", ".join(changed) if changed else "nothing to change")


if __name__ == "__main__":
    main()
