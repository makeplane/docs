---
title: Self-hosting 101
description: What self-hosting Plane involves, how it's licensed, what your team operates, and how to plan a deployment.
keywords: self-hosting plane, plane licensing, plane editions, agpl, commercial edition, airgapped, plane operations
---

# Self-hosting 101

Self-hosting Plane means running the full application stack on infrastructure you control. This page covers what that involves, how Plane is licensed, what your team operates, and how to plan a deployment.

If you're ready to deploy, jump to the [deployment scenarios on the overview](/self-hosting/overview).

---

## 1. What self-hosting Plane means

Self-hosting Plane means deploying Plane, the project and knowledge management platform, on infrastructure you control. Plane ships as a bundled Docker or Kubernetes deployment that includes the application and everything it depends on, so you can stand it up with a single command on a single machine.

Everything user-facing runs inside your network: the web app, the API, file uploads, real-time collaboration, search indexing, and AI inference paths. You control the data, the network path users take to reach Plane, the upgrade timing, the auth provider, and the integrations Plane talks to internally.

For the [Commercial Edition](/self-hosting/editions-and-versions#commercial), Plane operates the license validation server at the [Prime portal](https://prime.plane.so/licenses). The [Airgapped Edition](/self-hosting/editions-and-versions#airgapped) removes that dependency and runs entirely offline.

For production deployments, you can also point Plane at managed services for the database and storage layers (RDS, Cloud SQL, S3, GCS, and similar) instead of running them yourself. See [Plane Architecture](/self-hosting/plane-architecture) for the full system anatomy and [External services](/self-hosting/govern/database-and-storage) for the managed-service options.

---

## 2. Cloud vs self-hosted

| Dimension                         | [Plane Cloud](https://app.plane.so/sign-in) | Self-hosted                                   |
| --------------------------------- | ------------------------------------------- | --------------------------------------------- |
| Time to first user                | About 30 seconds                            | 20mins via Docker                             |
| Data residency                    | US (default), EU available on demand        | Anywhere you deploy                           |
| Network isolation                 | Public internet                             | VPC, private network, or fully air-gapped     |
| Upgrade timing                    | Continuous                                  | You choose your window                        |
| Feature freshness                 | New features ship here first                | Commercial gets them next, Community last     |
| Operational overhead              | Zero                                        | Real and ongoing                              |
| Backups and DR                    | Plane operates                              | You design and operate                        |
| Support escalation                | One vendor                                  | Your platform team first, then Plane support  |
| Compliance posture                | Plane's certifications apply                | Your perimeter, your audit                    |
| Integration with internal systems | Egress only (public APIs)                   | Direct access to private services             |
| Cost model                        | Per-seat subscription                       | Per-seat subscription + On demand             |
| Audit logs, SCIM, advanced auth   | Business Plus                               | Available on plans (Commercial and Airgapped) |

[Cloud and self-hosted migration](/self-hosting/manage/migrate-plane) is supported in the Cloud-to-self-hosted direction.

---

## 3. How licensing works

Plane's licensing has two layers, and confusing them is the most common mistake new self-hosters make.

**The edition is the codebase you run.** There are three self-hosted editions: [Community](/self-hosting/editions-and-versions#community), [Commercial](/self-hosting/editions-and-versions#commercial), and [Airgapped](/self-hosting/editions-and-versions#airgapped). Each has its own release cycle. They are separate codebases, not feature toggles on the same binary.

**The plan is the set of features your license key unlocks** on the Commercial and Airgapped editions. Plans are Free, Pro, Business, and Enterprise Grid. You activate a plan by pasting a license key from the [Prime portal](https://prime.plane.so/licenses) into your workspace settings.

### The three editions

**Community Edition** is open source under [AGPL v3.0](https://github.com/makeplane/plane/blob/preview/LICENSE.txt). Free, no license key, full source available, you can audit and modify it. Feature parity with the Free tier of Cloud, with no Pro, Business, or Enterprise features. To unlock paid features, switch to Commercial. See [Upgrade Community to Commercial](/self-hosting/upgrade-from-community).

**Commercial Edition** is closed-source. It includes a built-in Free tier of 12 user seats per workspace, which means you can run Commercial in production at small scale without buying a license. To unlock Pro, Business, or Enterprise Grid features, you activate a license key. Commercial gets full feature parity with Cloud.

**Airgapped Edition** is the Commercial Edition adapted for environments without internet access. Same features, offline license activation, updates pulled from your own Docker registry. See [Airgapped requirements](/self-hosting/methods/airgapped-requirements).

### How license activation works

License keys come from the [Prime portal](https://prime.plane.so/licenses), which you log into with the email you used to purchase. To activate on a self-hosted instance:

1. Copy the license key from Prime.
2. In your Plane workspace, go to **Workspace Settings > Billing and plans**.
3. Click **Activate this Workspace**, paste the key, click **Activate**.

Each license key is bound to one workspace and one machine. To move it (different server, different workspace, reinstall), use **Delink license key** in Billing and plans, then run `prime-cli restart`, then activate elsewhere. The full procedure is at [Activate Pro and Business](/self-hosting/manage/manage-licenses/activate-pro-and-business).

The **Sync plan** button in Billing and plans pulls the latest subscription state from Prime, including plan type, seat count, expiration, and feature flags. Use it whenever Prime and your workspace disagree.

For Enterprise Grid, see [Activate Enterprise](/self-hosting/manage/manage-licenses/activate-enterprise). For airgapped activation, see [Activate airgapped](/self-hosting/manage/manage-licenses/activate-airgapped) and [Activate airgapped Enterprise](/self-hosting/manage/manage-licenses/activate-airgapped-enterprise).

### When something goes wrong

License-state failures (expiry, seat overflow, key conflicts, network errors during activation) surface as specific errors. The full reference is at [License errors](/self-hosting/troubleshoot/license-errors). Point your operations runbook there, since these are usually fast fixes once you know the symptom.

### AGPL in practice

If you're running the Community Edition, AGPL v3.0 has a few real-world boundaries:

- **Running Community for your internal team.** Fine, no obligations beyond AGPL terms.
- **Modifying Community for internal use.** Fine, AGPL specifically allows this.
- **Hosting Community as a service for external customers.** AGPL requires you to publish your modifications, including any changes you've made.
- **Embedding Community inside a commercial product.** AGPL-affecting territory. Either comply with AGPL's source-disclosure requirements or [talk to sales](https://plane.so/talk-to-sales) about a commercial license.

Most teams self-hosting Plane for internal project management never hit these boundaries. If you're not sure where you sit, ask your legal team or contact us before building anything customer-facing on top of Community.

---

## 4. When self-hosted fits

Self-hosting Plane fits the following scenarios.

**1. Regulatory or contractual data residency.** GDPR with strict country-level residency, sector rules (HIPAA, financial regulations), or customer contracts that specify where data sits. Self-hosting puts data on infrastructure you can point an auditor at.

**2. Air-gapped or sovereign cloud.** Your network has no outbound internet, or you operate in a sovereign cloud where third-party SaaS isn't permitted. The [Airgapped Edition](/self-hosting/methods/airgapped-requirements) is built for this.

**3. Internal-only integrations.** You need Plane to integrate with services that aren't on the public internet: internal Git, internal ticketing, internal SSO, internal monitoring. Self-hosted lives on the same network as the things it talks to.

**4. Upgrade timing control.** Multi-week change windows, frozen periods around financial reporting, change-advisory-board approvals. Self-hosted lets you upgrade on your calendar. See [Upgrade Plane](/self-hosting/manage/upgrade-plane).

---

## 5. What you're running

Plane is a multi-service application: eight application services plus a data layer.

### Application services

- **Web.** The main user-facing Next.js app at your primary domain.
- **Space.** Public-facing project pages (deployed views, intake forms, and similar).
- **Admin.** The admin console for instance-level configuration.
- **Live.** Real-time collaboration backend (Yjs WebSocket server) for pages and work items.
- **API.** The Django REST API that everything else calls.
- **Worker.** Celery background workers for async jobs (notifications, webhooks, exports, AI).
- **Beat.** Celery scheduler that triggers periodic tasks.
- **Migrator.** One-shot DB migration job that runs on each upgrade.

### Data layer

- **Postgres.** Primary database. Holds workspaces, projects, work items, pages, users, and everything transactional.
- **Redis.** Cache, session store, real-time pub/sub.
- **RabbitMQ.** Message broker for the Celery workers.
- **Object storage.** S3-compatible (MinIO, AWS S3, GCS, Azure Blob). File uploads, attachments, exports, and AI artifacts.
- **OpenSearch** _(optional)._ Full-text search index. Without it, search falls back to Postgres-based search.

The full breakdown of versions, ports, resource recommendations, and dependency graph is at [Plane Architecture](/self-hosting/plane-architecture). For the complete environment-variable surface across all services, see [Environment variables](/self-hosting/govern/environment-variables).

---

## 6. What your team operates

### Skills your operators need

- **Container operations.** Docker basics for [Docker Compose](/self-hosting/methods/docker-compose), Kubernetes and Helm if you go [HA](/self-hosting/methods/kubernetes).
- **Postgres operations.** Backups, restores, upgrades, basic tuning.
- **TLS and DNS.** [Custom domains](/self-hosting/govern/custom-domain), [SSL certificates](/self-hosting/govern/configure-ssl), [reverse proxy](/self-hosting/govern/reverse-proxy) configuration.
- **Identity provider setup.** [SAML](/self-hosting/govern/saml-sso), [OIDC](/self-hosting/govern/oidc-sso), [LDAP](/self-hosting/govern/ldap), or OAuth, depending on what your org uses.
- **Object storage operations.** Buckets, lifecycle policies, [private bucket](/self-hosting/govern/private-bucket) configuration.
- **Secrets management.** [External secrets](/self-hosting/govern/external-secrets) integration if you use Vault, AWS Secrets Manager, or similar.

### Time budget

- **Week 1: deploy and stand up.** Pick a [deployment method](/self-hosting/methods/overview), provision infrastructure, install, configure auth, smoke-test. 1 to 3 days of an FTE for Docker Compose, 3 to 7 days for production Kubernetes.
- **Month 1: harden for production.** Backup and restore drill, monitoring, integrations, user onboarding, runbook documentation. Another 3 to 5 days spread across the month.
- **Year 1: operate.** Roughly 4 minor upgrades plus 1 to 2 major upgrades, ongoing patches, capacity planning, and user support escalations. Plan for 0.1 to 0.25 FTE at small scale, 0.5 to 1.0 FTE at large scale.

### On-call and incident response

Self-hosted Plane sits inside your operational perimeter. Decide ownership and escalation before you go live: who's on the rotation, what your internal runbook covers, when you escalate to Plane support. The [troubleshooting docs](/self-hosting/troubleshoot/overview) cover common cases, and your [support tier](/self-hosting/overview#get-help) determines response times when you need to escalate.

---

## 7. What changes between editions

Editions differ in three ways that matter operationally: feature availability, release cadence, and license model.

**Feature availability.** Community has parity with the Free tier of Cloud. Commercial and Airgapped get full parity with Cloud's paid plans (Pro, Business, Enterprise Grid), license-gated.

**Release cadence.** Cloud is the test bed. New features ship there first, then Commercial, then Community. If your team needs the latest features quickly, that affects which edition fits.

**License model.** Community is AGPL with no key. Commercial uses an online license key tied to one workspace and one machine. Airgapped uses an offline license bundle. Edition transitions are supported but generally one-directional in practice. See [Community to Commercial](/self-hosting/upgrade-from-community) and [Community to Airgapped](/self-hosting/manage/community-to-airgapped).

Full feature, version, and codebase comparison: [Plane Editions](/self-hosting/editions-and-versions). Latest changes by edition: [Changelog](https://plane.so/changelog).

---

## 8. Lifecycle: deploy, configure, operate, upgrade

Self-hosting Plane is four phases.

### Deploy

Pick a method, provision infrastructure, install the binary or chart, run the migrator, smoke-test. Hours to days.

Decisions: which [deployment method](/self-hosting/methods/overview), where Postgres and object storage live (managed services or self-run), which domain, which network topology. Changing these later is painful.

### Configure

Authentication, network and TLS, secrets, integrations, and [instance admin](/self-hosting/govern/instance-admin) setup. Days to a week for a hardened production deployment.

[Authentication](/self-hosting/govern/authentication) is often a full day's work. Picking and configuring [Google](/self-hosting/govern/google-oauth), [GitHub](/self-hosting/govern/github-oauth), [SAML](/self-hosting/govern/saml-sso), [OIDC](/self-hosting/govern/oidc-sso), or [LDAP](/self-hosting/govern/ldap), plus the [reset password flow](/self-hosting/govern/reset-password) and [email delivery](/self-hosting/govern/communication), takes most of the configure phase.

### Operate

Day-2 work: user management, monitoring, backups, support, [logs](/self-hosting/manage/view-logs), capacity. Ongoing.

The non-negotiable here is [Backup and restore](/self-hosting/manage/backup-restore). Set it up before users log in. Test the restore path within the first month. A backup you haven't restored from is a backup you don't actually have.

### Upgrade

Plane ships frequently. Minor upgrades every 4 to 8 weeks, majors less often. Each upgrade involves a change window, a backup, the upgrade itself via [Upgrade Plane](/self-hosting/manage/upgrade-plane), and post-upgrade verification.

Skipping upgrades for 6+ months means bigger upgrade-time risk, more breaking changes to handle at once, and missed security patches.

---

## 9. Patterns and anti-patterns

Patterns we've seen repeated across self-hosted deployments.

**Anti-pattern: Postgres in the same Docker container as Plane in production.** Fine for [Docker AIO](/self-hosting/methods/docker-aio) evaluations. In production, you can't snapshot the database independently, you can't scale it, and a container restart is a database restart. Use a managed Postgres or run it in a separate, properly backed-up container. [External services](/self-hosting/govern/database-and-storage) walks through both options.

**Anti-pattern: skipping backups for the first three months.** Backups should be running before the first real user logs in. See [Backup and restore](/self-hosting/manage/backup-restore).

**Anti-pattern: one environment, no staging.** Every upgrade becomes a production incident. A small staging instance, even on a single VM, lets you run upgrades there first.

**Anti-pattern: underestimating object storage growth.** File uploads, page attachments, AI artifacts, and exports add up faster than people expect. Set lifecycle rules early and monitor growth. The [private bucket](/self-hosting/govern/private-bucket) and [database and storage](/self-hosting/govern/database-and-storage) docs cover the basics.

**Anti-pattern: ignoring upgrades for six months or more.** The longer you wait, the bigger the gap, the more breaking changes accumulate, and the more security patches you've missed. Pick a cadence, quarterly minimum.

**Anti-pattern: one person knows the configuration.** Document your specific setup (env vars, IdP configuration, backup destinations, certificate renewal procedure) somewhere your team can find it. The [environment variables reference](/self-hosting/govern/environment-variables) is where to start.

**Pattern that works: managed services for the data layer.** Run Plane application services in containers, but use managed Postgres and managed object storage (RDS, Cloud SQL, S3, GCS). You inherit your cloud provider's backup, scaling, and durability story for the highest-stakes pieces.

**Pattern that works: separate licenses per environment.** A separate license key for staging keeps prod clean and makes upgrade testing realistic.

**Pattern that works: integrate with your existing observability stack.** Ship Plane logs and metrics into whatever you already use rather than inventing monitoring for it. Start with [View logs](/self-hosting/manage/view-logs).

---

## 10. Planning checklist

Before you go to production, have a clear answer to each of these:

1. **Why self-hosting.** The specific reason: data residency, air-gapped network, internal integrations, upgrade control, scale economics, customization.
2. **Owner.** A specific person or team responsible for the system.
3. **Backup and disaster recovery target.** RPO and RTO in concrete numbers.
4. **Upgrade cadence.** Monthly, quarterly, or another rhythm. See [Upgrade Plane](/self-hosting/manage/upgrade-plane).
5. **Escalation path.** Internal on-call rotation and the support tier you escalate to externally.

Once these are settled, head to the [Self-hosting overview](/self-hosting/overview) and pick a deployment scenario.

---

## 11. Next steps

**Try Plane self-hosted.** [Docker AIO](/self-hosting/methods/docker-aio) gives you a single container with embedded services in about 10 minutes (POC only).

**Plan a production deployment.** Read [Plane Editions](/self-hosting/editions-and-versions) to pick your edition. Read [Plane Architecture](/self-hosting/plane-architecture) to plan capacity and network. Then pick a [deployment method](/self-hosting/methods/overview).

**Talk to a human.** [Talk to sales](https://plane.so/talk-to-sales) for pricing, contracts, professional services, and airgapped. [Community Discord](https://discord.gg/plane) for open questions. [GitHub issues](https://github.com/makeplane/plane/issues) for bugs and feature requests.

[**Continue to: Self-hosting overview →**](/self-hosting/overview)
