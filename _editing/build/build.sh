#!/usr/bin/env bash
# Rebuilds the finished book from the chapter files in _editing/chapters/:
#   things-i-never-knew-how-to-say_book_ready.docx  (title page, epigraph, contents, chapters)
#   things-i-never-knew-how-to-say_book_ready.pdf   (converted from that DOCX)
#   things-i-never-knew-how-to-say_print_ready.pdf  (front cover + book + back cover, with bleed)
# The contents page is generated from the chapter files, so adding a chapter file is enough.
#
# Usage:
#   bash _editing/build/build.sh            # DOCX + PDF
#   bash _editing/build/build.sh --covers   # DOCX + PDF + front/back cover JPGs
# Optional environment variables: AUTHOR, OUT_DIR (default: repo root), FONT_DIR.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
BUILD="$ROOT/_editing/build"
NAME="things-i-never-knew-how-to-say"
AUTHOR="${AUTHOR:-Aaditya Dike}"
OUT_DIR="${OUT_DIR:-$ROOT}"
FONT_DIR="${FONT_DIR:-$HOME/.cache/$NAME-fonts}"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/book-build.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT

COVERS=0
[[ "${1:-}" == "--covers" ]] && COVERS=1

echo "== 1/5 Fonts"
if [[ ! -f "$FONT_DIR/EBGaramond-400.ttf" || ! -f "$FONT_DIR/EBGaramond-400i.ttf" || ! -f "$FONT_DIR/CormorantGaramond-300.ttf" ]]; then
  python3 "$BUILD/get_fonts.py" "$FONT_DIR"
fi
# Installed locally so LibreOffice (PDF) and Chromium (covers) render with the real fonts.
mkdir -p "$HOME/.fonts" && cp "$FONT_DIR"/*.ttf "$HOME/.fonts/" && (fc-cache -f >/dev/null 2>&1 || true)

echo "== 2/5 DOCX"
node "$BUILD/build_book.js" "$ROOT/_editing/chapters" "$WORK/raw.docx" "$AUTHOR"
python3 "$BUILD/finish_docx.py" "$WORK/raw.docx" "$WORK/${NAME}_book_ready.docx" \
  "$FONT_DIR/EBGaramond-400.ttf" "$FONT_DIR/EBGaramond-400i.ttf"

echo "== 3/5 PDF (from the DOCX)"
soffice -env:UserInstallation="file://$WORK/lo-profile" --headless --norestore \
  --convert-to 'pdf:writer_pdf_Export:{"ExportBookmarks":{"type":"boolean","value":"true"}}' \
  --outdir "$WORK" "$WORK/${NAME}_book_ready.docx" >"$WORK/soffice.log" 2>&1 || true
if [[ ! -f "$WORK/${NAME}_book_ready.pdf" ]]; then
  cat "$WORK/soffice.log" >&2
  echo "PDF conversion failed. If the log says 'source file could not be loaded', LibreOffice Writer is missing:" >&2
  echo "  apt-get install -y --no-install-recommends libreoffice-writer" >&2
  exit 1
fi
mkdir -p "$OUT_DIR"
cp "$WORK/${NAME}_book_ready.docx" "$WORK/${NAME}_book_ready.pdf" "$OUT_DIR/"

if [[ $COVERS == 1 ]]; then
  echo "== 4/5 Covers"
  node "$BUILD/covers.js" "$FONT_DIR" "$WORK/covers" "$AUTHOR"
  convert "$WORK/covers/front.png" -colorspace sRGB -units PixelsPerInch -density 300 -quality 95 \
    -sampling-factor 4:4:4 "$OUT_DIR/${NAME}_cover.jpg"
  convert "$WORK/covers/back.png" -colorspace sRGB -units PixelsPerInch -density 300 -quality 95 \
    -sampling-factor 4:4:4 "$OUT_DIR/${NAME}_back.jpg"
else
  echo "== 4/5 Covers skipped (pass --covers to re-render them)"
fi

echo "== 5/5 Print-ready PDF (front cover + book + back cover)"
python3 -c "import pypdf, img2pdf" 2>/dev/null || pip install -q pypdf img2pdf
COVER_DIR="$OUT_DIR"; [[ -f "$COVER_DIR/${NAME}_cover.jpg" ]] || COVER_DIR="$ROOT"
python3 "$BUILD/make_print_pdf.py" "$OUT_DIR/${NAME}_book_ready.pdf" \
  "$COVER_DIR/${NAME}_cover.jpg" "$COVER_DIR/${NAME}_back.jpg" \
  "$OUT_DIR/${NAME}_print_ready.pdf" "Things I Never Knew How to Say" "$AUTHOR"

PDF="$OUT_DIR/${NAME}_book_ready.pdf"
PAGES="$(pdfinfo "$PDF" | awk '/^Pages:/ {print $2}')"
echo
echo "Done: $PAGES pages -> $OUT_DIR"
echo "Chapter openings (physical page in the PDF):"
for ((p = 1; p <= PAGES; p++)); do
  first="$(pdftotext -f "$p" -l "$p" "$PDF" - 2>/dev/null | grep -m1 -E '^CHAPTER ' || true)"
  if [[ -n "$first" ]]; then
    title="$(pdftotext -f "$p" -l "$p" "$PDF" - 2>/dev/null | grep -v '^\s*$' | sed -n 2p)"
    printf '  p%-4s %-16s %s\n' "$p" "$first" "$title"
  fi
done
