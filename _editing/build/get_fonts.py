"""Download the open-licensed fonts used by the book and covers (SIL Open Font License).

Usage: python3 get_fonts.py fonts/
Creates e.g. fonts/EBGaramond-400.ttf, fonts/EBGaramond-400i.ttf, fonts/CormorantGaramond-300.ttf ...
"""
import os
import re
import sys
import urllib.request

CSS_URL = (
    "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400"
    "&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap"
)


def main(out_dir):
    os.makedirs(out_dir, exist_ok=True)
    # An old user agent makes Google Fonts serve plain TrueType files.
    req = urllib.request.Request(CSS_URL, headers={"User-Agent": "Mozilla/4.0"})
    css = urllib.request.urlopen(req).read().decode()
    for block in re.findall(r"@font-face\s*{([^}]*)}", css):
        family = re.search(r"font-family: '([^']+)'", block).group(1).replace(" ", "")
        style = re.search(r"font-style: (\w+)", block).group(1)
        weight = re.search(r"font-weight: (\d+)", block).group(1)
        url = re.search(r"url\(([^)]+)\)", block).group(1)
        name = f"{family}-{weight}{'i' if style == 'italic' else ''}.ttf"
        urllib.request.urlretrieve(url, os.path.join(out_dir, name))
        print(name)


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "fonts")
