/**
 * Single source of truth for the portfolio site AND the resume generator.
 * Every claim here traces back to a verified source: the Canva CV, LinkedIn,
 * the GitHub API, the three technical reports, or the live blog posts.
 * Nothing is invented. Do not add a claim without a source.
 */

/**
 * GitHub Pages serves the site from /<repo>, so absolute paths need the prefix.
 * Next rewrites <Link> and next/image automatically but NOT a raw
 * `<a href="/...">`, which is exactly how the CV download link works, so it is
 * built from this constant instead. Keep in step with `basePath` in
 * next.config.ts; on a root domain both become empty.
 */
const BASE_PATH = "/ikram-portfolio";

export const site = {
  name: "Ikram Aloui",
  title: "Software Engineer",
  tagline:
    "I turn security concepts into real-world implementation across open source, Kubernetes, and the software supply chain, and I write about what I learn.",
  url: `https://aloui-ikram.github.io${BASE_PATH}`,
  locale: "en",
  location: "Boumerdès, Algeria",
  email: "ikramaloui145@gmail.com",
  github: "https://github.com/Aloui-Ikram",
  githubHandle: "Aloui-Ikram",
  linkedin: "https://www.linkedin.com/in/aloui-ikram/",
  linkedinHandle: "in/aloui-ikram",
  resumePath: `${BASE_PATH}/Ikram_Aloui_Resume.pdf`,
  description:
    "Software engineer at 8gears AG working on Harbor, the CNCF-graduated container registry, with a focus on cloud-native and supply-chain security. Merged contributions across Harbor core, Harbor Satellite, and harbor-next covering Cosign signature support, supply-chain hardening, and security audit logging.",
} as const;

export const about = {
  headline: "From full-stack developer to supply-chain security engineer.",
  paragraphs: [
    "I'm a software engineer from Algeria working on cloud-native security. I hold an M.Sc. in Information Systems Security from USTHB, where I specialised in intrusion detection, cloud security, and Zero Trust architecture. For my thesis I built a secure multi-tenant Kubernetes platform from the ground up.",
    "Today I work remotely for 8gears AG in Switzerland on Harbor, the CNCF-graduated container registry. I started as an intern in October 2025 and have been a part-time software engineer since July 2026. In between, I was selected for the competitive CNCF LFX Mentorship (Term 1, 2026) on Harbor Satellite.",
    "My work sits where security meets cloud infrastructure: container registries, AWS, Kubernetes, and the supply chain that connects them. I contribute across Harbor and its ecosystem, including security fixes backported to release branches.",
  ],
  facts: [
    { label: "CNCF", value: "LFX '26", detail: "Harbor Satellite mentee" },
    { label: "Based in", value: "Algeria", detail: "working remotely for Switzerland" },
  ],
} as const;

export type TimelineEntry = {
  id: string;
  period: string;
  role: string;
  org: string;
  orgUrl?: string;
  location: string;
  kind: "education" | "research" | "mentorship" | "work";
  summary: string;
  highlights: string[];
};

