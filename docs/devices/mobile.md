---
title: Project management mobile app for iOS and Android
description: Learn how to use Plane's mobile app for iOS and Android.
---

# Plane mobile app

The Plane mobile app puts your work in your pocket. 

Create and update work items, comment and mention teammates, track cycles, and stay on top of notifications from your phone. It is available for iOS and Android, and works alongside the web app: anything you change on mobile syncs to the web and everywhere else you use Plane.

This page covers what is specific to mobile: getting the app, signing in, finding your way around, and managing notifications.

## System requirements

| Platform | Minimum version |
|---|---|
| iOS  | iOS 14.0 or later |
| Android | Android 10 or later (SDK 29+) |

**Editions and plans**

- Available on **Plane Cloud** and **self-hosted Commercial Edition** (from version `v1.12.0`).
- Supported on **all plans, including Free**.

## Download and install

Head over to [Download](https://plane.so/download) to install the app for Android or iOS. 

Once installed, open the app and sign in to your workspace.

## Sign in

You can sign in to the mobile app with the same credentials you use on the web.

:::warning
You cannot create a new account from the mobile app. You must already belong to at least one workspace. If you are new to Plane, sign up on the web first, then sign in on mobile.
:::

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

### Switching workspaces

To switch between different workspaces, simply tap your workspace icon in the top left corner and switch between them from the workspace switcher. Your data, projects, and notifications update to reflect the selected workspace.

The app is built around a bottom bar with three tabs and a central Create button.

### The three tabs
- Home - your starting point for the workspace.
- Inbox - your notification center, with an unread badge.
- Search - search across the workspace for projects, work items, cycles, modules, pages, and more.

### Create
Tap the central + Create button to add new content from anywhere. Depending on your role and enabled features, you can create a project, work item, a page, or a sticky.

### Home
Home mirrors the web and is organized into sections you can rearrange or hide (tap Manage widgets icon next to youy profile to customize).
- Your work — assigned and recent items
- Recent activity — projects, cycles, modules, pages, and work items you've opened recently
- Favorites — the projects and items you've starred
- Stickies — your quick notes (when enabled)

The Home header also holds the workspace switcher and a catch-up card.

### Projects
Your projects are reached from within Home. Open a project to see its Work items, Cycles, Modules, and Pages. Tap the star icon to add it to Favorites.

### Gestures
- Pull down to refresh a list or screen.
- Tap a work item to open its detail view.
- Swipe on some list items for quick actions.
- Long-press and drag to reorder items where supported.

### Appearance
The app supports Light, Dark, and System themes. System follows your device's appearance setting automatically.

## Work on the go
The mobile app supports the core of your day-to-day work. Each area links to its full documentation.

### Work items

Create work items and edit their title, description, state, priority, assignees, labels, and start/due dates. Open a work item to manage its sub-items, attachments, and relations.
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

### Plane AI (Pi)

When AI is enabled for your workspace, use the Pi assistant to chat, ask questions, and work with AI threads from the app.
See [Plane AI][/ai/plane-ai].

## Get around the app

The navigation bar at the bottom of your screen helps you quickly access key areas of the app.

- **Home** <br/>
  Your dashboard includes a search box and familiar sections like **Your Work** and **Favorites**. There’s also a **Jump back in** section to easily access your recent projects, cycles, modules, pages, and work items.

- **Projects** <br/>
  This screen shows all the projects you have access to, along with your role and the active work items count. Tap the star icon to add a project to your **Favorites** for quick access.

    <div class="mobile-img-container">
      <div class="box">
        <img src="https://media.docs.plane.so/mobile/app-home.webp" alt="Home" width="320"/>
      </div>
      <div class="box">
      <img src="https://media.docs.plane.so/mobile/app-projects.webp" alt="Projects" width="320"/>
      </div>
    </div>

- **Create** <br/>
  Need to create a new project, work item, or page? Tap the + Create button.
  - **New project**  
    Add the project details such as icon, name, description, and the lead. Mark it public or private. Hit the **Create** button.

  - **New page**
    - Select the project by clicking the project name at the top.
    - Add an icon and the page title.
    - You can use the toolbar at the bottom to add different content blocks and format them as needed.
    - Hit the **Create** button to add it to your project.

    <div class="mobile-img-container">
        <div class="box">
            <img src="https://media.docs.plane.so/mobile/app-create-project.webp" alt="Create project" width="320"/>
        </div>
        <div class="box">
            <img src="https://media.docs.plane.so/mobile/app-create-page.webp" alt="Create page" width="320"/>
        </div>
    </div>

  - **New work item**
    - Select the project by clicking the project name at the top.
    - Add work item details like title and description. For the description, you can use the toolbar at the bottom to add different blocks and format the text as needed.
    - Tap the **+** icon at the bottom left to assign members, priority, state, and other properties.
    - Hit the **Create** button to add it to your project.

    <div class="mobile-img-container">
        <div class="box">
            <img src="https://media.docs.plane.so/mobile/app-create-issue.webp" alt="Create work item" width="320"/>
        </div>
        <div class="box">
            <img src="https://media.docs.plane.so/mobile/app-issue-properties.webp" alt="Work item properties" width="320"/>
        </div>
    </div>

- **Inbox** <br/>
  Stay updated with notifications about work items you’ve created, are assigned to, or where you’ve been mentioned. You’ll never miss an important update again.

- **Profile** <br/>
  View your profile and manage your account here. You can also switch between workspaces or log out of the app from this screen.

    <div class="mobile-img-container">
      <div class="box">
      <img src="https://media.docs.plane.so/mobile/app-inbox.webp" alt="Inbox" width="320"/>
      </div>
      <div class="box">
      <img src="https://media.docs.plane.so/mobile/app-profile.webp" alt="Profile" width="320"/>
      </div>
    </div>

### Global search

At the top of the Home screen, you’ll find the global search bar, which helps you quickly find projects, work items, cycles, modules, or pages. It's a powerful tool to jump right to what you need.

## Track projects

Stay on top of your work by tracking all your project's elements with ease:

1. Tap the **Projects** icon in the bottom navigation bar.
2. Select the project you want to track.

You will notice that the bottom navigation bar now shows different buttons:

- **Work items** <br/>
  View a list of all, active and backlog work items.
  - You can search, sort, and filter work items using the icon buttons on the top right.

  - Tap any work item to view or modify work item details and view the activity. You can also add comments, copy the link, and share the work item with a personalized message via other apps.

  - Click the **+ Add** button on the bottom left to add sub-work items and relations. You can also swipe left or right to view sub-work items, relations, links, and attachments.

    <div class="mobile-img-container">
        <div class="box">
            <img src="https://media.docs.plane.so/mobile/app-issues.webp" alt="Work items" width="320"/>
        </div>
        <div class="box">
            <img src="https://media.docs.plane.so/mobile/app-issue-details.webp" alt="Work item details" width="320"/>
        </div>
    </div>
    <br/>

    ::: tip
    You can add or edit the priority, state, start date, target date, cycle, and module by tapping the pencil icon in the **Properties** section. Alternatively, use the icons on the top right for choosing Priority, Cycle, and Module.
    :::

- **Cycles** <br/>
  Track active and upcoming cycles, and dive into the work items within each cycle.

- **Create** <br/>
  Similar to the Create button on the main navigation bar, except that you can only create new work items and pages here.

- **Modules** <br/>
  See all modules in your project and their progress. Tap the module to view the work items that are a part of it.

- **Pages** <br/>
  View all project pages, whether public, private, or archived. You can mark important pages as favorites or search for specific content.

  <div class="mobile-img-container">
    <div class="box">
      <img src="https://media.docs.plane.so/mobile/app-cycles.webp" alt="Cycles" width="320" />
    </div>
    <div class="box">
      <img src="https://media.docs.plane.so/mobile/app-modules.webp" alt="Modules" width="320" />
    </div>
  </div>
  <br />

## Push notifications

::: info
Push notifications are currently available only for Plane Cloud users.
:::

The Plane mobile app supports push notifications to keep you updated on important activities. To start receiving notifications, make sure to turn them on in the app settings. Once turned on, you'll be notified about relevant updates, ensuring you never miss an important change or task.


## Notifications

Notifications are where the mobile app is especially useful, letting you respond to what needs your attention without opening your laptop.

### Push notifications

The app sends push notifications for events that involve you, such as new assignments, comments, and mentions on work items, epics, and intake items. Notifications appear on your device's lock screen and update your app badge count.

Push notifications are delivered through your device's native system (Apple Push Notification service on iOS, Firebase Cloud Messaging on Android). To receive them, allow notifications for Plane when the app first asks, or enable them later in your device settings.

### Managing notification preferences

Control which notifications you receive from your notification settings in the app. Adjust these to reduce noise or focus only on what matters most to you.

### The notification center

Open the **Notifications** tab to see your inbox. From here you can:

- Read updates, mentions, and assignments
- **Snooze** a notification to be reminded later
- **Archive** a notification once you have dealt with it

Your notification inbox stays in sync across mobile and web.

See [Notifications] [link].

---

<!-- VERIFY WITH MOBILE TEAM BEFORE PUBLISHING.
     These three sections cover the highest-value mobile-only features in
     competitor docs, but they were NOT found in the codebase. Confirm whether
     the app supports each. If yes, flesh out the section. If no, delete it. -->

<!--
## Work offline  (UNVERIFIED — confirm offline support exists)

Describe what is available offline, how changes sync when you reconnect, and any
limitations (for example, which content is cached and whether editing is allowed).

## Home-screen widgets  (UNVERIFIED — confirm widgets exist)

Describe available widgets, what they show (for example, assigned work items or a
project list), and how to add them on iOS and Android.

## App lock and biometrics  (UNVERIFIED — confirm biometric lock exists)

Describe how to enable Face ID / Touch ID / fingerprint lock and what it protects.
-->

---

## What's different on mobile

The mobile app focuses on the work you are most likely to do away from your desk. Some capabilities available on the web are not present on mobile, or work differently.

Feature availability also depends on your plan. Features such as epics, initiatives, teamspaces, pages, and AI capabilities appear in the app only when they are enabled for your workspace.


## Privacy and security
- Privacy Screen — blurs the app's contents in the app switcher and background so sensitive work isn't visible in previews.
- Device integrity — Plane doesn't run on jailbroken or rooted devices.
> There's no Face ID / Touch ID / fingerprint or PIN lock to open the app.

## Offline and syncing
The app caches recently viewed data so those screens load quickly and stay viewable when your connection drops. Editing requires a connection — there is no offline edit queue. When back online, pull to refresh to sync.

## What's different on mobile
- Sign-up/account creation happen on the web — mobile is sign-in only.
- Navigation is condensed into Home, Inbox, and Search + a Create button.
- Saved views and advanced filtering are best used on the web.
- Home-screen widgets are iOS-only.
- Offline editing isn't supported.
- Biometric/PIN app lock isn't available (a Privacy Screen blur is).

Feature availability also depends on your plan and workspace settings.

## Notifications
### Push notifications
The app sends push notifications for creates, updates, and deletes on work items, epics, and intake items — for example new assignments, comments, and mentions. Notifications appear on your lock screen and update your app-icon badge.

Push is delivered through Firebase Cloud Messaging (Apple Push Notification service on iOS, Firebase on Android). Allow notifications for Plane when first asked, or enable them later in device settings.

### The Inbox
Open the Inbox tab to read notifications and tap to jump to the item; mark as read, snooze, archive, and filter (e.g. unread only). Your inbox stays in sync across mobile and web.

## Home-screen widgets and shortcuts (iOS)
On iOS/iPadOS, add Plane widgets for one-tap capture: Create Work Item and Create Page. You can also long-press the app icon for Quick Actions.
> Home-screen widgets are not available on Android yet.

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
