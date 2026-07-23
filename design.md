# RoxPath Design System

Reference: component/layout language studied from [joinladder.com](https://www.joinladder.com) (Ladder — fitness coaching app). We adopt Ladder's editorial, high-contrast, flat component patterns, but keep RoxPath's own brand colors and content. This doc is the source of truth for how the landing page should look; update it whenever the visual language changes.

## What we moved away from

The previous pass had the generic "AI-generated SaaS landing page" look. Specifically removed:

- **Grain/noise overlay** on every card and section (`.grain` utility).
- **Ambient glow blobs** — large blurred radial gradients floating behind the hero, pricing, CTA sections (`.glow-indigo`).
- **Glassmorphic floating badge cards** drifting around the hero phone with `backdrop-blur` + translucent borders + infinite float animation. This is the single most "AI template" cliché in the old design and is gone.
- **Gradient-clip text** on every other headline (white → primary-light bg-clip-text). Reserved for zero/rare emphasis now, not a default treatment.
- **Pill badge with pulsing dot** ("● EARLY ACCESS · …") in the hero — replaced with a plain uppercase eyebrow label, no dot, no pill chrome.
- Oversized, uniform 28–32px "blobby" corner radii on every surface.

## What we adopted from Ladder

- **Two-tier type system**: a heavy condensed/extended **display face for headlines** (all caps, tight tracking) paired with a plain, readable **body sans**. Ladder uses a custom face (Modena Extended Heavy) + SF Pro; we use **Archivo Black** for display and **Inter** for body/UI — both free, both give the same "athletic editorial" contrast without looking like a generic SaaS product.
- **Fully pill-shaped CTAs** (`border-radius: 999px`), uppercase label, wide letter-spacing, bold — not soft-rounded rectangles.
- **Flat surfaces**: solid background + a single 1px border. No blur, no drop-shadow theatrics, no opacity-gradient borders.
- **Alternating light/dark section rhythm** for visual pace, instead of one uniform dark page relying on glow effects for variation.
- **Moderate, consistent corner radii** (12 / 16 / 20 / 24px) instead of oversized blobby radii.
- Numeric/stat values keep tabular monospace — this is a legitimate fitness-app convention (Strava, Garmin, Ladder's own workout stats), not an AI-template tell, so it stays but is now used only for actual numbers (splits, paces, PBs), never for section labels.

## Typography

| Token | Family | Use |
|---|---|---|
| `--font-display` | Archivo Black | All headlines (`h-display`, `h-section`, `h-card`). Always uppercase, tight-to-moderate tracking, never gradient-filled by default. |
| `--font-sans` | Inter | Body copy, nav, buttons, labels. |
| `--font-mono` | JetBrains Mono | Numeric data only: paces, splits, timers, reps, PBs. Tabular figures. |

Scale (`clamp()` for fluid sizing):

- `h-display`: 2.5rem → 4.75rem, line-height 0.98, uppercase, letter-spacing -0.01em
- `h-section`: 2rem → 3.25rem, line-height 1.02, uppercase, letter-spacing -0.005em
- `h-card`: 1.15rem → 1.35rem, line-height 1.15, uppercase, letter-spacing 0
- `eyebrow`: 0.72rem, uppercase, letter-spacing 0.16em, weight 700, plain text (no pill/dot chrome)

## Color

Brand colors are unchanged (still RoxPath's own palette) — what changed is *how* they're applied: fewer low-opacity tinted glows, more confident flat fills, and a genuine light section for contrast instead of simulating "light" with white-on-black opacity tricks.

```css
--background: #0a0a0a;      /* primary dark surface */
--surface: #111113;          /* section alt bg (BenefitStrip, Substitutions, etc.) */
--card: #16161a;             /* card fill */
--paper: #f4f2ee;            /* light-section background (new) */
--paper-ink: #0a0a0a;        /* text on --paper */

--primary: #4f46e5;          /* indigo — CTAs, active states */
--primary-light: #a5b4fc;    /* headline accent word, links */
--blue: #6f9fd8;
--orange: #d99a6c;
--coral: #ff6b6b;            /* destructive / warnings */
--purple: #b89ce0;
--mint: #66cf9a;             /* success / positive stat */

--border: rgba(255,255,255,0.12);
--text-primary: #ffffff;
--text-secondary: rgba(255,255,255,0.60);
--text-tertiary: rgba(255,255,255,0.32);
```

The light `--paper` section (used once, for the final CTA / signup, mirroring Ladder's `bg-basic` white sections) flips text to `--paper-ink` and uses the same brand accent colors at full saturation instead of translucent tints.

## Radius scale

```css
--radius-sm: 8px;   /* chips, small inputs */
--radius-md: 12px;  /* metric pills, small cards */
--radius-lg: 16px;  /* standard card-surface */
--radius-xl: 20px;  /* large panels, phone frame */
--radius-2xl: 24px; /* hero-level panels */
--radius-full: 999px; /* buttons, tags, avatars */
```

## Components

### Buttons

- `.btn-primary` — solid `--primary` fill, white text, **pill radius**, uppercase, letter-spacing 0.04em, weight 700. No box-shadow glow. Hover: darken 8%, no lift/translate theatrics.
- `.btn-outline` — transparent fill, 1.5px border at `--text-primary` 35%, uppercase pill. Hover: border solid white, no background fade-in trick.
- `.btn-dark` (for light `--paper` sections) — solid near-black fill, white text, pill.

### Cards (`.card-surface`)

Flat: `background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg);` No blur, no grain, no gradient border. Hover (`.hover-lift`) is a plain `translateY(-2px)`, border does not change color.

### Section header (`.eyebrow` + `h-section`)

Eyebrow is plain uppercase text in `--primary-light`, no background pill, no dot. Directly above the section headline.

### Hero composition

Phone mockup stands alone, centered/offset — **no floating glass badge cards**. Supporting proof points (streak, PB, pace) move into a plain horizontal **stat strip** below the CTA row, styled as flat inline metrics (numeral + label), matching Ladder's restrained use of on-image chips only where they carry real UI meaning (never as decorative float).

### Section rhythm

Alternate background per section: `--background` (dark) → `--surface` (dark, slightly lifted) → one `--paper` (light) block for the final CTA, so the page has genuine value contrast instead of uniform dark + glow.

## Do / Don't

**Do**
- Use the display face + uppercase for every heading.
- Use flat 1px borders for surface definition.
- Use one light (`--paper`) section for contrast.
- Use tabular mono only for real numbers.

**Don't**
- Don't add blur/glass panels.
- Don't add ambient glow blobs behind sections.
- Don't add grain/noise texture.
- Don't gradient-clip headline text by default.
- Don't float decorative cards around imagery.
