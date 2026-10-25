# DIRECTION SHEET — The printed annual
seed 7945226 · drawn 2026-10-25 · redraws: 1 · sector education
Brief: Web divulgativa para distinguir bebidas artesanales de verdad de las que solo lo parecen (cerveza, vermut y destilados, sin alcohol) en España

| | |
| --- | --- |
| Direction | The printed annual |
| Hero | Mosaic masthead, title on axis |
| Type | General Sans |
| Colour | Sheet and biro |
| Sections | intro (Right-half paragraph, lone photo) → features (Mosaic of unlike tiles) → showcase (Two giant words compared) → list (Day tabs, banded agenda) → contact (Sentence, portrait, two links) |
| Motion | Masked headline |
| Photographs | the "People" set, as atmosphere |

This is the direction for this build. Adopt it. Do not blend it with the layout you would have made anyway,
and do not redraw because it is unfamiliar: unfamiliar is the point. Redraw a slot only when it conflicts
with a stated brand constraint or needs an asset that does not exist, and say why in your report.

The parts of this sheet were written separately and will disagree in small ways. Settle every disagreement in this order:
**house rules** (including type no smaller than 13px and body text of 16px or more) → **the direction** (the idea, the composition habits, where the
one accent goes) → **the type system and the palette** (which face does which job, the five size steps, which colour is the ground and where the
accent goes) → **the hero blueprint** → **the section blueprints**. Under each blueprint below, "Adjusted for this page" lists where it disagrees.
In practice: take geometry from blueprints (columns, proportions, what sits where) and take everything else from above them. Map every size a
blueprint names onto one of your five type steps instead of adding a sixth. Use one button shape, one corner radius and one pair of page margins on
the whole page, whatever individual blueprints say. If a blueprint names a kind of typeface (a light serif, a heavy grotesk), use the dealt face.

## 1. The idea
Lay the page out like a well-designed printed report or magazine feature: a masthead image, a tight oversized title, text held to a strict column line, and colour used in solid blocks the way a two-colour print job would. It gives weight and authority to subjects that are really about content: findings, a manifesto, a programme, a serious product. The reader should feel that someone edited this.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A fixed vertical axis at about 42% of the viewport width organises everything: headings begin on it, body columns hang from it, and the 0–42% zone holds small side notes, figures or stays empty. Masthead: a wide image band (photographic mosaic or a single crop) across the top 45% of the first screen; below it the title at 7–9vw starting on the axis, with a two-sentence standfirst at 20–24px. Sections alternate between text pages (title on the axis, body in one or two columns of 34–40ch to its right) and full-bleed colour pages carrying one large figure, quotation or image mosaic. Mosaics are gutterless: photographs and flat colour tiles butted together in a 4- or 6-cell grid. Page numbers, running heads and other print furniture are left out.

