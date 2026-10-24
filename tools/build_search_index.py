#!/usr/bin/env python3
"""Build a deterministic, client-friendly search index for the Белая Мгла site."""
from __future__ import annotations

import json
import re
from html import unescape
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "search-index.json"
INDEX_VERSION = 724
MAX_BODY_CHARS = 6500
EXCLUDED_NAMES = {
    "404.html",
    "maintenance.html",
    "__forms.html",
    "google94584035fdf43cd0.html",
    "yandex_ee69138efc48d1ec.html",
}
SKIP_TAGS = {"script", "style", "noscript", "svg", "nav", "footer", "template"}
SPACE_RE = re.compile(r"\s+")


def squash(value: str) -> str:
    return SPACE_RE.sub(" ", unescape(value or "")).strip()


def normalize(value: str) -> str:
    value = squash(value).lower().replace("ё", "е")
    value = re.sub(r"[^a-zа-я0-9]+", " ", value, flags=re.I)
    return SPACE_RE.sub(" ", value).strip()


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title_parts: list[str] = []
        self.h1_parts: list[str] = []
        self.heading_parts: list[str] = []
        self.main_parts: list[str] = []
        self.body_parts: list[str] = []
        self.meta_description = ""
        self.meta_keywords = ""
        self.extra_aliases: list[str] = []
        self.robots = ""
        self._skip_depth = 0
        self._main_depth = 0
        self._body_depth = 0
        self._capture_title = False
        self._capture_h1 = False
        self._capture_heading = False

    def handle_starttag(self, tag: str, attrs) -> None:
        tag = tag.lower()
        attrs = {str(k).lower(): (v or "") for k, v in attrs}
        if tag in SKIP_TAGS:
            self._skip_depth += 1
            return
        if self._skip_depth:
            return
        if tag == "main":
            self._main_depth += 1
        if tag == "body":
            self._body_depth += 1
        if tag == "title":
            self._capture_title = True
        elif tag == "h1":
            self._capture_h1 = True
            self._capture_heading = True
        elif tag in {"h2", "h3", "h4"}:
            self._capture_heading = True
        elif tag == "meta":
            name = attrs.get("name", "").lower()
            if name == "description":
                self.meta_description = squash(attrs.get("content", ""))
            elif name == "keywords":
                self.meta_keywords = squash(attrs.get("content", ""))
            elif name == "robots":
                self.robots = attrs.get("content", "").lower()

        aliases = attrs.get("data-search-aliases", "")
        if aliases:
            self.extra_aliases.append(aliases)

        if self._body_depth or self._main_depth:
            for key in ("alt", "title", "aria-label"):
                value = squash(attrs.get(key, ""))
                if value:
                    self.body_parts.append(value)
                    if self._main_depth:
                        self.main_parts.append(value)

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag in SKIP_TAGS:
            if self._skip_depth:
                self._skip_depth -= 1
            return
        if self._skip_depth:
            return
        if tag == "title":
            self._capture_title = False
        elif tag == "h1":
            self._capture_h1 = False
            self._capture_heading = False
        elif tag in {"h2", "h3", "h4"}:
            self._capture_heading = False
        if tag == "main" and self._main_depth:
            self._main_depth -= 1
        if tag == "body" and self._body_depth:
            self._body_depth -= 1

    def handle_data(self, data: str) -> None:
        if self._skip_depth:
            return
        text = squash(data)
        if not text:
            return
        if self._capture_title:
            self.title_parts.append(text)
        if self._capture_h1:
            self.h1_parts.append(text)
        if self._capture_heading:
            self.heading_parts.append(text)
        if self._body_depth:
            self.body_parts.append(text)
        if self._main_depth:
            self.main_parts.append(text)


def page_kind(url: str) -> str:
    name = Path(url).name.lower()
    if name.startswith("hero-"):
        return "Герой"
    if name == "events.html" or re.search(
        r"(svs|bear|joe|castle|fort|siege|fishing|revenge|competition|mobilization|showdown|"
        r"frostfire|foundry|trial|dreams|snowplow|mercenary|tundra|brothers-in-arms|state-power)",
        name,
    ):
        return "Событие"
    if "pet" in name:
        return "Питомцы"
    if "expert" in name:
        return "Эксперты"
    if "building" in name:
        return "Здания"
    if "troop" in name:
        return "Войска"
    if "resource" in name:
        return "Ресурсы"
    if "calculator" in name:
        return "Калькулятор"
    if name.startswith("news"):
        return "Новости"
    if name in {"other.html", "newbie.html", "research.html", "gear.html", "governor.html", "governor-orders.html"}:
        return "База знаний"
    return "Гайд"


def index_page(path: Path) -> dict | None:
    rel = path.relative_to(ROOT).as_posix()
    if path.name in EXCLUDED_NAMES or any(part.startswith(".") for part in path.relative_to(ROOT).parts):
        return None

    parser = PageParser()
    try:
        parser.feed(path.read_text(encoding="utf-8"))
        parser.close()
    except (UnicodeDecodeError, OSError) as exc:
        print(f"Skipping {rel}: {exc}")
        return None

    if "noindex" in parser.robots:
        return None

    h1 = squash(" ".join(parser.h1_parts))
    html_title = squash(" ".join(parser.title_parts))
    title = h1 or html_title or path.stem.replace("-", " ").title()
    headings = squash(" ".join(parser.heading_parts))
    body = squash(" ".join(parser.main_parts or parser.body_parts))
    description = parser.meta_description or headings[:240] or body[:240]

    slug_terms = rel.replace("/", " ").replace(".html", "").replace("-", " ").replace("_", " ")
    aliases = squash(" ".join([parser.meta_keywords, *parser.extra_aliases]))
    searchable_body = body[:MAX_BODY_CHARS]
    searchable = normalize(" ".join([title, html_title, description, headings, aliases, slug_terms, searchable_body]))
    if not searchable:
        return None

    return {
        "title": title,
        "url": "index.html" if rel == "index.html" else rel,
        "desc": description[:260],
        "kind": page_kind(rel),
        "text": searchable,
    }


def main() -> None:
    items = []
    for path in sorted(ROOT.rglob("*.html")):
        record = index_page(path)
        if record:
            items.append(record)

    payload = {"version": INDEX_VERSION, "items": items}
    text = json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n"
    OUTPUT.write_text(text, encoding="utf-8")
    print(f"Search index: {len(items)} pages, {len(text.encode('utf-8'))} bytes -> {OUTPUT.name}")


if __name__ == "__main__":
    main()
