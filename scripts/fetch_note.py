"""noteのRSSから、新しい記事を notes.json に書き出す。"""
import json
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

NOTE_ID = "ichariba_fasting"
MAX_ITEMS = 6  # 新しい順にこの件数だけ載せる

NS = {"media": "http://search.yahoo.com/mrss/"}
req = urllib.request.Request(
    f"https://note.com/{NOTE_ID}/rss",
    headers={"User-Agent": "Mozilla/5.0 (site-feed-bot)"},
)
with urllib.request.urlopen(req, timeout=30) as res:
    root = ET.fromstring(res.read())

items = []
for it in root.iter("item"):
    title = (it.findtext("title") or "").strip()
    date = parsedate_to_datetime(it.findtext("pubDate"))
    items.append({
        "title": title,
        "url": (it.findtext("link") or "").strip(),
        "date": date.strftime("%Y/%m/%d"),
        "thumbnail": it.findtext("media:thumbnail", default="", namespaces=NS).strip(),
    })

with open("notes.json", "w", encoding="utf-8") as f:
    json.dump(items[:MAX_ITEMS], f, ensure_ascii=False, indent=2)
    f.write("\n")
print(f"{len(items[:MAX_ITEMS])} 件を書き出しました")
