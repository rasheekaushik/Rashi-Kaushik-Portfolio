---
label: "Observability"
title: "Observability"
blurb: "Metrics, logs and dashboards that make production legible. Prometheus, Grafana and ELK across Kubernetes and multiple clouds."
order: 3
metric: "−40%"
metricLabel: "alert noise"
stack: "Prometheus · Grafana · ELK · Zabbix · Datadog"
bg: "#0E4A4D"
ink: "#A6ECDF"
bgDark: "#12666C"
inkDark: "#BFF4EA"
verify:
  - "Whether alerting was genuinely symptom-based / SLO-driven, or still threshold-based on resource metrics. The page claims a move toward symptoms — say what was actually true."
  - "Whether recording rules were used, and for which queries."
  - "How log retention and index lifecycle were configured in ELK, and whether that was your decision."
  - "What the 40% noise reduction was measured against — alerts per week before and after, or something else."
  - "Whether cardinality was ever an active problem you had to solve."
---

## What this covers

The systems that make production answerable: metrics from Prometheus, logs
centralised in ELK, dashboards in Grafana, and the platform-specific monitoring
that sits alongside them — CloudWatch on AWS and the native equivalents on Azure
and OCI, plus Zabbix and Datadog where they were already in place.

Running across more than one cloud is the reason the Prometheus and Grafana
layer earns its place: provider-native monitoring is good at its own provider
and useless at anyone else's, so the cross-cutting view has to live somewhere
neutral.

## How I work

**Instrument for the questions on-call actually asks.** The natural failure mode
of a monitoring project is to collect what is easy to collect and build
dashboards around the data rather than around the problem. The questions that
matter during an incident are narrow and predictable: is this the application or
the infrastructure, when did it start, is it one instance or all of them, has
this happened before. A dashboard that answers those in one screen is worth more
than twenty that are individually impressive.

**Alert on symptoms, not causes.** High CPU is not an incident. A user-facing
request path failing is. Alerting on resource metrics produces a stream of
notifications that are individually true and collectively useless, because most
of them resolve on their own and none of them tell you whether anyone is
affected. Alerts tied to what a user would notice are fewer, and each one is
worth waking someone for.

**Alert fatigue is a design failure, not a people problem.** If a rota is
ignoring a class of alert, that alert is either wrong or not actionable, and the
fix is upstream. Tuning against real incident history — which alerts preceded
genuine incidents, which fired into silence — is how a stream of notifications
becomes a signal.

**Centralise logs, but treat retention as a cost decision.** Logs are the most
expensive telemetry to keep and the most tempting to keep forever. Index
lifecycle and retention deserve to be chosen deliberately, with the trade-off
between investigation depth and storage spend made explicit rather than
discovered on a bill.

**Watch cardinality.** A label that looks harmless — a request ID, a user ID, a
raw URL path — multiplies series count and will eventually take down the
monitoring before it takes down anything else. Monitoring that falls over during
an incident is worse than none, because it fails exactly when it is needed.

## The trade-off I care about most

Coverage and signal pull against each other. It is easy to instrument
everything and end up unable to see anything; it is equally easy to run lean and
be blind during the one failure that matters. The resolution I favour is broad
collection with narrow alerting — gather widely so investigation has material,
but page only on things a person can and should act on immediately.

## What a team gets on day one

Someone who will ask what your alerts have actually caught before adding more,
who reads dashboard sprawl as a symptom rather than as progress, and who has
been on the receiving end of a noisy rota — which is a considerably better
teacher than a monitoring vendor's best-practice guide.
