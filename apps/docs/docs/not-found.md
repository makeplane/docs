---
title: Page not found
description: This page doesn't exist on docs.plane.so. Start from the home page, search, the sitemap, or llms.txt to find what you're looking for.
keywords: plane, page not found, 404
# Not a real page: keep it out of search, the LLM files, and search engines.
search: false
copyPage: false
outline: false
prev: false
next: false
editLink: false
lastUpdated: false
head:
  - - meta
    - name: robots
      content: noindex, nofollow
---

<!-- buildEnd() in .vitepress/config turns the server-rendered not-found.html into the
     404.html Vercel serves (with a 404 status) for every unknown path — VitePress leaves
     its own 404.html empty. The content lives in the shared theme component so client-side
     "not found" navigation shows exactly the same thing. -->

<PlaneNotFound />
