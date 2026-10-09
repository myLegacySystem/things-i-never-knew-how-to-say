# Editorial notes

These notes explain what was changed in *Things I Never Knew How to Say* by Aaditya Dike, why, and what was deliberately left alone.

## The finished files

| File | What it is |
|---|---|
| `things-i-never-knew-how-to-say_book_ready.docx` | The complete book: title page, epigraph, contents, and 7 chapters in their final order. Trim size 5.5 × 8.5 in, set in EB Garamond with the regular and italic fonts embedded so it prints the same on any computer. |
| `things-i-never-knew-how-to-say_book_ready.pdf` | A PDF made directly from that DOCX. It has the same pages, the same page numbers and the same fonts, and includes chapter bookmarks. |
| `things-i-never-knew-how-to-say_print_ready.pdf` | **For the printer:** front cover, blank inside cover, the book, blank inside cover, back cover. 88 pages at 5.75 × 8.75 in, which is the 5.5 × 8.5 in trim plus 0.125 in bleed, with the trim size marked in the file. |
| `things-i-never-knew-how-to-say_cover.jpg` | Front cover, 1725 × 2625 px at 300 DPI. That is 5.5 × 8.5 in plus a 0.125 in bleed on every side. |
| `things-i-never-knew-how-to-say_back.jpg` | Back cover, same size and style. |
| `_editing/chapters/*.md` | The edited text of each chapter, in plain text, so future changes are easy to make. |
| `_editing/originals/` | *I Just Want to Be Loved* exactly as you sent it. The other originals are your DOCX files. |
| `_editing/removed/` | The edited text of *24 August — 10:46 a.m.*, which you took out of the book. Kept so it can go back in; not part of the book. |
| `_editing/build/` | Scripts that rebuild the DOCX, PDF and covers (see the end of this document). |

Your original seven DOCX files have not been touched.

---

## Removed chapter: 24 August — 10:46 a.m.

On 9 October 2026 you asked for *24 August — 10:46 a.m.* to come out of the book. It was Chapter 1.

- **Nothing is lost.** Your original `24 August — 10_46 a.m_.docx` is still in the repository, untouched. The edited version is kept in `_editing/removed/24-august.md` but is no longer built into the book. "Removed chapters" in `README.md` explains how to put it back.
- **The other seven chapters each moved up one place, with no edits.** *27 August* is now Chapter One. The contents page and chapter labels were regenerated.
- **The book is now 7 chapters and 83 pages** (4 front pages plus 79 numbered pages). The print-ready PDF is 88 pages.
- **One sentence on the back cover changed.** It used two details that were only in this chapter: replying "within milliseconds", and checking the phone "without even putting on my glasses". It read "By someone who replies within milliseconds and then waits. Who checks the phone each morning before even putting on glasses." It now reads "By someone who checks the phone each morning and waits for one notification." Both halves come from *Will She Ever Understand?*: "Did she reply to my good morning message?" and "Waiting for a notification from her." Nothing else on either cover changed.

What this changes for a reader:
- The book now opens on a happy day with her, instead of on you alone with your responsibilities and your phone.
- The first and last chapters no longer mirror each other (both used to check the phone and say "Maybe. Maybe. Maybe."). The last chapter still works on its own. "I use that word so much" still lands, because "maybe" runs all through the other chapters.
- *I Just Want to Be Loved* used to complete a line from this chapter: "Someone who didn't want to hurt anyone. Not even the people who hurt him." It still stands on its own.
- These are no longer in the book: the Instagram quote; the "Will I be a good son… friend… partner… father…" list; the prayer "I just want one thing"; "Sometimes I even wonder why I live"; the glasses and blurry eyes in the morning; and its last line, "Having a thousand things inside your heart and still getting up to do what needs to be done."

The edits that had been made to it, kept here in case it goes back in (2,337 words became 2,339):
- "someone **whom** you wish would understand you" became "someone **who** you wish would understand you". *(grammar)*
- "And **later** I realize something" became "And **then** I realize something". *(the "later" read oddly in the present tense)*
- "But maybe **that is enough**." became "But maybe **enough is enough**." *(the original could be read as "what I have is enough", the opposite of what you meant)*
- "no one not even a single person can fully understand me" became "no one **—** not even a single person **—** can fully understand me". *(dashes lost when exporting from Google Docs)*

Things in it that were deliberately left alone: the "Will I be a good son…" list, "the people closest to me" coming back again and again, "I just want one thing" followed by four things, "Sometimes I even wonder why I live", "bullshit", "achieve great heights", the glasses and blurry eyes, the Instagram quote word for word, and the date as its title ("I don't even know what to call this chapter.").