export const timeline: TimelineEntry[] = [
  {
    id: "bsc",
    period: "Sep 2020 – Jun 2023",
    role: "B.Sc. in Computer Science",
    org: "USTHB (University of Science and Technology Houari Boumediene)",
    location: "Algiers, Algeria",
    kind: "education",
    summary:
      "Foundations in algorithms, data structures, databases, operating systems, and programming languages.",
    highlights: [
      "Built full-stack web applications with the MERN stack, back in the era of my first portfolio.",
    ],
  },
  {
    id: "msc",
    period: "Sep 2023 – Jul 2025",
    role: "M.Sc. in Information Systems Security",
    org: "USTHB (University of Science and Technology Houari Boumediene)",
    location: "Algiers, Algeria",
    kind: "education",
    summary:
      "Specialised in intrusion detection, cloud security, Zero Trust architecture, and secure system administration.",
    highlights: [
      "Thesis: design and implementation of a Zero Trust solution for cloud-native infrastructure.",
    ],
  },
  {
    id: "cerist",
    period: "Feb 2025 – Jul 2025",
    role: "Cybersecurity Intern, Final Year Project",
    org: "CERIST",
    location: "Ben Aknoun, Algiers, Algeria",
    kind: "work",
    summary:
      "Master's thesis project: co-led the design and implementation of a Zero Trust solution applied to cloud-native infrastructure and applications.",
    highlights: [
      "Deployed Kubernetes micro-segmentation with Cilium/eBPF and mTLS authentication via Istio.",
      "Integrated real-time observability with Prometheus, Jaeger, and Kiali plus dynamic network policies.",
      "Automated DevSecOps workflows: secure CI/CD with Harbor, Trivy, and Cosign, certificate management with cert-manager, and centralised administration through Rancher.",
    ],
  },
  {
    id: "research",
    period: "Aug 2025 – Sep 2025",
    role: "Applied Security Research",
    org: "Independent & CERIST",
    location: "Algeria",
    kind: "research",
    summary:
      "Three in-depth technical reports on supply-chain security, runtime behavioural detection, and service-mesh observability.",
    highlights: [
      "Built every lab environment from scratch on self-managed RKE2 Kubernetes clusters.",
      "Validated each system adversarially: Harbor's policy blocked a vulnerable image from being pulled into the cluster, a simulated command injection was caught at runtime, and a simulated DDoS was measured in real time.",
    ],
  },
  {
    id: "8gears",
    period: "Oct 2025 – Present",
    role: "Software Engineer (part-time), previously Intern",
    org: "8gears AG",
    orgUrl: "https://8gears.com",
    location: "Zurich, Switzerland (Remote)",
    kind: "work",
    summary:
      "Working on Harbor core, Harbor Satellite, and internal tooling. Joined as an intern in October 2025; part-time contractor since July 2026.",
    // Kept to the summary line on purpose: the specifics (Cosign v3, the two
    // disclosed vulnerabilities, release signing) each link to their PR in the
    // Open Source section, so repeating them here was redundant.
    highlights: [],
  },
  {
    id: "lfx",
    period: "Mar 2026 – May 2026",
    role: "LFX Mentee, Harbor Satellite",
    org: "The Linux Foundation / CNCF",
    orgUrl:
      "https://mentorship.lfx.linuxfoundation.org/mentee/4cc1d96f-d169-49ad-b23f-f5cfe60fa3b8",
    location: "Remote",
    kind: "mentorship",
    summary:
      "Selected for the competitive, paid CNCF LFX Mentorship (Term 1, 2026) on Harbor Satellite, the edge companion to Harbor.",
    highlights: [
      "Designed and implemented the security audit logging feature end to end through multiple maintainer review rounds: a structured JSON schema, a pluggable Go Transport interface, and syslog (RFC 5424) + OpenTelemetry (OTLP/HTTP) transports.",
      "Authored the project's K3s reference architecture guide and a SPIFFE/SPIRE deployment walkthrough.",
      "Built the project's Hugo blog infrastructure and published its first three technical posts, including the writeup of the audit logging feature.",
    ],
  },
];

export type PullRequest = {
  number: number;
  title: string;
  url: string;
  what: string;
  impact: string;
  tags: string[];
  featured?: boolean;
};

export type RepoGroup = {
  repo: string;
  url: string;
  blurb: string;
  badge?: string;
  prs: PullRequest[];
};

