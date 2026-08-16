---
title: Github OAuth
description: Configure GitHub OAuth authentication for Plane. Enable GitHub sign-in for your self-hosted Plane instance.
keywords: plane github oauth, github sign-in, github authentication, github login, oauth provider, self-hosting, plane sso
---

# Github OAuth

Plane supports GitHub OAuth so your users can sign-in with GitHub instead.

## Configure Plane as an OAuth app on GitHub

1. Log in to your [GitHub account](https://github.com/).
2. Click your profile's avatar and navigate to **Settings.**
3. Click **Developer Settings** and then **OAuth Apps**.
   ![](/images/authentication/github/github-auth-1.png)
4. Click **Register a new application**.
5. Configure the following OAuth credentials for your Plane app.
   1. **Homepage URL**\
      The domain, with HTTPS, on which you host Plane, e.g., `https://app.plane.so`
   2. **Authorization Callback URL**\
      Append the path that users should be redirected to after they have authenticated with GitHub. e.g., `https://<plane.example.com>//auth/github/callback/` and `https://<plane.example.com>/auth/mobile/github/callback/` where `<plane.example.com>` is your self-hosted instance's domain.
6. Click `Register application` to save it.
   ![](/images/authentication/github/github-auth-2.png)
7. Find the app you just registered and click through to find the client ID and the client secret. You will need this for the next steps.

## Configure Plane

![GitHub Oauth Configuration](/images/custom-sso/github-oauth.png)

1. Go to `GitHub` on the Authentication screen of `/god mode`.
2. Add the client ID + the client secret from the GitHub app you just registered.
3. Click `Save `.

Your Plane instance should now work with GitHub sign-in.
