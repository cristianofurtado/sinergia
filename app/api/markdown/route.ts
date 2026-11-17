import { NextRequest, NextResponse } from "next/server";
import {
  renderContatoMarkdown,
  renderHomeMarkdown,
  renderNotFoundMarkdown,
  renderPrivacidadeMarkdown,
  renderSobreMarkdown,
} from "@/lib/markdown-renderer";

const HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const notFound = searchParams.get("notFound") === "1";
  const path = searchParams.get("path") ?? "/";

  if (notFound) {
    return new NextResponse(renderNotFoundMarkdown(), {
      status: 404,
      headers: HEADERS,
    });
  }

  switch (path) {
    case "/":
      return new NextResponse(renderHomeMarkdown(), { status: 200, headers: HEADERS });
    case "/sobre":
      return new NextResponse(renderSobreMarkdown(), { status: 200, headers: HEADERS });
    case "/contato":
      return new NextResponse(renderContatoMarkdown(), { status: 200, headers: HEADERS });
    case "/privacidade":
      return new NextResponse(renderPrivacidadeMarkdown(), { status: 200, headers: HEADERS });
    default:
      return new NextResponse(renderNotFoundMarkdown(), { status: 404, headers: HEADERS });
  }
}
