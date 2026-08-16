---
title: License errors
description: Troubleshoot Plane license activation errors. Fix common issues with Pro, Business, Enterprise, and Airgapped license keys.
keywords: plane license errors, license activation issues, license troubleshooting, plane license fix, commercial license, self-hosting
---

# Errors related to licenses

This guide is designed to help you resolve common issues encountered while activating the license key for a workspace. Each section includes potential causes and step-by-step solutions for identified problems.

## Before troubleshooting

**Try syncing your plan first.** Many license issues resolve automatically when your workspace pulls the latest subscription information from the Prime server. You can sync your plan from the workspace settings in the Plane application.

If the issue persists after syncing or you see other errors, continue with the specific error troubleshooting below.

## License is invalid

<div style="color: red"> 
    Error: Your license is invalid or already in use. 
</div>

- This issue usually occurs when your server has trouble connecting to ours to verify the license. Try running `prime-cli restart`, and it should resolve the problem.

- If you migrated Plane to a new server without first [delinking the license key](/self-hosting/manage/manage-licenses/activate-pro-and-business#delink-license-key) from the old server, this error might happen. In that case, please reach out to the support team to have the license key delinked. For future reference, if you need to reinstall Plane or move to another server, follow [this guide](/self-hosting/manage/migrate-plane) to ensure a smooth transition.

## Something went wrong

<div style="color: red"> 
    Error: Something went wrong please try again later 
</div>

This error usually occurs when the license validation service is unavailable. Here's how you can troubleshoot it:

1. Confirm that your Plane instance is running the latest version.
2. If it's not up-to-date, [update to the latest version](/self-hosting/manage/upgrade-plane#prerequisites).

Updating typically resolves this issue. If the problem persists, double-check your network connection and any firewall rules that might block access to the license validation service.

## Payment server is not configured

<div style="color: red"> 
    Error: Payment server is not configured
</div>

This usually occurs when the environment confiuration is incorrect. The Env variable `payment_server_url` is missing in the setup. In this case, follow the below steps.

1. Backup the `plane.env` file. See [Backup plane.env](/self-hosting/manage/backup-restore#backup-plane-env).
2. Run `prime-cli repair` to allow Prime CLI to attempt automatic fixes to the `plane.env` file.
3. Try activating your workspace with the license key.
4. If needed, you can configure the instance in [God mode](/self-hosting/govern/instance-admin#settings) or adjust the environment variables directly in the new plane.env file.
