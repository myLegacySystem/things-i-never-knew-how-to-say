// Builds things-i-never-knew-how-to-say_book_ready.docx from the edited chapter files.
// Usage: node build_book.js <chapters_dir> <out.docx> [author name]
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, PageBreak,
  Footer, PageNumber, SectionType, TabStopType, LineRuleType,
} = require("docx");

const [, , chaptersDir, outPath, authorArg] = process.argv;
const AUTHOR = (authorArg || "").trim();
const BOOK_TITLE = "Things I Never Knew How to Say";
const FONT = "EB Garamond";
const NUMBER_WORDS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"];

// Inches -> twips
const in2tw = (i) => Math.round(i * 1440);

// ---------- text helpers ----------
function typographic(s) {
  s = s.replace(/\.\.\./g, "…");
  s = s.replace(/'/g, "’");
  // double quotes: opening after start/whitespace/(, otherwise closing
  s = s.replace(/(^|[\s(])"/g, "$1“").replace(/"/g, "”");
  return s;
}

// Split "*italic*" markup into runs
function runsFor(text, base = {}) {
  const parts = typographic(text).split(/(\*[^*]+\*)/g).filter((p) => p.length);
  return parts.map((p) =>
    p.startsWith("*") && p.endsWith("*")
      ? new TextRun({ ...base, text: p.slice(1, -1), italics: !base.italics })
      : new TextRun({ ...base, text: p })
  );
}

function parseChapter(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/\r/g, "");
  const blocks = raw.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const titleLine = blocks.shift();
  if (!titleLine.startsWith("# ")) throw new Error(`No title in ${file}`);
  const paragraphs = blocks.map((b) => {
    const joined = b.split("\n").map((l) => l.trim()).join(" ");
    if (joined.startsWith("> ")) return { kind: "quote", text: joined.slice(2) };
    return { kind: "body", text: joined };
  });
  return { title: titleLine.slice(2).trim(), paragraphs };
}

const chapterFiles = fs.readdirSync(chaptersDir).filter((f) => /^\d\d-.*\.md$/.test(f)).sort();
const chapters = chapterFiles.map((f) => parseChapter(path.join(chaptersDir, f)));

// ---------- page geometry: 5.5 x 8.5 in trade paperback, mirrored margins ----------
const PAGE = {
  size: { width: in2tw(5.5), height: in2tw(8.5) },
  margin: {
    top: in2tw(0.8), bottom: in2tw(0.85),
    left: in2tw(0.875),   // inside (mirrored)
    right: in2tw(0.65),   // outside
    header: in2tw(0.4), footer: in2tw(0.45), gutter: 0,
  },
};

// ---------- styles ----------
const styles = {
  default: {
    document: { run: { font: FONT, size: 23 } }, // 11.5 pt
  },
  paragraphStyles: [
    {
      id: "Normal", name: "Normal", run: { font: FONT, size: 23 },
      paragraph: { spacing: { after: 130, line: 288, lineRule: LineRuleType.AUTO }, widowControl: true },
    },
    {
      id: "BookBody", name: "Book Body", basedOn: "Normal", quickFormat: true,
      run: { font: FONT, size: 23 },
      paragraph: { spacing: { after: 130, line: 288, lineRule: LineRuleType.AUTO } },
    },
    {
      id: "BookQuote", name: "Book Quote", basedOn: "BookBody", quickFormat: true,
      run: { font: FONT, size: 22, italics: true },
      paragraph: {
        indent: { left: in2tw(0.3), right: in2tw(0.3) },
        spacing: { before: 160, after: 220, line: 290, lineRule: LineRuleType.AUTO },
      },
    },
    {
      id: "ChapterLabel", name: "Chapter Label", basedOn: "Normal", next: "Heading1", quickFormat: true,
      run: { font: FONT, size: 17, characterSpacing: 60, color: "595959", allCaps: true },
      paragraph: { alignment: AlignmentType.CENTER, spacing: { before: in2tw(1.35), after: 160 }, keepNext: true },
    },
    {
      id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "BookBody", quickFormat: true,
      run: { font: FONT, size: 38, bold: false, color: "1F1F1F" },
      paragraph: {
        alignment: AlignmentType.CENTER, spacing: { before: 0, after: in2tw(0.55), line: 276, lineRule: LineRuleType.AUTO },
        keepNext: true, outlineLevel: 0,
      },
    },
    {
      id: "FrontTitle", name: "Front Title", basedOn: "Normal", quickFormat: true,
      run: { font: FONT, size: 50, color: "1F1F1F" },
      paragraph: { alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0, line: 300, lineRule: LineRuleType.AUTO } },
    },
    {
      id: "FrontSmall", name: "Front Small", basedOn: "Normal", quickFormat: true,
      run: { font: FONT, size: 18, characterSpacing: 60, color: "595959", allCaps: true },
      paragraph: { alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } },
    },
    {
      id: "ContentsEntry", name: "Contents Entry", basedOn: "Normal", quickFormat: true,
      run: { font: FONT, size: 23 },
      paragraph: {
        spacing: { after: 150 }, indent: { left: in2tw(0.35) },
        tabStops: [{ type: TabStopType.LEFT, position: in2tw(0.75) }],
      },
    },
  ],
};

