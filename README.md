# Rashi Kaushik — DevOps / SRE portfolio

> **New here? Read [SETUP.md](SETUP.md) first** — running it locally, what to
> fill in before launch, pushing to GitHub, and pointing the domain. This file
> is the reference for how the project is put together.

Static site, built with [Astro](https://astro.build), deployed to GitHub Pages
by GitHub Actions on every push to `main`.

Design direction is **a service catalogue as an editorial portfolio**. A sticky
column carries her voice; the feed scrolls through jewel-tone cards, one card
per domain she owns. Newsreader / Archivo / IBM Plex Mono.

Both themes are built. Light is the default and the design's home — a warm
blush ground. Dark stays in the same plum family rather than going
neutral-black, and the cards switch to brighter fills so they still read as
blocks. Every text pair in both themes clears WCAG AA.

---

## Running it locally

You need [Node.js](https://nodejs.org) 20.3+ (you have 20.11).

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:4321>. The dev server hot-reloads — save a file and
the browser updates.

Other commands:

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Dev server at `localhost:4321`                  |
| `npm run build`   | Production build into `dist/`                   |
| `npm run preview` | Serve `dist/` locally, to check the real output |

---

## Where things live

```
src/
  site.config.ts        Name, role, contact, domain, metrics, skills.
                        Change values HERE, not in the components.
  content/domains/*.md  The four cards on the home page. Frontmatter drives
                        the card face and its colours; the body is the detail
                        page the card opens. Each file also carries a `verify`
                        list — claims to confirm before an interview. It is
                        never rendered.
  content/work/*.md     Case studies. Currently `draft: true`, so they are not
                        built and not linked. Flip to `draft: false` to
                        publish them at /case-studies/<slug>.
  components/Butterfly  Two variants: one flies in and perches on the name,
                        one keeps circling.
  pages/index.astro     The home page and its three sections.
  pages/work/[slug]     A detail page per domain, at /work/<slug>.
  pages/robots.txt.ts   robots.txt, generated so the sitemap URL tracks
                        site.config.
  pages/resume.astro    The résumé, as a real page. This is the primary
                        version — the PDF is just a convenience download.
  components/Decor      The ambient layer: composes two LeafSpray corners
                        and the drifting leaves, and holds the one <defs>
                        every leaf shape references.
  components/LeafSpray  One corner spray, rendered twice — top-left, and
                        bottom-right flipped a half turn in CSS.
  components/Butterfly  Flies in on load and settles on the end of the name.
  components/Toolkit    The skills pills. Brand logos are inlined at build
                        time from two packages — no CDN, no runtime request.
                        `si:` slugs come from simple-icons, `di:` from devicon
                        (which still carries AWS, Azure, Oracle and PowerShell
                        after simple-icons dropped them over trademarks). An
                        unresolvable slug fails the build rather than shipping
                        a pill with a missing logo.
  pages/work/[...slug]  Renders each case study.
  layouts/Base.astro    Shared page shell: head, floating nav, footer.
  styles/global.css     The whole design system. All colours are CSS variables
                        at the top of the file.
public/
  resume/               One résumé PDF, served at /resume/...
  favicon.svg
```

Built output is seven pages — `/`, `/resume/`, four `/work/<domain>/` pages and
`/404` — plus `robots.txt` and a sitemap.

### Adding a case study

Drop a new `.md` file in `src/content/work/`. Copy the frontmatter block from an
existing one — `title`, `dek`, `order`, `duration`, `period`, `stack`,
`outcome`, `draft`. Set `draft: true` to keep it out of the build while you
write.

---

## Production status

Every page is complete — no placeholder copy anywhere in the built output.
Included: canonical URLs, Open Graph and Twitter meta, JSON-LD `Person`
structured data, a generated `robots.txt` and sitemap, a skip link and `main`
landmark, a real 404, and a print stylesheet.

**Read the `verify` list in each `src/content/domains/*.md` first.** Those pages
describe how Rashi works, written from what the résumés say she did plus the
practice that goes with it. The technical reasoning is sound and defensible, but
several specifics were written as the common shape of that work rather than from
her account of it — the `verify` list names exactly which. She should confirm or
rewrite each one, because an interviewer will ask.

**Still worth adding, in order of value.** None of these block launch, but each
one needs a fact only Rashi has:

1. **Scale numbers.** How many clusters, services, nodes, alerts per day. Right
   now the site says what she did, not how big it was — and "highly available
   production infrastructure" is unfalsifiable in a way a number isn't.
2. **Delivery metrics.** Every figure on the site is reliability-side (−25%
   MTTR, −40% noise, 65% automated). Delivery leads the page but has no number
   behind it: deploy frequency, lead time for changes, and provisioning time
   before/after Terraform would fill the empty slot on the Platform & IaC card.
3. **A public repo.** Neither résumé links any code. A sanitised alert
   correlation engine — synthetic fixtures, the correlation logic, a README —
   would be the most persuasive artifact she owns.
4. **An OG share image.** Links currently preview as text. A 1200×630 PNG at
   `public/og.png` plus one `og:image` meta tag fixes it.

The two case studies are written and sitting at `draft: true` with drafting
notes in them. They go live the day the numbers above exist.

---

## Deploying

### First time

1. Create a repo on GitHub and push this to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source**, choose
   **GitHub Actions**. (Not "Deploy from a branch".)
3. Push. `.github/workflows/deploy.yml` builds and deploys. Watch it in the
   **Actions** tab.
4. The site is live at `https://rasheekaushik.github.io/<repo>/`.

After that, every push to `main` redeploys. No other step.

### Custom domain (GoDaddy)

**1. Set the domain in two places.**

In `src/site.config.ts`, set `domain` to your real domain — it drives canonical
URLs and OG tags:

```ts
domain: "https://rashikaushik.com",
```

In the repo, **Settings → Pages → Custom domain**, enter the same domain
without `https://`, and save.

**2. In GoDaddy's DNS manager**, add four A records for the apex and one CNAME
for `www`:

```
Type    Name   Value                   TTL
A       @      185.199.108.153         600
A       @      185.199.109.153         600
A       @      185.199.110.153         600
A       @      185.199.111.153         600
CNAME   www    rasheekaushik.github.io 600
```

**3. Delete GoDaddy's parked records first.** GoDaddy ships a "coming soon"
page that holds an existing `www` CNAME and usually an `@` A record pointing at
their forwarding IP. If you only *add* records, the parked ones win and the
GitHub DNS check fails with no useful error. This is the step everyone misses.

Check it resolved correctly:

```bash
dig rashikaushik.com +short
```

You should see exactly the four GitHub IPs and nothing else. DNS usually
propagates in minutes but can take up to 24 hours.

**4. Tick "Enforce HTTPS"** in Settings → Pages once the DNS check passes.
GitHub issues the certificate automatically; it can take a few minutes to
appear after the domain verifies.

---

## Notes on choices

- **No phone number on the site.** It's on the résumé PDF, which is the right
  place for it. A phone number on an indexed page collects spam.
- **One résumé, two framings.** The lens switch reframes the same evidence for
  DevOps vs. SRE readers. **Delivery is the default** — change `initial` in
  `src/pages/index.astro` to flip it.
- **The résumé is a page, not a download.** `/resume` is the canonical version;
  the PDF is there for recruiters who ask for a file. Both come from the same
  `src/site.config.ts`, so they can't drift apart on contact details.
- **The page works without JavaScript.** The lens switch is a progressive
  enhancement — the delivery framing renders server-side.
- **Résumé and LinkedIn open in a new tab.** Everything else navigates in
  place. No arrow marker on the labels — the behaviour is announced to screen
  readers by a visually hidden `.sr-only` span instead.
- **Two themes, three states.** No stamp on `<html>` follows the OS;
  `data-theme="light"` and `data-theme="dark"` override it. The toggle sits in
  the nav and remembers the choice in `localStorage`; an inline script in
  `<head>` applies it before first paint, so it never flashes.
- **Cards carry two colour pairs.** The inline style on each card sets
  `--bg-l/--ink-l/--bg-d/--ink-d`, and CSS picks the live pair per theme —
  that's how a media query reaches colours set inline. Values live in
  `domains` in `src/site.config.ts`.
- **Contrast is checked, not eyeballed.** All body and label text clears AA in
  both themes. If you retune a card colour, keep the ink/fill pair above 4.5:1.
- **The ambient layer is decorative and stays out of the way.** Leaves and
  butterfly are `aria-hidden`, `pointer-events: none`, and painted below the
  content, so text is never sitting on top of something it has to fight.
  Colours come from `--leaf-a` / `--leaf-b` with per-theme opacity tokens,
  because low-opacity strokes lose more against a dark ground than a light one.
  The sprays and drifting leaves need the two-column layout, so they stop at
  941px; the butterfly follows the name and shows at every width.
- **Motion degrades sensibly.** Under `prefers-reduced-motion` the drifting
  leaves hide outright — frozen mid-air is worse than absent — and the
  butterfly's flight collapses to its final frame, so it simply starts already
  sitting on the name.
- **The print stylesheet handles paper**, and `/resume` prints cleanly.
- **Logos are monochrome until you hover.** Fifteen brand palettes at full
  saturation would fight the page. To show brand colour at rest instead, change
  `fill: var(--muted)` to `fill: var(--brand, var(--muted))` on `.tool-mark` in
  `global.css`.
- **Zabbix, ServiceNow and OCI render as text pills.** The first two have no
  mark in either package. Oracle has one, but it is a wordmark at roughly
  7.7:1 — it lands about 4px tall beside a 16px icon and reads as a smudge, so
  it is deliberately off. The commented-out line in `site.config.ts` restores
  it. Practices never have a mark either, which is why "Reliability practice"
  is all text.
- **devicon marks carry a cropped `viewBox`.** devicon pads its icons inside a
  square canvas; without cropping to the real ink bounds they render visibly
  smaller than the simple-icons marks beside them. Marks size by height with a
  32px width cap, so wide ones like the AWS wordmark keep their proportions.
- **The floating Astro toolbar was dev-only.** It never appeared in the built
  site. It's now off via `devToolbar: { enabled: false }` in `astro.config.mjs`
  — flip it to `true` if you ever want the audit panel back.
