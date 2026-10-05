"""Print the text of a chapter DOCX (e.g. a Google Docs export), one paragraph per line.

Emphasis is kept so nothing the author marked is lost:
  **bold**   *italic*   [Heading1] / [Title] style tags at the start of a line.
Needs only the Python standard library (no pandoc).

Usage: python3 extract_docx.py "New Chapter.docx" > _editing/originals/new-chapter.original.txt
"""
import sys
import xml.etree.ElementTree as ET
import zipfile

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def is_on(el):
    return el is not None and el.get(W + "val") not in ("0", "false")


def extract(path):
    root = ET.fromstring(zipfile.ZipFile(path).read("word/document.xml"))
    lines = []
    for p in root.find(W + "body").iter(W + "p"):
        ppr = p.find(W + "pPr")
        style = ""
        if ppr is not None and ppr.find(W + "pStyle") is not None:
            style = ppr.find(W + "pStyle").get(W + "val")
        text = ""
        for r in p.iter(W + "r"):
            rpr = r.find(W + "rPr")
            bold = rpr is not None and is_on(rpr.find(W + "b"))
            italic = rpr is not None and is_on(rpr.find(W + "i"))
            t = ""
            for c in r:
                if c.tag == W + "t":
                    t += c.text or ""
                elif c.tag == W + "tab":
                    t += "\t"
                elif c.tag == W + "br":
                    t += "\n"
            if t.strip():
                if italic:
                    t = f"*{t}*"
                if bold:
                    t = f"**{t}**"
            text += t
        if style and style not in ("Normal",):
            text = f"[{style}] {text}"
        lines.append(text)
    # drop leading/trailing empty paragraphs
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return lines


if __name__ == "__main__":
    out = extract(sys.argv[1])
    sys.stdout.write("\n".join(out) + "\n")
    words = sum(len(l.split()) for l in out)
    print(f"[{len(out)} paragraphs, {words} words]", file=sys.stderr)
