import { quizQuestions } from "@/lib/quiz-data";
import type { Answers, CategoryKey, CourseRecommendation, ProjectRecommendation, QuestionOption, QuizResult } from "@/lib/types";

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
      "How to choose and document your first AI improvement project",
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

const categoryKeys: CategoryKey[] = ["aiBasics", "prompting", "verification", "businessStrategy", "automationTools", "teamPrivacyImplementation"];

const maxRawScore = Math.max(
  1,
  quizQuestions.reduce((total, question) => {
    if (question.type === "multi") {
      const positivePoints = question.options
        .filter((option) => option.points > 0)
        .reduce((sum, option) => sum + option.points, 0);
      return total + Math.min(positivePoints, question.maxPoints ?? positivePoints);
    }
    return total + Math.max(...question.options.map((option) => Math.max(0, option.points)));
  }, 0),
);

type TierInfo = {
  max: number;
  level: string;
  tierLabel: string;
  description: string;
  pdfBand: "beginner" | "intermediate" | "advanced";
};

const tierTable: TierInfo[] = [
  {
    max: 20,
    level: "0",
    tierLabel: "AI-Unaware",
    description: "You have not used AI in a meaningful way yet, or you are actively avoiding it.",
    pdfBand: "beginner",
  },
  {
    max: 40,
    level: "1",
    tierLabel: "AI-Curious",
    description: "You are aware of AI, but it is not yet part of how your business operates.",
    pdfBand: "beginner",
  },
  {
    max: 60,
    level: "2",
    tierLabel: "AI-Beginner",
    description: "You use AI occasionally, mostly through simple chat prompts.",
    pdfBand: "beginner",
  },
  {
    max: 80,
    level: "3",
    tierLabel: "AI-Casual User",
    description: "You use AI regularly, but it is still mostly a personal productivity tool.",
    pdfBand: "intermediate",
  },
  {
    max: 100,
    level: "4",
    tierLabel: "AI-Practitioner",
    description: "You are above average with prompting and are starting to use AI with more structure.",
    pdfBand: "intermediate",
  },
  {
    max: 120,
    level: "5",
    tierLabel: "AI-Builder",
    description: "You build reusable prompts, custom GPTs, projects, or light automations.",
    pdfBand: "intermediate",
  },
  {
    max: 140,
    level: "6",
    tierLabel: "AI-Operator",
    description: "You run scheduled automations and use multiple models or tools in real workflows.",
    pdfBand: "advanced",
  },
  {
    max: 160,
    level: "7",
    tierLabel: "AI-Strategist",
    description: "You combine stronger prompting, verification, team adoption, and workflow strategy.",
    pdfBand: "advanced",
  },
  {
    max: 180,
    level: "8",
    tierLabel: "AI-Engineer",
    description: "You build or operate agents that can run unattended on meaningful workflows.",
    pdfBand: "advanced",
  },
  {
    max: 200,
    level: "9-10",
    tierLabel: "AI-Native",
    description: "You are operating with product-grade AI, agents, MCP, or multi-agent systems.",
    pdfBand: "advanced",
  },
];

function selectedIds(answer: unknown): string[] {
  if (Array.isArray(answer)) return answer;
  if (typeof answer === "string" && answer.length > 0) return [answer];
  return [];
}

function selectedOptions(questionId: string, answers: Answers) {
  const question = quizQuestions.find((item) => item.id === questionId);
  if (!question) return [];
  const answer = answers[questionId];
  if (typeof answer === "number") return question.options.filter((option) => option.points === answer);
  const ids = selectedIds(answer);
  return ids.map((id) => question.options.find((option) => option.id === id)).filter(Boolean) as QuestionOption[];
}

function emptyCategoryTotals() {
  return Object.fromEntries(categoryKeys.map((category) => [category, 0])) as Record<CategoryKey, number>;
}

function cappedQuestionContribution(options: QuestionOption[], maxPoints?: number, floorAtZero = false) {
  const raw = options.reduce((sum, option) => sum + option.points, 0);
  const positiveRaw = Math.max(0, raw);
  const cappedTotal = Math.min(positiveRaw, maxPoints ?? positiveRaw);
  const categoryPoints = emptyCategoryTotals();

  if (floorAtZero && raw < 0) return { rawScore: 0, categoryPoints };
  if (positiveRaw === 0) return { rawScore: 0, categoryPoints };

  const scale = positiveRaw > cappedTotal ? cappedTotal / positiveRaw : 1;
  for (const option of options) {
    if (option.points > 0) categoryPoints[option.category] += option.points * scale;
  }
  return { rawScore: cappedTotal, categoryPoints };
}

