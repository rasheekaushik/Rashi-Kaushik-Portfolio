---
title: "AI-Assisted Alert Correlation Engine"
dek: "Aggregates, deduplicates, enriches and prioritises alerts from ELK and Prometheus, and hands on-call a written incident summary instead of a wall of notifications."
order: 2
duration: "~2 months"
period: "2024"
stack: ["Python", "GenAI / LLM", "Prometheus", "ELK Stack", "REST APIs"]
outcome: "65% of alert processing automated"
draft: true
---

## Context

A single underlying fault rarely produces a single alert. It produces a burst —
the same problem observed from several angles by several systems, arriving as
separate notifications that a human then has to mentally reassemble under time
pressure at three in the morning.

> **Note to self (delete before launch):** this is the project that most
> distinguishes the profile — plenty of engineers have tuned alert thresholds,
> far fewer have built a system that reasons about them. Give it the most
> space, and lead with it in interviews.

## The problem

On-call was spending the first minutes of an incident on classification rather
than diagnosis: which of these forty notifications are the same event, which is
the cause and which are symptoms, has this shape been seen before. That work is
mechanical, repetitive, and exactly the kind of thing that erodes people over a
long rotation.

> **TODO — Rashi:** the concrete number here is worth finding. Roughly how many
> alerts per day were reaching a human before this existed? Even an approximate
> figure — "around 400 a day, of which maybe 30 were distinct events" — turns
> this from a plausible story into a measured one.

## Constraints

- It had to sit alongside the existing alerting path, not replace it. A
  correlation layer that can drop a real page is worse than no correlation
  layer.
- LLM output is probabilistic. Nothing it produced could be load-bearing for
  the decision to wake someone up.
- It had to work against the alert sources already in place — Prometheus and
  ELK — through their APIs.

## What I built

A Python service that sits between the alert sources and the humans:

1. **Aggregate.** Pull alerts from Prometheus and ELK through their REST APIs
   into one stream.
2. **Deduplicate.** Collapse repeated and near-identical alerts so one fault
   presents as one thing.
3. **Correlate.** Group alerts that appear to share a cause, by time window and
   by the relationships between the affected components.
4. **Enrich.** Attach the context on-call would otherwise go looking for.
5. **Prioritise.** Order what's left so the most consequential item is first.
6. **Summarise.** Use a generative model to write a short plain-language
   summary of what appears to be happening — a starting point for
   investigation, not a verdict.

> **TODO — Rashi:** step 3 is the interesting one and it's currently vague.
> How does correlation actually decide two alerts are related? Time proximity?
> Shared labels or namespace? A dependency graph? Something the model infers?
> This is the question a senior interviewer will ask first, and the answer is
> the technical core of the project.

> **TODO — Rashi:** say something about the guardrails. How do you keep a
> confident-sounding wrong summary from misdirecting an investigation? Is the
> raw alert list always shown alongside? Is the summary clearly labelled as
> machine-generated? Handling that well is a mark of judgement — most people
> building LLM features in 2026 skip it, and saying so out loud reads as senior.

## Architecture

> **TODO — Rashi:** diagram. Prometheus and ELK → collector → dedup → correlate
> → enrich → LLM summariser → on-call channel, with the existing direct
> alerting path drawn alongside so it's visible that the critical path was
> never routed through the model. Export SVG to `public/diagrams/`.

## Outcome

Around 65% of alert processing that previously required a person now happens
automatically. On-call opens an incident with a grouped, prioritised, annotated
view rather than a raw notification feed.

> **TODO — Rashi:** two things to add. First, the human outcome — did people on
> the rota say it was better? That's legitimate evidence and it lands.
> Second, the résumé's "50% reduction in recurring incidents" — if this engine
> is what surfaced the repeat patterns that led to permanent fixes, that's a
> strong claim and it belongs here, spelled out.

## What I'd do differently

> **TODO — Rashi:** honest reflection. Where does the correlation get it wrong?
> What happens during a genuinely novel failure with no precedent? Is the model
> cost per incident sensible at higher alert volumes? Would you evaluate
> correlation quality against labelled incident history rather than by feel?

---

> **TODO — Rashi (highest value item on the whole site):** publish a sanitised
> version of this as a public repository. Neither résumé links a single line of
> code, while both list GitHub and GitLab as skills — that gap is doing real
> damage. A clean repo with a synthetic alert fixture, the correlation logic,
> a README explaining the design, and no employer data would be the most
> persuasive artifact you own. It's also the thing an interviewer can read
> before the call.
