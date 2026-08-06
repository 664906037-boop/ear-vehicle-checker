"use client";

import { useMemo, useState } from "react";
import { compareDocuments } from "@/lib/compare";
import { extractFields } from "@/lib/extract-fields";
import { readFileText } from "@/lib/read-file";
import type { ExtractedFields } from "@/types/document";

const emptyFields: ExtractedFields = {
  containerNumber: "",
  sealNo: "",
  booking: "",
};

export default function Home() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [fields1, setFields1] = useState<ExtractedFields>(emptyFields);
  const [fields2, setFields2] = useState<ExtractedFields>(emptyFields);
  const [hasResult, setHasResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const rows = useMemo(
    () => compareDocuments(fields1, fields2),
    [fields1, fields2]
  );

  const allPassed = hasResult && rows.every((row) => row.isMatch);

  async function checkFiles() {
    if (!file1 || !file2) {
      setError("กรุณาเลือกไฟล์ทั้ง 2 ไฟล์");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [text1, text2] = await Promise.all([
        readFileText(file1),
        readFileText(file2),
      ]);

      setFields1(extractFields(text1));
      setFields2(extractFields(text2));
      setHasResult(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ไม่สามารถอ่านไฟล์ได้");
      setHasResult(false);
    } finally {
      setLoading(false);
    }
  }

  function updateField(
    target: 1 | 2,
    key: keyof ExtractedFields,
    value: string
  ) {
    if (target === 1) {
      setFields1((current) => ({ ...current, [key]: value }));
    } else {
      setFields2((current) => ({ ...current, [key]: value }));
    }
  }

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">DOCUMENT CHECKER</p>
        <h1>ตรวจสอบใบ EAR กับแบบฟอร์มควบคุมรถ</h1>
        <p>
          อัปโหลดเอกสาร 2 ไฟล์ เพื่อตรวจสอบ CONTAINER NUMBER, SEAL NO และ BOOKING
        </p>
      </section>

      <section className="upload-grid no-print">
        <FileBox
          title="ไฟล์ที่ 1: ใบ EAR"
          file={file1}
          onChange={(file) => {
            setFile1(file);
            setHasResult(false);
          }}
        />
        <FileBox
          title="ไฟล์ที่ 2: แบบฟอร์มควบคุมรถ"
          file={file2}
          onChange={(file) => {
            setFile2(file);
            setHasResult(false);
          }}
        />
      </section>

      <div className="actions no-print">
        <button className="primary" onClick={checkFiles} disabled={loading}>
          {loading ? "กำลังตรวจสอบ..." : "ตรวจสอบข้อมูล"}
        </button>
        <button
          className="secondary"
          onClick={() => {
            setFile1(null);
            setFile2(null);
            setFields1(emptyFields);
            setFields2(emptyFields);
            setHasResult(false);
            setError("");
          }}
        >
          ล้างข้อมูล
        </button>
      </div>

      {error && <div className="error no-print">{error}</div>}

      {hasResult && (
        <section className="result-card">
          <div className="result-header">
            <div>
              <p className="eyebrow">COMPARISON RESULT</p>
              <h2>ผลการตรวจสอบ</h2>
            </div>
            <span className={`overall ${allPassed ? "pass" : "fail"}`}>
              {allPassed ? "ผ่านการตรวจสอบ" : "ไม่ผ่านการตรวจสอบ"}
            </span>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>หัวข้อ</th>
                  <th>ใบ EAR</th>
                  <th>แบบฟอร์มควบคุมรถ</th>
                  <th>ผลตรวจ</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.key}>
                    <td className="label">{row.label}</td>
                    <td>
                      <input
                        value={fields1[row.key]}
                        onChange={(e) =>
                          updateField(1, row.key, e.target.value)
                        }
                        aria-label={`${row.label} ใบ EAR`}
                      />
                    </td>
                    <td>
                      <input
                        value={fields2[row.key]}
                        onChange={(e) =>
                          updateField(2, row.key, e.target.value)
                        }
                        aria-label={`${row.label} แบบฟอร์มควบคุมรถ`}
                      />
                    </td>
                    <td>
                      <span
                        className={`status ${
                          row.isMissing
                            ? "missing"
                            : row.isMatch
                            ? "match"
                            : "mismatch"
                        }`}
                      >
                        {row.isMissing
                          ? "ไม่พบข้อมูล"
                          : row.isMatch
                          ? "ตรงกัน"
                          : "ไม่ตรงกัน"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="hint no-print">
            สามารถแก้ไขค่าที่ระบบอ่านได้ในตาราง แล้วผลตรวจจะอัปเดตอัตโนมัติ
          </p>

          <div className="print-meta">
            <p><strong>ชื่อไฟล์ใบ EAR:</strong> {file1?.name}</p>
            <p><strong>ชื่อไฟล์แบบฟอร์ม:</strong> {file2?.name}</p>
            <p><strong>วันที่ตรวจ:</strong> {new Date().toLocaleString("th-TH")}</p>
          </div>

          <div className="actions no-print">
            <button className="primary" onClick={() => window.print()}>
              พิมพ์ผลการตรวจ
            </button>
          </div>
        </section>
      )}

      <section className="notice no-print">
        <strong>หมายเหตุ:</strong> ระบบนี้อ่าน PDF ที่มีข้อความให้เลือกได้ และไฟล์
        Excel/CSV/TXT หากเป็น PDF สแกนหรือรูปภาพ จำเป็นต้องเพิ่ม OCR ภายหลัง
      </section>
    </main>
  );
}

function FileBox({
  title,
  file,
  onChange,
}: {
  title: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <label className="file-box">
      <span className="file-title">{title}</span>
      <span className="file-help">
        รองรับ PDF, XLSX, XLS, CSV และ TXT
      </span>
      <input
        type="file"
        accept=".pdf,.xlsx,.xls,.csv,.txt"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      <span className="choose-button">เลือกไฟล์</span>
      <span className="file-name">{file?.name ?? "ยังไม่ได้เลือกไฟล์"}</span>
    </label>
  );
}
