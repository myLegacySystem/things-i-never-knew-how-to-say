"""Show every word that changed between an original chapter and its edited version.

Use it after editing a chapter, and list every change it prints in EDITORIAL_NOTES.md.
The original can be a .docx, .txt or .md file; formatting marks (*, **, #, >) are ignored.

Usage: python3 diff_chapter.py ORIGINAL EDITED
  e.g. python3 diff_chapter.py "My New Chapter.docx" _editing/chapters/09-my-new-chapter.md
"""
import difflib
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from extract_docx import extract  # noqa: E402


def words(path):
    if path.lower().endswith(".docx"):
        text = "\n".join(extract(path))
    else:
        text = open(path, encoding="utf8").read()
    text = re.sub(r"^\[[A-Za-z0-9]+\] ", "", text, flags=re.M)  # style tags from extract_docx
    text = re.sub(r"^# |^> ", "", text, flags=re.M)
    text = text.replace("**", "").replace("*", "")
    text = text.replace("’", "'").replace("“", '"').replace("”", '"').replace("…", "...")
    return text.split()


def main(orig, edited):
    a, b = words(orig), words(edited)
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    print(f"{len(a)} -> {len(b)} words, {sm.ratio():.1%} identical")
    changes = 0
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            continue
        changes += 1
        before = " ".join(a[max(0, i1 - 5):i1])
        after = " ".join(a[i2:i2 + 4])
        print(f"  …{before} [-{' '.join(a[i1:i2])}-] {{+{' '.join(b[j1:j2])}+}} {after}…")
    print(f"{changes} change(s)")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
