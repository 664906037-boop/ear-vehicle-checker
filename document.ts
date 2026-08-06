export type FieldKey = "containerNumber" | "sealNo" | "booking";

export interface ExtractedFields {
  containerNumber: string;
  sealNo: string;
  booking: string;
}

export interface ComparisonRow {
  key: FieldKey;
  label: string;
  file1: string;
  file2: string;
  normalized1: string;
  normalized2: string;
  isMatch: boolean;
  isMissing: boolean;
}
