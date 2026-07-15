---
title: Project management mobile app for iOS and Android
description: Learn how to use Plane's mobile app for iOS and Android.
---

# Plane Mobile App

The Plane mobile app puts your work in your pocket.

Create and update work items, comment and mention teammates, track cycles, and stay on top of notifications from your phone. It is available for iOS and Android, and works alongside the web app: anything you change on mobile syncs to the web and everywhere else you use Plane.

This page covers what is specific to mobile: getting the app, signing in, finding your way around, and managing notifications.

## System requirements

| Platform | Minimum version               |
| -------- | ----------------------------- |
| iOS      | iOS 14.0 or later             |
| Android  | Android 10 or later (SDK 29+) |

**Editions and plans**

- Available on **Plane Cloud** and **self-hosted Commercial Edition** (from version `v1.12.0`).
- Supported on **all plans, including Free**.

## Download and install

Head over to [Download](https://plane.so/download) to install the app for Android or iOS.

Once installed, open the app and sign in to your workspace.

## Sign in

You can sign in to the mobile app with the same credentials you use on the web.

Here’s how you can get started:

- **For cloud users**  
  Tap **Cloud sign in** and enter your credentials to log in.

- **For self-Hosted users**  
  Tap **Self hosted sign in**, then enter your Plane app URL. Once that’s done, log in with your credentials to access your workspace.

  <div class="mobile-img-container">
    <div class="box">
      <img src="https://media.docs.plane.so/mobile/mobile-self-hosted.webp" alt="Home" width="320" />
    </div>
    <div class="box">
      <img src="https://media.docs.plane.so/mobile/plane-app-url.webp" alt="Projects" width="320" />
    </div>
  </div>

## Switching workspaces

To switch between different workspaces, simply tap your workspace icon in the top left corner on the Home page and switch between them from the workspace switcher. Your data, projects, and notifications update to reflect the selected workspace.

The app is built around a bottom bar with three tabs and a floating **+** create button.

## Get around the app

### The three tabs

- Home - your starting point for the workspace.
- Inbox - your notification center, with an unread badge.
- Search - search across the workspace for projects, work items, cycles, modules, pages, and more.

### Create

Tap the floating **+ Create** button to add new content from anywhere. Depending on your role and enabled features, you can create a project, work item, a page, or a sticky.

### Home

Home mirrors the web and is organized into sections you can rearrange or hide (tap Manage widgets icon next to your profile to customize).

At the top of Home is a row of quick-access tiles for Plane's products, mirroring the web. Tap a tile to open that product:

- **Projects** — always available. Your projects and everything inside them: work items, cycles, modules, and pages. This is where most of your day-to-day work happens.
- **Wiki** — your workspace's knowledge base of pages, kept separate from any single project. Appears when Wiki is enabled and you have permission to edit.
- **Plane AI** — the Pi assistant, for chatting, asking questions about your work, and picking up your AI threads. Appears when AI is enabled for your workspace.

Below the tiles are sections you can rearrange or hide.

- Your work - assigned work items and pages you have created
- Recent activity - projects, cycles, modules, pages, and work items you've opened recently
- Favorites - the projects and items you've starred
- Stickies - your quick notes (when enabled)

The Home header also holds the workspace switcher and a catch-up card.

### Gestures

- Pull down to refresh a list or screen.
- Tap a work item to open its detail view.
- Swipe on some list items for quick actions. <Badge type="info" text="Coming soon" />
- Long-press and drag to reorder items where supported.

### Appearance

The app supports Light, Dark, and System themes. System follows your device's appearance setting automatically.

## Work on the go

The mobile app supports the core of your day-to-day work. Each area links to its full documentation.

### Work items

Create work items and edit their properties. Open a work item to manage its sub-work items, links, attachments, and more.
See [Work items][/core-concepts/issues/overview].

### Comments and mentions

Comment on any work item and @mention teammates to notify them. React to comments. Comments and mentions sync across web and mobile.
See [Comments and mentions][/communication-and-collaboration/comments-and-activity].

### Cycles and modules

View cycles and modules, open them to see their work items, and add or move work items between them.
See [Cycles][/core-concepts/cycles] and [Modules][/core-concepts/modules].

### Pages

Read and edit pages in the mobile editor, with rich-text formatting, images, and more.
See [Pages][/core-concepts/pages/overview].

### Intake

Review and manage incoming work items from intake.
See [Intake][/intake/overview].

## Notifications

Notifications are where the mobile app is especially useful, letting you respond to what needs your attention without opening your laptop.

### Push notifications

::: info
Push notifications are currently available only for Plane Cloud users.
:::

The app sends push notifications for events that involve you, such as new assignments, comments, and mentions on work items, epics, and intake items. Notifications appear on your device's lock screen and update your app badge count.

Push notifications are delivered through your device's native system (Apple Push Notification service on iOS, Firebase Cloud Messaging on Android). To receive them, allow notifications for Plane when the app first asks, or enable them later in your device settings.

### Managing notification preferences <Badge type="info" text="Coming soon" />

Control which notifications you receive from your notification settings in the app. Adjust these to reduce noise or focus only on what matters most to you.

### The Inbox

Open the Inbox tab to read notifications and tap to jump to the item; mark as read and filter your inbox (e.g. unread, snoozed, or archived only). Your inbox stays in sync across mobile and web.

Your notification inbox stays in sync across mobile and web.

See [Notifications](/communication-and-collaboration/notifications).

## Home-screen widgets and shortcuts (iOS)

On iOS/iPadOS, add Plane widgets for one-tap capture: Create Work Item and Create Page. You can also long-press the app icon for Quick Actions.

:::info
Home-screen widgets are not available on Android yet, but coming soon. We'll also be adding more widgets.
:::

## What's different on mobile

The mobile app focuses on the work you are most likely to do away from your desk. Some capabilities available on the web are not present on mobile, or work differently.

Feature availability also depends on your plan. Features such as Wiki and AI capabilities appear in the app only when they are enabled for your workspace.

## Privacy and security

- Privacy Screen - blurs the app's contents in the app switcher and background so sensitive work isn't visible in previews. Enable it in your Profile settings.
- Device integrity - Plane doesn't run on jailbroken or rooted devices.
- Secure storage - all sensitive data is securely stored using the Android Keystore and iOS Keychain.

## Offline and syncing

The app caches recently viewed data so those screens load quickly and stay viewable when your connection drops. Editing requires a connection - there is no offline edit queue. When back online, pull to refresh to sync.

## Troubleshooting

### Unable to log in to the mobile app

<div style="color: red">Error: 404 Page Not Found</div>

This error occurs when attempting to log in to the mobile app with a self-hosted URL on the Community Edition or an outdated version of the Commercial Edition.

- Ensure your Plane instance is running the Commercial Edition version `v1.5.0` or higher. If you are using an older version, [update to the latest version](https://developers.plane.so/self-hosting/manage/upgrade-plane#prerequisites).

- If you are on the Community Edition, [upgrade to the Commercial Edition](https://developers.plane.so/self-hosting/upgrade-from-community) to access mobile app functionality.

- Retry logging in and ensure the self-hosted URL is entered correctly in the app.

### Sign-in issues on Android

If you're having trouble signing into the Plane app on your Android device, here are a few steps you can follow to get things working:

**Sign-in button doesn’t open the app?**  
Make sure you have a browser (like Chrome, Firefox, or Edge) installed on your phone.

**App still not opening, even with a browser installed?**

1. Check which profile the Plane app is installed under — Personal or Work.
2. Make sure the browser is also installed in the same profile.

**Browser opens, but sign-in keeps looping?**  
This might be due to default browser settings. Try the following:

1. Open your device’s **Settings**.
2. Go to **Apps** or **Default Apps**.
3. Find and tap on the browser you're using.
4. Look for an option like **Clear defaults** or **Reset default app**
5. Clear the defaults, then try signing in again.

You’ll be prompted to choose a browser. Choose one that's in the same profile as the Plane app.

**Still stuck?**  
Try clearing site data:

1. When the web sign-in page opens, tap the three-dot menu (usually in the top-right corner of the browser).
2. Go to **Settings → Site settings → Clear data** (wording may vary slightly by browser).
3. Try the sign-in process again.

### Unable to log in using SSO

Ensure the correct Redirect URI is configured in your OAuth service:

- For Google Sign-In: Add the following URL to the Redirect URIs section in your Google Cloud Console:
  ```bash
  https://<plane.example.com>/auth/mobile/google/callback/
  ```
- For GitHub Sign-In: Add the following URL to the Callback URL section in your GitHub OAuth app:
  ```bash
  https://<plane.example.com>/auth/mobile/github/callback/
  ```
  Verify that the `<plane.example.com>` part of the URL matches your self-hosted instance's domain.

### Link not opening iOS app

If clicking links doesn't open the Plane iOS app and instead redirects to your browser, this is usually related to how iOS handles Universal Links.

**Why this happens**

1. Your default browser may not be Safari.
2. You may have previously opened the web app (`https://app.plane.so`) in your browser, causing iOS to associate the domain with the browser instead of the app.

**How to fix it**

1. Open the link in Safari.
2. A banner will appear at the top that says **Open** and stays for about a second.
3. Tap **Open** before the banner disappears to launch the Plane app.
4. Try clicking the link from any other app to verify that it now opens the Plane app directly.
