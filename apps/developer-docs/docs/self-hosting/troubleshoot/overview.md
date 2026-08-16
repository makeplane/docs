---
title: Troubleshooting
description: Diagnose and resolve issues with your self-hosted Plane instance.
keywords: plane troubleshooting, self-hosted errors, docker logs, plane integration issues, plane debug
---

# Troubleshooting

When something goes wrong, start by identifying which service is affected, then check the relevant logs.

## Identify the service

| Problem area                                                 | Service    | Logs to check      |
| ------------------------------------------------------------ | ---------- | ------------------ |
| API errors, data not saving, 500 errors                      | api        | `plane-api`        |
| License activation or validation errors                      | monitor    | `plane-monitor`    |
| GitHub, GitLab, Slack integrations, imports not working      | silo       | `plane-silo`       |
| SSL errors, 502/504 errors, routing issues                   | proxy      | `plane-proxy`      |
| File uploads or attachments failing                          | minio      | `plane-minio`      |
| Plane AI not working, AI chat errors                         | pi         | `plane-pi`         |
| UI not loading, blank screens, page errors                   | web        | `plane-web`        |
| Public pages or published views not working                  | space      | `plane-space`      |
| Instance settings                                            | admin      | `plane-admin`      |
| Imports stuck, notifications delayed, file processing issues | worker     | `plane-worker`     |
| Scheduled tasks or reminders not running                     | beat       | `plane-beat`       |
| Upgrade failures, database schema errors                     | migrator   | `plane-migrator`   |
| Real-time sync, live cursors, or presence not working        | live       | `plane-live`       |
| Intake Email not working                                     | intake     | `plane-intake`     |
| Search not returning results                                 | opensearch | `plane-opensearch` |

See [View logs](/self-hosting/manage/view-logs) for commands to access logs in Docker deployments.

## Reporting issues to support

When [contacting support](https://docs.plane.so/support/get-help), include:

- **Container logs** for the affected service (see table above)
- **Browser Network logs** (open DevTools → Network tab → reproduce the issue → export as HAR file)

This helps us diagnose the problem faster.

## Common issues

- [Installation errors](/self-hosting/troubleshoot/installation-errors)
- [License errors](/self-hosting/troubleshoot/license-errors)
- [CLI errors](/self-hosting/troubleshoot/cli-errors)
- [Storage errors](/self-hosting/troubleshoot/storage-errors)
