import type { QuizResult } from "@/lib/types";

type CourseChapter = {
  title: string;
  body: string[];
  exercise: string;
};

const courseChapters: CourseChapter[] = [
  {
    title: "Chapter 1: What AI Is Really For",
    body: [
      "AI is not a magic employee and it is not a strategy by itself. For a business owner, AI is best understood as a leverage tool. It helps you think faster, draft faster, summarize faster, compare options faster, and turn repeated work into documented systems. The goal is not to use more AI. The goal is to remove friction from work that already matters.",
      "Start with the distinction between AI and automation. AI handles judgment-shaped tasks such as drafting, summarizing, classifying, brainstorming, rewriting, and explaining. Automation moves information from one place to another or triggers a predictable action. The best business systems often use both: AI decides or drafts, automation routes the output, and a human reviews the parts that carry risk.",
      "Your first win should be specific. Do not start with 'use AI in marketing.' Start with 'turn one sales call transcript into a follow-up email, CRM summary, and next-step checklist.' Specific workflows are easier to test, improve, and delegate.",
    ],
    exercise: "Write down one repeated task that happens every week, who does it, what inputs it uses, and what finished output should look like.",
  },
  {
    title: "Chapter 2: The Plain-English AI Glossary",
    body: [
      "An LLM, or large language model, is software trained to predict and generate language. It does not know your business unless you give it context. It can produce strong work when you provide goals, examples, constraints, source material, and a clear definition of success.",
      "A prompt is not just a question. A useful business prompt is a work order. It tells the model the role it should play, the outcome you want, the background it should use, the format to return, and the standards it should follow. A weak prompt asks for an answer. A strong prompt creates a repeatable workflow.",
      "Tokens are chunks of text. Context window means how much text the model can consider at one time. Memory is not the same as context. In most business workflows, you should assume AI remembers only what you provide in the current task unless your tool clearly says otherwise.",
      "An API is a way for software tools to talk to each other. Agents are AI systems that can take multiple steps toward a goal. Agents can be useful, but they are usually not the first project for a business that does not yet have clear prompts, clean data, and review rules.",
    ],
    exercise: "Create a one-page company glossary with the terms AI, automation, LLM, prompt, API, token, context window, and agent.",
  },
  {
    title: "Chapter 3: Prompting That Produces Business Output",
    body: [
      "Good prompting starts with context. Tell AI what business you are in, who the audience is, what the task is, what source material matters, and what the output should be used for. The more the work affects revenue, customer trust, or public reputation, the more context and review you need.",
      "Use this structure: role, task, context, constraints, examples, output format, review criteria. For example: 'Act as an operations assistant. Turn these messy meeting notes into a decision log, owner list, and next actions. Keep the tone concise. Flag anything unclear instead of inventing details.'",
      "When the first answer is weak, do not restart from scratch. Diagnose it. Was the goal unclear? Was the audience missing? Did you forget examples? Did you fail to define the format? Revision is part of prompting. A practical second prompt is: 'This is too generic. Make it specific to a local service business, remove buzzwords, and add a checklist my assistant can follow.'",
    ],
    exercise: "Turn one task you do often into a reusable prompt template with role, task, context, constraints, examples, and output format.",
  },
  {
    title: "Chapter 4: Verification And Human Review",
    body: [
      "AI can sound confident while being wrong. This is not a minor detail. It is the reason every business workflow needs a review rule. The question is not whether AI is useful. The question is which outputs can be used directly, which need light review, and which require careful human approval.",
      "Use stricter review for facts, numbers, legal claims, medical claims, financial claims, customer promises, public-facing content, hiring decisions, and anything involving private data. Use lighter review for brainstorming, formatting, summarizing your own notes, and first drafts that will never be sent without editing.",
      "A simple verification workflow has four steps: ask AI to cite the source material it used, check important claims against trusted sources, ask AI to identify weak assumptions, and require a human to approve sensitive output before it leaves the company.",
    ],
    exercise: "Create three review labels for your business: safe to draft, review before use, and human-only decision.",
  },
  {
    title: "Chapter 5: Choosing The First AI Project",
    body: [
      "The best first AI project is boring in the right way. It should happen often, have clear inputs, have a recognizable output, save time or improve consistency, and be easy for a human to review. Avoid starting with a project that needs perfect data, complex integrations, or fully autonomous decisions.",
      "Score project ideas against four ROI categories: saves time, creates revenue, reduces errors, and improves speed of decision-making. A good first project usually scores well in at least two categories. If the project also helps the team learn how to use AI better, it is an even stronger candidate.",
      "Your recommended first project in this report is not meant to be the final AI strategy. It is the first useful build. Once one workflow works, you can document it, train the team, and use the same pattern on the next workflow.",
    ],
    exercise: "List five possible AI workflows, then pick the one with the clearest input, output, owner, and review step.",
  },
  {
    title: "Chapter 6: Tools, Automations, And When To Keep It Simple",
    body: [
      "Most businesses do not need a complicated tool stack to get their first AI win. Start with one strong AI chat tool and one place to store examples, prompts, and review rules. Add automation only when the manual workflow is already clear.",
      "Use ChatGPT, Claude, Gemini, or Perplexity for drafting, summarizing, rewriting, research support, and decision support. Use Zapier, Make, or n8n when a repeated process needs to move information between apps. Use custom GPTs or assistants when you have stable instructions and examples that should be reused.",
      "Do not build an advanced agent just because it sounds impressive. Agents are useful when the task has multiple steps, clear boundaries, reliable data, and low-risk actions. If your automation score is still low, start with human-approved drafts and checklists before trying autonomous workflows.",
    ],
    exercise: "Choose one tool for drafting, one tool for workflow storage, and one automation tool to learn only after the workflow is proven manually.",
  },
  {
    title: "Chapter 7: Privacy, Cost, And Company Rules",
    body: [
      "AI privacy is mostly about rules before tools. Your team should know what they can paste into AI, what they cannot paste, and when they must ask for approval. Never paste passwords, API keys, private client data, confidential legal documents, or sensitive financial details into tools that are not approved for that use.",
      "Cost has two layers. A subscription such as ChatGPT Plus is a fixed monthly tool cost. API usage is usually pay-as-you-go based on model choice and volume. API can be cheap for small workflows and expensive for high-volume workflows, so estimate usage before scaling.",
      "A simple AI policy is enough for many small teams: approved tools, prohibited data, review rules, where prompts are stored, who owns each workflow, and how results are measured. Keep it short enough that people will actually use it.",
    ],
    exercise: "Write five company AI rules: approved tools, prohibited data, review requirements, workflow owner, and where examples are stored.",
  },
  {
    title: "Chapter 8: Team Adoption And The 7-Day Implementation Sprint",
    body: [
      "Team adoption works best when AI is presented as an assistant, not a threat. Give people specific use cases, show examples, and make the first workflows practical. A team does not need twenty tools. It needs one or two reliable patterns that make daily work easier.",
      "Documentation turns individual AI experiments into company capability. Save the prompt, source examples, review checklist, owner, and before-and-after result. If the workflow saves time or improves quality, train the next person on it.",
      "Use the 7-day plan in this report as your sprint. The goal is not to finish every AI idea. The goal is to ship one small workflow that proves value and teaches the business how to build the next one.",
    ],
    exercise: "Choose one person, one workflow, one review step, and one metric for the next seven days.",
  },
];

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
  text(page, title, margin, 706, 24, navy, true);
  state.pages.push(page);
  state.page = page;
  state.y = 672;
}

