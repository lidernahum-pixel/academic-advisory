# Claude Website Kit

A portable folder of pre-built React components and hooks for assembling website prototypes quickly. Drop this folder into the root of any Claude Code project and reference it from the project's `CLAUDE.md` so this file is always in context.

## Philosophy: menu, not recipe

This kit is a **catalog of options**, not a default site template. Treat each entry as an item on a menu:

- Pick the entry whose vibe and behavior match the situation. Skip everything else.
- Several entries serve overlapping purposes by design (e.g. five different hero treatments). They are alternatives, not steps — assemble a page from one hero + a few primitives, not all of them.
- "What does this site need?" comes first; "what's in the kit?" comes second. The kit serves the site, not the other way around.
- An entry being in the catalog is not a recommendation to use it. Many blocks have hardcoded brand copy, placeholder hrefs, or palette quirks called out in the "Notes" of their entry — read those before reaching for one.
- If nothing in the kit fits, write something fresh. Don't force a misfit just because it's available.

## Activating this kit in a host project

Add this line to the project root `CLAUDE.md` (create it if missing):

```
@./.claude-website-kit/CLAUDE.md
```

Then `cd` into the project and start working — Claude Code will pick up the catalog below automatically.

## Stack assumptions

These components assume the host project provides:

- **React 18.3+** (React 19 also fine; some primitives use the new `JSX` import path).
- **Next.js App Router** (Pages Router works for most blocks; route examples below assume App Router).
- **Tailwind CSS v4** with `@tailwindcss/postcss` and `@import 'tailwindcss';` in `globals.css`. v3 also works if class names are translated.
- **shadcn/ui** initialized — at minimum `Button`; some blocks additionally need `Badge` + `Card` (flagged per entry).
- **`cn()` helper** at `@/lib/utils` (shadcn's `clsx` + `tailwind-merge` combo).
- **Path alias** `@/*` mapped to project root in `tsconfig.json`.
- **`framer-motion`** is the kit's default animation lib; a few entries use `motion` (the rebranded package) and are flagged.

### Bootstrap commands (if the host project is empty)

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
npx shadcn@latest init button --defaults --force
npm install framer-motion lucide-react@0.577.0
```

> **lucide-react pin:** brand icons (Github, Linkedin, etc.) were removed in v1.x. Pin to **`0.577.0`** if any entry imports them. Skip the pin only if you replace those icons with a different source.

## Structure

```
.claude-website-kit/
├── heroes/        — full-viewport landing sections
├── sections/      — mid-page sections (galleries, features, pricing, testimonials, footers, CTAs, FAQ)
├── primitives/    — small reusable elements (buttons, text effects, inputs)
├── widgets/       — self-contained interactive UI units
├── visuals/       — decorative / scene-filling visuals
├── hooks/         — React hooks and pure helpers
├── themes/        — drop-in CSS theme files (shadcn + Tailwind v4 tokens)
└── CLAUDE.md      — this file
```

Import pattern:

```tsx
import X from "@/.claude-website-kit/<category>/X";   // default exports
import { Y } from "@/.claude-website-kit/<category>/Y"; // named exports
```

The per-entry "Import" line below shows the exact form (default vs named) for each.

---

## Heroes

Full-viewport landing-page sections. Pick one per page — they're alternatives, not stack-able.

### `HeroBlock`

Minimal centered hero. Animated avatar circle, large headline, sub-copy, two CTAs (Mail / ArrowDown), three round social-icon buttons (Github / LinkedIn / Mail), and a bouncing scroll-down indicator. Subtle background grid pattern.

- **Import:** `import { HeroBlock } from "@/.claude-website-kit/heroes/HeroBlock";`
- **Deps:** `framer-motion`, `lucide-react@0.577.0` (uses brand icons), shadcn `Button`.
- **Customizing:** edit headline / sub-copy / CTA labels inline. The social-icon list is an inline `[{icon, href}]` array — swap hrefs there.
- **`"use client"`:** yes (uses framer-motion).

### `HeroSection`

Larger marketing-style hero with a **fixed top nav** (`HeroHeader`, exported only via `HeroSection`) featuring scroll-aware backdrop blur, a mobile menu toggle, an inline brand logo SVG, an autoplaying background video, two CTAs, and a "Powering the best teams" infinite-scroll logo strip with edge progressive blurs.

- **Import:** `import { HeroSection } from "@/.claude-website-kit/heroes/HeroSection";`
- **Different motion package:** imports from `motion/react` (the rebrand). Either:
  - Install `motion`: `npm install motion`, **or**
  - Edit imports to `from "framer-motion"`. Same APIs.
- **Non-default shadcn primitives required:** `InfiniteSlider` and `ProgressiveBlur` — not in the default shadcn registry. Source from **motion-primitives** (see motion-primitives.com for the registry URLs).
- **Other deps:** `next/link`, `lucide-react` (`Menu`, `X`, `ChevronRight` — generic icons, fine on either lucide version), `cn`, shadcn `Button`.
- **Brand customization points (edit inline):** headline, sub-copy, button labels, `menuItems` array, background video URL (currently a remote ImageKit demo), customer logos in the slider (all `<img>` from `html.tailus.io`), inline `Logo` SVG component at the bottom.
- **Hero + Header coupling:** the header is hardcoded inside `HeroSection`. To reuse the same nav across routes, lift `HeroHeader` into its own block or `layout.tsx`.

### `LiquidMetalHero`

Centered hero on a fixed-position liquid-metal shader background (uses `liquidMetalPresets[2]`). Optional badge pill, large headline, subtitle, primary CTA + optional secondary CTA, and an optional 3-column feature card. **The most prop-driven hero in the kit** — no copy edits needed to reuse.

- **Import:** `import LiquidMetalHero from "@/.claude-website-kit/heroes/LiquidMetalHero";`
- **Props:**
  ```ts
  interface LiquidMetalHeroProps {
    badge?: string;
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel?: string;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick?: () => void;
    features?: string[];   // shows a 3-col feature card when non-empty
  }
  ```
- **External dep:** `npm install @paper-design/shaders-react`
- **shadcn primitives:** `Button` (kit-default) + `Badge` + `Card`. Add the latter two via `npx shadcn@latest add badge card`.
- **Other deps:** `framer-motion`.
- **Theming-friendly:** uses `text-foreground`, `bg-foreground/10`, etc. — adopts host theme automatically.
- **Note:** the shader is fixed-position with `zIndex: -10`. Don't render multiple shader-backed heroes on the same page; they'll overlap.

### `ShaderShowcase`

Dramatic full-viewport hero with two layered animated mesh-gradient shaders as the background, a glassy badge, a large multi-line gradient headline ("Beautiful / Shader / Experiences"), nav, an animated logo, and a circular pulsing-border widget with rotating text in the corner. Heavy SVG filter use (`feTurbulence`, gooey, glass effects).

- **Import:** `import ShaderShowcase from "@/.claude-website-kit/heroes/ShaderShowcase";`
- **External dep:** `npm install @paper-design/shaders-react`
- **Other deps:** `framer-motion`. No shadcn primitives, no `cn`.
- **Brand/customization points:** headline lines, badge copy, nav items, the **rotating circular text in bottom-right currently reads `"Loxt - Mozzi • 21st.dev is amazing • ..."` — replace before shipping**, the inline `<motion.svg>` logo (M-shape — swap for your mark), all `MeshGradient` and `PulsingBorder` color arrays.
- **TS note:** the second `MeshGradient` passes `wireframe="true"` (string). If host TS is strict, change to `wireframe={true}`.
- **Performance:** two mesh-gradient shaders + a pulsing-border shader + multiple SVG filters concurrently. Landing-page hero only, not all routes.

### `AetherFlowHero`

Full-viewport hero with a mouse-reactive **particle network** canvas background (purple dots connected by lines that brighten near the cursor). Overlay content: "Dynamic Rendering Engine" badge, "Aether Flow" headline, paragraph, single white CTA.

- **Import:** `import AetherFlowHero from "@/.claude-website-kit/heroes/AetherFlowHero";`
- **TypeScript caveat — plain JS in a `.tsx` wrapper.** The original paste was untyped; under `strict: true` hosts will see implicit-any errors throughout. Fixes: add `// @ts-nocheck` at the top, or rewrite with proper types (`useRef<HTMLCanvasElement>(null)`, typed `Particle` class, etc.).
- **Dead code:** defines a local `cn` that's never used. Safe to delete.
- **Deps:** `framer-motion`, `lucide-react` (`ArrowRight`, `Zap` — generic icons). No shadcn, no `cn` import.
- **Theming:** **none** — colors hardcoded (`bg-purple-500/10`, `text-gray-400`, particle `rgba(191, 128, 255, 0.8)`, etc.).
- **Window-scoped listeners:** `mousemove` / `mouseout` attach to `window`, so particles react across the whole page, not just over the hero. Multiple instances will fight over the listeners. To scope: attach to the canvas/container ref and translate coordinates with `getBoundingClientRect()`.
- **Performance:** continuous rAF with an O(n²) connect loop. Particle count scales with viewport area (`canvas.width * canvas.height / 9000`). On a 4K screen → ~900 particles → ~400k pair checks/frame. Lower the `9000` divisor for less density.

### `HeroGeometric`

Centered prop-driven hero on a near-black background (`bg-[#030303]`), with five floating colored gradient pill shapes drifting at different positions, rotations, and delays — indigo, rose, violet, amber, cyan. Two-line headline where the first line is a white-to-white/80 vertical gradient and the second is an indigo-to-rose horizontal gradient. Optional badge pill at the top with a `Circle` dot.

- **Import:** `import { HeroGeometric } from "@/.claude-website-kit/heroes/HeroGeometric";`
- **Props (all optional, all with defaults):**
  ```ts
  { badge?: string; title1?: string; title2?: string }
  ```
  Defaults are generic placeholders ("Design Collective", "Elevate Your Digital Vision", "Crafting Exceptional Websites") — override for any real project.
- **Deps:** `framer-motion`, `lucide-react` (`Circle` — generic icon), `cn`.
- **Dead imports:** the file imports `useMotionValue`, `useTransform`, `animate`, `useEffect`, `useState` from framer-motion/react but never uses them. Safe to delete.
- **Theming:** **none** — hardcoded dark background and colored gradients. Won't follow host theme tokens.
- **Internal helper:** `ElegantShape` is defined in the file but not exported. To reuse the shapes elsewhere, copy the function or export it from a forked version. The 5 shapes inside `HeroGeometric` are inline — to add/remove/recolor blobs, edit the JSX.
- **Compared to other heroes in the kit:**
  - vs `ShaderShowcase` — this is calmer; static-positioned blobs that drift, vs continuously animating mesh-gradient shaders.
  - vs `LiquidMetalHero` — both are prop-driven, but this hero's palette is fixed; `LiquidMetalHero` adopts theme tokens.
  - vs `AetherFlowHero` — no canvas / mouse interaction; less CPU.

---

## Sections

Mid-page sections — what goes *between* the hero and the footer. Prop-driven by default so the same component can ship as many variations as the project needs.

### `Features` (generic name — rename on use)

A classic shadcn-style **3-column feature grid** with `divide-x divide-y border` rule lines between cells. Heading + intro paragraph above; 6 feature cards below, each with a lucide icon, a one-line title, and a one-sentence description. Responsive: 1 col on mobile, 2 cols at `sm`, 3 cols at `lg`.

- **Heads up — generic name:** the exported component is `Features`. Rename to something specific (`IconFeatureGrid`, `FeatureGridSix`, `ProductFeatures`) when copying into a host project — otherwise more feature-section pastes will collide.
- **Import:** `import { Features } from "@/.claude-website-kit/sections/Features";`
- **No props.** Everything — heading, intro, 6 icon-title-description triples — is hardcoded inline. Refactor to accept an `items` array if you want to reuse it without editing JSX.
- **All copy is placeholder lorem** (and minimally grammatical: "It supports an entire helping developers and innovate."). The headline ("The foundation for creative teams management") and feature names (one is **"Faaast"** — likely a marketing pun, edit if unintended) all need replacing before shipping.
- **Deps:** `lucide-react` only (`Zap`, `Cpu`, `Fingerprint`, `Pencil`, `Settings2`, `Sparkles` — generic icons, work on both 0.x and 1.x). No shadcn primitives, no `cn`, no `framer-motion`.
- **No `"use client"` needed** — pure static markup.
- **Theming:** **friendly** — only uses `border` and `divide-*` (which pick up `--border` token) and default text colors. Adopts host theme automatically.
- **Layout note:** the `*:p-12` selector sets uniform padding on direct children. If you edit the grid items to wrap them in another element, this rule no longer applies.

### `Faq5`

A centered FAQ section: small `Badge` + `h1` heading + sub-description, followed by a **static numbered list** of Q&A pairs (each item has a small mono-numbered square + question + answer). Constrained to `max-w-screen-sm` for readability.

- **Not an accordion** — every answer is always visible. If you need collapse-on-click, wrap each item in shadcn's `Accordion` / `AccordionItem` or fork accordingly.
- **Import:** `import { Faq5 } from "@/.claude-website-kit/sections/Faq5";`
- **Props (all optional, all with defaults):**
  ```ts
  interface Faq5Props {
    badge?: string;          // default "FAQ"
    heading?: string;        // default "Common Questions & Answers"
    description?: string;    // default lorem
    faqs?: FaqItem[];        // default 4 meta-Q&A items ("What is a FAQ?")
  }
  interface FaqItem { question: string; answer: string }
  ```
- **shadcn primitive required:** `Badge` — add via `npx shadcn@latest add badge` if not already present.
- **No other deps.** No icons, no motion, no `cn`.
- **No `"use client"` needed** — pure static markup.
- **Theming:** **friendly** — uses `bg-secondary`, `text-primary`, `text-muted-foreground` only. Adopts host theme automatically.
- **Placeholders to replace before shipping:** all four default questions and answers are meta-content about what an FAQ is — must be replaced with real product Q&A. The default description is generic lorem.

### `Footer` (generic name — rename on use)

An opinionated, **animated** 3-column footer wrapped in rounded top corners (`rounded-t-4xl` / `md:rounded-t-6xl`) with a subtle radial gradient highlight on the top edge. Left column: brand icon (lucide `FrameIcon`) + auto-current-year copyright. Right two columns: 4 link sections in a sub-grid — Product / Company / Resources / Social. Each section fades + blur-clears into view on scroll via an internal `AnimatedContainer` helper that **respects `prefers-reduced-motion`**.

- **Heads up — generic name:** the export is `Footer`. Rename to `FooterAnimated`, `FooterRounded`, or similar when copying into a host project. Otherwise it collides with the obvious naming convention.
- **Import:** `import { Footer } from "@/.claude-website-kit/sections/Footer";`
- **No props.** All content is hardcoded inline in `footerLinks` and the JSX (brand "Asme" in the copyright, FrameIcon as the logo, all link URLs). Refactor to props if you want reuse — otherwise this is a copy-and-edit asset.
- **Brand placeholder:** `© {year} Asme` — replace `Asme` before shipping.
- **Deps:**
  - `motion` (the rebranded framer-motion) — install or change the import to `from "framer-motion"`.
  - `lucide-react` **uses brand icons** (`FacebookIcon`, `InstagramIcon`, `YoutubeIcon`, `LinkedinIcon`) — host must pin to `lucide-react@0.577.0` or these imports fail in v1.x.
- **No shadcn primitives, no `cn`.**
- **`"use client"`** — yes (uses `useReducedMotion`, `whileInView`).
- **Theming:** uses `text-muted-foreground`, `hover:text-foreground`, `border-t`, `bg-foreground/20`, `bg-[radial-gradient(...theme(backgroundColor.white/8%)...)]`. Mostly theme-friendly; the radial gradient hardcodes `white/8%` which assumes a darker section above it — on light themes this gradient won't show.
- **Layout:** `max-w-6xl mx-auto` with rounded top corners suggests this is designed to *visually slot into* the bottom of a colored section band above it. Render it inside a wrapper with a contrasting background for the round-corner effect to read.

#### When to reach for `Footer` vs `Footer2`

- **`Footer`** — opinionated visual design, scroll-fade animations, social icons, rounded top corners. Choose when the footer should feel like a designed moment of the page (and you're willing to edit JSX to change content).
- **`Footer2`** — plain shadcn-style, no animation, fully prop-driven. Choose when the footer should be utilitarian and content comes from data (CMS, config, repeated across many pages).

### `Footer2`

Six-column footer with logo + tagline on the left (spans 2 cols), four columns of categorized link lists, and a bottom row with copyright and legal links separated by a top border. Fully prop-driven.

- **Import:** `import { Footer2 } from "@/.claude-website-kit/sections/Footer2";`
- **Props (all optional, all with defaults):**
  ```ts
  interface Footer2Props {
    logo?: { url: string; src: string; alt: string; title: string };
    tagline?: string;
    menuItems?: { title: string; links: { text: string; url: string }[] }[];
    copyright?: string;
    bottomLinks?: { text: string; url: string }[];
  }
  ```
- **Bug to fix on adoption — the logo `<a>` is hardcoded.** The wrapping anchor is `<a href="https://shadcnblocks.com">` (literal string) instead of `<a href={logo.url}>`. The `logo.url` prop is accepted but **not used**. Edit the JSX to `<a href={logo.url}>` for the prop to actually work.
- **Default content is shadcnblocks placeholder:** logo points to a remote `shadcnblocks.com/images/block/block-1.svg`, tagline is "Components made easy.", `menuItems[0].links` has "Pricing" listed twice (template artifact), copyright says `© 2024` (year hardcoded — stale soon).
- **Deps:** none — pure static markup. No shadcn primitives, no icons, no `cn`, no motion.
- **No `"use client"` needed** — fully server-component safe.
- **Theming:** **friendly** — uses `text-muted-foreground`, `hover:text-primary`, `border-t` only. Adopts host theme automatically.
- **Layout:** wrapped in `<section class="py-32"><div class="container">` for consistent vertical rhythm with other kit sections. Drop into any route under the main content.

### `Gallery6`

Horizontal-scroll gallery section with a heading, "Book a demo" link, prev/next buttons, and an Embla-Carousel-driven row of card items (image + title + summary + "Read more"). Cards hover-scale their image; the page-edge alignment uses `calc(50vw-700px)` math to bleed beyond the container at large breakpoints.

- **Import:** `import { Gallery6 } from "@/.claude-website-kit/sections/Gallery6";`
- **Props (all optional, all with defaults):**
  ```ts
  {
    heading?: string;            // default "Gallery"
    demoUrl?: string;            // default placeholder — replace before shipping
    items?: GalleryItem[];       // 5 AI-themed placeholder items by default
  }
  interface GalleryItem {
    id: string; title: string; summary: string; url: string; image: string;
  }
  ```
- **shadcn primitives required (not default — must add in host):**
  ```bash
  npx shadcn@latest add carousel    # pulls in embla-carousel-react transitively
  ```
  Plus the kit-default `Button`.
- **Deps:** `lucide-react` (`ArrowLeft`, `ArrowRight`, `ArrowUpRight` — generic icons), shadcn `Button` + `Carousel` family.
- **Placeholders to replace before shipping:**
  - Default `demoUrl = "https://www.shadcnblocks.com"` (the source registry).
  - Default `items[].image = "/images/block/placeholder-dark-1.svg"` — these images **don't exist** in the host project. Either pass real `items` with real image paths, or drop the placeholder SVGs into the host's `public/` to silence the broken-image warnings while iterating.
  - The 5 default item titles ("Build Modern UIs", "Computer Vision Technology", etc.) are AI-marketing placeholders.
- **Theming:** uses `text-muted-foreground` only — palette adopts host theme.
- **Minor quirk:** `disabled:pointer-events-auto` on the prev/next buttons keeps them clickable when "disabled" (unusual choice — probably a leftover, harmless because they no-op when the carousel can't scroll).
- **Layout math is fragile:** the `2xl:ml-[max(8rem,calc(50vw-700px+1rem))]` margin trick assumes a centered max-width container. If the host's layout differs, the edges may misalign — read the JSX before adopting.

### `Pricing2`

Centered pricing section with a 2-tier card layout, a shadcn `Switch` for monthly/yearly toggle, and an auto-calculated "Billed $X annually" line. Cards use shadcn's `Card` / `CardHeader` / `CardContent` / `CardFooter` primitives — looks visually consistent with shadcn's default aesthetic. Drops in with default props (no required inputs).

- **Import:** `import { Pricing2 } from "@/.claude-website-kit/sections/Pricing2";`
- **Props (all optional, all with defaults):**
  ```ts
  interface Pricing2Props {
    heading?: string;         // default "Pricing"
    description?: string;     // default lorem
    plans?: PricingPlan[];    // default 2 plans (Plus / Pro)
  }
  interface PricingPlan {
    id: string;               // see "Pro special-case" below
    name: string;
    description: string;
    monthlyPrice: string;     // formatted as "$19" — string with $ prefix
    yearlyPrice: string;      // same format
    features: { text: string }[];
    button: { text: string; url: string };
  }
  ```
- **shadcn primitives required:**
  ```bash
  npx shadcn@latest add card switch separator     # button is kit-default
  ```
- **Deps:** `lucide-react` (`ArrowRight`, `CircleCheck` — generic icons), shadcn `Button` + `Card` family + `Separator` + `Switch`. No motion.
- **Theming:** **friendly** — uses `text-muted-foreground` and shadcn primitive defaults. Adopts host theme.
- **"Pro" tier hardcoded by ID:** the line `"Everything in Plus, and:"` only shows when `plan.id === "pro"`. **String-equality on `id`** — if you rename your plans to `enterprise` or `premium`, the line silently disappears. Either keep `id: "pro"`, or edit the conditional in JSX to use your scheme (e.g., a `highlightUpgrade` boolean on the plan).
- **Price parsing is fragile:** the annual-total calc does `Number(plan.monthlyPrice.slice(1)) * 12` — assumes prices start with a single character (`$`). Breaks on `"€19"`, `"$1,000"` (comma), `"₹2,499"`. If you need other currencies, fork the math.
- **Placeholders to replace:** default plan button URLs point to `shadcnblocks.com`. The "Billed $X annually" label shows on both views — on monthly view this is the annual *equivalent*, which can confuse users; consider hiding it when `isYearly === false`.
- **Minor security:** the CTA `<a target="_blank">` is missing `rel="noopener noreferrer"`. Trivial fix.

#### When to reach for `Pricing2` vs `PricingSection`

- **`Pricing2`** — 2-tier (or small N), classic shadcn Card aesthetic, drops in with defaults, simple Switch toggle. Choose when the pricing should feel plain and trustworthy, or when you have only two tiers.
- **`PricingSection`** — 3-tier with a highlighted "Popular" plan, animated `BorderTrail`, mix-blend-difference toggle pill, tooltips on features, requires data. Choose when pricing should feel *premium* and you have a clear lead tier to showcase.

### `PricingSection` (+ exports: `PricingCard`, `PricingFrequencyToggle`, `BorderTrail`)

Full pricing section with a monthly/yearly toggle (animated layoutId pill using `mix-blend-difference` for a slick inverted-color effect), a 3-column grid of plan cards, per-plan "Popular" badges, auto-calculated yearly discount percentages, tooltip-able feature items, and a glowing **animated border trail** that orbits the highlighted plan.

- **Imports (this file ships four named exports):**
  ```tsx
  import {
    PricingSection,         // main entry — heading + toggle + grid of cards
    PricingCard,            // single plan card, usable standalone
    PricingFrequencyToggle, // the monthly/yearly switch, usable standalone
    BorderTrail,            // animated orbiting dot — wraps any rounded box
  } from "@/.claude-website-kit/sections/PricingSection";
  ```
- **Required props on `PricingSection`** — unlike most kit sections, this one has **no defaults for `plans` or `heading`**. You must pass:
  ```ts
  interface PricingSectionProps {
    plans: Plan[];          // required, no fallback — section won't render meaningfully without it
    heading: string;        // required
    description?: string;   // optional
  }
  interface Plan {
    name: string;
    info: string;
    price: { monthly: number; yearly: number };  // both required so yearly-discount math works
    features: { text: string; tooltip?: string }[];
    btn: { text: string; href: string };
    highlighted?: boolean;  // marks the "Popular" card + adds BorderTrail
  }
  ```
- **shadcn primitives required:**
  ```bash
  npx shadcn@latest add tooltip    # for feature tooltips (button is kit-default)
  ```
- **Deps:** `framer-motion` (kit stack), `lucide-react` (`CheckCircleIcon`, `StarIcon` — generic icons), `next/link`, `cn`, shadcn `Button` + `Tooltip`.
- **Theming:** **friendly** — uses `bg-muted/*`, `bg-foreground`, `bg-primary`, `text-muted-foreground`, `text-primary-foreground`, `border`. Adopts host theme.
- **Browser support note:** `BorderTrail` uses CSS `offset-path` with `rect(0 auto auto 0 round Npx)` syntax. Chromium-based browsers ≥116, Safari ≥17.2, Firefox ≥118. On older browsers the trail won't animate (rest of the component still works).
- **"Free" plan special case:** plans named exactly `"Free"` (case-sensitive) drop the `/month`/`/year` suffix on the price. Other plans always show it. Useful for "$0" tiers; rename your free tier if you want the suffix to appear.
- **Currency:** prices render as `${plan.price[frequency]}` — hardcoded USD. For other currencies, fork or wrap the JSX.
- **`BorderTrail` as a standalone utility:** the animated orbiting-dot effect is genuinely reusable — wrap any `position: relative; rounded-*` parent and it'll trace the border. Use the `style` prop to pass a `boxShadow` for the glow, `size` to set the dot diameter, `className` to recolor (`bg-amber-400`, etc.). Worth knowing about even if you don't use the rest of the pricing section.

### `Testimonials` (generic name — rename on use)

**Static bento-grid testimonials section.** A 4-column × 2-row grid: one featured testimonial spans 2×2 with a brand logo header, three smaller testimonials fill the rest. Each card has a blockquote + Avatar + name + role. No animations — pure layout.

- **Heads up — generic name:** the export is the default `Testimonials`. Rename to `TestimonialsBento` or `TestimonialsGrid4` when copying into a host project — otherwise more testimonial pastes will collide.
- **Import (default export):**
  ```tsx
  import Testimonials from "@/.claude-website-kit/sections/Testimonials";
  ```
- **No props.** All content is hardcoded — copy, names, roles, image URLs, brand logo URL, even the grid arrangement. Reuse means editing JSX.
- **shadcn primitives required:**
  ```bash
  npx shadcn@latest add card avatar
  ```
- **Deps:** none beyond shadcn. No motion, no icons, no `cn`.
- **Theming:** **friendly** — uses `text-muted-foreground`, `dark:invert` on the brand logo. Adopts host theme.
- **Placeholder content to replace:**
  - All 4 quote texts (Tailus-themed marketing).
  - All 4 avatars (`tailus.io/images/reviews/*.webp` — remote URLs that may break later).
  - Brand logo (`html.tailus.io/.../nike.svg`).
  - Default heading: "Build by makers, loved by thousand developers" (grammar quirk).
  - Default intro paragraph references "Gemini".
- **Typo in copy:** **"Software Ingineer"** appears twice (should be "Software Engineer"). Fix before shipping.
- **Phantom className:** the fourth card has `className="card variant-mixed"` — neither `card` nor `variant-mixed` are Tailwind/shadcn classes. They're likely Tailus's design-token names that don't exist in a plain shadcn host. Silently no-op; remove unless you port the Tailus token set.

#### When to reach for `Testimonials` vs `TestimonialsColumn`

- **`Testimonials`** — static bento grid, 4 testimonials max, one featured. Choose when testimonials should feel *trusted and curated*. No animation overhead.
- **`TestimonialsColumn`** — animated vertical marquee, scales to N testimonials per column, compose 2–3 columns side by side. Choose when you want *kinetic social proof* and have a lot of testimonials to surface. Higher complexity (broken type to fix, parent section needed).

### `TestimonialsColumn` (partial — needs a wrapper section)

A single vertically-scrolling column of testimonial cards (text + avatar + name + role). The column renders the testimonials array **twice** and animates `translateY` from `0` to `-50%` on an infinite loop, producing a seamless upward marquee. Designed to be **composed into a parent section** with 2–3 columns side by side at different `duration` values for organic variety.

- **Import (named export):** `import { TestimonialsColumn } from "@/.claude-website-kit/sections/TestimonialsColumn";`

⚠️ **Won't compile as-is.** The prop type is declared as `testimonials: typeof testimonials` — but `testimonials` is never defined in the file. **Fix on adoption** by one of:

- **Recommended — explicit interface:**
  ```tsx
  interface Testimonial { text: string; image: string; name: string; role: string }
  export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
  }) => { ... }
  ```
- **Or** declare a sentinel `const testimonials: Testimonial[] = [];` at the top of the file so `typeof testimonials` resolves.
- **Or** pull a `data.ts` file alongside with `export const testimonials = [...]` and import it here.

- **Props (effective shape):**
  - `className?: string` — apply width / positioning (e.g., `"w-80 h-[600px] overflow-hidden"` — also wrap the parent to clip overflow).
  - `testimonials: { text: string; image: string; name: string; role: string }[]`
  - `duration?: number` — seconds for one full scroll loop. Default `10`. Use different durations across columns for organic motion.
- **Deps:** `motion` (rebranded framer-motion) — install or change import to `from "framer-motion"`. No shadcn primitives, no `cn`, no other libs.
- **Theming:** **friendly** — uses `bg-background`, `border`, `shadow-primary/10`. Adopts host theme.
- **The inner `motion.div` has `bg-background`** — this is intentional for clean compositing when multiple columns sit side by side, but it **will mask any animated background underneath** (e.g., a starfield or shader). If you layer this over a fancy background, remove `bg-background` from the inner div and put it on the cards instead.
- **Typical usage pattern** (parent that the user may paste next):
  ```tsx
  <section className="bg-background py-32 relative overflow-hidden">
    <div className="container">
      <h2>What our users say</h2>
      <div className="flex justify-center gap-6 mt-10 max-h-[740px] overflow-hidden">
        <TestimonialsColumn testimonials={firstColumn} duration={15} />
        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
      </div>
    </div>
  </section>
  ```
  The parent must clip overflow vertically, otherwise the looping translation reveals empty space on the way down.
- **Trailing `;` in the file** is a no-op empty statement. Harmless.
- **No infinite-key warning suppression** — the inner map uses `i` (item index) as the key inside a `React.Fragment` keyed by `index` (column duplicate index). React will warn if `testimonials` reorders; since it's static input, fine in practice.

---

## Primitives

Small reusable UI elements. Mix and match into any layout.

### `Button` (neon variant)

A `forwardRef` pill button with class-variance-authority variants and an animated neon-gradient hover effect. **Name collides with shadcn's `Button`** — alias on import:

```tsx
import { Button as NeonButton } from "@/.claude-website-kit/primitives/Button";
```

- **Variants:** `default` (translucent blue), `solid` (filled blue), `ghost` (transparent until hover).
- **Sizes:** `default`, `sm`, `lg`.
- **Extra prop:** `neon?: boolean` (default `true`) — toggles the gradient glow lines.
- **Deps:** `class-variance-authority` (shadcn installs this transitively), `cn`.
- **No `"use client"` needed** — pure forwardRef, no hooks. Safe in server components.

### `ButtonAlt` (softened shadcn Button — primitive)

A near-clone of shadcn's stock `Button` with three cosmetic tweaks: `rounded-lg` instead of `rounded-md`, a subtle `shadow-sm shadow-black/5` on solid/outline variants, and a `outline-offset-2` focus ring. Same six variants (`default` / `destructive` / `outline` / `secondary` / `ghost` / `link`), same four sizes (`default` / `sm` / `lg` / `icon`), same `asChild` pattern using Radix `Slot`.

- **Name collision** — exports `Button`, same as both shadcn's stock and the neon `Button` in this folder. To use multiple in one file, alias:
  ```tsx
  import { Button as ShadcnButton } from "@/components/ui/button";
  import { Button as NeonButton } from "@/.claude-website-kit/primitives/Button";
  import { Button as SoftButton } from "@/.claude-website-kit/primitives/ButtonAlt";
  ```
- **Import:** `import { Button } from "@/.claude-website-kit/primitives/ButtonAlt";`
- **Deps:** `@radix-ui/react-slot`, `class-variance-authority`, `cn`. All three come in transitively with shadcn's init — no extra installs.
- **No `"use client"` needed** — pure forwardRef.
- **When to reach for it over shadcn's stock:** when the design wants softer corners and an ambient shadow without switching the whole UI theme. If you want this style project-wide, **overwrite `components/ui/button.tsx` in the host with this content** instead of using both side-by-side — every other block in the kit imports from `@/components/ui/button` and will pick up the new look automatically.

### `AnimatedDownloadButton`

Round red download button (64×64 px) that expands horizontally to 220 px on hover, fading from a `↓` glyph to the word "Download." Wraps an `<a download>` element.

- **Import:** `import AnimatedDownloadButton from "@/.claude-website-kit/primitives/AnimatedDownloadButton";`
- **No props.** Everything hardcoded: `href="#Your Download Link"` is a **placeholder** that must be edited or refactored into a prop before shipping. Color (`bg-red-600`), label, sizes — all inline.
- **Bug to fix:** outer `<a>` has `className="absolute center "` — `center` is **not a Tailwind class**. Silently does nothing. And `absolute` will layout-collapse the link unless inside a positioned parent. Drop both unless you mean them.
- **Deps:** `framer-motion` only.

### `TextDisperse`

Animated text where each character flies to its own preset offset and rotation on hover, then snaps back on mouse-leave. For very large display text (defaults to `text-[6vw]`).

- **Import:** `import { TextDisperse } from "@/.claude-website-kit/primitives/TextDisperse";`
- **Children must be a string of ≤13 characters.** Internal `transforms` array has 13 entries — longer strings crash with `transforms[i]` undefined. Extend the array if needed.
- **Props:** `children: string`, `onHover?: (isActive: boolean) => void`, plus `<div>` props except `onMouseEnter` / `onMouseLeave` (owned by component).
- **Deps:** `framer-motion`, `cn`.
- **TS note:** imports `JSX` from `'react'` — requires `@types/react` ≥18.3 (standard in React 19). On older types, change to `import type { JSX } from 'react/jsx-runtime'` or replace `JSX.Element[]` with `ReactElement[]`.
- **Tuning:** the `transforms` array is the soul of the effect — different values produce very different vibes.

### `DeleteButton`

Pill that morphs between two states on click: a red "Delete Account" button → a white "Cancel Deletion" button with an undo icon and a 10-second countdown. Heavy framer-motion layout choreography (shared `layoutId`, per-character entrance/exit, AnimatePresence for the countdown digit).

- **Import:** `import DeleteButton from "@/.claude-website-kit/primitives/DeleteButton";`
- **No props.** Labels (`deleteText`, `cancelText`) and palette (`#FE322A` red, `#FFEDF1` pink) are inline consts at the top of the component.
- **Behavior is decorative — no actual delete fires.** When the countdown hits 0 it just sits at 0 forever. Wire your real delete by adding an `onComplete` callback to the `useEffect` (`if (count === 0) onDelete()`) and a prop to control it.
- **New external deps:**
  ```bash
  npm install @hugeicons/react @hugeicons/core-free-icons
  ```
  Used for one icon (`Undo03Icon`). If you'd rather not add Hugeicons just for this, swap to a lucide-react icon (e.g., `Undo2`) — the rest of the component is unchanged.
- **Different motion package:** imports from `motion/react`. Same swap rules as `HeroSection` — install `motion` or change import to `framer-motion`.
- **Theming:** **none** — hardcoded hex colors throughout.

### `Input`

A softened shadcn-style text input — `rounded-lg`, subtle `shadow-sm shadow-black/5`, 3-px focus ring at `ring-ring/20`. Handles `type="search"` (strips webkit search decorations) and `type="file"` (custom segmented button style for the "Choose file" affordance) with conditional class branches.

- **Import:** `import { Input } from "@/.claude-website-kit/primitives/Input";`
- **Props:** all native `<input>` props pass through via `React.ComponentProps<"input">`. `forwardRef` so it works inside form libraries.
- **Deps:** `cn` from `@/lib/utils`. No other libs, no shadcn primitives required.
- **Name collides with shadcn's `Input`** — if the host runs `npx shadcn@latest add input`, alias on import:
  ```tsx
  import { Input as KitInput } from "@/.claude-website-kit/primitives/Input";
  ```
- **No `"use client"` needed** — pure forwardRef.
- **Pairs with `ButtonAlt`** — both share the rounded-lg + softened-shadow aesthetic. Use them together for visual consistency in forms.
- **Theming:** fully theme-aware (uses `border-input`, `bg-background`, `text-foreground`, `text-muted-foreground`, `border-ring` tokens). Inherits any host theme automatically.
- **First form primitive in the kit** — fills a real gap. Pair with native `<label>` for accessibility, or wait for a Form / FormField wrapper in inventory.

### `AnimatedThemeToggler`

A 20×20 icon button that morphs between a sun (rays, small center circle) and a crescent moon (large masked circle) with spring physics. Toggles the `dark` class on `<html>` and optionally plays a soft synthesized click sound (Web Audio API). Self-contained — no shadcn, no lucide, no `cn`.

- **Import:** `import { AnimatedThemeToggler } from "@/.claude-website-kit/primitives/AnimatedThemeToggler";` *(also has a default export)*
- **Props:** `sound?: boolean` (default `true`) — turn off the click sound if you don't want audio.
- **Deps:** `motion` (the rebranded framer-motion). Either install `motion` or change the import to `framer-motion`. Same swap rules as `HeroSection` / `DeleteButton`.
- **Host theme strategy required:** the toggle assumes the dark theme is activated by `class="dark"` on the `<html>` element. The component flips the class directly. Configure Tailwind v4 accordingly (`@variant dark (&:where(.dark, .dark *));` in your CSS, or shadcn's default setup which already uses this pattern). The component also supports `[data-theme="dark"]` for its own internal ink color, so it works under either strategy for its own button color.
- **Module-level audio state:** `_ctx` and `_buf` live at module scope, so multiple instances on the same page share an `AudioContext`. Fine for typical use; the 80 ms `tick` throttle prevents rapid double-clicks from queueing audio.
- **Initial state:** reads `document.documentElement.classList.contains("dark")` in `useEffect` — does **not** check `prefers-color-scheme`. If you want OS-preference-based defaults, set the class server-side or in a layout script before this mounts.
- **TS note:** uses `React.MutableRefObject` (React 18 type). React 19 deprecates this in favor of `React.RefObject`. Under strict React 19 types you may see a warning; safe to change the type when adopting React 19.
- **First render is non-animated:** `isFirst` ref disables the spring on the very first paint so the icon doesn't pop in from a transition.

---

## Widgets

Self-contained interactive UI units. Take props or data, render an interaction.

### `RatingInteraction`

Five-emoji rating widget with hover-preview, grayscale-to-color transition, scale-up on selection, and a label that blur-crossfades between "Rate us" and the selected rating's name.

- **Import:** `import { RatingInteraction } from "@/.claude-website-kit/widgets/RatingInteraction";`
- **Props:** `onChange?: (rating: number) => void`, `className?: string`.
- **Deps:** `cn` only. No third-party packages.
- **Self-contained** — drop into any client tree.

### `RadialOrbitalTimeline`

Full-screen black canvas with a glowing central core and a ring of clickable nodes that auto-rotate around it. Clicking a node freezes rotation, scales the node, expands a Card with details (status badge, date, body, energy meter, related-node links), and pulses related nodes.

- **Import:** `import RadialOrbitalTimeline from "@/.claude-website-kit/widgets/RadialOrbitalTimeline";`
- **Props:** `timelineData: TimelineItem[]`.
  ```ts
  interface TimelineItem {
    id: number;
    title: string;
    date: string;
    content: string;
    category: string;
    icon: React.ElementType;
    relatedIds: number[];
    status: "completed" | "in-progress" | "pending";
    energy: number;  // 0–100
  }
  ```
- **shadcn primitives needed:** `npx shadcn@latest add badge card` (`button` is kit-default).
- **Deps:** `lucide-react` (`ArrowRight`, `Link`, `Zap` — generic icons), shadcn `badge`/`button`/`card`.
- **Hardcoded black/white palette** — doesn't adopt host theme tokens. Edit the JSX if you want themed.
- Container is `h-screen` with `bg-black`; orbit radius hardcoded to 200 px. Use on a full-viewport route.

---

## Visuals

Decorative or scene-filling visual components. Often performance-heavier — use sparingly.

### `SplineScene`

Lazy-loaded wrapper around `@splinetool/react-spline` for embedding interactive 3D Spline scenes. Renders a `.loader` fallback while the scene chunk loads.

- **Import:** `import { SplineScene } from "@/.claude-website-kit/visuals/SplineScene";`
- **Props:** `scene: string` (Spline scene URL), `className?: string`.
- **External deps:** `npm install @splinetool/react-spline @splinetool/runtime`
- **CSS dependency:** the fallback uses `<span className="loader">`. Define `.loader` in `globals.css`:
  ```css
  .loader {
    width: 32px; height: 32px;
    border: 3px solid currentColor;
    border-top-color: transparent;
    border-radius: 9999px;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  ```
- **Note:** Spline scenes are heavy. Use inside a sized container.

### `Component` (lightweight indigo top-gradient overlay — REQUIRES rename on use)

A theme-aware **overlay** that paints a soft indigo radial gradient emanating from the top of its parent (`125% 125% at 50% -50%`). Light mode uses `#c7d2fe` (indigo-200); dark mode uses `#6366f136` (indigo-500 at ~21% alpha). Base is `bg-background` so the area behind the gradient still respects the host theme. The simplest visual in the kit — pure CSS, no canvas, no shaders, no motion.

⚠ **Name is the most generic in the entire kit — `Component`.** You **must** rename to something descriptive (`IndigoTopGradient`, `BackdropIndigo`, `HeroBackdrop`) when copying into a host project. Otherwise a future paste will collide with no recourse.

- **Import (named export):** `import { Component } from "@/.claude-website-kit/visuals/Component";`
- **Positioning:** uses `absolute inset-0 h-full w-full`. **Must be placed inside a positioned parent** (`position: relative`) — otherwise it'll absolute-position relative to the nearest positioned ancestor, which is rarely what you want. Typical use:
  ```tsx
  <section className="relative">
    <Component />          {/* the gradient backdrop */}
    <div className="relative z-10">…actual content…</div>
  </section>
  ```
- **No props.** Gradient color, extent (`125% 125%`), origin (`50% -50%`), and color stops are all hardcoded. The component's real value is as a **code pattern to copy from** — lift the className, retint, drop into your own wrapper.
- **Does NOT accept children.** Render it as a sibling of your content (with `z-10` layering), or refactor to accept `children: React.ReactNode`.
- **Dead imports:** `cn` and `useState` are imported but never used. The `useState(0)` call is unused dead state. Strip all three on adoption.
- **Theming:** **friendly** — uses `bg-background` as base and ships separate light/dark gradient variants via the `dark:` modifier. Adopts host theme automatically.
- **Reusable as a code pattern.** The arbitrary-value Tailwind syntax `[background:radial-gradient(...)]` is the actually-useful artifact. Hand-copy it into any wrapper, change the percentages and color, done. Pairs especially well as a backdrop under heroes.

### `Sketch` (p5.js generative Mondrian — rename on use)

Full-viewport `w-screen h-screen` container hosting a p5.js sketch that draws a recursive Mondrian composition. Click anywhere to regenerate; resizes with the window.

- **Generic name:** the export is just `Sketch`. **Rename to `MondrianSketch` (or the specific subject) when copying into a host project** — otherwise more p5 sketches will collide.
- **Import:** `import { Sketch } from "@/.claude-website-kit/visuals/Sketch";`
- **External dep:** `npm install p5` (modern `p5` ≥1.7 ships its own types; if TS can't find them, also `@types/p5`).
- **Theming:** none — palette hardcoded (red `#D40920`, blue `#1356A2`, yellow `#F7D842`, off-white `#F2F5F1`).
- **Performance:** `p.noLoop()` after initial draw, so CPU is idle except during regenerate (click / resize). p5 is ~1MB minified.
- **SSR safe** — instantiates p5 in `useEffect`, only runs in the browser.

---

## Hooks

### `useCharacterLimit`

State + change handler for a controlled `<input>` or `<textarea>` with an enforced **maximum character count**. Keystrokes that would exceed `maxLength` are silently rejected (the keypress drops). Exposes `value`, live `characterCount`, the bound `handleChange`, and `maxLength` (so consumers can render "42/280" without re-passing the limit).

- **Import:** `import { useCharacterLimit } from "@/.claude-website-kit/hooks/useCharacterLimit";`
- **Signature:**
  ```ts
  useCharacterLimit({ maxLength: number; initialValue?: string }): {
    value: string;
    characterCount: number;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    maxLength: number;
  }
  ```
- **Typical use:** drop into `Input` (or a future `Textarea`) and pair with a small `{characterCount}/{maxLength}` counter below.
  ```tsx
  const { value, characterCount, handleChange, maxLength } =
    useCharacterLimit({ maxLength: 280 });
  return (
    <>
      <Input value={value} onChange={handleChange} />
      <p>{characterCount}/{maxLength}</p>
    </>
  );
  ```
- **No deps.** Pure React.
- **`initialValue` is only read on mount** (it goes into a `useState` initializer). If you pass a value that changes later, the hook won't sync — pull it out and use a controlled flow instead.
- **Hard reject, not truncate:** an over-limit paste of 500 chars into a `maxLength: 100` input drops the entire paste, not just the trailing 400. To truncate instead, fork and replace the conditional with `setValue(newValue.slice(0, maxLength))`.
- **Consumer must be `"use client"`** (uses state); the hook file itself has the directive but the directive on a hook file is a no-op — only components are client/server boundaries.

### `useImageUpload`

Image-upload preview hook. Wires a hidden file input + a clickable thumbnail trigger, manages the `URL.createObjectURL` lifecycle (creates on selection, revokes on remove and on unmount), and exposes the preview URL + filename + handlers.

- **Import:** `import { useImageUpload } from "@/.claude-website-kit/hooks/useImageUpload";`
- **Signature:**
  ```ts
  useImageUpload({ onUpload }?: { onUpload?: (url: string) => void }): {
    previewUrl: string | null;
    fileName: string | null;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleThumbnailClick: () => void;     // programmatically opens file picker
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemove: () => void;             // clears the preview + revokes the URL
  }
  ```
- **Typical use:** spread `fileInputRef` onto a hidden `<input type="file" />`, bind `onChange={handleFileChange}`, attach `onClick={handleThumbnailClick}` to your clickable preview/thumb, and use `previewUrl` as the `src` of an `<img>` once it's set.
- **No deps.** Pure React.
- **Memory-safe:** revokes the object URL both on `handleRemove` and on unmount via the cleanup effect. Don't add your own `URL.revokeObjectURL` calls — they'd double-revoke.
- **Limitations:** single-file only (reads `event.target.files?.[0]`). For multi-file, fork and adapt. No image-type validation, no size limits — add those upstream if needed.
- **Consumer must be `"use client"`** (the hook uses refs/state); the hook file itself doesn't need the directive.

### `useMediaQuery`

Reactive boolean for whether the viewport matches a CSS media query. Subscribes to `matchMedia` changes, returns the current match state.

- **Import:** `import { useMediaQuery } from "@/.claude-website-kit/hooks/useMediaQuery";`
- **Signature:** `useMediaQuery(query: string): boolean`
- **Typical use:**
  ```tsx
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");
  ```
- **No deps.** Pure React.
- **Initial render returns `false`** before the effect runs. If you read it during the first paint (e.g., for an SSR-rendered desktop layout), the initial flash will show the mobile state for a tick. Mitigate by gating critical UI on a separate `mounted` ref, or by accepting the brief flash.
- **Re-evaluates when `query` changes** (the effect re-runs). If `query` is computed inline on every render, you'll churn listeners — memoize the string with `useMemo` if it's expensive.
- **`"use client"` required in consumer** (uses state/effect); the hook file itself doesn't need the directive.

### `usePagination`

Pure pagination range calculator. Given the current page, total page count, and how many page-number buttons to display, returns the array of page numbers and two booleans for whether to show left/right ellipsis (`...`).

- **Import:** `import { usePagination } from "@/.claude-website-kit/hooks/usePagination";`
- **Signature:**
  ```ts
  usePagination({
    currentPage: number,
    totalPages: number,
    paginationItemsToDisplay: number,
  }): { pages: number[]; showLeftEllipsis: boolean; showRightEllipsis: boolean }
  ```
- **Pure despite the `use` prefix** — doesn't call React hooks internally; recomputes on every render. Safe in server and client components.
- **No deps.** Pure TS.
- **Use:** pair with shadcn's `Pagination` (or any custom) to compute which numbered buttons appear alongside Prev / Next. Render `…` markers when the booleans are true.

---

---

## Themes

Drop-in CSS files that redefine the shadcn / Tailwind-v4 color, font, and shadow tokens for an entire host project. **A theme is not a component** — it's a set of CSS variables that everything else (shadcn primitives, kit blocks, your own components) inherits from automatically.

### Applying a theme in a host project

Two paths — pick one:

1. **Import (non-destructive, recommended).** Add this to the top of the host's `app/globals.css`, after `@import 'tailwindcss';`:
   ```css
   @import "../.claude-website-kit/themes/coffee.css";
   ```
   This overrides shadcn's default `:root` / `.dark` blocks without touching the original.

2. **Replace.** Open the host's `app/globals.css`, delete the existing `:root`, `.dark`, and `@theme inline` blocks, and paste the theme file's contents in their place. Cleaner long-term, but you lose easy reversibility.

Both paths require Tailwind v4 + the shadcn theme-variable shape. Tailwind v3 hosts need a different theme structure entirely.

### Per-theme entries

#### `coffee.css`

Warm earth-tone palette — creamy beige background (`#f5f1e6`), coffee-brown primary (`#a67c52`), aged-paper card (`#fffcf5`), warm-dark foreground (`#4a3f35`). The dark variant is a deep espresso (`#2d2621` bg, cream `#ece5d8` text). Vibe: vintage book, café menu, slow web. Serif-leaning.

- **Path:** `@/.claude-website-kit/themes/coffee.css`
- **Font families declared (but not loaded — see below):**
  - `--font-sans: Libre Baskerville, serif` *(note: sans var holds a serif — intentional vintage look)*
  - `--font-serif: Lora, serif`
  - `--font-mono: IBM Plex Mono, monospace`
- **Fonts must be loaded separately by the host project.** Three options:
  - **`next/font` (recommended in Next.js):**
    ```tsx
    import { Libre_Baskerville, Lora, IBM_Plex_Mono } from "next/font/google";
    const libre = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-libre" });
    const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
    const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-ibm" });
    // ...apply className={`${libre.variable} ${lora.variable} ${mono.variable}`} on <html> or <body>
    ```
    Then change the `--font-sans` / `--font-serif` / `--font-mono` in the theme to reference the variables (e.g., `--font-sans: var(--font-libre), serif;`).
  - **Google Fonts `<link>` in `app/layout.tsx`:** drop a stylesheet link tag — simpler but blocks render slightly.
  - **Skip** — if the host doesn't load the fonts, browsers fall back to the second value (`serif` / `monospace`), and the color palette still works.
- **Pairs naturally with [[AnimatedThemeToggler]]:** the toggler flips `class="dark"` on `<html>`, which is exactly the selector this theme's dark block hooks into.
- **Quirks / naming oddities in `@theme inline`:**
  - `--color-radius: var(--radius)` — `radius` is a length (`0.25rem`), not a color. Registered under Tailwind's `color-*` namespace by convention but functionally harmless; you can still use `rounded-[var(--radius)]` if you want.
  - `--color-font-mono` / `--color-font-sans` / `--color-font-serif` — same situation. These map font families into the `color-*` namespace; Tailwind doesn't enforce the value type. If you want true font utilities, separately declare `--font-sans` etc. in `@theme` (they already exist in `:root`).
  - `--color-shadow-*` — six shadow tokens (blur, color, spread, opacity, offset-x, offset-y). These aren't standard Tailwind tokens; you'd need to build a custom shadow utility to consume them, or use them directly in `style={{ boxShadow: ... }}`.

#### `linen.css`

Minimal modern palette — soft off-white background (`#f9f9f9`), near-black foreground (`#202020`), warm cocoa-brown primary (`#644a40`), peach-cream secondary (`#ffdfb5`). Dark mode is deep near-black (`#111111`) with cream foreground (`#eeeeee`) and light peach primary (`#ffe0c2`). Vibe: Vercel-style neutral with warm peach accents. Modern, restrained, readable.

- **Path:** `@/.claude-website-kit/themes/linen.css`
- **No font families declared** — host project's fonts apply unchanged.
- **No shadow tokens** — smaller token set than `coffee.css`.
- **Sidebar tokens included** — works well for dashboard / app layouts as well as marketing sites.
- **Compared to `coffee.css`:** lighter and cooler (off-white vs cream-beige), no serif declaration, no decorative shadow tokens. Pick this when you want a *modern minimal* feel; pick coffee when you want *vintage book*.

#### `harbor.css`

Editorial / nautical palette — cool gray-blue background (`#f5f7fa`), deep navy foreground (`#1a2238`), royal blue primary (`#3a5ba0`), butter yellow secondary (`#f7c873`), cream popovers (`#fffbe6`). Dark mode shifts to a deep midnight blue (`#181a24`) with the yellow staying bright. Vibe: mid-century editorial, a tasteful newspaper, a yacht club's brand book.

- **Path:** `@/.claude-website-kit/themes/harbor.css`
- **One font family declared:** `--font-sans: Libre Baskerville, serif`. Like `coffee.css`, the *sans* slot holds a *serif* — intentional editorial look. Load via `next/font` or skip and let the fallback apply.
- **No shadow tokens.**
- **High-contrast accents** — yellow + navy is a strong pairing; the destructive token in light mode is `#2d1e2f` (a near-black aubergine, *not* red). Be aware: warning/error states using `--destructive` won't be visually loud unless overridden.
- **When to reach for it:** when the brand wants a confident, slightly retro editorial feel. Pairs well with serif-heavy hero copy.

---

## Conventions

- Interactive entries include `"use client"`; pure ones don't. Each entry's notes clarify.
- File names use `PascalCase.tsx` matching the exported component name (default or named).
- Entries are **copy-paste-edit-friendly**: copy a file out of the kit, rename, and modify rather than over-parameterizing the originals. Keep originals generic.
- Where possible, entries use shadcn CSS-variable tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, etc.) so they adopt host themes automatically. Entries that **don't** are flagged with "Theming: none."
- Brand/placeholder copy in any entry is flagged under "Customization points" or "Notes" — read before shipping.

## Adding new inventory

1. Pick a folder by category:
   - Full-viewport landing section → `heroes/`
   - Mid-page section (features, pricing, testimonials, gallery, footer, CTA, FAQ) → `sections/`
   - Small element (button, text effect, badge, input) → `primitives/`
   - Self-contained interactive unit (rating, timeline, chart) → `widgets/`
   - Decorative / scene-filling visual (3D, generative, shader background) → `visuals/`
   - Hook / pure helper → `hooks/`
   - CSS theme / token override (shadcn + Tailwind v4) → `themes/`
   - None of the above → introduce a new top-level folder, update **Structure** and add a new section here.
2. File naming: `PascalCase.tsx` (or `.ts` for non-JSX). For hooks, name starts with `use`.
3. Add an entry under the matching `## <Category>` section with: import line, props (if any), deps to install in host, customization points, theming behavior, performance notes if non-trivial.
4. If a new npm package is introduced, document it under the entry. Do **not** auto-install in the host project unless something actually uses the entry.
