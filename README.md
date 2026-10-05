# Things I Never Knew How to Say

A personal, unfinished book by **Aaditya Dike**, written over time: thoughts, memories and feelings about love, attachment, fear, hope, overthinking, and the things that are hard to say out loud.

This README is the playbook for the book. **When a new chapter is added, follow [Adding a new chapter](#adding-a-new-chapter) step by step.** Everything needed is in this repository.

---

## What's in this repository

| Path | What it is |
|---|---|
| `things-i-never-knew-how-to-say_book_ready.docx` | **The finished book.** Generated; never edit it by hand. |
| `things-i-never-knew-how-to-say_book_ready.pdf` | The same book as a PDF, converted from the DOCX. Generated. |
| `things-i-never-knew-how-to-say_cover.jpg` | Front cover (5.5 × 8.5 in + 0.125 in bleed, 300 DPI). Generated. |
| `things-i-never-knew-how-to-say_back.jpg` | Back cover. Generated. |
| `*.docx` (all the other DOCX files in the root) | **The author's original chapters**, exported from Google Docs. Never edit, rename or delete these. |
| `_editing/chapters/NN-title.md` | **The edited text of every chapter.** The book is built from these. The `NN` number sets the chapter order. |
| `_editing/originals/` | Originals that didn't arrive as DOCX (for example, text pasted in a chat), saved word for word. |
| `_editing/build/` | The scripts that build the book, PDF and covers. |
| `EDITORIAL_NOTES.md` | Why the chapters are in this order, every edit ever made, and what was deliberately left alone. |
| `CLAUDE.md` | Points Claude to this README. |

## Chapter registry

This is the current order. Any original that isn't listed here is a **new chapter**.

| # | Title | Edited file | Original |
|---|---|---|---|
| 1 | 24 August — 10:46 a.m. | `_editing/chapters/01-24-august.md` | `24 August — 10_46 a.m_.docx` |
| 2 | 27 August | `_editing/chapters/02-27-august.md` | `27 August.docx` |
| 3 | The Flower I Keep Seeing | `_editing/chapters/03-the-flower-i-keep-seeing.md` | `THE FLOWER I KEEP SEEING.docx` |
| 4 | The Flower I Chose Not to Pick | `_editing/chapters/04-the-flower-i-chose-not-to-pick.md` | `The Flower I Chose Not to Pick.docx` |
| 5 | The Weight of Thinking About You | `_editing/chapters/05-the-weight-of-thinking-about-you.md` | `The Weight of Thinking About You.docx` |
| 6 | I Just Want to Be Loved | `_editing/chapters/06-i-just-want-to-be-loved.md` | `_editing/originals/i-just-want-to-be-loved.original.txt` (sent as text) |
| 7 | The Love I Could Never Explain | `_editing/chapters/07-the-love-i-could-never-explain.md` | `The Love I Could Never Explain.docx` |
| 8 | Will She Ever Understand? | `_editing/chapters/08-will-she-ever-understand.md` | `Will She Ever Understand_.docx` |

**For the author:** to add a chapter, export it from Google Docs as a `.docx`, put it in the root of this repository next to the others, and say "I added a new chapter". Pasting the text into the chat works too.

---

## Adding a new chapter

Do every step, in order. Don't skip the reading.

### Step 1: Find the new chapter
- List the `.docx` files in the root, leaving out `things-i-never-knew-how-to-say_book_ready.docx`. Compare them with the **Chapter registry** above. Any file not in the registry is new. There may be more than one.
- If the author pasted the text instead, that is the new chapter.
- Read the text out of a DOCX like this (no pandoc needed):
  ```bash
  python3 _editing/build/extract_docx.py "New Chapter.docx"
  ```
  `**bold**` and `*italic*` show the author's own emphasis.
- If a file in the registry has changed (check `git log -- "<file>"`), the author has revised an existing chapter. Re-apply the edits to the new version and treat it like a new chapter from Step 3 on.

### Step 2: Keep the original untouched
- A `.docx` original stays exactly where the author put it. Never edit, rename or move it.
- Pasted text must be saved **word for word** to `_editing/originals/<slug>.original.txt` before any editing.

### Step 3: Read the whole book first
Before changing a single word:
1. Read `EDITORIAL_NOTES.md`. It explains the current order and how the book has been edited so far.
2. Read every chapter in `_editing/chapters/`, in order, all the way through.
3. Read the new chapter all the way through.

Then work out:
- What the new chapter is: a memory/story, a thought, or a reflection.
- What it is really about emotionally, and where it starts and ends emotionally.
- Who it is about.
- Which existing chapters it connects to, repeats, answers or depends on.
- Whether it is dated (titles like "24 August" are dates). Dated chapters stay in date order relative to each other.

### Step 4: Edit the new chapter
Follow the [Editorial rules](#editorial-rules) below. In short: **the author is the writer, you are the editor.** Make it clearer, not prettier.

1. Create `_editing/chapters/NN-short-slug.md` in the [chapter file format](#chapter-file-format).
2. Title: use the author's title if there is one. Change the case to match the other titles (for example "The Flower I Keep Seeing", not all caps). If there's no title, use the author's own name for the piece or a phrase from its first line, never an invented poetic one.
3. Make only the changes the rules allow, then check every change:
   ```bash
   python3 _editing/build/diff_chapter.py "<original .docx or .txt>" _editing/chapters/NN-short-slug.md
   ```
   Every change it lists must be one you can justify. Usually that is well under 2% of the words. If it's much more, you are probably rewriting. Undo it.

### Step 5: Decide where it goes
The order is an emotional journey, not just a timeline. The current arc is:

| # | Chapter | Its job in the book |
|---|---|---|
| 1 | 24 August — 10:46 a.m. | Who the narrator is: responsibilities, mom, overthinking, waiting for her messages. |
| 2 | 27 August | The same week. The reader meets her in a real scene and starts to care (the happy day). |
| 3 | The Flower I Keep Seeing | Who she is to him. Introduces the plumeria, the tree, the rain. |
| 4 | The Flower I Chose Not to Pick | The middle: the truth (caste, her brother, her family), how it began (the trip), letting her bloom. |
| 5 | The Weight of Thinking About You | Emptiness after letting go. Overthinking, mom, wishing for "true love". |
| 6 | I Just Want to Be Loved | The breaking point: anger at fake people, tears, then "I'll stay kind." |
| 7 | The Love I Could Never Explain | Tender grief and gratitude. A "false ending". |
| 8 | Will She Ever Understand? | The ending. After everything, still waiting for one notification. Unresolved. |

Rules for placing a chapter:
- **Place it where it makes neighbouring chapters more meaningful.** Ask:
  - Does it need context from an earlier chapter?
  - Does it answer a question an earlier chapter raises?
  - Does it repeat something the chapter next to it says?
- **Keep the emotional rhythm varied.** Avoid stacking chapters that feel the same.
- **Don't let placement imply something the author never wrote.** For example, chapter 6 sits *before* chapter 7 so that its anger about "people breaking trust" isn't read as being about her.
- **Dated chapters stay in date order.**
- **Chapter 1 and the last chapter are the book's frame.** A new chapter that is clearly *later in the story* (something new happened) may belong at or near the end. Changing the first or last chapter is a big decision: only do it if it is clearly better, and say so prominently when you report back.
- If two places both work, choose the one that gives a first-time reader the stronger experience.

### Step 6: Put it in place
- Chapter files are ordered by their `NN-` prefix. To insert at position *k*, rename the later chapters with `git mv`, working **from the last one backwards** so nothing gets overwritten. Then give the new file number *k*. Keep two digits (`09`, `10`, …).
- **The contents page is generated automatically from the chapter files.** Chapter labels ("Chapter Nine") and numbering update by themselves. Never edit the contents by hand.

### Step 7: Check the book still flows
- Read the end of the chapter before the new one, the new chapter, and the start of the chapter after it. Make sure each move between them makes sense.
- Look for things the new chapter now repeats across the book. Only cut repetition *inside the new chapter*, and only if it adds nothing.
- Don't edit other chapters unless the new chapter makes something in them genuinely confusing. If you must, keep it minimal and list it in the notes.

### Step 8: Rebuild the DOCX and PDF
```bash
bash _editing/build/build.sh
```
This rebuilds `things-i-never-knew-how-to-say_book_ready.docx` and the matching `.pdf` in the repo root, including the title page, epigraph and contents. It finishes by listing every chapter and the PDF page it starts on.

**Covers:** the new chapter normally doesn't change them. If the back-cover description should mention something central to the new chapter, edit the description in `_editing/build/covers.js`. Use only facts and phrases from the manuscript. Then run `bash _editing/build/build.sh --covers`. **Never change the title, the author name, the back-cover quote, the epigraph or the cover design without the author asking.**

### Step 9: Verify by looking
- Check the chapter list printed by `build.sh`: right count, right order, the new chapter in the right place.
- Turn the new chapter's pages into images and actually look at them:
  ```bash
  pdftoppm -png -r 70 -f <first page> -l <last page> things-i-never-knew-how-to-say_book_ready.pdf /tmp/check
  ```
- Check the chapter heading matches the others, there are no stray `*` or `#` marks, quotes are curly, and there are no empty pages inside chapters.

### Step 10: Update the records
- **`EDITORIAL_NOTES.md`**:
  - Add the chapter to the order table, with why it goes there.
  - List **every** change from `diff_chapter.py`, each with a short reason.
  - Add anything you deliberately did not change, update the word counts, and update the print layout page count.
- **This README:** add the chapter to the **Chapter registry** and the arc table in Step 5, and renumber both if chapters moved.

### Step 11: Commit, push and report
- Commit everything on the session's working branch: the new chapter file, any `git mv` renames, the rebuilt DOCX and PDF, covers if rebuilt, `EDITORIAL_NOTES.md` and `README.md`. Push. Don't merge into `main` unless the author asks.
- Tell the author, briefly:
  - Where the chapter went and why.
  - Every change you made to it.
  - Anything you left alone that might look like a mistake, and why.
  - Any question that only the author can answer. Don't guess the answer.

---

## Editorial rules

These come from the author's own brief. They apply to every chapter.

**The most important rule: the author is the writer, you are the editor.** Don't replace the voice. Don't rewrite the life. Don't make the emotions prettier; make them clearer. The result should read like the author's own book, as if they knew how to edit their own thoughts.

**Never invent.** No new events, conversations, feelings, memories, dates, places, motivations, backstory, dialogue or conclusions. If something is unclear, keep it unclear. If the narrator contradicts themselves, leave it: contradiction is often the emotional truth.

**The voice to keep:** personal, direct, emotional, vulnerable, conversational, simple. Sometimes messy, repetitive, uncertain or contradictory. A reader should feel *someone is actually telling me what they felt*. So:
- No sophisticated vocabulary.
- No literary or "AI" polish.
- No new metaphors.
- Don't make the narrator sound smarter, more poetic or more philosophical.
- Keep the author's own words and Indian English: "taking admission", "pakad", "crash out", "cross seven seas", swearing, and so on.

**You may fix:** grammar, spelling, punctuation, obvious typos, awkward wording, confusing transitions, and paragraph breaks. You may also:
- Split very long sentences.
- Make a small clarification where a reader genuinely can't follow what happened.
- Remove a sentence that points to something the reader never sees.
- Reorder sentences inside a chapter, but only for clarity and without changing the meaning.

**Repetition: two kinds.**
- **Keep** repetition that shows overthinking, obsession, fear, exhaustion, emphasis, or someone the narrator can't stop thinking about ("Maybe. Maybe. Maybe.", "A lot. A lot. A lot.", the "Will I…?" lists).
- **Cut** only repetition that says exactly what was just said and does nothing for the reader.

**Small details carry the emotion.** Keep every specific message, emoji, piece of clothing, food, time, place, object and gesture. Never replace them with something generic like "we had a beautiful day".

**Recurring images:** flowers (the plumeria), trees, rain, sky, light, the phone and its notifications, mom. Keep them and let them develop. Don't add new ones.

**No forced lessons or happy endings.** Never add "everything happens for a reason", "I learned to love myself", and so on, unless the author wrote it. A chapter can end on a question, a contradiction, a memory, a small image or an unfinished feeling. If a chapter is a thought, let it stay a thought; don't force it into a story.

**Endings:** if a chapter's ending is strong, leave it alone. If it is weak because of repetition or structure, improve it only with material already in the chapter. Never add a dramatic or poetic final line.

**Formatting conventions already used in the book:**
- British spelling (colour, favourite, behaviour, travelled).
- Spaced em dashes ( — ).
- *Italics* for imagined speech or thoughts and for emphasis. Write the author's bold as italics.
- Someone else's words (a quote the author read somewhere) go in an indented quote block.

**When unsure, ask the author** rather than guess. When in doubt between editing and leaving it, leave it.

---

## Chapter file format

`_editing/chapters/NN-short-slug.md`:

```markdown
# Chapter Title

First paragraph.

Each line the author wrote as its own line becomes its own paragraph, separated by a blank line.

Text with *italics* for emphasis or imagined thoughts.

> An indented quote: someone else's words, in italics.
```

- The first line is `# ` followed by the title.
- Paragraphs are separated by **blank lines**. A single line break inside a paragraph is joined into one paragraph.
- Straight quotes (`'` and `"`) and `...` are fine. The build turns them into curly quotes and `…`.
- Keep the author's one-line-per-thought rhythm. Only group plain storytelling sentences (getting a train, finding an auto) into paragraphs.

---

## How the book is built

| Script | What it does |
|---|---|
| `_editing/build/build.sh` | One command: fonts, then DOCX, then PDF (plus covers with `--covers`). |
| `_editing/build/build_book.js` | Builds the DOCX from the chapter files: title page, epigraph, contents, chapters. |
| `_editing/build/finish_docx.py` | Embeds the fonts (regular and italic) and turns on mirrored margins. |
| `_editing/build/covers.js` | Renders the front and back covers with headless Chromium. The back-cover description lives here. |
| `_editing/build/get_fonts.py` | Downloads the open-licensed fonts (EB Garamond, Cormorant Garamond). |
| `_editing/build/extract_docx.py` | Reads the text out of an original DOCX. |
| `_editing/build/diff_chapter.py` | Lists every word changed between an original and its edited chapter. |

**Requirements:**
- `node`, with the npm packages `docx` and (for covers) `playwright` and Chromium.
- `python3`.
- LibreOffice **Writer** (`soffice`).
- `pdfinfo`, `pdftotext` and `pdftoppm` (poppler-utils).
- ImageMagick `convert` (for covers).
- Internet access the first time, to download the fonts.

**Troubleshooting:**
- **"Error: source file could not be loaded" from LibreOffice:** only LibreOffice core is installed, without Writer. Run `apt-get install -y --no-install-recommends libreoffice-writer`.
- **`Cannot find module 'docx'` or `'playwright'`:** run `npm install docx playwright` in `_editing/build/`. In Claude's cloud environment both are already installed and Chromium is at `/opt/pw-browsers`; don't run `playwright install` there.
- **The PDF looks different from Word:** the layout uses only explicit page breaks and fixed-height spacer lines, so Word and LibreOffice should match. Don't switch to "odd page" section breaks or "space before" at the top of a page. LibreOffice ignores both.

## Layout decisions (don't change without the author asking)
- **Size and fonts:** 5.5 × 8.5 in trim size. Body text in EB Garamond 11.5 pt, left-aligned, with space between paragraphs. Mirrored margins.
- **Front pages:**
  - Page 1: title page with the title and Aaditya Dike.
  - Page 2: blank.
  - Page 3: epigraph.
  - Page 4: contents.
  - Page 5: Chapter One, where page numbering starts at 1.
- **Chapters:** each chapter starts on a new page with a small "CHAPTER N" label and the title.
- **Epigraph and back-cover quote** (the author's own words): "Love doesn't happen to beautiful people. / It happens — / and then that person becomes beautiful."
- **Covers:** a single white plumeria on a muted after-rain blue-grey with faint rain streaks, the title in Cormorant Garamond, and the author's name at the bottom of the front.
