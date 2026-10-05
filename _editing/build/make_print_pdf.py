"""Assemble the print-ready PDF: front cover, the book, back cover, in one file.

Page order (double-sided printing):
  1             front cover
  2             blank (inside front cover)
  3 ... N+2     the book (title page, epigraph, contents, chapters)
  (+1 blank if the book has an odd number of pages, so the back cover lands on a back)
  N+3           blank (inside back cover)
  N+4           back cover

Every page is 5.75 x 8.75 in: the 5.5 x 8.5 in trim plus 0.125 in bleed on each side,
with TrimBox and BleedBox set so a printer trims to the right size. The cover JPGs already
include the bleed; the book pages are centred on the trim area.

Usage: python3 make_print_pdf.py BOOK.pdf FRONT.jpg BACK.jpg OUT.pdf [title] [author]
Needs: pip install pypdf img2pdf
"""
import io
import sys

import img2pdf
from pypdf import PdfReader, PdfWriter, Transformation
from pypdf.generic import RectangleObject

BLEED = 9.0                   # 0.125 in, in points
TRIM_W, TRIM_H = 396.0, 612.0  # 5.5 x 8.5 in
PAGE_W, PAGE_H = TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED


def set_boxes(page):
    page.mediabox = RectangleObject([0, 0, PAGE_W, PAGE_H])
    page.cropbox = RectangleObject([0, 0, PAGE_W, PAGE_H])
    page.bleedbox = RectangleObject([0, 0, PAGE_W, PAGE_H])
    page.trimbox = RectangleObject([BLEED, BLEED, BLEED + TRIM_W, BLEED + TRIM_H])
    return page


def cover_page(jpg_path):
    # img2pdf embeds the JPEG unchanged (no recompression); 300 DPI -> 5.75 x 8.75 in.
    pdf = img2pdf.convert(jpg_path, layout_fun=img2pdf.get_fixed_dpi_layout_fun((300, 300)))
    page = PdfReader(io.BytesIO(pdf)).pages[0]
    w, h = float(page.mediabox.width), float(page.mediabox.height)
    if abs(w - PAGE_W) > 0.5 or abs(h - PAGE_H) > 0.5:
        raise SystemExit(f"{jpg_path}: expected {PAGE_W}x{PAGE_H} pt with bleed, got {w:.1f}x{h:.1f}")
    return page


def main(book_pdf, front_jpg, back_jpg, out_pdf, title="", author=""):
    writer = PdfWriter()

    def add_blank():
        set_boxes(writer.add_blank_page(width=PAGE_W, height=PAGE_H))

    set_boxes(writer.add_page(cover_page(front_jpg)))
    add_blank()

    book = PdfReader(book_pdf)
    for src in book.pages:
        w, h = float(src.mediabox.width), float(src.mediabox.height)
        dst = writer.add_blank_page(width=PAGE_W, height=PAGE_H)
        # centre the book page on the trim area
        dst.merge_transformed_page(src, Transformation().translate(BLEED + (TRIM_W - w) / 2, BLEED + (TRIM_H - h) / 2))
        set_boxes(dst)
    if len(book.pages) % 2:
        add_blank()

    add_blank()
    set_boxes(writer.add_page(cover_page(back_jpg)))

    meta = {"/Producer": "pypdf"}
    if title:
        meta["/Title"] = title
    if author:
        meta["/Author"] = author
    writer.add_metadata(meta)
    writer.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
    with open(out_pdf, "wb") as f:
        writer.write(f)
    print(f"Wrote {out_pdf}: {len(writer.pages)} pages "
          f"(front cover, {len(book.pages)} book pages, back cover), "
          f"{PAGE_W / 72:.3f} x {PAGE_H / 72:.3f} in with 0.125 in bleed")


if __name__ == "__main__":
    main(*sys.argv[1:7])
