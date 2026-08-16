---
title: Configure session expiry
sidebar_label: Session expiry
description: Set how long user and admin sessions stay active before requiring re-authentication on a self-hosted Plane instance.
---

# Configure session expiry

Instance administrators can control how long a signed-in session stays valid before the user has to sign in again. This is set from the instance admin panel and applies to everyone on the instance.

## Where to configure it

1. Open the **instance admin panel** (God mode).
2. Go to **System Configurations**.
3. Find the **Session settings** section.

## Settings

There are two independent settings.

| Setting                  | Applies to                                           | Unit  | Default | Minimum |
| ------------------------ | ---------------------------------------------------- | ----- | ------- | ------- |
| **Session expiry**       | Everyone signed in to the Plane app (all workspaces) | Days  | 7 days  | 1 day   |
| **Admin session expiry** | The instance admin panel (God mode) session          | Hours | 1 hour  | 1 hour  |

**Session expiry (days).** How long a user's session to the main Plane app stays valid. This is shared across the whole instance; it is not set per workspace or per user.

**Admin session expiry (hours).** How long a session to the instance admin panel stays valid. This is deliberately shorter than the app session because the admin panel is more sensitive. It applies only to the God-mode admin panel, not to workspace admins or members.

Enter a whole number in each field and save. Values below the minimum are rejected.

## How expiry behaves

**Main app sessions are inactivity-based.** A user's session stays alive as long as they keep using Plane. Each active session's expiry is extended in the background (at most once per day) so active users are not signed out mid-work. A session only lapses after the configured number of days of inactivity.

**Admin panel sessions are an absolute limit.** The admin session is not extended by activity. It expires the configured number of hours after sign-in, regardless of use, and the administrator must sign in again.

In both cases, when a session expires the user is signed out and must re-authenticate to continue.

## Setting it with environment variables

The same two values can also be set with environment variables, which is useful for scripted or reproducible deployments. These are specified in **seconds**.

| Variable                   | Meaning                    | Default (seconds) |
| -------------------------- | -------------------------- | ----------------- |
| `SESSION_COOKIE_AGE`       | Main app session length    | `604800` (7 days) |
| `ADMIN_SESSION_COOKIE_AGE` | Admin panel session length | `3600` (1 hour)   |

A value set in the admin panel is stored as the instance configuration and takes precedence over the environment default.

## Notes

- Session expiry is **instance-wide**. Every workspace and user on the instance shares the same **Session expiry** value; there is no per-workspace or per-user override.
- "Admin session" refers to the **instance admin panel** (God mode), not to workspace Admins or Owners. Workspace admins use the main app session like everyone else.
- Changing these values does not sign out existing sessions immediately; the new length applies as sessions are created or refreshed.
