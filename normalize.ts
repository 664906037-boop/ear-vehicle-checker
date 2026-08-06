const thaiDigits: Record<string, string> = {
  "๐": "0", "๑": "1", "๒": "2", "๓": "3", "๔": "4",
  "๕": "5", "๖": "6", "๗": "7", "๘": "8", "๙": "9",
};

export function normalizeValue(value: string): string {
  return value
    .replace(/[๐-๙]/g, (digit) => thaiDigits[digit] ?? digit)
    .toUpperCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[-_/.:]/g, "");
}
