/** @format */

import { next, rewrite } from "@vercel/functions";

// Markdown content negotiation for agents.
//
// VitePress emits an HTML page for every doc, and buildEnd() in
// .vitepress/config.ts copies each source `.md` twin into dist/ alongside it
// (e.g. /core-concepts/issues/overview -> /core-concepts/issues/overview.md).
//
// A `vercel.json` rewrite can't serve those `.md` files on
// `Accept: text/markdown` because vercel.json rewrites run *after* the
// filesystem, and every clean URL already resolves to an existing `.html` file,
// so the rewrite is never reached. Routing Middleware runs *before* the
// filesystem, so it can transparently serve the `.md` twin at the same URL.
//
// HTML stays the default for browsers. Vercel's CDN already includes the
// `Accept` request header in its cache key, so the HTML and markdown variants
// of the same URL are cached as separate entries — no `Vary` header needed.
export const config = {
  // Page routes only: skip built assets, fonts, and any path that already has a
  // file extension (`.md`, `.txt`, `.xml`, `.js`, `.css`, images, …).
  matcher: ["/", "/((?!assets/|fonts/|.*\\.).*)"],
};

// True only when the client *explicitly* accepts `text/markdown` with a
// non-zero quality value. Per RFC 7231 the type/subtype and the `q` parameter
// are case-insensitive, and `q=0` means "not acceptable". Wildcards (`*/*`,
// `text/*`) are intentionally ignored so browsers — which never list
// `text/markdown` — keep getting HTML.
function acceptsMarkdown(accept: string): boolean {
  for (const range of accept.split(",")) {
    const params = range.trim().split(";");
    if (params[0].trim().toLowerCase() !== "text/markdown") continue;
    let q = 1;
    for (const param of params.slice(1)) {
      const [key, value] = param.split("=");
      if (key.trim().toLowerCase() === "q") {
        const parsed = Number.parseFloat(value ?? "");
        if (!Number.isNaN(parsed)) q = parsed;
      }
    }
    if (q > 0) return true;
  }
  return false;
}

export default function middleware(request: Request): Response {
  const accept = request.headers.get("accept") || "";
  if (!acceptsMarkdown(accept)) {
    return next();
  }

  const url = new URL(request.url);
  let pathname = url.pathname;

  // Map the clean URL to its emitted `.md` twin.
  if (pathname === "/" || pathname === "") {
    pathname = "/index";
  } else if (pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  if (!pathname.endsWith(".md")) {
    pathname = `${pathname}.md`;
  }

  url.pathname = pathname;
  return rewrite(url);
}
