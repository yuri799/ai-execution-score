import type { Answers, CategoryKey, CourseRecommendation, ProjectRecommendation, QuizResult } from "@/lib/types";

const categoryMap: Record<string, CategoryKey[]> = {
  q1: ["aiBasics", "automationTools"],
  q2: ["aiBasics", "automationTools"],
  q3: ["aiBasics"],
  q4: ["aiBasics", "automationTools"],
  q5: ["prompting"],
  q6: ["prompting"],
  q7: ["prompting"],
  q8: ["prompting"],
  q9: ["verification"],
  q10: ["verification"],
  q11: ["verification", "teamPrivacyImplementation"],
  q15: ["businessStrategy"],
  q16: ["automationTools"],
  q17: ["automationTools"],
  q18: ["automationTools", "teamPrivacyImplementation"],
  q19: ["teamPrivacyImplementation"],
  q20: ["teamPrivacyImplementation", "verification"],
};

const modules = {
  module1: {
    module: "Module 1: Demystifying AI",
    lessons: [
      "Plain-English breakdown of every AI buzzword",
      "AI vs Machine Learning vs LLMs",
      "ChatGPT, Claude, Gemini, and Perplexity",
      "Automation vs AI",
      "Glossary: GPT, LLM, API, tokens, prompts, agents",
    ],
  },
  module2: {
    module: "Module 2: How AI Models Work",
    lessons: [
      "How AI generates text",
      "What a prompt really is",
      "Why AI hallucinates",
      "Why different models give different answers",
      "When to trust AI and when to verify",
      "Tokens, context windows, and memory limits",
    ],
  },
  module3: {
    module: "Module 3: AI Strategy for Your Business",
    lessons: [
      "Where AI creates maximum ROI",
      "The 4 ROI categories",
      "How to choose your first AI project",
      "Lead generation and follow-up",
      "Content and marketing",
      "Admin, inbox, and operations",
      "Customer service AI",
      "Spotting AI opportunities in your business",
      "What to bring to your mastermind session with Kai",
    ],
  },
  module4: {
    module: "Module 4: AI Tools You'll Actually Use",
    lessons: [
      "ChatGPT vs Claude vs Gemini vs Perplexity",
      "Prompting 101",
      "AI for email, content, and customer replies",
      "Voice AI for lead calling",
      "No-code AI tools: n8n, Make, Zapier",
      "Agents and agentic AI",
      "When agents are useful and when they are overkill",
    ],
  },
  module5: {
    module: "Module 5: Cost, Pricing, Privacy & Security",
    lessons: [
      "What AI actually costs",
      "Free vs paid tools",
      "Model pricing vs API pricing",
      "Why API usage can be cheap or expensive depending on volume",
      "How to estimate AI project costs",
      "What not to paste into AI tools",
      "Basic security checklist for small teams",
    ],
  },
  module6: {
    module: "Module 6: Team Adoption",
    lessons: [
      "How to introduce AI without scaring the team",
      "AI as assistant, not replacement",
      "How to pick 1-3 pilot use cases",
      "How to create simple company AI rules",
      "How to train your team to prompt better",
      "How to document AI workflows",
      "How to prevent random tool overload",
    ],
  },
  bonus: {
    module: "Bonus: AI Myth-Busting + FAQ",
    lessons: [
      "Will AI replace my team?",
      "Is my data safe?",
      "How fast is this changing?",
      "Do I need to learn coding?",
      "What should I automate first?",
      "What should I never automate?",
      "Live Q&A recap from mastermind sessions",
    ],
  },
};

export const actionPlan = [
  "Day 1: Identify the exact task or workflow.",
  "Day 2: Document how it currently works.",
  "Day 3: Gather examples and inputs.",
  "Day 4: Create your first AI prompt or workflow.",
  "Day 5: Test it on real examples.",
  "Day 6: Add a human review step.",
  "Day 7: Measure whether it saves time, improves quality, or creates value.",
];

function selected(answer: unknown): string[] {
  if (Array.isArray(answer)) return answer.map(answerText);
  if (typeof answer === "string" && answer.length > 0) return [answerText(answer)];
  return [];
}

function answerText(answer: string) {
  return answer.replace(/^[A-I]\.\s/, "");
}

function singleScore(answer: unknown): number {
  const letter = typeof answer === "string" ? answer.charAt(0) : "";
  return Math.max(0, ["A", "B", "C", "D", "E"].indexOf(letter));
}

function q2Score(answer: unknown): number {
  const values = selected(answer);
  if (values.includes("None of these")) return 0;
  return (Math.min(values.length, 8) / 8) * 4;
}

function sensitiveDataScore(answer: unknown): number {
  const values = selected(answer);
  if (values.includes("None without review")) return 4;
  const sensitive = ["Passwords / API keys", "Financial data", "Private client data", "Legal documents"];
  const riskCount = values.filter((value) => sensitive.includes(value)).length;
  if (values.includes("Passwords / API keys")) return 0;
  if (riskCount >= 2) return 0.5;
  if (riskCount === 1 || values.includes("Customer emails")) return 1.5;
  if (values.includes("Internal SOPs")) return 3;
  return 3.5;
}

