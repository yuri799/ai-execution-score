"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { loadAdminResults } from "@/lib/supabase";
import type { ProjectRecommendation } from "@/lib/types";

type AdminRow = {
  name: string;
  overallScore: number;
  profile: string;
  recommendedProject: ProjectRecommendation;
  createdAt: string;
};

function csvEscape(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function scoreColor(score: number) {
  if (score >= 160) return "text-amber-500";
  if (score >= 115) return "text-emerald-500";
  if (score >= 85) return "text-electric";
  return "text-slate-500";
}

export default function AdminPage() {
  const [rows, setRows] = useState<AdminRow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAdminResults()
      .then((data) => setRows(data as AdminRow[]))
      .catch((adminError) => setError(adminError instanceof Error ? adminError.message : "Could not load submissions."));
  }, []);

  const csv = useMemo(() => {
    const header = ["Name", "AI Business IQ", "Tier", "Recommended first project", "Date submitted"];
    const body = rows.map((row) => [
      row.name,
      row.overallScore,
      row.profile,
      row.recommendedProject?.name ?? "",
      new Date(row.createdAt).toLocaleString(),
    ]);
    return [header, ...body].map((line) => line.map(csvEscape).join(",")).join("\n");
  }, [rows]);

  function exportCsv() {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-business-iq-submissions.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-navy">
              <ArrowLeft size={18} />
              Home
            </Link>
            <p className="mt-3 text-sm font-bold uppercase tracking-wide text-electric">Admin</p>
            <h1 className="mt-1 text-3xl font-semibold text-navy sm:text-4xl">Quiz submissions</h1>
          </div>
          <button onClick={exportCsv} className="btn-gradient inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold text-white">
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {error ? <p className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p> : null}

        <div className="overflow-hidden rounded-xl border border-white/60 glass-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Name</th>
                  <th className="px-5 py-3.5">AI Business IQ</th>
                  <th className="px-5 py-3.5">Tier</th>
                  <th className="px-5 py-3.5">Recommended first project</th>
                  <th className="px-5 py-3.5">Date submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row, index) => (
                  <tr key={`${row.name}-${row.createdAt}-${index}`} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-semibold text-navy">{row.name}</td>
                    <td className={`px-5 py-4 font-bold ${scoreColor(row.overallScore)}`}>{row.overallScore}</td>
                    <td className="px-5 py-4 text-slate-700">{row.profile}</td>
                    <td className="px-5 py-4 text-slate-700">{row.recommendedProject?.name}</td>
                    <td className="px-5 py-4 text-slate-500">{new Date(row.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 ? <p className="p-10 text-center text-slate-500">No submissions yet.</p> : null}
        </div>
      </div>
    </main>
  );
}