export const contributions: RepoGroup[] = [
  {
    repo: "goharbor/harbor",
    url: "https://github.com/goharbor/harbor",
    badge: "CNCF Graduated",
    blurb:
      "Harbor is the CNCF-graduated container registry used in production by thousands of organisations. My merged work here includes security fixes backported to the v2.15.0 release branch.",
    prs: [
      {
        number: 22628,
        title: "feat(cosign): Support Cosign v3 Bundle signature format",
        url: "https://github.com/goharbor/harbor/pull/22628",
        what: "Taught Harbor to recognise the Sigstore bundle media type (application/vnd.dev.sigstore.bundle.v0.3+json) that Cosign emits behind --new-bundle-format from v2.6 and by default from v3, so signed images display as signed instead of appearing as unrecognised generic accessories, while leaving the legacy signature format working.",
        impact: "Shipped in Harbor v2.15.0. Closed issue #22401.",
        tags: ["Cosign", "Sigstore", "Go", "Feature"],
        featured: true,
      },
      {
        number: 23463,
        title: "Constrain /registries/ping to the saved URL for existing registries",
        url: "https://github.com/goharbor/harbor/pull/23463",
        what: "Closed a credential-exfiltration hole: a user with only read access could override the URL and TLS settings on a ping-by-id request and trick Harbor into sending a registry's stored credentials, which are never shown to the user, to a server they controlled. Saved connection settings are now authoritative.",
        impact:
          "Security fix. Merged to main and backported to release-2.15.0, with a regression test that fails against the old override behaviour.",
        tags: ["Security", "Credential exfiltration", "Go"],
        featured: true,
      },
      {
        number: 22578,
        title: "Add Cosign keyless signing for Harbor release artifacts",
        url: "https://github.com/goharbor/harbor/pull/22578",
        what: "Added Cosign keyless signing via GitHub OIDC to Harbor's own release pipeline, so every offline and online installer now ships with a verifiable signature bundle users can check before installing.",
        impact:
          "Supply-chain security for the Harbor project itself. First signed releases began with v2.15.0. Closed issue #22367.",
        tags: ["Supply chain", "Cosign", "CI/CD", "OIDC"],
        featured: true,
      },
      {
        number: 23461,
        title: "fix: avoid panic in user audit event resolver on nil event data",
        url: "https://github.com/goharbor/harbor/pull/23461",
        what: "Fixed a panic that would take down the entire Harbor process: a user-API request that matched no user left the audit event data nil, and an unchecked type assertion inside a goroutine with no recover() panicked. Added a checked assertion, a recover() safeguard, and a regression test.",
        impact: "Process-killing crash fix. Backported to release-2.15.0.",
        tags: ["Reliability", "Go", "Audit"],
        featured: true,
      },
      {
        number: 23500,
        title: "Add a size limit for manifest uploads",
        url: "https://github.com/goharbor/harbor/pull/23500",
        what: "Capped manifest uploads at 4 MiB and returned 413 for oversized bodies, so the manifest path no longer buffers an unbounded request body in memory, hardening the registry against memory-exhaustion abuse without affecting legitimate manifests.",
        impact:
          "Resource-exhaustion hardening. Merged to main and backported to release-2.15.0.",
        tags: ["Hardening", "Go"],
        featured: true,
      },
      {
        number: 22896,
        title: "fix: bump Trivy to v0.69.2 following supply chain incident",
        url: "https://github.com/goharbor/harbor/pull/22896",
        what: "Unblocked every Trivy-enabled Harbor build after a supply-chain attack on aquasecurity/trivy deleted all releases between v0.27.0 and v0.69.1, leaving Harbor's download URL returning 404.",
        impact:
          "Incident response: merged two days after the upstream attack, restoring builds on main.",
        tags: ["Supply chain", "Incident response"],
      },
      {
        number: 23225,
        title: "fix: Bump repository update_time on tag and artifact changes",
        url: "https://github.com/goharbor/harbor/pull/23225",
        what: "Made a repository's \"Last Modified\" timestamp update when tags and artifacts are created or deleted, not only on docker push, by adding a Touch() operation to the repository manager and wiring it into the tag and artifact controllers.",
        impact:
          "Targets Harbor v2.16.0. Fixed issue #23149, with unit tests covering the new touch paths in the tag and artifact controllers.",
        tags: ["Bug fix", "Go"],
      },
      {
        number: 23502,
        title: "(cherry-pick) Constrain /registries/ping to the saved URL",
        url: "https://github.com/goharbor/harbor/pull/23502",
        what: "Backported the credential-exfiltration fix (#23463) to the v2.15 release branch.",
        impact: "Ships in a Harbor v2.15.x patch release.",
        tags: ["Backport", "Security"],
      },
      {
        number: 23501,
        title: "(cherry-pick) avoid panic in user audit event resolver",
        url: "https://github.com/goharbor/harbor/pull/23501",
        what: "Backported the process-crash fix (#23461) to the v2.15 release branch.",
        impact: "Ships in a Harbor v2.15.x patch release.",
        tags: ["Backport", "Reliability"],
      },
      {
        number: 23503,
        title: "(cherry-pick) Add a size limit for manifest uploads",
        url: "https://github.com/goharbor/harbor/pull/23503",
        what: "Backported the 4 MiB manifest upload cap (#23500) to the v2.15 release branch.",
        impact: "Ships in a Harbor v2.15.x patch release.",
        tags: ["Backport", "Hardening"],
      },
      {
        number: 22798,
        title: "Fix broken cosign documentation link in signature-verification.md",
        url: "https://github.com/goharbor/harbor/pull/22798",
        what: "Repaired a dead link in Harbor's signature-verification documentation so users can reach the Cosign verification instructions.",
        impact: "Documentation fix following the Cosign signing work.",
        tags: ["Docs"],
      },
    ],
  },
  {
    repo: "container-registry/harbor-satellite",
    url: "https://github.com/container-registry/harbor-satellite",
    badge: "LFX Mentorship",
    blurb:
      "Harbor Satellite brings Harbor to the edge, running a local OCI registry at each site so workloads survive network partitions. This is where my CNCF LFX Mentorship work landed.",
    prs: [
      {
        number: 448,
        title:
          "feat: add audit logging for security events with syslog and OpenTelemetry transports",
        url: "https://github.com/container-registry/harbor-satellite/pull/448",
        what: "Built a structured security audit log across both Ground Control and Satellite, recording logins, user and configuration changes, and authentication failures as canonical JSON events, then shipping them to SIEMs through pluggable syslog (RFC 5424) and OpenTelemetry (OTLP/HTTP) transports.",
        impact:
          "My LFX Mentorship deliverable. Verified end to end against real Wazuh and Splunk stacks, making Harbor Satellite deployments auditable for enterprise security monitoring.",
        tags: ["Security", "Audit logging", "OpenTelemetry", "Go"],
        featured: true,
      },
      {
        number: 352,
        title: "docs: K3s + Harbor Satellite end-to-end reference guide and architecture",
        url: "https://github.com/container-registry/harbor-satellite/pull/352",
        what: "Wrote the project's K3s reference architecture: cloud and edge network topology, the SPIFFE/SPIRE zero-touch registration security model, and two complete setup paths (networked registry mirror and automated air-gap delivery).",
        impact:
          "The project's K3s deployment guide, covering the full cloud-to-edge path; later adapted into a published blog post on the project site.",
        tags: ["Architecture", "K3s", "SPIFFE/SPIRE", "Docs"],
        featured: true,
      },
      {
        number: 360,
        title: "feat(blog): create blog page and publish first 2 posts",
        url: "https://github.com/container-registry/harbor-satellite/pull/360",
        what: "Built the blog section of the project's Hugo site: list and single-post templates, author data, responsive styling, and an authoring workflow guide. Published the first two technical posts.",
        impact:
          "Gave the project a public channel for technical outreach, along with its first content.",
        tags: ["Hugo", "Infrastructure", "Technical writing"],
      },
      {
        number: 359,
        title: "fix: resolve quickstart deployment bugs",
        url: "https://github.com/container-registry/harbor-satellite/pull/359",
        what: "Fixed the four bugs breaking the SPIFFE quickstart docker-compose setup: root-owned volumes and SPIRE sockets that the non-root SPIRE, Ground Control and Satellite containers could not write to, a missing HARBOR_REGISTRY_URL on the satellite service, and a port mapping that published 5050 to container port 8585 when the Zot registry listens on 5000.",
        impact:
          "Closed issue #350, which I filed after hitting these while following the quickstart, and made the external-SPIRE Docker Compose path come up cleanly on a fresh machine.",
        tags: ["Bug fix", "Developer experience"],
      },
    ],
  },
  {
    repo: "container-registry/harbor-next",
    url: "https://github.com/container-registry/harbor-next",
    blurb:
      "harbor-next is 8gears' downstream Harbor distribution, where features are proven before flowing upstream.",
    prs: [
      {
        number: 477,
        title: "docs: Adopt GitHub Private Vulnerability Reporting Workflow",
        url: "https://github.com/container-registry/harbor-next/pull/477",
        what: "Built out harbor-next's private vulnerability reporting process: rewrote SECURITY.md with a supported-versions table and concrete response targets, added a maintainer triage runbook covering intake, a CVSS severity ladder, and embargoed fixes in a private fork, and added a SHA-pinned CodeQL workflow for Go and JavaScript/TypeScript.",
        impact:
          "Built as a reference implementation of goharbor/community#292 for upstream adoption, with design sourced from the Kubernetes, containerd, Argo CD, Trivy, cert-manager, and Grafana security processes.",
        tags: ["Security process", "CodeQL", "Vulnerability disclosure"],
        featured: true,
      },
      {
        number: 27,
        title: "fix: implement cosign signature inheritance for OCI index children",
        url: "https://github.com/container-registry/harbor-next/pull/27",
        what: "Made the child images of a signed OCI index inherit the parent's Cosign signature, so the individual architectures of a multi-arch image stop showing as unsigned in the UI and accessories API.",
        impact:
          "Closed issue #17, so a signed multi-arch image no longer shows its children as unsigned. The fix spans artifact controller model changes and API filtering.",
        tags: ["Cosign", "OCI", "Go"],
        featured: true,
      },
      {
        number: 91,
        title: "fix: add -trimpath to go build flags to prevent local path leaks",
        url: "https://github.com/container-registry/harbor-next/pull/91",
        what: "Added -trimpath to the shared Go build flags in the project's Taskfile, so the Harbor binaries and their log output show module-relative paths instead of the build machine's absolute filesystem paths.",
        impact:
          "Supply-chain hardening, verified with `go version -m` on the built binary and by checking the paths in its runtime log output.",
        tags: ["Supply chain", "Hardening", "Go"],
        featured: true,
      },
      {
        number: 161,
        title: "docs(example/aws-eks-irsa): Update for v2.15.0 release + fix middlware typo",
        url: "https://github.com/container-registry/harbor-next/pull/161",
        what: "Updated the AWS EKS IRSA chart example to the released v2.15.0 public images instead of obsolete cherry-picks and local builds, corrected wrong environment-variable names, and fixed a Helm template helper typo caught by CI.",
        impact: "Full deployment and image push manually validated on AWS.",
        tags: ["AWS", "Helm", "Docs"],
      },
      {
        number: 28,
        title: "fix(devenv): registryctl crashes on startup, missing config file argument",
        url: "https://github.com/container-registry/harbor-next/pull/28",
        what: "Fixed registryctl exiting immediately in the development environment by passing the missing config-file argument in the air live-reload configuration.",
        impact: "Developer-experience fix: dev environments now start cleanly.",
        tags: ["Developer experience", "Bug fix"],
      },
    ],
  },
];