function scoreQuestion(questionId: string, answers: Answers) {
  const question = quizQuestions.find((item) => item.id === questionId);
  if (!question) return { rawScore: 0, categoryPoints: emptyCategoryTotals() };
  const options = selectedOptions(questionId, answers);
  return cappedQuestionContribution(options, question.maxPoints);
}

function maxCategoryPoints() {
  const totals = emptyCategoryTotals();
  for (const question of quizQuestions) {
    if (question.type !== "multi") {
      const best = question.options.reduce((current, option) => (option.points > current.points ? option : current), question.options[0]);
      totals[best.category] += Math.max(0, best.points);
    } else {
      const positiveOptions = question.options.filter((option) => option.points > 0);
      const { categoryPoints } = cappedQuestionContribution(positiveOptions, question.maxPoints);
      for (const category of categoryKeys) totals[category] += categoryPoints[category];
    }
  }
  return totals;
}

function iqFromRaw(rawScore: number) {
  const boundedRawScore = Math.max(0, Math.min(maxRawScore, rawScore));
  return Math.round((boundedRawScore / maxRawScore) * 200);
}

function tierFor(iqScore: number) {
  return tierTable.find((tier) => iqScore <= tier.max) ?? tierTable[tierTable.length - 1];
}

export function percentileForIq(iqScore: number) {
  const z = (iqScore - 60) / 25;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const probability =
    d *
    t *
    (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  const cdf = z > 0 ? 1 - probability : probability;
  return Math.min(99, Math.max(1, Math.round(cdf * 100)));
}

function riskFlags() {
  return [];
}

function course(status: CourseRecommendation["status"], key: keyof typeof modules, reason: string): CourseRecommendation {
  return { ...modules[key], status, reason };
}

function routeModules(pdfBand: "beginner" | "intermediate" | "advanced", scores: Record<CategoryKey, number>, flags: string[]) {
  const recommendedModules: CourseRecommendation[] = [];
  const skippedModules: CourseRecommendation[] = [];
  const add = (item: CourseRecommendation) => (item.status === "Skip" ? skippedModules.push(item) : recommendedModules.push(item));
  const beginner = pdfBand === "beginner";
  const intermediate = pdfBand === "intermediate";

  if (beginner) {
    add(course("Full", "module1", "AI foundations should come first."));
    add(course("Full", "module2", "Model behavior and verification need to be clear before scaling usage."));
    add(course("Beginner", "module3", "Start with one high-ROI workflow instead of a broad AI plan."));
    add(course("Beginner", "module4", "Use practical tools and simple workflows before advanced automation."));
  } else if (intermediate) {
    add(course(scores.aiBasics < 70 ? "Full" : "Summary", "module1", "Refresh the fundamentals that affect business decisions."));
    add(course(scores.verification < 70 ? "Full" : "Practical", "module2", "Strengthen trust, verification, and model limits."));
    add(course("Full", "module3", "Turn AI ideas into a prioritized business roadmap."));
    add(course("Full", "module4", "Move from ad hoc AI use into reusable workflows."));
  } else {
    add(course(scores.aiBasics < 75 ? "Summary" : "Skip", "module1", "Move quickly through fundamentals unless a gap remains."));
    add(course(scores.verification < 80 ? "Practical" : "Summary", "module2", "Keep the verification framework sharp."));
    add(course("Advanced", "module3", "Focus on higher-ROI project selection and strategic leverage."));
    add(course("Advanced", "module4", "Evaluate advanced automation, voice AI, and agent use cases."));
  }

  if (scores.teamPrivacyImplementation < 80 || flags.length > 0) add(course("Full", "module5", "Privacy, cost, and safety rules need attention."));
  else add(course("Advanced", "module5", "Tighten cost controls and security practices for scale."));

  if (scores.teamPrivacyImplementation < 75 || beginner || intermediate) add(course("Full", "module6", "Team adoption and workflow documentation will help turn AI into capability."));
  else add(course("Skip", "module6", "Your answers show enough team implementation structure for this stage."));

  add(course("Full", "bonus", "Use the FAQ to handle common objections and sharpen owner judgment."));
  return { recommendedModules, skippedModules };
}

function firstProject(scores: Record<CategoryKey, number>): ProjectRecommendation {
  const weakest = (Object.entries(scores) as Array<[CategoryKey, number]>).sort((a, b) => a[1] - b[1])[0]?.[0];

  if (weakest === "businessStrategy") {
    return {
      name: "AI Lead Follow-Up Assistant",
      description: "Use this first to connect AI decisions to revenue: qualify leads, draft follow-ups, summarize conversations, and keep opportunities from going cold.",
    };
  }
  if (weakest === "prompting") {
    return {
      name: "AI Customer Reply Drafting Assistant",
      description: "Build a simple workflow that turns customer context into specific, empathetic reply drafts with a human review step before anything goes out.",
    };
  }
  if (weakest === "verification") {
    return {
      name: "AI Verification Checklist Workflow",
      description: "Create a repeatable review process for facts, numbers, claims, summaries, and customer-facing outputs before AI work is trusted.",
    };
  }
  if (weakest === "automationTools") {
    return {
      name: "AI Operations Assistant",
      description: "Start with a repeated workflow that uses AI for judgment and automation for routing, while keeping approvals on important actions.",
    };
  }
  if (weakest === "teamPrivacyImplementation") {
    return {
      name: "AI Hiring & Review Assistant",
      description: "Define clear criteria, permissions, and human review steps before using AI to screen applicants, leads, or team workflows.",
    };
  }
  return {
    name: "AI Report Review Assistant",
    description: "Use AI to work through long documents section by section, extract risks, and produce a human-reviewed decision summary.",
  };
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
  const strengths = entries.filter(([, score]) => score >= 70).map(([key]) => `Strong ${labels[key]} foundation`);
  const gaps = entries
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([key]) => `Improve ${labels[key]} to raise your AI Business IQ`);
  if (flags.length > 0) gaps.unshift("Stop sensitive data from entering unapproved AI tools");
  return {
    strengths: strengths.length ? strengths : ["You have enough signal to choose a focused first AI project"],
    gaps,
  };
}

