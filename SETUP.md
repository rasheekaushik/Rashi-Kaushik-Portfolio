# Setup — start here

Your portfolio site. Everything below takes about 30 minutes end to end, most
of it waiting for DNS.

- **Part 1** — run it on your machine
- **Part 2** — what to fill in before anyone sees it
- **Part 3** — put it on GitHub and turn on deploys
- **Part 4** — point the domain at it

`README.md` has the project reference — file layout, design notes, why things
are the way they are. This file is the walkthrough.

---

## Part 1 — Run it locally

You need [Node.js](https://nodejs.org) 20.3 or newer. Check with `node -v`.

From the project folder:

```bash
npm install
```

```bash
npm run dev
```

Open <http://localhost:4321>. Save any file and the browser updates itself.
`Ctrl+C` in the terminal stops it.

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Dev server on `localhost:4321`             |
| `npm run build`   | Production build into `dist/`              |
| `npm run preview` | Serve the built `dist/`, to check the real output |

> **If `npm run dev` fails with `EPERM ... rmdir node_modules/.vite`** — that is
> OneDrive locking files while it syncs. Run `rm -rf node_modules/.vite` and
> start again. Moving the project somewhere OneDrive does not sync (e.g.
> `C:\dev\portfolio`) stops it happening at all.

---

## Part 2 — Fill these in first

The site is complete and has no placeholder text in it. But some of what it
says about your work was written from your résumés plus the practice that goes
with that work — not from your account of it. **An interviewer will ask about
these**, so read them before the site is public.

### 2a. The `verify` lists

Open each file in `src/content/domains/` and read the `verify:` block at the
top. It is never shown on the site — it exists to point you at the specific
claims to confirm or rewrite.

For example, `automation.md` asks how the correlation engine actually decides
two alerts are related. The page currently says "time proximity together with
the labels and component relationships". If that is not what you built, change
it — that is the first question a senior interviewer will ask.

The one to look at hardest is in `platform.md`: the site says Terraform across
AWS, Azure and OCI. Neither résumé mentions OCI, and Azure appears only as
Azure Functions. Be ready to say what you ran on each.

### 2b. Numbers worth adding

Every figure on the site is reliability-side — MTTR, alert noise, automation
coverage. The Platform & IaC card is the first thing a visitor sees and it has
no number at all, because there is no delivery-side metric anywhere.

Worth digging out of CI history and the ticket system while you still have
access:

- deploys per week, before and after the pipeline work
- lead time from commit to production
- hours to provision an environment, before and after Terraform
- scale: how many clusters, services, nodes, alerts per day

Add the first three to the Platform card in `src/site.config.ts`.

### 2c. Two case studies are written but switched off

`src/content/work/` has full write-ups of the observability platform and the
correlation engine. They are `draft: true`, so they do not build and nothing
links to them. Each has `TODO` blocks marking what only you can supply.

When you have filled those in, set `draft: false` and they publish at
`/case-studies/<name>`.

### 2d. The GitHub link

The site links to `github.com/rasheekaushik` from four places. If that profile
is empty right now, the link draws attention to it rather than helping. One
clean public repo — a sanitised version of the correlation engine would be
ideal — changes what a recruiter finds there.

---

## Part 3 — Put it on GitHub

**1. Create an empty repo** at <https://github.com/new>. Name it whatever you
like (`portfolio` is fine). Do **not** add a README, .gitignore or licence —
this project already has them.

**2. Connect and push.** From the project folder, replacing `REPO`:

```bash
git remote add origin https://github.com/rasheekaushik/REPO.git
```

```bash
git push -u origin main
```

**3. Turn on Pages.** In the repo: **Settings → Pages → Build and deployment →
Source**, choose **GitHub Actions**.

> Choose GitHub Actions, *not* "Deploy from a branch". The branch option
> ignores the workflow and will publish nothing useful.

**4. Watch it build.** The **Actions** tab shows the run. It takes a couple of
minutes. When it is green the site is live at
`https://rasheekaushik.github.io/REPO/`.

From now on every push to `main` redeploys it. There is no other step.

---

## Part 4 — Point the GoDaddy domain at it

**1. Put the domain in the project.** In `src/site.config.ts`:

```ts
domain: "https://yourdomain.com",
```

This drives canonical URLs, the sitemap and `robots.txt`, so it has to be the
real domain — otherwise you are pointing search engines somewhere you do not
own. Commit and push the change.

**2. Tell GitHub.** In the repo: **Settings → Pages → Custom domain**, enter
the domain without `https://`, save.

**3. Delete GoDaddy's parked records first.** This is the step everyone misses.

GoDaddy ships a "coming soon" page, and it holds an existing `www` CNAME and
usually an `@` A record pointing at their forwarding IP. If you only *add*
records alongside those, the parked ones win and GitHub's DNS check fails with
no useful error.

In **GoDaddy → My Products → DNS**, delete the existing `@` A record and the
`www` CNAME. Then add:

```
Type    Name   Value                    TTL
A       @      185.199.108.153          600
A       @      185.199.109.153          600
A       @      185.199.110.153          600
A       @      185.199.111.153          600
CNAME   www    rasheekaushik.github.io  600
```

**4. Check it resolved:**

```bash
dig yourdomain.com +short
```

You should see exactly those four GitHub IPs and nothing else. Usually minutes,
occasionally up to 24 hours.

**5. Tick "Enforce HTTPS"** in Settings → Pages once the DNS check passes.
GitHub issues the certificate itself; it can take a few minutes to appear.

---

## Editing it later

| To change…                  | Edit                                             |
| --------------------------- | ------------------------------------------------ |
| Name, role, contact, domain | `src/site.config.ts`                              |
| The skills pills            | `systems` in `src/site.config.ts`                 |
| The two hero framings       | `lenses` in `src/site.config.ts`                  |
| A card and its detail page  | `src/content/domains/<name>.md`                   |
| The résumé                  | `src/pages/resume.astro`                          |
| The PDF                     | Replace `public/resume/rashi-kaushik-resume.pdf`  |
| Any colour                  | The variables at the top of `src/styles/global.css` |

Commit, push, and the site updates itself.
