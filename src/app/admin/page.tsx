"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { loadAdminResults } from "@/lib/supabase";
import type { ProjectRecommendation } from "@/lib/types";

type AdminRow = {
  name: string;
  email: string;
  overallScore: number;
  profile: string;
  recommendedProject: ProjectRecommendation;
  createdAt: string;
};

function csvEscape(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`;
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
    const header = ["Name", "Email", "Overall score", "Profile", "Recommended first project", "Date submitted"];
    const body = rows.map((row) => [
      row.name,
      row.email,
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
    link.download = "ai-execution-score-submissions.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-mist">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-electric">Admin</p>
            <h1 className="mt-2 text-4xl font-semibold text-navy">Quiz submissions</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="rounded-lg border border-line bg-white px-5 py-3 text-sm font-bold text-navy">
              Home
            </Link>
            <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-lg bg-electric px-5 py-3 text-sm font-bold text-white">
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {error ? <p className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p> : null}

        <div className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Overall score</th>
                  <th className="px-4 py-3">Profile</th>
                  <th className="px-4 py-3">Recommended first project</th>
                  <th className="px-4 py-3">Date submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((row, index) => (
                  <tr key={`${row.email}-${row.createdAt}-${index}`}>
                    <td className="px-4 py-4 font-semibold text-navy">{row.name}</td>
                    <td className="px-4 py-4 text-slate-600">{row.email}</td>
                    <td className="px-4 py-4 font-bold text-electric">{row.overallScore}</td>
                    <td className="px-4 py-4 text-slate-700">{row.profile}</td>
                    <td className="px-4 py-4 text-slate-700">{row.recommendedProject?.name}</td>
                    <td className="px-4 py-4 text-slate-600">{new Date(row.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 ? <p className="p-8 text-center text-slate-600">No submissions yet.</p> : null}
        </div>
      </div>
    </main>
  );
}
