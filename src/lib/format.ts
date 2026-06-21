/** Format integer kobo as Naira, e.g. 19600000 -> "₦196,000". */
export function ngn(kobo: number | null | undefined): string {
  if (kobo == null) return "—";
  return "₦" + Math.round(kobo / 100).toLocaleString("en-NG");
}

/** First image URL from a jsonb media array, with a fallback. */
export function firstImage(
  media: unknown,
  fallback = "/assets/stilllife-hallmark.jpg",
): { url: string; alt: string } {
  if (Array.isArray(media) && media.length > 0) {
    const m = media[0] as { url?: string; alt?: string };
    return { url: m.url ?? fallback, alt: m.alt ?? "" };
  }
  return { url: fallback, alt: "" };
}
