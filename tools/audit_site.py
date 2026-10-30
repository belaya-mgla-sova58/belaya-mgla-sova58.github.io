#!/usr/bin/env python3
"""Audit the Белая Мгла static site for broken local references, orphan pages and visible technical residue."""
from __future__ import annotations

import re
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "site-audit-report.txt"
EXCLUDED = {"404.html", "maintenance.html", "__forms.html", "google94584035fdf43cd0.html", "yandex_ee69138efc48d1ec.html"}
SKIP_TEXT_TAGS = {"script", "style", "noscript", "template", "svg"}
TECH_PATTERNS = [
    re.compile(r"Whiteout Survival", re.I),
    re.compile(r"МУЗЫКАЛЬНАЯ\s+ПУБЛИКАЦИЯ", re.I),
    re.compile(r"НОВАЯ\s+ПРЕМЬЕРА", re.I),
    re.compile(r"\b(?:DEBUG|PLACEHOLDER|TECHNICAL)\b", re.I),
]
REMOTE_SCHEMES = {"http", "https", "mailto", "tel", "sms", "javascript", "data", "blob"}
ASSET_RE = re.compile(r"(?P<path>(?:\.?\.?/)?[A-Za-z0-9_./@%+~()-]+\.(?:png|jpe?g|webp|gif|svg|avif|ico)(?:\?[^\s'\")]+)?)", re.I)
CSS_URL_RE = re.compile(r"url\(\s*(['\"]?)([^)'\"]+)\1\s*\)", re.I)


class AuditParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.refs: list[tuple[str, str]] = []
        self.visible_text: list[str] = []
        self.title = False
        self.viewport = False
        self.h1 = False
        self.noindex = False
        self.canonical = ""
        self._skip_depth = 0

    def handle_starttag(self, tag: str, attrs) -> None:
        tag = tag.lower()
        attrs = {str(k).lower(): (v or "") for k, v in attrs}
        if tag in SKIP_TEXT_TAGS:
            self._skip_depth += 1
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        if tag == "title":
            self.title = True
        if tag == "h1":
            self.h1 = True
        if tag == "meta" and attrs.get("name", "").lower() == "viewport":
            self.viewport = True
        if tag == "meta" and attrs.get("name", "").lower() == "robots" and "noindex" in attrs.get("content", "").lower():
            self.noindex = True
        if tag == "link" and "canonical" in attrs.get("rel", "").lower().split():
            self.canonical = attrs.get("href", "").strip()
        for key in ("href", "src", "data-src", "poster"):
            value = attrs.get(key, "").strip()
            if value:
                self.refs.append((key, value))
        srcset = attrs.get("srcset", "").strip()
        if srcset:
            for item in srcset.split(","):
                value = item.strip().split()[0] if item.strip() else ""
                if value:
                    self.refs.append(("srcset", value))

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() in SKIP_TEXT_TAGS and self._skip_depth:
            self._skip_depth -= 1

    def handle_data(self, data: str) -> None:
        if self._skip_depth:
            return
        text = re.sub(r"\s+", " ", unescape(data or "")).strip()
        if text:
            self.visible_text.append(text)


def parse_pages() -> dict[Path, AuditParser]:
    pages: dict[Path, AuditParser] = {}
    for path in sorted(ROOT.rglob("*.html")):
        rel = path.relative_to(ROOT)
        if path.name in EXCLUDED or any(part.startswith(".") for part in rel.parts):
            continue
        parser = AuditParser()
        try:
            parser.feed(path.read_text(encoding="utf-8"))
            parser.close()
            pages[path] = parser
        except Exception as exc:
            parser.visible_text.append(f"AUDIT_PARSE_ERROR: {exc}")
            pages[path] = parser
    return pages


def resolve_local(base: Path, raw: str) -> tuple[Path | None, str]:
    raw = raw.strip()
    if not raw or raw.startswith("//"):
        return None, ""
    parts = urlsplit(raw)
    if parts.scheme.lower() in REMOTE_SCHEMES or parts.netloc:
        return None, ""
    path_part = unquote(parts.path)
    fragment = unquote(parts.fragment or "")
    if not path_part:
        return base, fragment
    if path_part.startswith("/"):
        target = ROOT / path_part.lstrip("/")
    else:
        target = base.parent / path_part
    if path_part.endswith("/"):
        target = target / "index.html"
    try:
        target = target.resolve()
        target.relative_to(ROOT.resolve())
    except Exception:
        return None, fragment
    return target, fragment


