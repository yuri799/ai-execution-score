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
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-electric px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blue-600"
    >
      <Download size={18} />
      Download PDF Report
    </button>
  );
}
