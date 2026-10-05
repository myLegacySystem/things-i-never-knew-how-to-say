"""Post-process the docx-js output for print.

- Embeds EB Garamond Regular *and* Italic (docx-js can only embed a regular face,
  which would make Word fake the italics).
- Turns on mirrored margins so the wider margin is always on the binding side.

Usage: python3 finish_docx.py in.docx out.docx EBGaramond-Regular.ttf EBGaramond-Italic.ttf
"""
import re
import sys
import uuid
import zipfile

FONT_NAME = "EB Garamond"


def obfuscate(data: bytes, guid: str) -> bytes:
    # ECMA-376 Part 1, 17.8.1: XOR the first 32 bytes with the reversed GUID bytes.
    key = bytes.fromhex(guid.replace("-", ""))[::-1]
    head = bytes(b ^ key[i % 16] for i, b in enumerate(data[:32]))
    return head + data[32:]


def main(src, dst, regular_ttf, italic_ttf):
    zin = zipfile.ZipFile(src)
    files = {n: zin.read(n) for n in zin.namelist()}

    faces = [("embedRegular", regular_ttf, "EBGaramond-Regular"), ("embedItalic", italic_ttf, "EBGaramond-Italic")]
    rels, embeds = [], []
    for i, (tag, path, stem) in enumerate(faces, start=1):
        guid = str(uuid.uuid4()).upper()
        files[f"word/fonts/{stem}.odttf"] = obfuscate(open(path, "rb").read(), guid)
        rels.append(
            f'<Relationship Id="rIdFont{i}" '
            f'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/font" '
            f'Target="fonts/{stem}.odttf"/>'
        )
        embeds.append(f'<w:{tag} r:id="rIdFont{i}" w:fontKey="{{{guid}}}"/>')

    font_el = (
        f'<w:font w:name="{FONT_NAME}"><w:panose1 w:val="00000500000000000000"/><w:charset w:val="00"/>'
        '<w:family w:val="roman"/><w:pitch w:val="variable"/>'
        '<w:sig w:usb0="E00002FF" w:usb1="5000E47B" w:usb2="00000000" w:usb3="00000000" w:csb0="0000019F" w:csb1="00000000"/>'
        + "".join(embeds) + "</w:font>"
    )
    ft = files["word/fontTable.xml"].decode("utf8")
    if ft.rstrip().endswith("/>") and "<w:font " not in ft:
        ft = re.sub(r"/>\s*$", ">" + font_el + "</w:fonts>", ft.rstrip())
    else:
        ft = ft.replace("</w:fonts>", font_el + "</w:fonts>")
    files["word/fontTable.xml"] = ft.encode("utf8")

    files["word/_rels/fontTable.xml.rels"] = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        + "".join(rels) + "</Relationships>"
    ).encode("utf8")

    ct = files["[Content_Types].xml"].decode("utf8")
    if 'Extension="odttf"' not in ct:
        ct = ct.replace(
            "<Default ",
            '<Default ContentType="application/vnd.openxmlformats-officedocument.obfuscatedFont" Extension="odttf"/><Default ',
            1,
        )
    files["[Content_Types].xml"] = ct.encode("utf8")

    st = files["word/settings.xml"].decode("utf8")
    assert "<w:displayBackgroundShape/>" in st, "unexpected settings.xml layout"
    st = st.replace(
        "<w:displayBackgroundShape/>",
        "<w:displayBackgroundShape/><w:embedTrueTypeFonts/><w:mirrorMargins/>",
        1,
    )
    files["word/settings.xml"] = st.encode("utf8")

    with zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED) as zout:
        # [Content_Types].xml first, as Word expects
        order = ["[Content_Types].xml"] + [n for n in files if n != "[Content_Types].xml"]
        for n in order:
            zout.writestr(n, files[n])
    print(f"Wrote {dst} with embedded {FONT_NAME} (regular + italic) and mirrored margins")


if __name__ == "__main__":
    main(*sys.argv[1:5])
