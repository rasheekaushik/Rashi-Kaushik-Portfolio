---
label: "Platform\n& IaC"
title: "Platform & Infrastructure as Code"
blurb: "Environments that rebuild from code rather than from memory. Terraform, Ansible and Kubernetes across AWS, Azure and OCI, wired into CI/CD."
order: 1
metric: null
metricLabel: null
stack: "Terraform · Ansible · Kubernetes · AWS · Azure · OCI"
bg: "#3D4A1F"
ink: "#D2E3A3"
bgDark: "#516327"
inkDark: "#E4F0C3"
verify:
  - "Whether Terraform state was remote with locking, and where — S3 + DynamoDB is the common pattern but confirm what was actually used."
  - "Whether plan output was posted to merge requests for review, or applied from a runner without that gate."
  - "How secrets were handled — Vault, SSM Parameter Store, GitLab CI variables, something else."
  - "Whether deployments were rolling, blue/green or recreate. The page says rolling."
  - "Whether module reuse was real (shared registry / repo) or copy-paste between environments."
  - "How deep the Azure and OCI work actually goes. Neither résumé mentions OCI and Azure appears only as Azure Functions, so be ready to say what you ran on each — this page claims Terraform across all three."
  - "Whether you used a single Terraform codebase across clouds or separate ones per provider."
---

## What this covers

Provisioning and configuration for production infrastructure across AWS, Azure
and OCI, and the delivery pipelines that put application changes onto it. In
practice that means three things that have to stay in step: the infrastructure
definitions, the configuration applied on top of them, and the pipeline that
promotes a change from a developer's branch to production.

## How I work

**Infrastructure is defined in code and reviewed like code.** Nothing that
matters gets clicked into a console, because a console change leaves no diff, no
author and no way to reproduce the result. Terraform describes the footprint —
on AWS that means VPCs and subnets, IAM roles and policies, EC2 and EKS, S3 and
SNS — and changes arrive as merge requests with a plan attached, so the reviewer
sees what will actually happen rather than what was intended.

**One toolchain across providers.** Terraform and Ansible are the constant; AWS,
Azure and OCI are the variables underneath them. Keeping the workflow identical
across clouds is what stops each provider growing its own bespoke process that
only one person understands — which matters far more than any individual
provider's features.

**Modules over copies.** The fastest way to get environments that drift is to
copy a working directory and edit it. Shared modules with environment-specific
variables mean dev, staging and production differ by their inputs rather than by
accumulated divergence — which is what makes staging a useful signal instead of
a rough approximation.

**Ansible handles what Terraform shouldn't.** Terraform is good at declaring
that a resource exists; it's a poor fit for the ongoing configuration inside
one. Package versions, agent installs, service configuration and the drift that
creeps into long-lived hosts belong to Ansible, run repeatably rather than by
hand.

**Pipelines gate promotion, not just build.** Build and unit tests are the easy
part. The valuable part is what stands between a green build and production:
environment-scoped credentials, an approval where one is warranted, and
deployment steps identical across environments so that a successful staging
deploy is genuine evidence about production.

**Kubernetes workloads are specified, not improvised.** Resource requests and
limits set deliberately rather than left empty — empty requests are how one
noisy service starves its neighbours. Readiness and liveness probes that reflect
whether a service can actually serve traffic. Rolling updates with surge and
unavailability bounded, so a bad release degrades rather than deletes capacity.

## The trade-off I care about most

Infrastructure as code is often sold as speed. The real return is **reviewability
and reproducibility** — being able to answer "what changed, who approved it, and
can we put it back" in minutes rather than in an archaeology session.

That framing changes the decisions. It's why plan output belongs in the merge
request rather than in a runner log nobody opens, why state needs locking before
a second engineer runs an apply, and why an environment that can only be rebuilt
by the person who built it isn't finished yet.

## What a team gets on day one

Someone who will read your existing Terraform before proposing to rewrite it,
who treats a pipeline as production software rather than as glue, and who has
carried the pager for the systems she provisioned — which is the fastest cure
for infrastructure that is convenient to create and miserable to operate.
