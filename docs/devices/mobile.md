---
title: Project management mobile app for iOS and Android
description: Learn how to use Plane's mobile app for iOS and Android to manage your projects on the go.
---

# Plane mobile app

The Plane mobile app brings your projects to your phone on Android and iOS. You can create and track work items, plan with cycles and modules, write pages, triage your Inbox, and chat with Plane AI, all from one place. Stay connected with your team and keep work moving no matter where you are.

This page covers installation, sign-in, and how to find your way around. Each major area has its own guide:

- [Home & navigation](/devices/mobile/home)
- [Work items](/devices/mobile/work-items)
- [Cycles & Modules](/devices/mobile/cycles-and-modules)
- [Pages, Wiki & Collections](/devices/mobile/pages-wiki-collections)
- [Initiatives & Epics](/devices/mobile/initiatives-and-epics)
- [Intake](/devices/mobile/intake)
- [Plane AI](/devices/mobile/plane-ai)
- [Notifications](/devices/mobile/notifications)
- [Account & settings](/devices/mobile/account-and-settings)

## System requirements

| OS      | Version                       |
| ------- | ----------------------------- |
| Android | Android 10 (SDK 29) or higher |
| iOS     | iOS 13 or higher              |

## Download

Head over to [Download](https://plane.so/download) to install the app for Android or iOS.

## Sign in

The app works with Plane Cloud and with self-hosted instances on all plans of the Commercial Edition. For self-hosted instances, we recommend running the latest version. Self-hosted sign-in is supported from version `v1.12.0`.

<!-- TODO confirm: official minimum supported Commercial Edition version for the mobile app. -->

- **For cloud users**  
  Tap **Cloud sign in**. Sign-in opens in your browser, where you continue with your email and a magic code, your password, or an SSO provider such as Google, GitHub, or your company's single sign-on. You return to the app once you are signed in.

- **For self-hosted users**  
  Tap **Self hosted sign in**, enter your Plane app URL, then sign in with your credentials to reach your workspace.

  <div class="mobile-img-container">
    <div class="box">
      <img src="https://media.docs.plane.so/mobile/mobile-self-hosted.webp" alt="Self hosted sign in" width="320" />
    </div>
    <div class="box">
      <img src="https://media.docs.plane.so/mobile/plane-app-url.webp" alt="Enter your Plane app URL" width="320" />
    </div>
  </div>

::: tip
You need a Plane account to sign in. If you do not have a workspace yet, you can create one or accept an invite during setup.
:::

## Set up your workspace

The first time you sign in, the app helps you get ready:

1. **Set up your profile.** Add your full name and, optionally, set a password.
2. **Join a workspace.** Accept any pending invitations to existing workspaces.
3. **Create a workspace.** If you are starting fresh, create a workspace by adding a name, a URL (you can edit the slug), and your organization size.

::: info
Workspace setup and creation on self-hosted instances require Commercial Edition `v1.13.0` or higher.
:::

## Navigate the app

The navigation bar at the bottom of the screen has three destinations, with a **Create** button in the center.

- **Home**  
  Your dashboard. It brings together your Catch-up digest, stickies, favorites, recent items, and quick access to Projects, Wiki, and Plane AI. See [Home & navigation](/devices/mobile/home).

- **Inbox**  
  Your notifications about work items you created, are assigned to, are subscribed to, or were mentioned in. A badge shows your unread count. See [Notifications](/devices/mobile/notifications).

- **Search**  
  Find projects, work items, epics, cycles, modules, and pages from anywhere, with your recent searches close at hand.

- **Create (center button)**  
  Add a sticky, project, page, or work item. What you see depends on your role and your plan.

Tap your **profile picture** at the top of Home to open **Settings**, switch workspaces, or sign out. See [Account & settings](/devices/mobile/account-and-settings).

<!-- TODO screenshot: bottom navigation bar (Home, Inbox, Search) with the center Create button. Upload as media.docs.plane.so/mobile/app-bottom-nav.webp -->

## Feature availability

Some features depend on your plan and, for self-hosted instances, on your server version. Plan tiers match the web app. Check the [pricing page](https://plane.so/pricing) for the latest details.

| Feature                               | Plan                             | Self-hosted from |
| ------------------------------------- | -------------------------------- | ---------------- |
| Work item links and attachments       | Free                             | `v1.7.0`         |
| Create and edit pages                 | Free                             | `v1.7.0`         |
| Join projects                         | Free                             | `v1.7.0`         |
| Update cycles and modules from mobile | Free                             | `v1.7.0`         |
| Wiki (workspace pages)                | <Badge type="info" text="Pro" /> | `v1.8.1`         |
| Stickies                              | Free                             | `v1.9.0`         |
| Epics                                 | <Badge type="info" text="Pro" /> | `v1.9.0`         |
| Comment reactions                     | Free                             | `v1.11.0`        |
| Manage and delete account             | Free                             | `v1.11.1`        |
| Onboarding and workspace creation     | Free                             | `v1.13.0`        |
| Intake                                | Free in-app                      | `v1.13.0`        |
| Enhanced search                       | Free                             | `v1.14.0`        |
| Catch-up                              | Free                             | `v1.15.0`        |
| Initiatives                           | <Badge type="info" text="Pro" /> | Recent versions  |
| Collections                           | <Badge type="info" text="Pro" /> | Recent versions  |
| Plane AI                              | <Badge type="info" text="Pro" /> | Recent versions  |

<!-- TODO confirm: plan tiers and the remaining minimum versions for Initiatives, Collections, and Plane AI against current pricing and the app's feature flags. -->

## Push notifications

::: info
Push notifications are currently available only for Plane Cloud users.
:::

The app supports push notifications to keep you updated on important activity. Turn them on in your device settings when prompted. Once enabled, you are notified about relevant updates so you never miss an important change. To learn what reaches your Inbox, see [Notifications](/devices/mobile/notifications).

## Troubleshooting

### Unable to log in to the mobile app

<div style="color: red">Error: 404 Page Not Found</div>

This error occurs when you try to log in with a self-hosted URL on the Community Edition or an outdated version of the Commercial Edition.

- Ensure your Plane instance is running the Commercial Edition version `v1.12.0` or higher. If you are using an older version, [update to the latest version](https://developers.plane.so/self-hosting/manage/upgrade-plane#prerequisites).

- If you are on the Community Edition, [upgrade to the Commercial Edition](https://developers.plane.so/self-hosting/upgrade-from-community) to access mobile app functionality.

- Retry logging in and ensure the self-hosted URL is entered correctly in the app.

### Sign-in issues on Android

If you are having trouble signing in to the Plane app on your Android device, here are a few steps to get things working.

**Sign-in button does not open the app?**  
Make sure you have a browser such as Chrome, Firefox, or Edge installed on your phone.

**App still not opening, even with a browser installed?**

1. Check which profile the Plane app is installed under, Personal or Work.
2. Make sure the browser is installed in the same profile.

**Browser opens, but sign-in keeps looping?**  
This might be due to default browser settings. Try the following:

1. Open your device's **Settings**.
2. Go to **Apps** or **Default Apps**.
3. Find and tap the browser you are using.
4. Look for an option such as **Clear defaults** or **Reset default app**.
5. Clear the defaults, then try signing in again.

You are prompted to choose a browser. Choose one that is in the same profile as the Plane app.

**Still stuck?**  
Try clearing site data:

1. When the web sign-in page opens, tap the three-dot menu, usually in the top-right corner of the browser.
2. Go to **Settings → Site settings → Clear data**. The wording may vary slightly by browser.
3. Try the sign-in process again.

### Unable to log in using SSO

Ensure the correct redirect URI is configured in your OAuth service:

- For Google Sign-In, add the following URL to the Redirect URIs section in your Google Cloud Console:
  ```bash
  https://<plane.example.com>/auth/mobile/google/callback/
  ```
- For GitHub Sign-In, add the following URL to the Callback URL section in your GitHub OAuth app:
  ```bash
  https://<plane.example.com>/auth/mobile/github/callback/
  ```
  Verify that the `<plane.example.com>` part of the URL matches your self-hosted instance's domain.

### Link not opening the iOS app

If tapping a link opens your browser instead of the Plane iOS app, this is usually related to how iOS handles Universal Links.

**Why this happens**

1. Your default browser may not be Safari.
2. You may have previously opened the web app (`https://app.plane.so`) in your browser, so iOS associates the domain with the browser instead of the app.

**How to fix it**

1. Open the link in Safari.
2. A banner appears at the top that says **Open** and stays for about a second.
3. Tap **Open** before the banner disappears to launch the Plane app.
4. Tap the link from any other app to verify that it now opens the Plane app directly.

### The app says you are offline

The app shows an offline banner when it cannot reach your instance. Check your internet connection and, for self-hosted instances, that your server is reachable. The app retries automatically when the connection returns.

### "Security check failed"

For your safety, the Plane app runs only on genuine, unmodified devices. If you see this screen on a device you trust, make sure your app is up to date and reach out to support so we can take a look.
