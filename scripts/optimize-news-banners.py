#!/usr/bin/env python3
"""Create WebP previews from existing news banners; do not change live files."""
from pathlib import Path
from PIL import Image
from math import log10
import io, json

root = Path(__file__).resolve().parent.parent
output = root / "optimized-preview"
sources = [
    ("assets/news-ru-selected.jpg", "news-ru-selected-optimized.webp"),
    ("assets/creative-corner-header-v447.webp", "creative-corner-header-optimized.webp"),
]

def psnr(a, b):
    a, b = a.convert("RGB"), b.convert("RGB")
    from PIL import ImageChops
    hist = ImageChops.difference(a,b).histogram()
    mse = sum(hist[ch*256+i]*i*i for ch in range(3) for i in range(256)) / (3*a.width*a.height)
    return float("inf") if mse == 0 else 10 * log10(255*255/mse)

output.mkdir(exist_ok=True)
report = []
for src, name in sources:
    path = root / src
    original = Image.open(path)
    original.load()
    original_size = path.stat().st_size
    result = {"source": src, "original_bytes": original_size, "dimensions": list(original.size)}
    for quality in (90,86,82,78):
        buffer = io.BytesIO()
        original.save(buffer, "WEBP", quality=quality, method=6)
        data = buffer.getvalue()
        fidelity = psnr(original, Image.open(io.BytesIO(data)))
        if len(data) <= original_size * .90 and fidelity >= 38:
            (output / name).write_bytes(data)
            result.update({"result":name,"webp_bytes":len(data),"saved_percent":round(100*(1-len(data)/original_size),2),"psnr_db":round(fidelity,2),"quality":quality})
            break
    else:
        result["result"] = "Not generated: image quality or savings threshold not met"
    report.append(result)
(output / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(report, ensure_ascii=False, indent=2))
