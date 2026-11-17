import { NextResponse } from "next/server";
import { renderLlmsTxt } from "@/lib/markdown-renderer";

export function GET() {
  return new NextResponse(renderLlmsTxt(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