function answerScore(questionId: string, answer: unknown): number {
  if (questionId === "q2") return q2Score(answer);
  if (questionId === "q20") return sensitiveDataScore(answer);
  return singleScore(answer);
}

function profileFor(score: number) {
  if (score <= 30) return "AI Beginner";
  if (score <= 50) return "AI User";
  if (score <= 70) return "AI Operator";
  if (score <= 85) return "AI Builder";
  return "AI Strategist";
}

function profileDescription(profile: string) {
  const descriptions: Record<string, string> = {
    "AI Beginner": "You need a clear foundation, simple language, and one practical business use case before adding more tools.",
    "AI User": "You have useful exposure, but your biggest gains will come from structure, repeatable prompts, and smarter project selection.",
    "AI Operator": "You are ready to turn individual AI usage into documented business workflows with review steps and ROI tracking.",
    "AI Builder": "You can move beyond ad hoc tool use and build durable systems, automations, and team practices.",
    "AI Strategist": "You are positioned to lead AI execution strategically, prioritize high-ROI systems, and scale adoption across the business.",
  };
  return descriptions[profile];
}

function riskFlags(answers: Answers) {
  const flags: string[] = [];
  const q24 = selected(answers.q20);
  for (const value of ["Passwords / API keys", "Financial data", "Private client data", "Legal documents"]) {
    if (q24.includes(value)) flags.push(value);
  }
  if (q24.includes("Customer emails") && singleScore(answers.q19) < 3) {
    flags.push("Customer emails without privacy rules");
  }
  return flags;
}

function course(status: CourseRecommendation["status"], key: keyof typeof modules, reason: string): CourseRecommendation {
  return { ...modules[key], status, reason };
}

function routeModules(scores: Record<CategoryKey, number>, flags: string[], answers: Answers) {
  const recommendedModules: CourseRecommendation[] = [];
  const skippedModules: CourseRecommendation[] = [];

  const add = (item: CourseRecommendation) => {
    if (item.status === "Skip") skippedModules.push(item);
    else recommendedModules.push(item);
  };

  if (scores.aiBasics < 50) add(course("Full", "module1", "AI basics are the first bottleneck."));
  else if (scores.aiBasics <= 75) add(course("Summary", "module1", "You know the core ideas, but a fast cleanup will help."));
  else add(course("Skip", "module1", "Your AI fundamentals are already strong."));

  if (scores.verification < 60 || scores.aiBasics < 60) add(course("Full", "module2", "Verification and model behavior need stronger foundations."));
  else if (scores.verification <= 80) add(course("Practical", "module2", "Focus on trust, verification, and workflow limits."));
  else add(course("Summary", "module2", "Keep the trust-and-verify lesson, then move quickly."));

  if (scores.businessStrategy < 50) add(course("Beginner", "module3", "You need help choosing the first workflow."));
  else if (scores.businessStrategy <= 75) add(course("Full", "module3", "Strategy is close; this turns ideas into a roadmap."));
  else add(course("Advanced", "module3", "You are ready for higher-ROI project selection."));

  if (scores.automationTools < 50) add(course("Beginner", "module4", "Start with practical tools and simple workflows."));
  else if (scores.automationTools <= 75) add(course("Full", "module4", "You can expand into reusable workflows."));
  else add(course("Advanced", "module4", "You can evaluate agents and deeper automation patterns."));

  if (scores.teamPrivacyImplementation < 80 || flags.length > 0) add(course("Full", "module5", "Privacy, cost, and safety need clear rules."));
  else if (scores.automationTools > 70) add(course("Advanced", "module5", "You are ready to think about API cost and scalable security."));
  else add(course("Summary", "module5", "Keep the essential safety and pricing checklist."));

  if (scores.teamPrivacyImplementation < 80) {
    add(course("Full", "module6", "Team adoption, rules, and workflow documentation are still active needs."));
  } else {
    add(course("Skip", "module6", "Your current answers show enough implementation structure for this stage."));
  }

  add(course("Full", "bonus", "Personalized FAQ support based on your profile."));
  return { recommendedModules, skippedModules };
}

