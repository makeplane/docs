---
title: Sign up and sign in
pageTitle: Sign up and sign in | Plane
description: ''
---

Applies to the Plane Cloud from December 12, 2023, and Plane self-managed editions, v0.14 and above

Starting v0.14, you will see changes to our sign-up and sign-in flows on both Cloud and self-managed editions. Designed for security while balancing flexibility and convenience, our new sign up and sign-in flows allow greater control over self-managed instances, make it easy for Cloud users to spot existing workspaces, and prep us for billing controls when pricing for paid plans kicks in.

{% link href="https://miro.com/app/board/uXjVNUAfWxk=/" target="_blank" heading=true %} What's changed{% /link %}

![v0.5-of-the-sign-up-and-login-flow](https://plane-marketing.s3.ap-south-1.amazonaws.com/plane-assets/docs/v0.5-of-the-sign-up-and-login-flow.jpg)

## Cloud

Up until now, you could only sign up and sign in via a unique code + magic link. While it worked for most of you, we saw requests for an easier sign-in experience, especially from users who logged out frequently or were logged out by the system.

Now, while you will still get a unique code to sign up, you will be asked to choose a password that you can use going forward.

Want to continue using unique codes? We got you. Just ignore the {% inline-code textColor="blue" %}Choose password{% /inline-code %} button and click {% inline-code textColor="blue" %}Go to workspace{% /inline-code %}. If you are already using Plane, you have to sign in using a unique code once and can choose a password going forward.

![choose-password-new-users](https://plane-marketing.s3.ap-south-1.amazonaws.com/plane-assets/docs/choose-password-new-users.png)

## Self-managed

To enhance security and offer greater control over authorization and access, we have now introduced a special self-managed-only role called {% inline-code textColor="blue" %} Instance admin{% /inline-code %} with access to features that live on the path {% inline-code textColor="blue" %}/god-mode{% /inline-code %} on {% inline-code textColor="grey" %}yoursubdomain.yourdomain.tld{% /inline-code %} .

{% callout type="stash" %}
An instance is a single self-managed installation of Plane on a private cloud or server that the {% inline-code textColor="blue" %}Instance admin{% /inline-code %}
controls and administers. A single instance can house multiple workspaces.

There may also be cases where a user IRL is running multiple instances, e.g., when using Plane for several clients. An {% inline-code textColor="blue" %}Instance admin{% /inline-code %} role will have to be declared for each of those instances, but it is okay to use the same email address for all of them.
{% /callout %}

![enter-instance-admin-e-mail-existing-instances-self-hosted](https://plane-marketing.s3.ap-south-1.amazonaws.com/plane-assets/docs/enter-instance-admin-e-mail-existing-instances-self-hosted.png)

This screen will help you get set up with an e-mail and a password and get access to {% inline-code textColor="blue" %}God Mode{% /inline-code %} features. [Learn more](/self-hosting/instance-admin)

To prevent misuse of these features, you can’t access these screens without going through our secure set-up first, which will start when when you upgrade to {% inline-code textColor="grey" %}v0.14{% /inline-code %}.

{% callout type="cloud" %}
Cloud users will get their own set of {% inline-code textColor="blue" %}God Mode{% /inline-code %} in a later update for authorization and billing controls. {% link href="https://ece39166.sibforms.com/serve/MUIFANgaMWIARsq1n0lMNrch19pdY2HJm9FkSXAeq1DrCoXJBmO9Yq6SPgtzu7rL0lQBmCvvz2A2arVl5WaDxYu6YhNW4PKNAis0DMXmpRnwm5633BvXqIYILqZuyqYiGS7_QjJ0Ozh4R2uctd8RwiiTLSHWpnV2njQt6DPV5cVr8FH3K-TouNAlBScOJxbCpjj8fYo2ULsEJeAL" target="_blank" %}Subscribe to be notified{% /link %}.
{% /callout %}
f
Completing set-up will lead you to a success screen that should look like ↓.

![success-on-setup-existing-instances-self-hosted](https://plane-marketing.s3.ap-south-1.amazonaws.com/plane-assets/docs/success-on-setup-existing-instances-self-hosted.png)

{% callout type="people" %}
New instances that complete set-up let you skip {% inline-code textColor="blue" %}God Mode{% /inline-code %} and invite your team or land inside the product. Existing instances will mandatorily lead you to {% inline-code textColor="blue" %}God Mode{% /inline-code %} so you can immediately set up essential features like SMTP to administer and authorize existing users.
{% /callout %}

## FAQs

{% expansion collapsedTitle="How do you know who an is?" content="Instance admin" addAfter="an" textColor="blue" %}

Whoever spins up the instance or upgrades to {% inline-code textColor="grey" %}v0.14{% /inline-code %}, we assume, is the instance admin. When you see {% inline-code textColor="blue" %}Let's secure your instance{% /inline-code %}, enter your email-password combo. If you are already using Plane with those credentials, you will be logged in and will see {% inline-code textColor="blue" %}/god-mode{% /inline-code %} features. If not, we will create a new user on your local instance and you will see {% inline-code textColor="blue" %}/god-mode{% /inline-code %}.

Our shrewd guess right now is users technical enough to upgrade to or bring up a new instance with v0.14 are instance admins. If there’s a case where this isn’t true, please reach out to us before you upgrade or set-up your fresh instance.

{% /expansion %}

{% expansion collapsedTitle="What if I don’t complete secure instance set-up at the time of the upgrade?" %}

We strongly recommend completing set-up at upgrade so your regular users can access Plane without trouble. Because we are introducing several sensitive admin features in {% inline-code textColor="blue" %}God Mode{% /inline-code %}, we will show an instance-not-set-up screen to your regular users until such a time that you can complete set-up.

![failure-without-setup-for-regular-users-existing-instances-self-hosted](https://plane-marketing.s3.ap-south-1.amazonaws.com/plane-assets/docs/failure-without-setup-for-regular-users-existing-instances-self-hosted.png)

{% /expansion %}

{% expansion collapsedTitle="What has changed with how existing regular users of my instance log in?" %}

All existing users will log in with their usual email address-password combos if they are already doing it. If they haven’t been using a password when not OAuthing into Plane, they will now need to. If OAuth is enabled, users can continue using your OAuth methods. New users will need to choose a password or OAuth into Plane.

{% /expansion %}

{% expansion collapsedTitle="What will happen to the default account that you shipped so far?" content="captain@plane.so" addAfter="default" textColor="blue" %}

For all new instances, there won’t be a {% inline-code textColor="blue" %}captain@plane.so{% /inline-code %} account. Instance set-up will allow you to set up a workspace and set workspace and project admins.

For existing instances, the instance admin’s email will be added to each project with the same permissions as {% inline-code textColor="blue" %}captain@plane.so{% /inline-code %}’s so you can remove that email completely from your workspaces and projects.

{% /expansion %}

{% expansion collapsedTitle="This is unreal, but I have an instance that has a path already. I can’t access my Plane instance. Help!" content="/god-mode" textColor="blue" addAfter=" a " %}

That is unreal! Please reach out to us immediately on
{% link href="https://discord.com/login?redirect_to=%2Fchannels%2F1031547764020084846%2F1094927053867995176" target="_blank" %}support{% /link %}
on our
{% link href="https://discord.com/invite/A92xrEGCge" target="_blank" %}Discord{% /link %}
and mark your message urgent. We will help you get your instance back pronto.

{% /expansion %}

{% expansion collapsedTitle="How will emails for password resets and onboarding be sent to users of my instance(s)?" %}

We have always let you configure your own SMTP server to send emails from within your instance. It’s also why we are being deliberate about leading the instance admin of an existing instance to {% inline-code textColor="blue" %}/god-mode{% /inline-code %} first. After completing secure instance set-up now, you can configure your SMTP server on the UI instead of via {% inline-code textColor="grey" %}.env{% /inline-code %} variables. We strongly recommend you do that to avoid password-reset failures and failures in email delivery.

Please
{% link href="https://discord.com/login?redirect_to=%2Fchannels%2F1031547764020084846%2F1094927053867995176" target="_blank" %}reach out{% /link %}
to us on
{% link href="https://discord.com/invite/A92xrEGCge" target="_blank" %}Discord{% /link %}
if you haven’t set up SMTP and are facing troubles with your users logging in.

{% /expansion %}

{% expansion collapsedTitle="Why are you introducing passwords for users? What’s happening with unique links to sign up and sign in?" content="app.plane.so" href="http://app.plane.so" addAfter="for" target="_blank" %}

Unique links are secure and relatively easier, but we have heard from enough of our Cloud users that they would like to log in using a more permanent and easier method. Should you want to continue using unique codes, you are covered. We will keep that option alive for good.

While using Google or GitHub are good options already, not all of you would want to use them. For those that prefer a password and would like to do away with codes, we want to make that option available.

{% /expansion %}

{% expansion collapsedTitle="Is there a for Cloud admins, too?" content="God Mode" addAfter=" a " textColor="blue" %}

Not now, but soon enough, there will be a {% inline-code textColor="blue" %}God Mode{% /inline-code %} for Cloud admins. More [here](/self-hosting/instance-admin)

{% /expansion %}

## Why this change

{% callout type="man" %}
TL;DR
We are growing and we need to wear some big-person pants.
{% /callout %}

Plane is now adopted across the size-and-shape range of businesses. As we build up to the launch of our paid plans, we have already heard from our more advanced users for out-of-the-box administration, authorization, access, and billing controls.

For starters, there isn’t an {% inline-code textColor="blue" %}Instance admin{% /inline-code %} role today which makes it nigh impossible for us to inform them of essential upgrades, send security notices, introduce paid upgrades for self-managed instances, and everything else that will follow. We are starting with declaration of that role in your own Plane instance. Soon, we will let you opt in to urgent and other comms.

## What’s next

As we continue to grow, we will evolve our authorization and access controls even further, especially on self-managed instances. With the introduction of {% inline-code textColor="blue" %}Instance admin{% /inline-code %} and {% inline-code textColor="blue" %}God Mode{% /inline-code %} features, we anticipate several requests for more security features like Custom SAML, OAuth 2.0, and Granular Access Controls—features we plan to bring to our Cloud, too, to ensure the highest possible parity between our Cloud workspaces and self-managed ones.

We will soon separate out our sign-up and sign-in screens, too, so existing users, especially those with passwords, have a simpler sign-in experience than today’s.

As always, please reach out to us with more feature requests, to report a sub-par experience, or throw brickbats. We will humbly take them all. This release, and Plane itself, wouldn’t have been possible without all of them.

Thank you a million times over.