## 3. Type — General Sans
A grotesk with slightly geometric bowls, set bold and very large against plain 16px text with nothing in between. Suits studios, type and product launches, and finance or tech brands that lead with the name.
```html
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,700&display=swap" rel="stylesheet">
```
- Display: **General Sans** — weight 700 · tracking -0.02em · leading 0.9 · sentence case; sizes jump straight from 16px text to 10vw and larger
- Text: **General Sans** — 400 for body and lists, 500 for emphasis · leading 1.45 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
A tight heavy grotesk or a sharp serif for titles; an excellent text face for reading at 18–20px with leading near 1.5. Headings in sentence case, tracked tight.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Sheet and biro
```css
:root {
  --bg: #ffffff;
  --surface: #f4f4f4;
  --ink: #111111;
  --muted: #6b6b6b;
  --accent: #1a4be0;
  --accent-ink: #ffffff;
  --field-1: #111111;  --field-1-ink: #ffffff;
}
```
White holds the whole page with black type, one grey for secondary lines and a pale grey step for tiles and inputs; the footer may invert to black. Blue is the colour of text links and the one button, and nothing else is tinted.
Paper, ink and two or three solid block colours. A colour page is a whole section in one flat colour.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node C:/Users/Usuario/proyectos/bebidasartesanales/.claude/skills/design-taste-frontend/scripts/assets.mjs "solo parecen"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Photographs used as blocks in mosaics alongside flat colour tiles; mixed subjects are fine if cropped tight and converted to one treatment.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "People" set (figures, silhouettes and portraits, mostly unposed)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
Treatment: Give all photographs in a mosaic one treatment: greyscale via `filter: grayscale(1) contrast(1.05)`, or all full colour. Do not mix.
- `https://picsum.photos/id/338/1600/1000` — Person in a hooded coat seen from behind facing a misty sea · mid tone · slate blue, grey, charcoal · calm area: left · native landscape · photo: Patryk Sobczak
- `https://picsum.photos/id/177/1600/1000` — Hiker with a backpack looking over a hazy mountain valley · mid tone · warm tan, hazy gold, olive · calm area: left · native landscape · photo: Danka & Peter
- `https://picsum.photos/id/669/1600/1000` — Person in a mustard jacket and grey beanie seen from behind in fog · light tone · mustard, pale grey, white · calm area: left · native landscape · photo: Luke Pamer
- `https://picsum.photos/id/685/1600/1000` — Man sitting on a rock looking over a sea of clouds · mid tone · pale gold, grey, dark brown · calm area: right · native landscape · photo: Joshua Earle
- `https://picsum.photos/id/1009/1600/1000` — Back of a person's head beneath a wide pale blue sky · light tone · pale blue, soft white, dark brown · calm area: top · native portrait · photo: Christopher Campbell
- `https://picsum.photos/id/497/1600/1000` — Back of a woman with windblown hair against a plain grey backdrop · mid tone · pale grey, charcoal · black-and-white · calm area: top · native landscape · photo: Volkan Olmez
- `https://picsum.photos/id/1006/1600/1000` — Person sitting on a rocky overlook above misty forested hills · mid tone · dusky purple, olive green, grey · calm area: top · native landscape · photo: Vladimir Kudinov
- `https://picsum.photos/id/22/1600/1000` — Man in a dark suit walking across painted road markings · mid tone · warm grey, charcoal · calm area: left · native landscape · photo: Alejandro Escamilla
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: mountain, forest, field-and-farm, sky-and-space — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Mosaic masthead, title on axis
The top 52% of the viewport is a full-width masthead band built as a gutterless mosaic: a CSS grid of 6 columns and 2 rows in which four cells are photographs (object-fit: cover, all greyscale via filter: grayscale(1) contrast(1.05)) and the rest are flat tiles in two or three palette colours. One photograph spans two columns and one colour tile spans both rows; cells butt together with no gap. The header lies flush on the band's upper edge: the wordmark in a solid ink block at far left, a flat accent-coloured tab holding three text links that runs from the block to 42% of the width, and the single action as a text link at the far right. Below the band, on the paper ground: a standfirst of one sentence at 20px on the 16px left margin, max 30ch, and, starting exactly at 42% of the width, the title on two lines at clamp(64px, 8.3vw, 128px), medium weight, tracking -0.06em, leading 0.9, running to the right margin. The title's first baseline sits about 110px under the band.

On a phone: The band becomes a mosaic of 3 columns and 2 rows taking the top 38% of the screen: two photographs and four colour tiles. The header is a single row above it with the wordmark block and a menu word. The axis collapses to the 16px left margin: the title at 13vw on two lines, then the standfirst at 17px beneath it. The action sits as a text link at the foot of the screen.
Headline: The title of the report, programme or product, 2-5 words, at most 26 characters across two lines.