export type Report = {
  id: string;
  title: string;
  date: string;
  context: string;
  summary: string;
  findings: string[];
  tags: string[];
  url: string;
};

/**
 * Labelled "Technical Reports & Applied Research": these are solo-authored
 * technical reports, NOT peer-reviewed publications. Never describe them as
 * published papers.
 */
export const research: Report[] = [
  {
    id: "supply-chain",
    title:
      "Implementing a Secure Software Supply Chain: Container Registry Security with Harbor, RKE2, and Longhorn",
    date: "August 2025",
    context: "Technical report",
    summary:
      "An end-to-end secure software supply chain built on self-hosted Kubernetes: a three-node RKE2 cluster with Longhorn distributed storage backing a Harbor registry wired to Trivy vulnerability scanning, Cosign image signing, and Harbor's deployment security policy. The system was proven in practice: a Python base image that Trivy flagged as critically vulnerable was blocked from deploying, and only ran after I explicitly relaxed the policy.",
    findings: [
      "Automated Trivy scanning on every push, giving feedback before an image can be deployed.",
      "Images signed with Cosign, and the Harbor project configured to block unsigned images from being deployed.",
      "Policy enforcement validated in practice: Harbor refused to serve the vulnerable image, leaving the pod stuck in ImagePullBackOff.",
      "Layered controls throughout: the Harbor CA certificate distributed to every cluster node and client, a scoped robot account for image pulls, and Harbor's built-in operation logs.",
    ],
    tags: ["Harbor", "RKE2", "Trivy", "Cosign", "Longhorn"],
    url: "https://drive.google.com/file/d/1a-R1e_zwp88h6fjtAzTPJ4OcMSpc8Ywd/view",
  },
  {
    id: "bob",
    title: "Hands-On Exploration of 'Bill of Behaviour' (BoB)",
    date: "September 2025",
    context: "Independent technical report",
    summary:
      "A hands-on implementation of the Bill of Behaviour runtime security framework, built from scratch on a self-managed RKE2 cluster after the provided lab environment proved unavailable. I recorded a behavioural baseline for a demo web application with Kubescape, then validated it by launching a simulated command injection that was immediately caught as a deviation from the vendor-defined behavioural contract.",
    findings: [
      "Recorded a vendor-side Kubernetes ApplicationProfile capturing the syscall and file-access rulebook of legitimate behaviour.",
      "A simulated command injection triggered specific alerts ('Unexpected process launched' and 'Unexpected Service Account Token Access') that SBOM-only static analysis would miss entirely.",
      "Traced a superset.sh failure to the way the script handles its own /tmp files on RKE2/Ubuntu, and wrote it up as likely fragility in the script worth feeding back to the project.",
      "Flagged profile portability and robustness across diverse cloud-native environments as the main area for future work.",
    ],
    tags: ["Runtime security", "Kubescape", "ApplicationProfile", "RKE2"],
    url: "https://drive.google.com/file/d/10IMagzMAxF4El00ykzAsOkYsy3L1AEMM/view",
  },
  {
    id: "istio",
    title:
      "From Blind Spots to Full Visibility: Securing and Observing a Cloud-Native Application with Istio Service Mesh",
    date: "September 2025",
    context: "CERIST technical report",
    summary:
      "A security and observability platform for microservices: Istio (demo profile) with Kiali, Prometheus, Grafana, and Jaeger deployed around Google's eleven-service Online Boutique on a hardened RKE2/Rancher cluster, giving full traffic visibility and distributed tracing with zero application code changes. A controlled denial-of-service load test then showed the platform detects and quantifies an attack while it is running.",
    findings: [
      "Sidecar injection instrumented an eleven-service polyglot application (Go, C#, Python, Java, Node.js) without touching source code.",
      "Under a 200-user, 2000+ req/s simulated attack, success rate fell from 99.9% to below 85% and P99 latency rose from ~200 ms to over 5 s.",
      "A custom Prometheus alerting rule moved from PENDING to FIRING within 60 seconds of the attack starting.",
      "Jaeger tracing revealed user-facing traces thinning out as synthetic load dominated the mesh.",
    ],
    tags: ["Istio", "Observability", "Prometheus", "Jaeger", "DDoS"],
    url: "https://drive.google.com/file/d/1f7LvNPHXLVg9ycUN5ASA3jkVtaidklAC/view",
  },
];

