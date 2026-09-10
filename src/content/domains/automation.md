---
label: "Automation\n& AI"
title: "Automation & Applied AI"
blurb: "Python and generative models turning an alert flood into a ranked, summarised, already-triaged incident."
order: 2
metric: "65%"
metricLabel: "of triage automated"
stack: "Python · GenAI · REST APIs · AWS Lambda"
bg: "#332A66"
ink: "#CDC0FA"
bgDark: "#463B8A"
inkDark: "#DED5FC"
verify:
  - "How correlation actually decides two alerts are related — time window, shared labels, service dependency map, or model inference. The page says time window plus shared labels and topology; correct it to match what you built."
  - "Which model and where it ran (hosted API vs. in-VPC), since interviewers will ask about data handling."
  - "Whether the raw alert list is genuinely always shown alongside the summary."
  - "Whether the 65% figure counts alerts suppressed, alerts auto-grouped, or human minutes saved. Be ready to define it precisely."
  - "What the engine does with a novel failure it has no precedent for."
---

## What this covers

The automation layer between monitoring systems and the people carrying the
pager: the alert correlation engine, plus the Python tooling around health
checks, routine remediation and operational workflows that would otherwise be
somebody's manual checklist.

## The problem worth solving

One fault rarely produces one alert. It produces a burst — the same underlying
problem observed from several angles by several systems, arriving as separate
notifications a human then has to reassemble under time pressure. The first
minutes of an incident get spent on classification rather than diagnosis: which
of these are the same event, which is cause and which is symptom, has this shape
been seen before.

That work is mechanical and repetitive, which makes it a good candidate for
automation — and it is also the work that erodes people over a long rotation,
which makes it worth automating well.

## How the engine works

1. **Aggregate.** Pull alerts from Prometheus and ELK through their APIs into a
   single stream, so correlation has everything in one place.
2. **Deduplicate.** Collapse repeats and near-identical alerts, so one fault
   presents as one thing rather than as forty notifications.
3. **Correlate.** Group alerts that appear to share a cause, using time
   proximity together with the labels and component relationships that say two
   alerts are about the same part of the system.
4. **Enrich.** Attach the context on-call would otherwise go and look for.
5. **Prioritise.** Order what remains so the most consequential item is first.
6. **Summarise.** A generative model writes a short plain-language account of
   what appears to be happening — as a starting point for investigation, never
   as a verdict.

## Where the model sits, and why it matters

**The model is not on the critical path.** The existing alerting route stays
intact and untouched: a page fires whether or not the correlation layer is
healthy, and nothing the model produces decides whether a human gets woken. A
correlation layer that can swallow a real page is worse than no correlation
layer at all.

**The raw alerts stay visible next to the summary.** Language models produce
fluent, confident prose regardless of whether they are right, and a
confident-sounding wrong summary can send an investigation down the wrong path
faster than no summary would. Showing the underlying alerts alongside means the
engineer can check the reasoning rather than inherit it.

**The summary is labelled as machine-generated**, so nobody at 3am mistakes it
for a colleague's assessment.

Most of the value here is not the model. It is the deduplication and correlation
underneath it — deterministic, testable, and responsible for the bulk of the
noise reduction. The model makes the output readable; the pipeline makes it
correct.

## What a team gets on day one

Someone who has shipped a generative feature into an operational path and
thought about the failure modes rather than the demo — and who will tell you
which parts of your alerting are worth automating and which are a process
problem that automation would only entrench.