function roadmapText(result: Omit<QuizResult, "generatedRoadmap">) {
  return `${result.name}'s AI Business IQ is ${result.overallScore} (${result.profile} · Level ${result.level}/10) based on ${result.rawScore} raw points across the ${quizQuestions.length}-question assessment. First project: ${result.recommendedProject.name}. Focus first on ${result.recommendedModules
    .slice(0, 3)
    .map((item) => `${item.module} (${item.status})`)
    .join(", ")} to raise the next version of the score.`;
}

export function calculateResult(answers: Answers, name: string, email: string | null = null): QuizResult {
  const categoryPoints = emptyCategoryTotals();
  let rawScore = 0;

  for (const question of quizQuestions) {
    const contribution = scoreQuestion(question.id, answers);
    rawScore += contribution.rawScore;
    for (const category of categoryKeys) categoryPoints[category] += contribution.categoryPoints[category];
  }
  categoryPoints.teamPrivacyImplementation = Math.max(0, categoryPoints.teamPrivacyImplementation);

  const maxPoints = maxCategoryPoints();
  const categoryScores = Object.fromEntries(
    categoryKeys.map((category) => [
      category,
      Math.round((categoryPoints[category] / Math.max(1, maxPoints[category])) * 100),
    ]),
  ) as Record<CategoryKey, number>;

  const overallScore = iqFromRaw(rawScore);
  const tier = tierFor(overallScore);
  const flags = riskFlags();
  const { recommendedModules, skippedModules } = routeModules(tier.pdfBand, categoryScores, flags);
  const recommendedProject = firstProject(categoryScores);
  const { strengths, gaps } = insightLists(categoryScores, flags);

  const sortedGaps = Object.entries(categoryScores)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3)
    .map(([key]) => key as CategoryKey);

  const dynamicLessons: Record<CategoryKey, string> = {
    aiBasics: "Plain-English breakdown of every AI buzzword",
    prompting: "Prompting 101 - context, constraints, and examples that get better output",
    verification: "When to trust AI and when to verify",
    businessStrategy: "How to choose your first AI project",
    automationTools: "No-code AI tools - n8n, Make, Zapier with AI in the loop",
    teamPrivacyImplementation: "What not to paste into AI tools",
  };

  const base = {
    name,
    email,
    answers,
    categoryScores,
    rawScore: Number(rawScore.toFixed(1)),
    overallScore,
    percentile: percentileForIq(overallScore),
    profile: tier.tierLabel,
    level: tier.level,
    pdfBand: tier.pdfBand,
    profileDescription: tier.description,
    strengths,
    gaps,
    skippedModules,
    recommendedModules,
    optionalReviewLessons: sortedGaps.map((key) => dynamicLessons[key]),
    recommendedProject,
    actionPlan,
    riskFlags: flags,
    createdAt: new Date().toISOString(),
  };

  return { ...base, generatedRoadmap: roadmapText(base) };
}
