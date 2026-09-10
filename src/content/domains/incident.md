---
label: "Incident\nResponse"
title: "Incident Response & SLOs"
blurb: "Four years of 24×7 on-call. Triage, escalation, root cause analysis, and the postmortems that stop a problem coming back."
order: 4
metric: "−25%"
metricLabel: "mean time to restore"
stack: "SLI / SLO · RCA · ServiceNow · On-call"
bg: "#6E2542"
ink: "#F6C2D3"
bgDark: "#8C3057"
inkDark: "#FBD7E3"
verify:
  - "Whether postmortems were genuinely blameless in practice, and whether actions had named owners and dates."
  - "Whether error budgets were actually used to arbitrate release decisions, or whether SLOs were reported but not enforced. The page implies the former."
  - "The real severity scale and escalation path — the page describes a common shape, not necessarily yours."
  - "Whether you held incident-commander responsibility formally or in practice."
  - "What the 25% MTTR reduction was measured across — which services, over what period, against what baseline."
---

## What this covers

Four years of 24×7 on-call for enterprise production systems: detection and
triage under time pressure, escalation and stakeholder communication during an
incident, and the root cause analysis, problem management and post-incident
review that come afterwards. Alongside it, the SLI and SLO definitions that
decide what counts as an incident in the first place.

## How I work

**Restore first, diagnose second.** These are different activities and
conflating them costs real minutes. The first question during an incident is
what will make the impact stop — a rollback, a failover, taking a bad node out
of rotation. Understanding precisely why it happened is essential, but it is
work for after service is back, not while customers are affected.

**Say who is running the incident.** The most common way an incident goes badly
is not technical. It is four capable engineers investigating in parallel,
duplicating work, and nobody holding the overall picture or talking to the
people asking for updates. One person coordinating, with communication on a
predictable cadence, beats more hands on the problem.

**Communicate on a schedule, even when there is nothing new.** Stakeholders who
are updated every fifteen minutes stop interrupting the people fixing it.
Silence gets filled with escalation.

**Postmortems are blameless, or they are theatre.** An engineer who expects to
be blamed reports less, and the organisation loses the information it most
needs. The useful question is never who typed the command — it is what made the
command look reasonable, what let the change reach production unnoticed, and
what would have caught it sooner.

**A postmortem without owned, dated actions is a document, not a fix.** The
distinction between a team that has the same incident twice and a team that
does not is almost entirely whether corrective actions got an owner, a date and
follow-through.

**Runbooks earn their place by being used.** A runbook nobody has run since it
was written is a guess. The ones that hold up are the ones exercised during real
incidents and corrected immediately afterwards, while the gap is still obvious.

## On SLIs, SLOs and error budgets

An SLO is only useful if it changes a decision. Reliability targets that get
reported monthly and never influence anything are overhead with a dashboard.

The version that works: pick indicators reflecting what a user actually
experiences — is the request served, is it served in reasonable time — rather
than what is convenient to measure. Set a target that is honest about what the
system delivers today. Then use the remaining error budget as the argument that
settles reliability against feature velocity, so that "should we ship this" has
a number behind it rather than being the loudest opinion in the room.

## What a team gets on day one

Someone who has been woken by the pager enough times to have opinions about
which alerts deserve to do that, who can hold incident coordination while
several people investigate, and who treats a repeat incident as the thing that
actually needs explaining.