---

## 1. What I read

Eight pieces, about 13,000 words in total:

- *24 August — 10:46 a.m.* (since removed; see above)
- *27 August*
- *The Flower I Keep Seeing*
- *The Flower I Chose Not to Pick*
- *The Weight of Thinking About You*
- *I Just Want to Be Loved*. You sent this one separately; it wasn't in the repository.
- *The Love I Could Never Explain*
- *Will She Ever Understand?*

---

## 2. The chapter order

| # | Chapter | What it is | Why it goes here |
|---|---|---|---|
| 1 | **27 August** | Story | The opening, since *24 August* was removed. The reader meets her straight away in a real scene (the pink top, the dosa, the shared glass of watermelon juice, the chocolate on the bridge) and starts to care before learning anything difficult. |
| 2 | **The Flower I Keep Seeing** | Reflection | After a day with her, you describe who she is to you. This chapter introduces the plumeria, the tree that protects it, the rain and the sky. That imagery runs through the rest of the book. |
| 3 | **The Flower I Chose Not to Pick** | Context and memory | The middle of the book is where the reader learns why this love is complicated: the caste difference, her brother being one of your best friends, her parents, the age gap, her degree, and that you have already told her how you feel. It also tells how it all began: the trip. The two flower chapters sit side by side, so the metaphor grows from *seeing* the flower to *choosing not to pick it*. This also makes the "tree" in Chapter 2 make sense in hindsight. |
| 4 | **The Weight of Thinking About You** | Thought | Right after "if letting her bloom means walking away", the next chapter opens with "For the past two or three days, we haven't talked." The emptiness, "cut all the threads", the remote control for your brain. It ends on your mom and on a wish: "After my mom, I sometimes wish someone would come into my life with that same kind of love… Just true love." |
| 5 | **I Just Want to Be Loved** | Thought | It picks up exactly where Chapter 4 leaves off. That chapter ends wishing for "true love" like a mother's; this one opens with "I just want to be loved. That's it. Nothing else." and goes straight to "no one will… worry about me more than my mother." It is the rawest chapter in the book: anger at people who fake things and leave, tears "right now", "maybe I would just prefer not to be born again". It ends on a resolution: "I'll stay kind… that's how my mom and dad raised me." Placing it here, *before* *The Love I Could Never Explain*, matters for one more reason. This chapter is about "people" breaking trust; it never says who. Straight after it, Chapter 6 says "I hope she never breaks the trust I placed in her." So the reader understands that the betrayal in Chapter 5 is about people in general, and that she is still the person you trust. Putting it right after Chapter 6 instead would have made it look as though *she* broke your trust, which the book never says. |
| 6 | **The Love I Could Never Explain** | Reflection | After the storm of Chapter 5, which ends "I'll love the people I love", this chapter is about loving her quietly: grief for the life you imagined, "my first true love", gratitude. It sounds like an ending ("Maybe not the ending I wanted"), and that is why it is second to last. |
| 7 | **Will She Ever Understand?** | Thought | It opens with "There is something I have been thinking about while writing all of this." Its last lines look back over the whole book: "After everything I have written… After all the responsibilities waiting for me… After all the thoughts about my career, my family, my future…" After everything, the heart is still waiting for one notification. It ends unresolved, the way the book itself is still unfinished, and it asks the question the title asks. |

The shape of the book: joy, then wonder, then the truth, then emptiness, then the breaking point, then grief, then *still waiting*. Each heavy chapter in the second half feels different: Chapter 4 is empty, Chapter 5 is frustrated and in tears, Chapter 6 is tender.

---

## 3. How I edited

The text was already clear and very much yours, so the edits are light: **10,714 words became 10,692, and about 99% of the words are untouched.** I compared every chapter to your original word by word. Below is the complete list of changes. Nothing else changed.

### Chapter 1: 27 August
- "go to a college to enquire about the fee structure and see the college where she was thinking of taking admission" became "go and see a college where she was thinking of taking admission, and enquire about the fee structure". *(removes the doubled "college")*
- "Then dosa arrived." became "Then **the** dosa arrived."
- Two commas added.
- **Paragraphs:** this is the most story-like chapter, so I grouped the plain logistics into short paragraphs: getting off the train, looking for an auto, looking for a café. Every emotional beat still sits on its own line.

### Chapter 2: The Flower I Keep Seeing
- Title changed from all caps to the same case as the other titles. No other changes.

