import type { ComparisonRow, ExtractedFields, FieldKey } from "@/types/document";
import { normalizeValue } from "./normalize";

const fields: { key: FieldKey; label: string }[] = [
  { key: "containerNumber", label: "CONTAINER NUMBER" },
  { key: "sealNo", label: "SEAL NO" },
  { key: "booking", label: "BOOKING" },
];

export function compareDocuments(
  file1: ExtractedFields,
  file2: ExtractedFields
): ComparisonRow[] {
  return fields.map(({ key, label }) => {
    const value1 = file1[key] ?? "";
    const value2 = file2[key] ?? "";
    const normalized1 = normalizeValue(value1);
    const normalized2 = normalizeValue(value2);
    const isMissing = !normalized1 || !normalized2;

    return {
      key,
      label,
      file1: value1,
      file2: value2,
      normalized1,
      normalized2,
      isMissing,
      isMatch: !isMissing && normalized1 === normalized2,
    };
  });
}
