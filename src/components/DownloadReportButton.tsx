"use client";

import { Download } from "lucide-react";
import { downloadPdfReport } from "@/lib/pdf";
import type { QuizResult } from "@/lib/types";

type DownloadReportButtonProps = {
  result: QuizResult;
};

export function DownloadReportButton({ result }: DownloadReportButtonProps) {
  return (
    <button
      type="button"
      onClick={() => downloadPdfReport(result)}
      className="btn-gradient inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold text-white"
    >
      <Download size={18} />
      Download Course PDF
    </button>
  );
}
