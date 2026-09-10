/**
 * Single source of truth for everything that isn't page content.
 * Change values here rather than hunting through components.
 */

export const site = {
  // ---------------------------------------------------------------------
  // Deployment identity. `domain` must match the custom domain configured at
  // GitHub -> Settings -> Pages, and drives canonical URLs, OG tags and the
  // sitemap. `githubUser` is the www CNAME target.
  // ---------------------------------------------------------------------
  domain: "https://rashikaushik.com",
  githubUser: "rasheekaushik",

  name: "Rashi Kaushik",
  role: "DevOps & Site Reliability Engineer",
  shortRole: "DevOps",
  location: "Gurugram, India",
  employer: "Accenture",
  tenure: "Jul 2022 — present",
  yearsExperience: "4 yrs",

  status: "Open to DevOps, Platform and SRE roles",
  lastReviewed: "September 2026",

  email: "rashikaushik17@gmail.com",
  linkedin: "https://www.linkedin.com/in/rashikaushik",
  github: "https://github.com/rasheekaushik",

  // Deliberately NOT published: phone number. It lives on the résumé PDF,
  // which is the right place for it. A phone number on an indexed page
  // collects spam.

  // The résumé lives at /resume as a real page. The PDF is a convenience for
  // recruiters who ask for a file, not the primary artifact.
  resumePdf: "/resume/rashi-kaushik-resume.pdf",

  education: {
    degree: "B.Tech, Computer Science & Engineering",
    school: "Maharshi Dayanand University, Rohtak",
    detail: "8.0 / 10",
  },
} as const;

/**
 * The two framings. Same four years of evidence, ordered for a different
 * reader. `delivery` is the default — see `initial` in src/pages/index.astro.
 */
export const lenses = {
  reliability: {
    key: "reliability",
    label: "Reliability",
    role: "Site Reliability Engineer",
    summary:
      "I keep production up. Four years on 24×7 on-call for enterprise Kubernetes workloads across AWS, Azure and OCI — incident command, root cause analysis, and the observability that catches a problem before a customer does.",
  },
  delivery: {
    key: "delivery",
    label: "Delivery",
    role: "DevOps Engineer",
    summary:
      "I build the platform other teams deploy on. Infrastructure as code across AWS, Azure and OCI, CI/CD from development through to production, and the automation that takes manual operational work off people's hands.",
  },
} as const;

/**
 * The toolkit, grouped by what the tool is for.
 *
 * `icon` is namespaced by source:
 *   si:<slug>        simple-icons, monochrome, 24x24
 *   di:<dir>/<file>  devicon, monochrome single-path, 128x128
 *
 * devicon pads its icons inside a square canvas, so those entries carry a
 * `viewBox` cropped to the mark's real ink bounds — otherwise they render
 * noticeably smaller than the simple-icons ones beside them.
 *
 * Two sources because simple-icons dropped AWS, Azure, Oracle and PowerShell
 * over trademark claims; devicon still carries them. ServiceNow and Zabbix
 * are in neither, so they render as text pills — as do the practices, which
 * have no mark by definition.
 */
export const systems = [
  {
    group: "Cloud & containers",
    items: [
      { name: "AWS", icon: "di:amazonwebservices/amazonwebservices-plain-wordmark", viewBox: "0.7 26.1 126.6 75.7", hex: "FF9900" },
      { name: "Azure", icon: "di:azure/azure-plain", viewBox: "0.8 4.7 126.4 118.7", hex: "0089D6" },
      // Oracle has no symbol — its logo is a wordmark, ~7.7:1, which lands at
      // roughly 4px tall next to a 16px mark and reads as a smudge. Text pill
      // instead. To use it anyway, restore:
      //   icon: "di:oracle/oracle-original", viewBox: "0.9 55.8 126.1 16.4", hex: "EA1B22"
      { name: "OCI" },
      { name: "Kubernetes", icon: "si:kubernetes" },
      { name: "Docker", icon: "si:docker" },
      { name: "Linux", icon: "si:linux" },
      { name: "EC2" },
      { name: "EKS" },
      { name: "Lambda" },
      { name: "S3" },
      { name: "IAM" },
      { name: "VPC" },
      { name: "SNS" },
    ],
  },
  {
    group: "Infrastructure as code",
    items: [
      { name: "Terraform", icon: "si:terraform" },
      { name: "Ansible", icon: "si:ansible" },
      { name: "Puppet", icon: "si:puppet" },
      { name: "Azure Functions", icon: "di:azure/azure-plain", viewBox: "0.8 4.7 126.4 118.7", hex: "0089D6" },
    ],
  },
  {
    group: "Observability",
    items: [
      { name: "Prometheus", icon: "si:prometheus" },
      { name: "Grafana", icon: "si:grafana" },
      { name: "ELK Stack", icon: "si:elasticstack" },
      { name: "Datadog", icon: "si:datadog" },
      { name: "Zabbix" },
      { name: "CloudWatch" },
    ],
  },
  {
    group: "CI/CD",
    items: [
      { name: "GitHub Actions", icon: "si:githubactions" },
      { name: "GitLab CI", icon: "si:gitlab" },
      { name: "Git", icon: "si:git" },
    ],
  },
  {
    group: "Languages",
    items: [
      { name: "Python", icon: "si:python" },
      { name: "Bash", icon: "si:gnubash" },
      { name: "PowerShell", icon: "di:powershell/powershell-plain", viewBox: "2 17.5 124 93", hex: "5391FE" },
      { name: "REST APIs" },
    ],
  },
  {
    group: "Reliability practice",
    items: [
      { name: "Incident management" },
      { name: "Root cause analysis" },
      { name: "SLI / SLO" },
      { name: "On-call" },
      { name: "Capacity planning" },
      { name: "ServiceNow" },
    ],
  },
] as const;

export type LensKey = keyof typeof lenses;
