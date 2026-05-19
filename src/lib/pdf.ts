import { expandedLessonParagraphs, findCourseModule } from "@/lib/course-content";
import type { QuizResult } from "@/lib/types";

function clean(text: string) {
  return text.replace(/[^\x20-\x7E]/g, "-").replace(/[()\\]/g, "\\$&");
}

function wrap(text: string, max = 86) {
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

type PdfPage = {
  commands: string[];
};

type PdfState = {
  pages: PdfPage[];
  page: PdfPage;
  y: number;
};

type PdfColor = [number, number, number];

const pageWidth = 612;
const pageHeight = 792;
const margin = 48;
const navy: PdfColor = [0.027, 0.078, 0.149];
const ink: PdfColor = [0.043, 0.09, 0.165];
const slate: PdfColor = [0.357, 0.412, 0.49];
const white: PdfColor = [1, 1, 1];
const mist: PdfColor = [0.957, 0.969, 0.984];
const line: PdfColor = [0.851, 0.886, 0.937];
const electric: PdfColor = [0.122, 0.482, 1];
const blueWash: PdfColor = [0.91, 0.952, 1];

function rgb(color: PdfColor) {
  return `${color[0]} ${color[1]} ${color[2]}`;
}

function rect(page: PdfPage, x: number, y: number, w: number, h: number, fill: PdfColor, stroke?: PdfColor) {
  const border = stroke ? `${rgb(stroke)} RG 1 w ${x} ${y} ${w} ${h} re B` : `${x} ${y} ${w} ${h} re f`;
  page.commands.push(`q ${rgb(fill)} rg ${border} Q`);
}

function text(page: PdfPage, value: string, x: number, y: number, size: number, color: PdfColor = ink, bold = false) {
  page.commands.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${rgb(color)} rg ${x} ${y} Td (${clean(value)}) Tj ET`);
}

function textLines(page: PdfPage, lines: string[], x: number, y: number, size: number, color: PdfColor = ink, bold = false, leading = size + 5) {
  lines.forEach((lineValue, index) => text(page, lineValue, x, y - index * leading, size, color, bold));
  return y - lines.length * leading;
}

function maxChars(width: number, size: number) {
  return Math.max(24, Math.floor(width / (size * 0.52)));
}

function newContentPage(state: PdfState, title = "AI Execution Score Course") {
  const page: PdfPage = { commands: [] };
  rect(page, 0, 0, pageWidth, pageHeight, mist);
  rect(page, 0, 744, pageWidth, 48, navy);
  rect(page, 0, 740, pageWidth, 4, electric);
  text(page, "AI Execution Score", margin, 763, 12, white, true);
  const titleLines = wrap(title, maxChars(pageWidth - margin * 2, 24));
  textLines(page, titleLines.slice(0, 2), margin, 706, 24, navy, true, 28);
  state.pages.push(page);
  state.page = page;
  state.y = titleLines.length > 1 ? 640 : 672;
}

function ensureSpace(state: PdfState, height: number, title?: string) {
  if (state.y - height < 58) newContentPage(state, title);
}

function addCard(state: PdfState, title: string, body: string[], options?: { accent?: boolean; compact?: boolean }) {
  const width = pageWidth - margin * 2;
  const titleLines = title ? wrap(title, maxChars(width - 28, 14)) : [];
  const bodyLines = body.flatMap((item) => wrap(item, maxChars(width - 28, 10)));
  const topPadding = titleLines.length ? 26 : 24;
  const bottomPadding = options?.compact ? 26 : 30;
  const height = topPadding + titleLines.length * 18 + bodyLines.length * 14 + bottomPadding;
  ensureSpace(state, height + 14, title);
  const y = state.y - height;
  rect(state.page, margin, y, width, height, options?.accent ? blueWash : white, line);
  rect(state.page, margin, y + height - 5, width, 5, options?.accent ? electric : navy);
  let cursor = y + height - topPadding;
  if (titleLines.length) cursor = textLines(state.page, titleLines, margin + 18, cursor, 14, navy, true, 18) - 2;
  bodyLines.forEach((lineValue) => {
    text(state.page, lineValue, margin + 18, cursor, 10, slate);
    cursor -= 14;
  });
  state.y = y - 24;
}

function courseLessonsForStatus<T>(items: T[], status: string) {
  if (["Summary", "Skip"].includes(status)) return items.slice(0, Math.min(2, items.length));
  if (["Beginner", "Practical"].includes(status)) return items.slice(0, Math.min(4, items.length));
  return items;
}

function addSectionTitle(state: PdfState, title: string) {
  const lines = wrap(title, maxChars(pageWidth - margin * 2, 20));
  const height = lines.length * 24 + 30;
  ensureSpace(state, height, "The Course");
  state.y -= 10;
  textLines(state.page, lines, margin, state.y, 20, navy, true, 24);
  rect(state.page, margin, state.y - lines.length * 24 - 2, 78, 3, electric);
  state.y -= height - 10;
}

function addLesson(state: PdfState, title: string, paragraphs: string[], moduleTitle: string, moduleId: string) {
  const lines = wrap(title, maxChars(pageWidth - margin * 2, 20));
  const firstParagraphLines = wrap(paragraphs[0] ?? "", maxChars(pageWidth - margin * 2 - 28, 10));
  const headingHeight = lines.length * 24 + 20;
  const firstCardHeight = 24 + firstParagraphLines.length * 14 + 12;
  ensureSpace(state, headingHeight + firstCardHeight + 22, moduleTitle);
  addSectionTitle(state, title);
  paragraphs.forEach((paragraph) => addCard(state, "", [paragraph], { compact: true }));
}

function addBarsPage(result: QuizResult, state: PdfState) {
  const labels = {
    aiBasics: "AI Basics",
    prompting: "Prompting",
    verification: "Verification",
    businessStrategy: "Business Strategy",
    automationTools: "Automation Tools",
    teamPrivacyImplementation: "Team, Privacy & Implementation",
  };
  addSectionTitle(state, "Category Scores");
  Object.entries(result.categoryScores).forEach(([key, score]) => {
    ensureSpace(state, 38, "Category Scores");
    text(state.page, labels[key as keyof typeof labels], margin, state.y, 10, ink, true);
    text(state.page, String(score), pageWidth - margin - 28, state.y, 10, electric, true);
    rect(state.page, margin, state.y - 17, pageWidth - margin * 2, 7, line);
    rect(state.page, margin, state.y - 17, ((pageWidth - margin * 2) * score) / 100, 7, electric);
    state.y -= 34;
  });
}

function buildDashboard(result: QuizResult, state: PdfState) {
  newContentPage(state, "Your Score Dashboard");
  const cardY = 540;
  rect(state.page, margin, cardY, 210, 126, navy);
  text(state.page, "AI EXECUTION SCORE", margin + 18, cardY + 96, 10, [0.78, 0.86, 1], true);
  text(state.page, String(result.overallScore), margin + 18, cardY + 42, 54, white, true);
  text(state.page, "/100", margin + 116, cardY + 47, 17, [0.78, 0.86, 1], true);
  rect(state.page, margin + 18, cardY + 20, 160, 7, [0.18, 0.25, 0.34]);
  rect(state.page, margin + 18, cardY + 20, (160 * result.overallScore) / 100, 7, electric);

  rect(state.page, margin + 232, cardY, 284, 126, white, line);
  rect(state.page, margin + 252, cardY + 82, 124, 24, blueWash);
  text(state.page, result.profile, margin + 264, cardY + 90, 11, electric, true);
  textLines(state.page, wrap(result.profileDescription, 54), margin + 252, cardY + 64, 10, slate, false, 15);
  state.y = 500;
  addBarsPage(result, state);
}

function buildCover(result: QuizResult): PdfPage {
  const page: PdfPage = { commands: [] };
  rect(page, 0, 0, pageWidth, pageHeight, navy);
  rect(page, 0, 0, pageWidth, 84, [0.035, 0.102, 0.2]);
  rect(page, 0, 84, pageWidth, 6, electric);
  rect(page, 430, 566, 116, 116, electric);
  rect(page, 442, 578, 92, 92, navy, white);
  text(page, String(result.overallScore), 460, 617, 36, white, true);
  text(page, "/100", 492, 600, 12, [0.78, 0.86, 1], true);
  text(page, "AI Execution Score", margin, 690, 16, [0.78, 0.86, 1], true);
  text(page, "Personalized", margin, 600, 42, white, true);
  text(page, "AI Course", margin, 554, 42, white, true);
  text(page, `Prepared for ${result.name}`, margin, 504, 16, [0.78, 0.86, 1], true);
  rect(page, margin, 426, 246, 42, blueWash);
  text(page, result.profile, margin + 18, 442, 15, electric, true);
  textLines(page, wrap(result.profileDescription, 56), margin, 380, 11, [0.86, 0.9, 0.96], false, 17);
  text(page, "What is inside", margin, 238, 14, white, true);
  ["Score dashboard", "Custom course path", "Written chapters", "First AI project", "7-day implementation sprint"].forEach((item, index) => {
    rect(page, margin, 204 - index * 30, 8, 8, electric);
    text(page, item, margin + 18, 201 - index * 30, 11, [0.9, 0.94, 1]);
  });
  text(page, "Bring this roadmap to your AI Execution Accelerator session with Kai.", margin, 42, 10, [0.78, 0.86, 1]);
  return page;
}

export function downloadPdfReport(result: QuizResult) {
  const state: PdfState = { pages: [], page: { commands: [] }, y: 0 };
  state.pages.push(buildCover(result));
  buildDashboard(result, state);

  addSectionTitle(state, "Your Custom Roadmap");
  addCard(state, "Recommended First Project", [`${result.recommendedProject.name}: ${result.recommendedProject.description}`], { accent: true });
  addCard(state, "What You Already Know", result.strengths.map((item) => `- ${item}`));
  addCard(state, "What Still Needs Attention", result.gaps.map((item) => `- ${item}`));
  addCard(
    state,
    "Custom Course Path",
    result.recommendedModules.map((item) => `- ${item.module}: ${item.status}. ${item.reason}`),
  );
  addCard(
    state,
    "Modules You Can Skip",
    result.skippedModules.length ? result.skippedModules.map((item) => `- ${item.module}`) : ["- None. Move quickly through summaries where noted."],
  );

  newContentPage(state, "The Course");
  addCard(
    state,
    "How To Use This Course",
    [
      "This PDF was assembled from the full AI for Business Owners course based on the user's quiz result. Full and advanced modules include deeper lessons. Summary modules include only the most useful sections. Skipped modules are removed from the main course so the user is not forced through material they already know.",
      "The goal is to give the user a focused course they can actually complete, then bring concrete questions and implementation ideas to the AI Execution Accelerator session with Kai.",
    ],
    { accent: true },
  );

  result.recommendedModules.forEach((recommendation) => {
    const courseModule = findCourseModule(recommendation.module);
    if (!courseModule) return;

    newContentPage(state, courseModule.title);
    addCard(state, recommendation.status, [recommendation.reason, courseModule.subtitle], { accent: true, compact: true });

    courseLessonsForStatus(courseModule.lessons, recommendation.status).forEach((lesson) => {
      addLesson(state, lesson.title, expandedLessonParagraphs(courseModule.id, lesson.title, lesson.paragraphs), courseModule.title, courseModule.id);
    });

    addCard(state, "Action Step", [courseModule.actionStep], { accent: true, compact: true });
  });

  newContentPage(state, "Implementation Sprint");
  addSectionTitle(state, "7-Day Implementation Sprint");
  addCard(state, "Your Action Plan", result.actionPlan.map((item) => `- ${item}`), { accent: true });
  addCard(state, "AI Safety Reminders", [
    "- Do not paste passwords, API keys, private client data, legal documents, or sensitive financial data into public AI tools.",
    "- Add human review for public-facing, revenue-related, legal, financial, and relationship-sensitive work.",
    "- If AI is making decisions that affect customers, money, legal exposure, or employees, slow down and add approval rules.",
  ]);
  addCard(state, "Next Step", ["Bring this roadmap to your AI Execution Accelerator session with Kai."], { accent: true });

  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];
  const pageRefs: number[] = [];

  state.pages.forEach((page) => {
    const contentId = objects.length + 2;
    const pageId = objects.length + 1;
    pageRefs.push(pageId);
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);
    const body = page.commands.join("\n");
    objects.push(`<< /Length ${body.length} >>\nstream\n${body}\nendstream`);
  });

  objects[1] = `<< /Type /Pages /Kids [${pageRefs.map((id) => `${id} 0 R`).join(" ")}] /Count ${state.pages.length} >>`;

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
  link.download = "ai-execution-score-course.pdf";
  link.click();
  URL.revokeObjectURL(url);
}