function firstProject(answers: Answers, automationScore: number): ProjectRecommendation {
  const q13 = selected(answers.q12);
  const q15 = selected(answers.q14)[0] ?? "";
  const wants = [...q13, q15];

  const candidates: Array<[string[], ProjectRecommendation]> = [
    [
      ["Email / inbox"],
      {
        name: "AI Email Triage Assistant",
        description:
          "Sort, summarize, and draft replies for incoming emails while flagging urgent, revenue-related, and relationship-sensitive messages for human review.",
      },
    ],
    [
      ["Lead follow-up", "Sales"],
      {
        name: "AI Lead Follow-Up Assistant",
        description:
          "Draft personalized follow-up emails, qualify leads, summarize conversations, and remind the team when a lead needs attention.",
      },
    ],
    [
      ["Content creation", "Content", "Marketing"],
      {
        name: "AI Content Repurposing Workflow",
        description:
          "Turn one long-form content asset into emails, social posts, article outlines, short-form scripts, and promotional angles.",
      },
    ],
    [
      ["Customer service", "Customer support"],
      {
        name: "AI Customer Reply Drafting Assistant",
        description:
          "Draft support replies based on company policies, FAQs, and previous examples while requiring human approval before sending.",
      },
    ],
    [
      ["Operations", "Admin", "Admin work", "Personal productivity"],
      {
        name: "AI Operations Assistant",
        description:
          "Turn recurring admin tasks into documented workflows, checklists, summaries, and action items.",
      },
    ],
    [
      ["Reporting", "Finance / reporting", "Make better/faster decisions"],
      {
        name: "AI Decision Dashboard Assistant",
        description:
          "Summarize reports, highlight key changes, explain what matters, and recommend next actions for human review.",
      },
    ],
    [
      ["Hiring / training", "Hiring / team training"],
      {
        name: "AI Training & SOP Assistant",
        description:
          "Turn existing processes, videos, calls, and notes into SOPs, onboarding guides, checklists, and training lessons.",
      },
    ],
  ];

  const match = candidates.find(([signals]) => signals.some((signal) => wants.includes(signal)));
  const project = match?.[1] ?? candidates[4][1];
  if (automationScore < 40 && project.name.includes("Dashboard")) {
    return candidates[4][1];
  }
  return project;
}

function insightLists(scores: Record<CategoryKey, number>, flags: string[]) {
  const labels: Record<CategoryKey, string> = {
    aiBasics: "AI basics",
    prompting: "prompting",
    verification: "verification",
    businessStrategy: "business strategy",
    automationTools: "automation tools",
    teamPrivacyImplementation: "team privacy and implementation",
  };
  const entries = Object.entries(scores) as Array<[CategoryKey, number]>;
  const strengths = entries
    .filter(([, score]) => score >= 70)
    .map(([key]) => `Strong ${labels[key]} foundation`);
  const gaps = entries
    .filter(([, score]) => score < 55)
    .map(([key]) => `Improve ${labels[key]} before scaling AI`);

  if (flags.length > 0) gaps.push("Create privacy rules before using sensitive business data with AI");
  return {
    strengths: strengths.length ? strengths : ["You have enough signal to choose a focused first AI project"],
    gaps: gaps.length ? gaps : ["Tighten measurement and documentation so AI wins become repeatable"],
  };
}

function roadmapText(result: Omit<QuizResult, "generatedRoadmap">) {
  return `${result.name}'s AI Execution Score is ${result.overallScore}/100 (${result.profile}). First project: ${result.recommendedProject.name}. Start with ${result.recommendedModules
    .slice(0, 3)
    .map((item) => `${item.module} (${item.status})`)
    .join(", ")}. Bring this roadmap to your AI Execution Accelerator session with Kai.`;
}

export function calculateResult(answers: Answers, name: string): QuizResult {
  const buckets: Record<CategoryKey, number[]> = {
    aiBasics: [],
    prompting: [],
    verification: [],
    businessStrategy: [],
    automationTools: [],
    teamPrivacyImplementation: [],
  };

  for (const [questionId, categories] of Object.entries(categoryMap)) {
    const score = answerScore(questionId, answers[questionId]);
    for (const category of categories) buckets[category].push(score);
  }

  const categoryScores = Object.fromEntries(
    Object.entries(buckets).map(([key, values]) => [
      key,
      Math.round((values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1) / 4) * 100),
    ]),
  ) as Record<CategoryKey, number>;

  const overallScore = Math.round(
    categoryScores.aiBasics * 0.15 +
      categoryScores.prompting * 0.15 +
      categoryScores.verification * 0.15 +
      categoryScores.businessStrategy * 0.25 +
      categoryScores.automationTools * 0.15 +
      categoryScores.teamPrivacyImplementation * 0.15,
  );
  const profile = profileFor(overallScore);
  const flags = riskFlags(answers);
  const { recommendedModules, skippedModules } = routeModules(categoryScores, flags, answers);
  const recommendedProject = firstProject(answers, categoryScores.automationTools);
  const { strengths, gaps } = insightLists(categoryScores, flags);

  const base = {
    name,
    email: null,
    answers,
    categoryScores,
    overallScore,
    profile,
    profileDescription: profileDescription(profile),
    strengths,
    gaps,
    skippedModules,
    recommendedModules,
    optionalReviewLessons: [
      "When to trust AI and when to verify",
      "What not to paste into AI tools",
      "How to choose your first AI project",
    ],
    recommendedProject,
    actionPlan,
    riskFlags: flags,
    createdAt: new Date().toISOString(),
  };

  return { ...base, generatedRoadmap: roadmapText(base) };
}
