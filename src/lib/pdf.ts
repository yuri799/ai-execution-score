import type { QuizResult } from "@/lib/types";

function clean(text: string) {
  return text.replace(/[^\x20-\x7E]/g, "-").replace(/[()\\]/g, "\\$&");
}

function wrap(text: string, max = 82) {
  const words = clean(text).split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function downloadPdfReport(result: QuizResult) {
  const content = [
    "AI Execution Score Report",
    "",
    `${result.name} - ${result.email}`,
    `Score: ${result.overallScore}/100`,
    `Profile: ${result.profile}`,
    result.profileDescription,
    "",
    "Strengths",
    ...result.strengths.map((item) => `- ${item}`),
    "",
    "Gaps",
    ...result.gaps.map((item) => `- ${item}`),
    "",
    "Custom Course Path",
    ...result.recommendedModules.map((item) => `- ${item.module}: ${item.status} - ${item.reason}`),
    "",
    "Modules To Skip",
    ...(result.skippedModules.length ? result.skippedModules.map((item) => `- ${item.module}`) : ["- None"]),
    "",
    "Recommended First Project",
    `${result.recommendedProject.name}: ${result.recommendedProject.description}`,
    "",
    "7-Day Action Plan",
    ...result.actionPlan.map((item) => `- ${item}`),
    "",
    "AI Safety Reminders",
    "- Do not paste passwords, API keys, private client data, legal documents, or sensitive financial data into public AI tools.",
    "- Add human review for public-facing, revenue-related, legal, financial, and relationship-sensitive work.",
    "",
    "CTA",
    "Bring this roadmap to your AI Execution Accelerator session with Kai.",
  ];

  const textLines = content.flatMap((line) => (line ? wrap(line) : [""]));
  const pages: string[][] = [];
  for (let i = 0; i < textLines.length; i += 42) pages.push(textLines.slice(i, i + 42));

  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  const pageRefs: number[] = [];

  pages.forEach((page, pageIndex) => {
    const contentId = objects.length + 2;
    const pageId = objects.length + 1;
    pageRefs.push(pageId);
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentId} 0 R >>`);
    const body = page
      .map((line, index) => `BT /F1 ${index === 0 && pageIndex === 0 ? 22 : 10} Tf 54 ${738 - index * 16} Td (${clean(line)}) Tj ET`)
      .join("\n");
    objects.push(`<< /Length ${body.length} >>\nstream\n${body}\nendstream`);
  });

  objects[1] = `<< /Type /Pages /Kids [${pageRefs.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-execution-score-report.pdf";
  link.click();
  URL.revokeObjectURL(url);
}