export type BlogPost = {
  title: string;
  url: string;
  date: string;
  publication: string;
  summary: string;
  tags: string[];
};

export const blog: BlogPost[] = [
  {
    title:
      "Audit Logging Lands in Harbor Satellite: Security Events over Syslog and OpenTelemetry",
    url: "https://satellite.container-registry.com/blog/2026-07-03-audit-logging-lands-in-harbor-satellite/",
    date: "July 2026",
    publication: "satellite.container-registry.com",
    summary:
      "The security audit log that shipped in Harbor Satellite PR #448, covering both Ground Control and every edge Satellite. Each security-relevant action becomes one line of JSON on a stable 17-field schema where event_type is always {resource_type}.{operation}.{outcome}, so alerting rules can key on it, and config changes carry a field-by-field diff with secrets redacted. Two transports ship: RFC 5424 syslog to a daemon, a network SIEM endpoint, or a rotated local file for air-gapped sites, and OTLP/HTTP to an OpenTelemetry Collector, which closes the gap where SIEMs treat JSON-over-syslog as one opaque blob. Verified end to end against Wazuh, Splunk, and a Grafana Loki dashboard.",
    tags: ["Audit logging", "OpenTelemetry", "Syslog", "SIEM"],
  },
  {
    title: "Hardening Harbor on AWS: Achieving Zero-Static-Secret Architecture",
    url: "https://container-registry.com/posts/hardening-harbor-on-aws/",
    date: "2026",
    publication: "container-registry.com",
    summary:
      "How to remove the long-lived AWS credentials from a Harbor deployment on AWS by replacing the static database password and S3 access keys with ephemeral tokens from RDS IAM Authentication and IAM Roles for Service Accounts. The post identifies the two gaps in upstream Harbor that block this: no support for RDS IAM token authentication (issue #12546) and no IRSA support (issue #12888). It closes them with a pgx beforeConnectHook that fetches a fresh RDS token on every new connection and a distribution v3 upgrade for S3.",
    tags: ["AWS", "IRSA", "RDS IAM", "Secret Zero", "EKS"],
  },
  {
    title: "K3s + Harbor Satellite at the Edge: Full Tutorial (Architecture + 2 Methods)",
    url: "https://satellite.container-registry.com/blog/2026-03-23-k3s-reference-architecture/",
    date: "March 2026",
    publication: "satellite.container-registry.com",
    summary:
      "A reference architecture for running K3s at the edge with Harbor Satellite, placing a lightweight local OCI registry at each site so workloads survive network partitions and metered links. It covers the full cloud-to-edge topology, the SPIFFE/SPIRE security model with zero-touch registration and SVID rotation, and two delivery methods: network mirror and automated air-gap.",
    tags: ["K3s", "Edge", "SPIFFE/SPIRE", "Air-gap"],
  },
  {
    title: "Deploying Harbor Satellite with SPIFFE/SPIRE: A Practical Guide",
    url: "https://satellite.container-registry.com/blog/2026-03-26-deploying-harbor-satellite-spiffe-spire/",
    date: "March 2026",
    publication: "satellite.container-registry.com",
    summary:
      "A step-by-step walkthrough of deploying Harbor Satellite with SPIFFE/SPIRE workload identity: installing central Harbor, starting Ground Control and an edge Satellite, and creating a sync policy to cache images at the edge. It closes with an air-gap proof: with Harbor and Ground Control stopped, image pulls still succeed from the local Satellite cache.",
    tags: ["SPIFFE/SPIRE", "Harbor Satellite", "Offline"],
  },
];