function ensureSpace(state: PdfState, height: number, title?: string) {
  if (state.y - height < 58) newContentPage(state, title);
}

function addCard(state: PdfState, title: string, body: string[], options?: { accent?: boolean; compact?: boolean }) {
  const width = pageWidth - margin * 2;
  const titleLines = wrap(title, maxChars(width - 28, 14));
  const bodyLines = body.flatMap((item) => wrap(item, maxChars(width - 28, 9.5)));
  const height = 24 + titleLines.length * 18 + bodyLines.length * 14 + (options?.compact ? 8 : 18);
  ensureSpace(state, height + 14, title);
  const y = state.y - height;
  rect(state.page, margin, y, width, height, options?.accent ? blueWash : white, line);
  rect(state.page, margin, y + height - 5, width, 5, options?.accent ? electric : navy);
  let cursor = y + height - 26;
  cursor = textLines(state.page, titleLines, margin + 18, cursor, 14, navy, true, 18) - 2;
  bodyLines.forEach((lineValue) => {
    text(state.page, lineValue, margin + 18, cursor, 9.5, slate);
    cursor -= 14;
  });
  state.y = y - 14;
}

function addSectionTitle(state: PdfState, title: string) {
  ensureSpace(state, 42, title);
  text(state.page, title, margin, state.y, 20, navy, true);
  rect(state.page, margin, state.y - 12, 78, 3, electric);
  state.y -= 34;
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
      "Read the chapters in order if AI still feels scattered. If your roadmap marks a module as Summary or Skip, move quickly through that chapter and spend more time on the exercises connected to your gaps.",
      "This course is designed to help you choose one useful AI project, build it with human review, and avoid random tool overload.",
    ],
    { accent: true },
  );

  courseChapters.forEach((chapter) => {
    addSectionTitle(state, chapter.title);
    chapter.body.forEach((paragraph) => addCard(state, "", [paragraph], { compact: true }));
    addCard(state, "Exercise", [chapter.exercise], { accent: true, compact: true });
  });

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