Adjusted for this page:
- Its action is a text link: the primary action on the first screen is a real button (filled or solid-bordered, 44px or taller), placed where the blueprint puts the link. A second action may stay a link.
- It numbers things 01, 02: drop the numbers unless they are real data (a price, a date, a count).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. intro — Right-half paragraph, lone photo (split)
No heading. On a 12-column grid with 5vw margins, one statement paragraph of 45–70 words occupies columns 7–12 only, set at clamp(24px, 2.2vw, 34px) with leading 1.25 and a first-line indent of 3em. Its top edge sits 18vh below the section top. Columns 1–6 stay empty except for a single square photograph, 20vw wide, in columns 1–3, placed so its top aligns with the paragraph's last line and it hangs below the text by most of its height. A five-line note at 14px, 180px wide, sits in columns 1–2, 96px beneath the photograph. Section padding is 160px top and bottom. Nothing is centred: the paragraph's left edge is the midpoint of the page, and later text blocks on the page may reuse that line. Holds one paragraph, one photograph and one note.
On a phone: The paragraph comes first at 22px, full width with 20px margins and no indent. The photograph follows at 62% width, pushed to the right margin, in a 4:5 crop instead of square. The small note sits to its left, bottom-aligned with the photograph, in the remaining 30% of the width.

### 2. features — Mosaic of unlike tiles (mosaic)
A 12-column grid with 8px gaps and rows of 96px, filled with no empty cells and no outlines. Six to eight filled tiles in four sizes only: 6×5, 6×3, 3×3 and 3×2 (columns × rows). The rule that keeps it from being a card grid: no two neighbouring tiles hold the same kind of thing. One tile is the heading alone, two to four words at 4vw, top-left. One is a photograph covering its tile. One is a single figure at 6vw with a caption. One is a short list of four lines at 20px. The others are a single sentence each at 28–32px. Text sits top-left with 24px padding; tiles holding one sentence leave their lower half empty. Tile fills: the ground one tone darker, two palette colours, and photographs. One corner radius everywhere, either 0 or 8px.
On a phone: Two columns with 6px gaps. The heading tile and the photograph tile span both columns; sentence tiles span both at their natural height; the figure and list tiles sit side by side as a pair of squares. Order: heading, photograph, pair, sentence, sentence.

Adjusted for this page:
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.

### 3. showcase — Two giant words compared (statement)
No photographs: the thing shown is a pair of words, characters or figures that make the point by comparison (before and after, input and output, ours and the usual). At the top of the section, on one row: the heading, two to four words at 28–36px, at the left margin, and a paragraph of up to 60 words at 17px starting at column 7. Then 12vh of space. Below, two specimens side by side, one starting on column 1 and one on column 7, each set at clamp(180px, 34vw, 520px) with leading 0.8, so each fills about half the viewport's width. The section has a fixed height and overflow: hidden, so its bottom edge cuts both specimens at roughly 60% of their height. One short caption at 16px sits above the top-left of each specimen, naming it. Both specimens share one ink; the difference is in the letterforms or values, not in colour.
On a phone: Heading first, then the paragraph, at full width. The two specimens stack, each at 62vw type size in its own 38svh box with overflow hidden so the lower part is cut. Captions sit above each box at 15px. The second box takes the inverse colours of the first.

### 4. list — Day tabs, banded agenda (list)
A two-line heading at clamp(36px, 4vw, 60px), first line in the soft ink and second in full ink, with the booking button on the same row at the far right. 56px below, left: a 150px column of stacked day tabs, each a filled block 150 by 64px with 6px gaps showing the weekday at 16px and the date at 13px; the active tab takes the darkest fill with inverted text. Right, from 190px to the right margin: the day's sessions as alternating tone bands, each 76px tall with an 8px radius and 4px gaps, the two tones one step apart. Inside a band, on fixed column starts: the time at 20px with tabular figures, 20px from the left; the title at 18px in medium weight at 22%, with a one-line note at 13px in the soft ink under it; speaker names right-aligned at 14px beside up to three overlapping 32px round portraits.
On a phone: The heading stacks above a full-width button. Day tabs become a horizontal row of equal filled blocks, sticky under the top edge. Each band stacks time over title over speakers with 16px padding and grows to fit; portraits sit at the band's top-right corner.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.

