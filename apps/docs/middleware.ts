/**
 * Vercel Routing Middleware for docs.plane.so — markdown content negotiation.
 *
 * Requests that prefer `text/markdown` over `text/html` are rewritten to the page's
 * markdown source (`/foo` → `/foo.md`, `/` → `/index.md`); buildEnd() in
 * docs/.vitepress/config.ts copies those files into dist/. Every other request
 * falls through to the HTML page. Both variants carry `Vary: Accept` so
 * downstream caches keep them apart (https://acceptmarkdown.com).
 *
 * This lives in middleware rather than a `rewrites` entry in vercel.json
 * because vercel.json rewrites are only evaluated after the filesystem: with
 * cleanUrls the static foo.html always matched first, so the rewrite never
 * ran and agents got HTML. Middleware runs before the filesystem and before
 * the CDN cache, and the rewritten path gives the markdown variant its own
 * cache key.
 *
 * Mirror of apps/developer-docs/middleware.ts — keep the two in sync.
 */
import { next, rewrite } from "@vercel/functions";
import Negotiator from "negotiator";

export const config = {
  // Page URLs only. Skip the Vite asset dir and known static-file extensions
  // (.md, sitemap.xml, llms.txt, images, fonts, ...). Listed
  // explicitly instead of "contains a dot" because some page slugs contain
  // version numbers.
  matcher: [
    "/((?!assets/|.*\\.(?:md|html|xml|txt|json|js|mjs|css|map|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|otf|pdf|zip)$).*)",
  ],
};

const VARY_ACCEPT = { Vary: "Accept" };
const HTML = "text/html; charset=utf-8";
const MARKDOWN = "text/markdown; charset=utf-8";
const REPRESENTATIONS = [HTML, MARKDOWN];

function prefersMarkdown(accept: string | null): boolean {
  try {
    const negotiator = new Negotiator({ headers: { accept: accept ?? undefined } });
    const explicitlyAcceptsMarkdown = negotiator
      .mediaTypes()
      .some((mediaType) => mediaType.toLowerCase() === "text/markdown");
    return explicitlyAcceptsMarkdown && negotiator.mediaType(REPRESENTATIONS) === MARKDOWN;
  } catch {
    // Fall back to HTML when the header cannot be parsed.
    return false;
  }
}

export default function middleware(request: Request): Response {
  if (!prefersMarkdown(request.headers.get("accept"))) {
    return next({ headers: VARY_ACCEPT });
  }

  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "");
  url.pathname = path === "" ? "/index.md" : `${path}.md`;
  return rewrite(url, { headers: VARY_ACCEPT });
}
