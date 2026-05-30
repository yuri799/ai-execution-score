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

const categoryKeys: CategoryKey[] = ["aiBasics", "prompting", "verification", "businessStrategy", "automationTools", "teamPrivacyImplementation"];

const iqAnchors = [
  [0, 50],
  [20, 70],
  [40, 85],
  [60, 100],
  [80, 115],
  [100, 135],
  [120, 160],
  [135, 190],
  [145, 210],
  [150, 225],
] as const;

function selectedIds(answer: unknown): string[] {
  if (Array.isArray(answer)) return answer;
  if (typeof answer === "string" && answer.length > 0) return [answer];
  return [];
}

function selectedOptions(questionId: string, answers: Answers) {
  const question = quizQuestions.find((item) => item.id === questionId);
  if (!question) return [];
  const ids = selectedIds(answers[questionId]);
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
    if (question.type === "single") {
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

function maxRawPoints() {
  return quizQuestions.reduce((sum, question) => {
    const best = question.options.reduce((current, option) => (option.points > current.points ? option : current), question.options[0]);
    return sum + Math.max(0, best.points);
  }, 0);
}

function iqFromRaw(rawScore: number) {
  const maxRaw = maxRawPoints();
  const scaledRaw = maxRaw > 0 ? (Math.max(0, Math.min(maxRaw, rawScore)) / maxRaw) * 150 : 0;
  for (let i = 0; i < iqAnchors.length - 1; i++) {
    const [rawA, iqA] = iqAnchors[i];
    const [rawB, iqB] = iqAnchors[i + 1];
    if (scaledRaw >= rawA && scaledRaw <= rawB) {
      const progress = (scaledRaw - rawA) / (rawB - rawA);
      return Math.round(iqA + progress * (iqB - iqA));
    }
  }
  return 225;
}

function tierFor(iqScore: number) {
  if (iqScore >= 225) return "AI Genius - Where you need to be";
  if (iqScore >= 190) return "AI Strategist - Top 1%";
  if (iqScore >= 160) return "AI Builder - Top 5%";
  if (iqScore >= 135) return "AI Operator - Top 20%";
  if (iqScore >= 115) return "AI Practitioner - Above Average";
  if (iqScore >= 100) return "AI Capable - At Business Average";
  if (iqScore >= 85) return "AI Aware - Below Business Average";
  if (iqScore >= 70) return "AI Curious - Just Getting Started";
  return "AI Skeptic - Behind the Curve";
}

export function percentileForIq(iqScore: number) {
  const z = (iqScore - 100) / 20;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const probability =
    d *
    t *
    (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  const cdf = z > 0 ? 1 - probability : probability;
  return Math.min(99, Math.max(1, Math.round(cdf * 100)));
}

function profileDescription(profile: string) {
  if (profile.includes("Skeptic") || profile.includes("Curious") || profile.includes("Aware")) {
    return "You are early in the AI adoption curve. Your biggest win is building strong foundations, safer prompting habits, and one clear first workflow.";
  }
  if (profile.includes("Capable") || profile.includes("Practitioner")) {
    return "You are near or above the business-owner average. Your next move is turning individual AI use into repeatable workflows with stronger verification and ROI focus.";
  }
  return "You are ahead of most business owners. The opportunity now is disciplined execution: better systems, sharper automation, safer team rollout, and higher-ROI AI projects.";
}

<<<<<<< HEAD
const riskyOptionIds = ["q25_a", "q25_b", "q25_c", "q25_d", "q25_e", "q25_f"];

function riskFlags(answers: Answers) {
  return selectedOptions("q25", answers)
    .filter((option) => riskyOptionIds.includes(option.id))
    .map((option) => option.label);
=======
function riskFlags() {
  return [];
>>>>>>> dd44680 (modifed files)
}

function course(status: CourseRecommendation["status"], key: keyof typeof modules, reason: string): CourseRecommendation {
  return { ...modules[key], status, reason };
}

function routeModules(profile: string, scores: Record<CategoryKey, number>, flags: string[]) {
  const recommendedModules: CourseRecommendation[] = [];
  const skippedModules: CourseRecommendation[] = [];
  const add = (item: CourseRecommendation) => (item.status === "Skip" ? skippedModules.push(item) : recommendedModules.push(item));
  const beginner = profile.includes("Skeptic") || profile.includes("Curious") || profile.includes("Aware");
  const intermediate = profile.includes("Capable") || profile.includes("Practitioner");

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
  return `${result.name}'s AI Business IQ is ${result.overallScore} (${result.profile}) based on ${result.rawScore} raw points across the 15-question scenario assessment. First project: ${result.recommendedProject.name}. Start with ${result.recommendedModules
    .slice(0, 3)
    .map((item) => `${item.module} (${item.status})`)
    .join(", ")}. Bring this roadmap to your AI Execution Accelerator session with Kai.`;
}

export function calculateResult(answers: Answers, name: string): QuizResult {
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
  const profile = tierFor(overallScore);
  const flags = riskFlags();
  const { recommendedModules, skippedModules } = routeModules(profile, categoryScores, flags);
  const recommendedProject = firstProject(categoryScores);
  const { strengths, gaps } = insightLists(categoryScores, flags);

  const sortedGaps = Object.entries(categoryScores)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3)
    .map(([key]) => key as CategoryKey);

  const dynamicLessons: Record<CategoryKey, string> = {
    aiBasics: "Plain-English breakdown of every AI buzzword",
    prompting: "Prompting 101 — context, constraints, and examples that get better output",
    verification: "When to trust AI and when to verify",
    businessStrategy: "How to choose your first AI project",
    automationTools: "No-code AI tools — n8n, Make, Zapier with AI in the loop",
    teamPrivacyImplementation: "What not to paste into AI tools",
  };

  const base = {
    name,
    email: null,
    answers,
    categoryScores,
    rawScore: Math.round(rawScore),
    overallScore,
    percentile: percentileForIq(overallScore),
    profile,
    profileDescription: profileDescription(profile),
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