export type Project = {
  name: string;
  description: string;
  url: string;
  tech: string[];
  stars?: number;
  era: "security" | "web";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "harbor-scanner-devguard",
    description:
      "A standalone Go service implementing Harbor's pluggable scanner adapter specification (v1.2). It pulls images with crane, generates CycloneDX and SPDX SBOMs from a single syft pass, signs the CycloneDX SBOM with Cosign, and forwards vulnerability scanning to DevGuard with VEX-enriched results and attestations.",
    url: "https://github.com/Aloui-Ikram/harbor-scanner-devguard",
    tech: ["Go", "SBOM", "Cosign", "VEX", "Harbor API"],
    stars: 3,
    era: "security",
    featured: true,
  },
  {
    name: "bomhort-bridge",
    description:
      "A small proof-of-concept webhook bridge that forwards Harbor SBOM scan results into BOMHort, connecting registry scanning output to downstream bill-of-materials tooling.",
    url: "https://github.com/Aloui-Ikram/bomhort-bridge",
    tech: ["Go", "SBOM", "Webhooks"],
    era: "security",
    featured: true,
  },
  // The Zero Trust thesis project was removed as a card: its link pointed at the
  // Istio observability report, which is a different piece of work and already
  // listed under research. Re-add it here only with a link to the actual thesis.
  {
    name: "Penetration Testing & Security Audit",
    description:
      "A team black-box penetration test of the deliberately vulnerable HackNos OS-Bytesec machine: reconnaissance, SMB exploitation, password cracking, and sudo privilege escalation, written up as a security audit report with prioritised remediation recommendations.",
    url: "https://drive.google.com/file/d/1cg_m1ttSOLlmq6hNIaKYnEBpIXr1FW8d/view",
    tech: ["Pentesting", "Web security", "Reporting"],
    era: "security",
  },
  {
    name: "Offensive & Defensive Security Lab",
    description:
      "An end-to-end red and blue exercise in a virtualised environment: intrusion into a Windows Server, privilege escalation, and then deployment and tuning of a Snort IDS to detect the same attack path.",
    url: "https://drive.google.com/file/d/1VpyNYH2NkGQ_GiZKQldQ0RJEBMGsDM8o/view",
    tech: ["Windows Server", "Privilege escalation", "Snort IDS"],
    era: "security",
  },
  {
    name: "malrik store",
    description:
      "A full-stack e-commerce platform with product catalogue, cart, and card payment, plus a companion admin dashboard for product and order management. The linked repository holds the project screenshots; the source is not published.",
    url: "https://github.com/Aloui-Ikram/malrikecommerce",
    tech: ["React", "Redux", "Express.js", "MongoDB"],
    era: "web",
  },
];