### Chapter 3: The Flower I Chose Not to Pick
- **Removed the first line, "I think the same thing is happening with me."** It refers to something the reader never sees. It was probably a quote, a reel, or something you had just read. Without it, the chapter opens with "I love a girl, but I don't think she loves me back." **If you remember what it referred to and want it back, it is a one-line change.**
- "nothing **that I knew** would become so important" became "nothing **I thought** would become so important".
- "Then, at the pool, she was trying to get out. I held her hand and pulled her out of the swimming pool." became "Then, when she was trying to get out of the pool, I held her hand and pulled her out." *(removes the doubled "pool")*
- "After some time, we freshened up." became "Then we freshened up, and…". *("After some time" was used in the line just before it)*
- A lost dash restored before "small rocks, frogs".

### Chapter 4: The Weight of Thinking About You
- Four lost dashes restored.
- "behavior" became "behaviour", to match the British spelling used everywhere else (colour, favourite, travelled).

### Chapter 5: I Just Want to Be Loved
- "no one will take care of you… at all **until** you are useful to them. **Until** their needs are being fulfilled. **Until**… **Until**…" became "**unless**" in all four places. "Until you are useful" literally means people start caring once you become useful. What you mean is that they care *only if* you are useful. The four-beat rhythm is kept.
- "I'm walking **around** people **wearing** masks and costumes" became "I'm walking **among** people **who wear** masks and costumes". *(the original could be read as you wearing the masks)*
- "different **from** the inside" became "different **on** the inside".
- The title is your own name for the piece.

### Chapter 6: The Love I Could Never Explain
- "The way a mother can feel when her child is hurting without being told, I wish I could somehow make her feel the depth of what exists inside me." became two sentences: "A mother can feel when her child is hurting without being told. I wish I could somehow make her feel the depth of what exists inside me in that same way."
- **Removed two lines:** "Maybe in that world, we get to live the life I always dreamed about. The life I spent so much time imagining." A few lines earlier the same passage already says "Where we lived all those imaginary moments I created", so this was the one place where repetition weakened the moment.

### Chapter 7: Will She Ever Understand?
- "Will that wanting her period ever end?" became "Will that **period of wanting her** ever end?"
- "Will she wonder why this guy wants me so badly?" became "Will she wonder, *Why does this guy want me so badly?*" The question is in her imagined voice, so it is set in italics, the same way you used italics for imagined voices in Chapter 4 ("*How stupid is this guy?*").

### Across the whole book
- Straight quotes became curly quotes, "..." became "…", and your bold emphasis became italics. Bold looks loud on a printed page. The emphasis is still in the same places.

---

## 4. What I deliberately did NOT change

These might look like things an editor "should" fix. I left them because they are you.

- **All the meaningful repetition:**
  - "Maybe. Maybe. Maybe." and "A lot. A lot. A lot."
  - Every "No matter how…" line.
  - **All six "genuinely"s in Chapter 5.** That chapter sets *genuine* against *fake*, so repeating the word is the point.
- **The trip memories told three times in Chapter 3.** It is a chapter about holding on to memories, so going back to them is the point.
- **The same thoughts in different chapters:**
  - Hoping another man will be good to her.
  - "Another life."
  - "Nobody will read this."
  - Hating lies (Chapters 5 and 6).
  - Cutting the threads, then killing the feeling.

  In this order they read as one mind coming back to the same fears.
- **Contradictions:**
  - "Maybe that's not even love. Maybe that's just what it feels like when you're deeply in love."
  - "I'm not angry. I'm just frustrated."
  - "And now, again, I think I am being too harsh on myself." This comes straight after being harsh on everyone else.
  - Chapter 6 accepting she didn't choose you, then Chapter 7 asking "What if, one day, she says yes?"
- **"I told her I was near the ticket counter and that I hadn't seen her"** in *27 August*, right after you wrote that you *had* seen her. It reads like a small nervous white lie, and it's lovely.
- **The ambiguous "her" in Chapter 4:** "I have never told my mom how much I love her… And maybe it is the same with her." It could mean your mom or the girl. I did not choose for you.
- **The dark lines:** "Maybe I'll get into an accident", "Or maybe even my funeral", "Or maybe I would just prefer not to be born again".
- **Your own words and phrases:**
  - "cross seven seas", "This emotional fool. No. I'm a joker in this generation.", "Not until I die."
  - "typing this shit", "damn…", "crash out", "cringe", "abuse".
  - "pakad", "taking admission", "the bright orange light hitting my retina".