### 5. contact — Sentence, portrait, two links (band)
One closing row of three elements hanging from the same top line, with open ground between them, on a 12-column grid. Columns 1–5: a sentence of 12–18 words at clamp(26px, 3vw, 44px), four lines, leading 1.1, saying what kind of enquiries are welcome; it is set as a paragraph and there is no separate heading. Columns 8–9: one small square portrait or photograph of the place, 150–170px, with square corners. Columns 10–12: a short question at 18px in medium weight, then 20px below it two underlined links stacked at 18px (the email address and one booking or social link), and beneath them a line at 14px in the soft ink with the city and the usual reply time. Columns 6–7 stay empty. The row has 160px of space above and 120px below. No form. On a dark ground the photograph is the only bright thing in the row.
On a phone: The sentence comes first at 7.4vw. Below it the portrait at 96px square sits at the left margin with the question and the two links to its right, top-aligned, in the remaining width. The city and reply-time line spans the full width beneath.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

## 8. Motion — Masked headline
On load, each line of the headline rises from behind its own baseline, about 900ms with a strong ease-out, the second line 110ms after the first; the supporting sentence and the action then fade up together. Nothing else on the page performs. Because headlines are two lines at most, you author the line breaks and wrap each line yourself. Recipe: 'Masked line reveal' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
The column line, the mosaics and whole pages of colour give structure and variety without ornaments.

## 11. How this direction goes wrong
The axis must be exact and reused everywhere or it reads as random indentation. Keep paragraphs to a real reading measure. On a phone the axis collapses to the left margin and side notes move inline above their paragraph.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Architecture of Socialist-Era Belgrade** (One Page Love, studied score 7.6) `opl-belgrade-architecture`
  Idea: A two-colour printed guidebook on screen: signal-red type over greyscale concrete, with one modular display face as the only ornament.
  Hero: Full-bleed greyscale photograph of brutalist housing towers; pale sky fills the top half, concrete the bottom. The title is set over the sky, flush left at a 32px margin, three lines in a wide modular display face at 102px (7.1vw) in flat red, the longest line reaching 92% of the width, leading so tight that the lines almost touch. Under it, one row at 24px: a red one-line descriptor at left, and two paler-red facts right-aligned (an object count and a date range). Top-right, the word 'Index' with a diagonal arrow. No logo, no button, nothing else. Red and grey only.
  Worth taking: Limit the page to one saturated colour and one grey, desaturate all photos, and invert the pair (grey on red) for long reading blocks.
- **Ai in Design Report 2026** (Awwwards Site of the Day, studied score 8.4) `aww-ai-in-design-report-2026`
  Idea: A research report laid out like a colour-blocked print annual: a thermal-blurred video collage on top, an oversized tight grotesk title, and flat orange, lilac, sage and black blocks carrying stats, quotes and chapters.
  Hero: The top 53% is a full-width video band: blurred, heat-map-like abstract footage in orange, lilac and sage, overlaid with four or five hard-edged rectangles of the same footage in grey or green, two tagged with tiny mono labels in white boxes. The header sits flush on top: a black logo block at far left, an orange link tab running to 40% of the width, two plain links at right. Below the band, on white: a two-line deck at about 1.4vw on a 1% left margin, and from 42% across a two-line title at 8.3vw, medium weight, tracking -0.06em. Bottom row: mono credit left, scroll cue and arrow aligned to the title column.
  Worth taking: Start most headings and text at a fixed column line about 42% across, leaving the left for small decks, credits and chapter numbers.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to C:/Users/Usuario/proyectos/bebidasartesanales/.taste-skill/direction.json · reprint with `node draw.mjs --show`