// ---------- front matter ----------
const titlePage = [
  new Paragraph({ style: "FrontTitle", spacing: { before: in2tw(2.1) }, children: [new TextRun("Things I Never")] }),
  new Paragraph({ style: "FrontTitle", children: [new TextRun("Knew How to Say")] }),
];
if (AUTHOR) {
  titlePage.push(new Paragraph({ style: "FrontSmall", spacing: { before: in2tw(2.4) }, children: [new TextRun(AUTHOR)] }));
}

const contentsPage = [
  new Paragraph({ style: "ChapterLabel", spacing: { before: in2tw(1.35), after: in2tw(0.5) }, children: [new TextRun("Contents")] }),
  ...chapters.map((c, i) =>
    new Paragraph({
      style: "ContentsEntry",
      children: [new TextRun({ text: String(i + 1), color: "595959" }), new TextRun({ text: "\t" }), ...runsFor(c.title)],
    })
  ),
];

// ---------- body ----------
const body = [];
chapters.forEach((c, i) => {
  if (i > 0) body.push(new Paragraph({ children: [new PageBreak()], spacing: { after: 0 } }));
  body.push(new Paragraph({ style: "ChapterLabel", children: [new TextRun(`Chapter ${NUMBER_WORDS[i]}`)] }));
  body.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: runsFor(c.title) }));
  for (const p of c.paragraphs) {
    if (p.kind === "quote") {
      body.push(new Paragraph({ style: "BookQuote", children: runsFor(p.text, { italics: true }) }));
    } else {
      body.push(new Paragraph({ style: "BookBody", children: runsFor(p.text) }));
    }
  }
});

const folio = new Footer({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 0 },
    children: [new TextRun({ children: [PageNumber.CURRENT], size: 19, color: "595959" })],
  })],
});
const emptyFooter = new Footer({ children: [new Paragraph({ children: [] })] });

const doc = new Document({
  title: BOOK_TITLE,
  creator: AUTHOR || undefined,
  description: "Print-ready manuscript",
  styles,
  sections: [
    { properties: { page: PAGE }, footers: { default: emptyFooter }, children: titlePage },
    { properties: { page: PAGE, type: SectionType.ODD_PAGE }, footers: { default: emptyFooter }, children: contentsPage },
    {
      properties: { page: { ...PAGE, pageNumbers: { start: 1 } }, type: SectionType.ODD_PAGE },
      footers: { default: folio },
      children: body,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  const words = chapters.reduce((n, c) => n + c.paragraphs.reduce((m, p) => m + p.text.split(/\s+/).length, 0), 0);
  console.log(`Wrote ${outPath}: ${chapters.length} chapters, ${words} words`);
  chapters.forEach((c, i) => console.log(`  ${i + 1}. ${c.title} (${c.paragraphs.length} paragraphs)`));
});