def scan_css_js_assets() -> list[str]:
    broken: list[str] = []
    seen: set[tuple[str, str]] = set()
    for path in sorted(list(ROOT.rglob("*.css")) + list(ROOT.rglob("*.js"))):
        relpath = path.relative_to(ROOT)
        if any(part.startswith(".") for part in relpath.parts):
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except Exception:
            continue
        refs: set[str] = set()
        if path.suffix.lower() == ".css":
            refs.update(m.group(2).strip() for m in CSS_URL_RE.finditer(text))
        refs.update(m.group("path") for m in ASSET_RE.finditer(text))
        for raw in refs:
            target, _ = resolve_local(path, raw)
            if target is None:
                continue
            key = (relpath.as_posix(), raw)
            if key in seen:
                continue
            seen.add(key)
            if not target.exists():
                try:
                    missing = target.relative_to(ROOT)
                except Exception:
                    missing = target
                broken.append(f"{relpath.as_posix()}: asset=\"{raw}\" → отсутствует {missing}")
    return broken


def main() -> None:
    pages = parse_pages()
    ids_by_page = {p.resolve(): set(parser.ids) for p, parser in pages.items()}
    broken: list[str] = []
    bad_anchors: list[str] = []
    dup_ids: list[str] = []
    tech: list[str] = []
    metadata: list[str] = []
    parse_errors: list[str] = []
    inbound: dict[Path, int] = {p.resolve(): 0 for p in pages}

    for path, parser in pages.items():
        rel = path.relative_to(ROOT).as_posix()
        if not parser.title:
            metadata.append(f"{rel}: нет <title>")
        if not parser.viewport:
            metadata.append(f"{rel}: нет meta viewport")
        if not parser.h1:
            metadata.append(f"{rel}: нет <h1>")

        seen: set[str] = set()
        for value in parser.ids:
            if value in seen:
                dup_ids.append(f"{rel}: повтор id=\"{value}\"")
            seen.add(value)

        joined = " \n ".join(parser.visible_text)
        for pattern in TECH_PATTERNS:
            m = pattern.search(joined)
            if m:
                tech.append(f"{rel}: «{m.group(0)}»")
        if "AUDIT_PARSE_ERROR:" in joined:
            parse_errors.append(f"{rel}: ошибка разбора HTML")

        for attr, raw in parser.refs:
            target, fragment = resolve_local(path, raw)
            if target is None:
                continue
            if not target.exists():
                try:
                    missing = target.relative_to(ROOT)
                except Exception:
                    missing = target
                broken.append(f"{rel}: {attr}=\"{raw}\" → отсутствует {missing}")
                continue
            if attr == "href" and target.suffix.lower() == ".html" and target.resolve() in inbound and target.resolve() != path.resolve():
                inbound[target.resolve()] += 1
            if fragment and target.suffix.lower() == ".html":
                ids = ids_by_page.get(target.resolve())
                if ids is not None and fragment not in ids:
                    bad_anchors.append(f"{rel}: {attr}=\"{raw}\" → нет якоря #{fragment}")

    broken.extend(scan_css_js_assets())
    broken = sorted(set(broken))

    orphans: list[str] = []
    for path, parser in pages.items():
        rel = path.relative_to(ROOT).as_posix()
        if rel == "index.html" or "/" in rel or parser.noindex:
            continue
        if parser.canonical:
            target, _ = resolve_local(path, parser.canonical)
            if target is not None and target.resolve() != path.resolve():
                continue
        if inbound.get(path.resolve(), 0) == 0:
            orphans.append(rel)

    lines = [
        "АУДИТ САЙТА «БЕЛАЯ МГЛА»",
        "=" * 36,
        f"HTML-страниц проверено: {len(pages)}",
        f"Битых локальных ссылок/файлов: {len(broken)}",
        f"Несуществующих якорей: {len(bad_anchors)}",
        f"Повторяющихся id: {len(dup_ids)}",
        f"Видимых технических фраз: {len(tech)}",
        f"Замечаний по базовой разметке: {len(metadata)}",
        f"Orphan-страниц без входящих HTML-ссылок: {len(orphans)}",
        f"Ошибок разбора HTML: {len(parse_errors)}",
        "",
    ]

    sections = [
        ("БИТЫЕ ССЫЛКИ / ФАЙЛЫ", broken),
        ("ЯКОРЯ", bad_anchors),
        ("ДУБЛИ ID", dup_ids),
        ("ТЕХНИЧЕСКИЕ ФРАЗЫ", tech),
        ("БАЗОВАЯ РАЗМЕТКА", metadata),
        ("ORPHAN-СТРАНИЦЫ", orphans),
        ("ОШИБКИ РАЗБОРА", parse_errors),
    ]
    for title, items in sections:
        lines.append(title)
        lines.append("-" * len(title))
        if items:
            lines.extend(items[:250])
            if len(items) > 250:
                lines.append(f"… и ещё {len(items)-250}")
        else:
            lines.append("Нет.")
        lines.append("")

    REPORT.write_text("\n".join(lines), encoding="utf-8")
    print("\n".join(lines[:10]))


if __name__ == "__main__":
    main()
