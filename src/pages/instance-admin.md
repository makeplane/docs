---
title: Instance admin and God Mode
pageTitle: Instance admin and God Mode | Plane
description: ''
---

Starting 0.14, we are introducing a new role for self-managed instances called {% inline-code textColor="blue" %}Instance admin{% /inline-code %}.

{% callout type="stash" %}
An instance is a single self-managed installation of Plane on a private cloud or server that the {% inline-code textColor="blue" %}Instance admin{% /inline-code %} controls and administers. A single instance can house multiple workspaces.

There may also be cases where a user IRL is running multiple instances, e.g., when using Plane for several clients. An {% inline-code textColor="blue" %}Instance admin{% /inline-code %} role will have to be declared for each of those instances, but it is okay to use the same email address for all of them.
{% /callout %}

This role lets instance admins access {% inline-code textColor="blue" %}/god-mode{% /inline-code %}, a route for features that help them administer and govern their Plane instance better for all users of that instance.

{% callout type="note" %}
New instances allow skipping going to God Mode and setting up your workspace instead. Whatever you choose after secure instance set-up, we highly recommend coming quickly to {% inline-code textColor="blue" %}/god-mode{% /inline-code %} to set up at least your SMTP server so your users can start getting invite emails to projects.
{% /callout %}

God Mode features a few screens as shown below.

- **General**

    Your instance name, admin’s email address, and the provision to add other instance admins show up on this screen. There’s also an option to report anonymous usage data so we can learn from how you use Plane and ship better product.

- **Email**
    ![email-instance-settings](https://plane-marketing.s3.ap-south-1.amazonaws.com/plane-assets/docs/email-instance-settings.png)

    Set up your SMTP server here so you can send essential emails—password resets, exports, changes to your instance—and Plane-enabled emails—onboarding, tips and tricks, new features— to all your users.

- **SSO and OAuth**
    ![authentication-instance-settings](https://plane-marketing.s3.ap-south-1.amazonaws.com/plane-assets/docs/authentication-instance-settings.png)

    Control what SSO and OAuth services your users can use to log into their Plane account. You can also toggle magic links on and off from here.

    {% callout type="playBack" %}
    This is where you will see new SSO services and custom OAuth configs in the future.
    {% /callout %}

- **Artificial intelligence**

    Plane supports the use of AI throughout your projects. For now, we support OpenAI’s APIs and keys. You can configure them here or leave them blank if you don’t wish to offer AI features to your users. Your Plane experience remains largely unchanged if you don’t set this up.

- **Images in Plane**

    You can use your own third-party libraries to update images in project settings. Configure your Unsplash key here. When we add more image libraries, they will show up here.

Soon, we will introduce God Mode for our Cloud users as well so they can manage their workspaces better. To get notified about this, {% link href="https://ece39166.sibforms.com/serve/MUIFANgaMWIARsq1n0lMNrch19pdY2HJm9FkSXAeq1DrCoXJBmO9Yq6SPgtzu7rL0lQBmCvvz2A2arVl5WaDxYu6YhNW4PKNAis0DMXmpRnwm5633BvXqIYILqZuyqYiGS7_QjJ0Ozh4R2uctd8RwiiTLSHWpnV2njQt6DPV5cVr8FH3K-TouNAlBScOJxbCpjj8fYo2ULsEJeAL" target="_blank" %}sign up here{% /link %}.