export type SkillGroup = { name: string; skills: string[] };

export const skills: SkillGroup[] = [
  {
    name: "Supply Chain Security",
    skills: ["Cosign", "Sigstore", "SBOM (CycloneDX, SPDX)", "VEX", "Syft", "Trivy", "Attestations"],
  },
  {
    name: "Cloud Native",
    skills: ["Kubernetes", "K3s", "RKE2", "Docker", "Helm", "Rancher", "containerd", "OCI"],
  },
  {
    name: "Identity & Zero Trust",
    skills: ["SPIFFE/SPIRE", "mTLS", "Istio", "Cilium / eBPF", "cert-manager", "OIDC", "RBAC"],
  },
  {
    name: "Languages",
    skills: ["Go", "Python", "TypeScript / JavaScript", "Java", "C", "SQL / PLSQL"],
  },
  {
    name: "AI & Agent Tooling",
    skills: [
      "Claude Code",
      "Gemini",
      "Codex",
      "Multi-agent workflows",
      "Agent task design & evaluation",
      "AI code review",
    ],
  },
  {
    name: "Registries & Platform",
    skills: ["Harbor", "Harbor Satellite", "Zot", "Distribution", "PostgreSQL"],
  },
  {
    name: "Cloud & CI/CD",
    skills: ["AWS (EKS, RDS, S3, IRSA)", "OpenStack", "GitHub Actions", "GitLab", "Ansible", "Hugo"],
  },
  {
    name: "Observability",
    skills: ["Prometheus", "Grafana", "Jaeger", "Kiali", "OpenTelemetry", "Syslog / RFC 5424", "Wazuh", "Splunk"],
  },
  {
    name: "Security Operations",
    skills: ["Vulnerability disclosure", "CodeQL", "Penetration testing", "Snort", "Wireshark", "Metasploit"],
  },
];

export const certifications = [
  {
    name: "Microsoft Azure Fundamentals: Describe Cloud Concepts",
    issuer: "Microsoft",
    date: "Nov 2024",
    url: "https://learn.microsoft.com/fr-fr/users/ikramaloui-3746/achievements/fvpdrrhx",
  },
  {
    name: "Ethical Hacking: Cloud Computing",
    issuer: "Cybrary",
    date: "Oct 2024",
    url: "https://app.cybrary.it/profile/ikramaloui?tab=cert-completion&cert=CC-044c67ee-57a0-4308-8d06-3626aa43bc8f",
  },
  {
    name: "Advent of Cyber 2023",
    issuer: "TryHackMe",
    date: "Dec 2023",
    url: "https://tryhackme.com/certificate/THM-ZGY5SEKQ1R",
  },
] as const;

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "French", level: "Proficient" },
  { name: "English", level: "Fluent" },
] as const;

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Open Source", href: "#open-source" },
  { label: "Research", href: "#research" },
  { label: "Writing", href: "#writing" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
