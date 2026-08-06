import type { ExtractedFields } from "@/types/document";

function clean(value: string): string {
  return value
    .replace(/^[\s:=-]+/, "")
    .replace(/[\s,;|]+$/, "")
    .trim();
}

function findFirst(text: string, patterns: RegExp[]): string {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return clean(match[1]);
  }
  return "";
}

export function extractFields(text: string): ExtractedFields {
  const normalizedText = text
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n");

  return {
    containerNumber: findFirst(normalizedText, [
      /CONTAINER\s*(?:NUMBER|NO\.?|#)?\s*[:=\-]?\s*([A-Z]{4}\s*[- ]?\s*\d{7})/i,
      /\b([A-Z]{4}\s*[- ]?\s*\d{7})\b/i
    ]),
    sealNo: findFirst(normalizedText, [
      /SEAL\s*(?:NUMBER|NO\.?|#)?\s*[:=\-]?\s*([A-Z0-9][A-Z0-9\-_/]{2,})/i,
      /SEAL\s*[:=\-]?\s*([A-Z0-9][A-Z0-9\-_/]{2,})/i
    ]),
    booking: findFirst(normalizedText, [
      /BOOKING\s*(?:NUMBER|NO\.?|#)?\s*[:=\-]?\s*([A-Z0-9][A-Z0-9\-_/]{2,})/i,
      /BOOKING\s*[:=\-]?\s*([A-Z0-9][A-Z0-9\-_/]{2,})/i
    ]),
  };
}
