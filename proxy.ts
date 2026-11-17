import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prefersMarkdown } from "@/lib/accept-markdown";

const MARKDOWN_PATHS = new Set(["/", "/sobre", "/contato", "/privacidade"]);
const STATIC_PASSTHROUGH = new Set([
  "/llms.txt",
  "/sitemap.xml",
  "/robots.txt",
  "/logos",
]);

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const accept = request.headers.get("accept");
  const isAgentMode = pathname === "/" && searchParams.get("mode") === "agent";
  const wantsMarkdown = isAgentMode || prefersMarkdown(accept);

  if (wantsMarkdown) {
    if (MARKDOWN_PATHS.has(pathname)) {
      const url = new URL("/api/markdown", request.url);
      url.searchParams.set("path", pathname);
      return NextResponse.rewrite(url);
    }

    if (!STATIC_PASSTHROUGH.has(pathname)) {
      const url = new URL("/api/markdown", request.url);
      url.searchParams.set("notFound", "1");
      return NextResponse.rewrite(url);
    }
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