- **"Either you become cruel, / or you suffer and get hurt every minute."** It stays split across two lines, the way you wrote it.
- **Every small detail:**
  - The pink top and the pink shirt.
  - The dosa, the watermelon juice, and the chocolate.
  - The single picture in your Drive.
  - The white top and black skirt.
  - The cat near the parking lot.
  - The Radha and Krishna wallpaper.
  - 5:44 p.m. and 5:58 p.m.
- **The titles.** All were already right, including the date as a title for *27 August*.

---

## 5. Your quote: epigraph and back cover

You asked for your favourite line on the back, improved. Your version was roughly: *love doesn't happen to beautiful people, it happens and that person seems beautiful.* It now reads:

> Love doesn't happen to beautiful people.
> It happens —
> and then that person becomes beautiful.

What changed and why:
- **"seems" became "becomes".** "Seems" sounds like an illusion. "Becomes" says love actually changes how you see someone. That matches the book, for example "Everything I'm seeing suddenly seems beautiful… Maybe the world didn't change. Maybe I did."
- **Split into three lines.** This gives the reader a pause after "It happens —", so the last line lands.
- **Your words and order are kept otherwise:** "Love doesn't happen to beautiful people", "It happens", "that person".

The quote appears in two places:
- **In the book**, as the epigraph on its own page, before the contents.
- **On the back cover**, replacing the plumeria line.

## 6. Covers

**Front:** a single white plumeria on a muted, after-rain blue-grey, with very faint rain streaks like a window. It comes from the manuscript:
- "Whenever I think about her, I think about a flower. Plumeria."
- The flower that "falls from the tree".
- The rain you watch from the window.
- "She was like a warm light to my eyes."

It is the only bright thing on the cover. The title and **AADITYA DIKE** are set in a quiet serif, with lots of empty space and no couples, roses or hearts.

**Back:** your quote above, then a short description that uses only things in the book:

> Most of this was written at a desk by a window, in the middle of an ordinary working day.
>
> By someone who checks the phone each morning and waits for one notification. Who reached the station fifteen minutes early. Who still has one picture from a trip saved in a Drive folder.
>
> It is about a girl, and a plumeria, and the rain. About overthinking every message. About family and responsibility. About wanting to be loved, and choosing to stay kind anyway. About loving someone enough to let them bloom, even if it isn't in your garden.
>
> It is not a story with an ending.
> It is the things he never knew how to say.

"About wanting to be loved, and choosing to stay kind anyway" was added for *I Just Want to Be Loved*. The second paragraph was changed when *24 August* was removed (see the top of these notes). The bottom-right corner of the back is left empty in case a barcode or ISBN is added later. There are no reviews, logos or credentials of any kind.

---

## 7. Still open

1. **The removed first line of Chapter 3** ("I think the same thing is happening with me."). Restore it if you remember what it referred to.
2. **Copyright page / ISBN.** Page 2, the back of the title page, is blank. A simple "© 2026 Aaditya Dike" could go there if you want one. The repository's LICENSE file is a software (MIT) licence, which isn't really meant for a book.
3. **The new first line of the book.** With *24 August* gone, the book now opens with *27 August*'s first lines: "Here is one more story. Or maybe just one more day that I don't want to forget." "One more" was written when another piece came before it. I left it alone because it is your line and still reads naturally. If you want the book to open differently, tell me what you'd like. I won't change it on my own.

---

## 8. Print layout

- **Page 1:** title page, with the title and Aaditya Dike.
- **Page 2:** blank (the back of the title page).
- **Page 3:** epigraph.
- **Page 4:** contents, facing Chapter One.
- **Page 5:** Chapter One, on a right-hand page. Page numbers start at 1 here.
- **Total:** 83 pages, which is 4 front pages plus 79 numbered pages.
- All page breaks are explicit, so Word, LibreOffice and the PDF show exactly the same pages.
- Margins are mirrored: the wider margin is always on the binding side.
- The covers include 0.125 in of bleed on every side. All text is well inside the safe area.
- The fonts (EB Garamond, Cormorant Garamond) are free under the SIL Open Font License, so embedding and printing them is allowed.

## 9. Rebuilding after changes

See **README.md**. It has the full step-by-step process for adding a new chapter. The short version: edit or add files in `_editing/chapters/`, then run:

```bash
bash _editing/build/build.sh            # rebuilds the DOCX and the PDF (contents page included)
bash _editing/build/build.sh --covers   # also re-renders the covers
```
