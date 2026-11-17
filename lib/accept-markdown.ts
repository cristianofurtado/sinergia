/**
 * Checks whether an HTTP Accept header prefers `text/markdown` over `text/html`.
 * Returns true if `text/markdown` is present and either `text/html` is absent
 * or `q(text/markdown) > q(text/html)`.
 */
export function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;

  const entries = acceptHeader
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);

  let markdownQ: number | null = null;
  let htmlQ: number | null = null;

  for (const entry of entries) {
    const [mediaType, ...params] = entry.split(";").map((s) => s.trim());
    let q = 1.0;

    for (const param of params) {
      if (param.startsWith("q=")) {
        const parsed = Number.parseFloat(param.slice(2));
        if (!Number.isNaN(parsed)) {
          q = parsed;
        }
      }
    }

    if (mediaType === "text/markdown" || mediaType === "text/x-markdown") {
      markdownQ = markdownQ === null ? q : Math.max(markdownQ, q);
    } else if (mediaType === "text/html" || mediaType === "application/xhtml+xml") {
      htmlQ = htmlQ === null ? q : Math.max(htmlQ, q);
    }
  }

  if (markdownQ === null || markdownQ <= 0) return false;
  if (htmlQ === null) return true;
  return markdownQ > htmlQ;
}
