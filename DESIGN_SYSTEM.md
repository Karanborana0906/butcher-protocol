# DESIGN_SYSTEM.md — BUTCHER PROTOCOL

Dark-only. Cinematic. Serious. The interface should feel like a classified intelligence command center, not a job portal, not generic AI SaaS, not a hacker terminal, not a game.

---

## 1. Principles

1. **Intelligence, not decoration.** Every glow, scan line or motion must communicate something: scanning, processing, priority, system activity.
2. **Restraint.** Red is a signal color. Use it for emphasis and priority, not as a flood.
3. **Hierarchy through contrast and spacing**, not through heavy effects.
4. **Performance first.** No heavy 3D libraries, no large particle systems.
5. **Original.** No assets, characters, logos or screenshots from any existing franchise.

---

## 2. Color Tokens

Define as CSS variables (or the Tailwind theme equivalent). Dark mode only. Do not build a light theme.

| Token | Value | Use |
|---|---|---|
| `--bg-base` | `#050506` | App background |
| `--bg-surface` | `#0C0C0F` | Cards, panels |
| `--bg-elevated` | `#131318` | Hovered/raised panels, modals |
| `--border-subtle` | `#1F1F26` | Default thin borders |
| `--border-strong` | `#2E2E38` | Hover/focus-adjacent borders |
| `--text-primary` | `#F1F1F3` | Headings, key values |
| `--text-secondary` | `#A3A3AD` | Body text |
| `--text-muted` | `#6B6B76` | Labels, captions |
| `--signal-red` | `#E11D38` | Primary accent, priority, primary CTA |
| `--signal-red-dim` | `#7F1020` | Red borders/backgrounds at low emphasis |
| `--warning-amber` | `#F5A524` | Warnings, medium priority, missing skills |
| `--intel-blue` | `#4C8DFF` | Informational indicators, data accents (use sparingly) |
| `--success-green` | `#2FBF71` | Matched skills, positive status (muted, not neon) |

Rules:

* Glows use the signal red at low opacity (for example 10–25%). No saturated neon.
* Avoid blue-purple SaaS gradients, Matrix green and rainbow accents.
* Ensure text contrast stays readable on dark surfaces.

### Priority and status colors

| State | Color |
|---|---|
| Critical / High priority | `--signal-red` |
| Medium priority / Warning | `--warning-amber` |
| Low priority / Info | `--intel-blue` |
| Matched / Ready | `--success-green` |

---

## 3. Typography

* **Headings, labels, numbers:** Space Grotesk
* **Body and UI text:** Inter
* Provide fallbacks: `system-ui, sans-serif`.

| Style | Font | Size | Notes |
|---|---|---|---|
| Display (hero) | Space Grotesk | clamp(2.5rem, 7vw, 5.5rem) | Bold, wide letter spacing |
| Page title | Space Grotesk | 1.5–2rem | Uppercase, tracking `0.08em` |
| Section label | Space Grotesk | 0.75rem | Uppercase, tracking `0.14em`, `--text-muted` |
| Body | Inter | 0.875–1rem | `--text-secondary` |
| Data / score | Space Grotesk | 1.5–3rem | `--text-primary`, tabular figures |

Labels and system terms are written in uppercase.

---

## 4. Spacing, Shape and Surfaces

* Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64.
* Generous padding on panels (16–24px). Premium, not cramped.
* Border radius: small and sharp. `2px`–`6px`. No pill-shaped cards.
* Borders: 1px, `--border-subtle`. Strengthen to `--border-strong` or red-dim on hover.
* Shadows: layered and subtle. Prefer a soft dark shadow plus an optional faint red glow on priority items.
* Optional corner-bracket or tick-mark details on key panels to suggest an intelligence file. Keep them thin and rare.
* Subtle noise texture over the base background. Keep opacity very low.

---

## 5. Terminology (use consistently)

| Standard term | BUTCHER PROTOCOL term |
|---|---|
| Dashboard | **COMMAND CENTER** |
| Job feed | **INTEL FEED** |
| Jobs | **TARGETS** |
| Saved jobs / database | **TARGET DATABASE** |
| Resume generator | **IDENTITY FORGE** |
| ATS analysis | **PROTOCOL SCAN** |
| Application tracker | **OPERATION STATUS** |
| New job found | **TARGET ACQUIRED** |
| Match analysis section | **MATCH ANALYSIS** |
| Skills section on a job | **SKILL MATRIX** |
| Ready to apply | **OPERATION READY** |
| Resume complete | **IDENTITY READY** |
| Login | **INITIALIZE SESSION** |
| Sign up | **CREATE IDENTITY** |
| Get started CTA | **INITIALIZE PROTOCOL** |
| Learn more CTA | **VIEW INTELLIGENCE** |
| Score label (ATS) | **INTERNAL COMPATIBILITY ESTIMATE** |

Quick actions: `SCAN FOR JOBS`, `FORGE RESUME`, `RUN PROTOCOL SCAN`, `VIEW OPERATIONS`.
Job card actions: `VIEW TARGET`, `FORGE RESUME`, `SAVE TARGET`.

