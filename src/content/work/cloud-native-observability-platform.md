---
title: "Cloud-Native Observability Platform"
dek: "Centralised metrics, logs and alerting for containerised workloads across AWS and Kubernetes — provisioned with Terraform so it could be rebuilt from scratch."
order: 1
duration: "~3 months"
period: "2024"
stack: ["Prometheus", "Grafana", "ELK Stack", "Kubernetes", "AWS", "Terraform", "Python"]
outcome: "40% reduction in alert noise"
draft: true
---

## Context

Production ran containerised applications across AWS and Kubernetes, with
monitoring spread across tools that didn't talk to each other. Metrics lived in
one place, logs in another, and the alerting rules that mattered had grown by
accretion rather than design.

> **TODO — Rashi:** two or three sentences of real scale here. How many
> clusters? Roughly how many services or nodes? How many people were on the
> rota? A reader discounts "highly available production infrastructure"
> because it's unfalsifiable; "three EKS clusters, ~60 services, six-person
> rota" is instantly credible. Approximate numbers are fine.

## The problem

Engineers investigating an incident were pivoting between systems by hand to
answer basic questions — is this the app or the node, when did it start, has it
happened before. Every pivot cost minutes during the window where minutes are
expensive, and the alert stream carried enough noise that real signals were
competing with routine chatter for attention.

## Constraints

- Existing workloads could not be disrupted to install instrumentation.
- The platform had to be reproducible, not hand-configured, so it could be
  rebuilt or extended without tribal knowledge.
- It had to serve both the on-call rota and the application teams, who wanted
  different views of the same data.

> **TODO — Rashi:** were there constraints that made this genuinely hard?
> Budget, a migration running in parallel, a compliance boundary on where logs
> could live, a legacy system that couldn't be instrumented? Constraints are
> what turn a description of tools into evidence of engineering judgement, and
> they're the part interviewers dig into.

## What I built

**Metrics.** Prometheus scraping the Kubernetes workloads and the underlying
AWS infrastructure, with recording rules for the queries that dashboards and
alerts hit repeatedly.

**Logs.** The ELK stack as the central log destination, so investigation
happened in one place rather than across per-service log locations.

**Dashboards.** Grafana as the single view over both, organised around the
questions on-call actually asks during an incident rather than around the
systems the data came from.

**Alerting.** Alert rules tuned against real incident history — routing what
needed a human to a human, and suppressing what didn't.

**Provisioning.** Terraform for the infrastructure and Python for the
operational workflows around it, so the whole platform was reproducible and
the recurring operational tasks stopped being manual.

> **TODO — Rashi:** pick the one hard decision you made here and write a
> paragraph on it. Recording rules vs. querying raw? Log retention and index
> lifecycle? Pull vs. push? Why ELK over managed alternatives? One well-argued
> trade-off does more for your credibility than the full feature list above.

## Architecture

> **TODO — Rashi:** a diagram belongs here. It's the single highest-value
> thing you can add to this page. Draw it in [Excalidraw](https://excalidraw.com)
> or [draw.io](https://draw.io), export SVG, drop it in `public/diagrams/`,
> and reference it as `![Observability platform architecture](/diagrams/observability.svg)`.
>
> Keep it honest and generic: scrape targets → Prometheus → Grafana, app logs →
> ELK → Grafana, alerting path out to the on-call channel. No employer-internal
> service names, no hostnames, no account IDs.

## Outcome

Alert noise fell by roughly 40%, which meant the alerts that did fire carried
more weight. Centralising metrics and logs removed the manual pivoting from the
start of every investigation, and the Terraform and Python layer meant the
platform could be extended without rebuilding institutional knowledge each time.

> **TODO — Rashi:** connect this to MTTR if the timing supports it. The résumé
> claims a 25% MTTR reduction — if this platform is what drove it, say so
> explicitly and give the before/after. If the correlation engine drove it
> instead, attribute it there. Don't let the same number float unattached
> across two projects; a careful reader notices.

## What I'd do differently

> **TODO — Rashi:** this section matters more than it looks. It is the clearest
> separator between someone who ran a project and someone who reflected on it,
> and interviewers reliably ask about it. Two or three honest sentences.
>
> Prompts, if useful: did the alert rules drift back toward noise once you
> stopped tuning them? Would you set SLOs first and derive alerts from error
> budget burn, rather than tuning thresholds? Did dashboard sprawl become a
> problem? Was retention sized right?
