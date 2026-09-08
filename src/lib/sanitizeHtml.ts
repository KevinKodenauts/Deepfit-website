/** CMS HTML often stores every space as &nbsp; and over-escapes quotes. */
export function sanitizeRichHtml(html: string): string {
  return html
    .replace(/&nbsp;/gi, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\\+(&quot;|&#34;|&#x22;|")/gi, "$1")
    .replace(/\\+(&apos;|&#39;|&#x27;|')/gi, "$1");
}