System indicator example: `PROTOCOL ONLINE` (visual state only, not a backend claim).

Mock data should be marked subtly, for example `DEVELOPMENT DATA`.

---

## 6. Components

### Buttons
* **Primary:** `--signal-red` background, white text, uppercase, tracking. Hover: slightly brighter with soft red glow. Active: slight press.
* **Secondary:** transparent, `--border-strong` border, `--text-primary`. Hover: border and background lift.
* **Ghost / tertiary:** text only, muted, hover to primary.
* Always provide visible focus ring and disabled/loading states.

### Cards / Panels
* `--bg-surface`, 1px `--border-subtle`, small radius.
* Hover: raise slightly (translateY −2px to −4px), stronger border, subtle shadow.
* Intelligence panels may have a small uppercase label header and a thin divider.

### Job Card (intel file)
* Header: `TARGET ACQUIRED` label, priority badge.
* Title, company, location, remote/on-site, source, posted date.
* `SKILL MATRIX`: skill chips.
* `MATCH ANALYSIS`: **prominent circular progress ring** with percentage.
* Actions at the bottom: `VIEW TARGET`, `FORGE RESUME`, `SAVE TARGET`.
* Lightweight 3D tilt on hover (small angle, around 4–6 degrees max).

### Progress Ring
* Thin stroke, track in `--border-strong`, value stroke colored by score tier. Animated on mount. Percentage centered in Space Grotesk.

### Badges / Status
* Small, uppercase, 1px border, low-opacity colored background.
* Operation statuses: `SAVED`, `APPLIED`, `INTERVIEW`, `REJECTED`, `OFFER`, each with a distinct but muted color.

### Inputs
* Dark fill, 1px border, uppercase small label above. Focus: red-dim border plus faint glow. Error: red text and border with message. Validation messages must be visible, not color-only.

### Sidebar
* Fixed on desktop, drawer on mobile.
* Items: Command Center, Intel Feed, Target Database, Identity Forge, Protocol Scan, Operation Status, Profile, Settings, each with an icon.
* Active state: red left indicator and brighter text. Hover: surface lift. Smooth transitions.

### Top Bar
* Page title, system status indicator, notification icon, user/profile area.

### Modal
* Elevated surface, backdrop dim with blur kept subtle, fade/scale entrance, close on Esc and backdrop click.

### Resume document (Identity Forge)
* Styled like a confidential document: light-on-dark sheet or dark sheet with thin borders, header strip, small "CONFIDENTIAL"-style label, slight depth and shadow. Remains legible and professional.

---

## 7. Motion (Framer Motion)

Use motion intentionally.

| Effect | Spec |
|---|---|
| Page transition | Fade + 8–12px translate, 200–300ms |
| Widget entrance | Staggered fade-up, 40–80ms stagger |
| Card hover | Lift 2–4px, 150–200ms ease-out |
| Card tilt | Max ~5deg, perspective ~1000px, only on hover, disabled on touch |
| Progress | Animate ring/bar from 0 to value, 600–900ms ease-out |
| Scan line | Single thin red/blue line sweeping a panel during scan states only |
| Floating panels (landing) | Very slow, small amplitude drift (6–10px) |
| Radar / signal | Subtle, slow, low opacity, landing hero only |
| Modal / sidebar | 200–250ms fade/slide |

Rules:

* Easing: ease-out or a gentle custom cubic-bezier. No bouncy springs.
* No distracting infinite loops outside the landing hero and active scan states.
* Respect `prefers-reduced-motion`: disable tilt, scan line and floating drift, keep simple fades.
* Do not use Three.js unless truly necessary.

---

## 8. Landing Page Atmosphere

* Black base, subtle red ambient glow behind the hero, faint noise texture, soft fog gradient.
* Layered intelligence panels at different depths, floating cards with subtle perspective.
* Radar/signal-inspired element, restrained.
* Cinematic lighting via gradients, not images from existing media.

---

## 9. Layout and Responsiveness

* Desktop is the primary presentation target.
* Breakpoints: mobile < 640px, tablet 640–1024px, laptop 1024–1440px, desktop > 1440px.
* Dashboard widgets use a grid that collapses cleanly: 4 → 2 → 1 columns.
* Kanban board scrolls horizontally inside its own container on small screens, never the page body.
* No horizontal page overflow, overlapping text or inaccessible buttons at any breakpoint.
* Touch targets at least 40px.

---

## 10. Accessibility

* Visible focus states on all interactive elements.
* Do not rely on color alone for status. Pair with text or icons.
* Sufficient contrast for text on dark surfaces.
* Respect reduced motion.
* Semantic HTML for navigation, headings and form labels.

---

## 11. Avoid

* Generic SaaS blue/purple gradients
* Excessive glassmorphism
* Matrix-green or hacker terminal looks
* Neon overload and gaming UI
* Heavy particle systems
* Random or constant animations
* Bright light-theme surfaces for the app shell
* Any copyrighted characters, logos, posters or screenshots