import type { CategoryKey, Question, QuestionOption } from "@/lib/types";

const likertLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] as const;

function option(id: string, label: string, category: CategoryKey, points: number): QuestionOption {
  return { id, label, points, category };
}

function likert(id: string, title: string, category: CategoryKey, reverseScored = false): Question {
  return {
    id,
    title,
    type: "likert",
    reverseScored,
    options: likertLabels.map((label, index) => option(`${id}_${index + 1}`, label, category, reverseScored ? 4 - index : index)),
  };
}

function single(id: string, title: string, category: CategoryKey, labels: Array<[string, number]>): Question {
  return {
    id,
    title,
    type: "single",
    options: labels.map(([label, points], index) => option(`${id}_${String.fromCharCode(97 + index)}`, label, category, points)),
  };
}

function multi(id: string, title: string, category: CategoryKey, labels: Array<[string, number]>, maxPoints: number): Question {
  return {
    id,
    title,
    type: "multi",
    maxPoints,
    options: labels.map(([label, points], index) => option(`${id}_${String.fromCharCode(97 + index)}`, label, category, points)),
  };
}

export const quizQuestions: Question[] = [
  likert("q1", "AI is going to be a net positive force for my business.", "aiBasics"),
  likert("q2", "I am excited about using AI more in my work, not anxious about it.", "aiBasics"),
  likert("q3", "AI replacing human judgment in business is something I worry a lot about.", "verification", true),
  likert("q4", "Businesses that ignore AI for the next two years will fall behind.", "businessStrategy"),
  likert("q5", "I use AI tools at least once every working day.", "businessStrategy"),
  likert("q6", "I have written a prompt longer than three sentences this week.", "prompting"),
  likert("q7", "I have built or customized at least one AI workflow that runs without me babysitting it.", "automationTools"),
  likert("q8", "I have taught at least one person on my team how to use AI for their work.", "teamPrivacyImplementation"),
  likert("q9", "I regularly compare outputs from different AI models for the same task.", "businessStrategy"),
  likert(
    "q10",
    'I understand the difference between "push" prompts (giving the AI instructions) and "pull" prompts (asking the AI to extract information out of me through questions).',
    "prompting",
  ),
  single(
    "q11",
    "Which best describes your prompting style?",
    "prompting",
    [
      ["I just ask questions in one line, like a Google search.", 0],
      ["I write a paragraph with context, but I don't structure it.", 1],
      ["I structure my prompts with role, examples, and constraints.", 2],
      ["I use both push prompts (commands) and pull prompts (AI interviews me) depending on the task.", 3],
      ["I maintain a library of reusable prompts and version them as I learn what works.", 4],
    ],
  ),
  likert(
    "q12",
    'I am familiar with the concept of "agentic AI" - AI that can take multi-step actions on its own to complete a goal.',
    "aiBasics",
  ),
  multi(
    "q13",
    "Which of these have you personally used in the last 30 days? (Choose all that apply.)",
    "automationTools",
    [
      ["ChatGPT", 0.5],
      ["Claude", 0.5],
      ["Gemini", 0.5],
      ["Perplexity", 0.5],
      ["DeepSeek", 0.5],
      ["Cursor / Claude Code / OpenCode", 1],
      ["Hermes Agent", 1],
      ["n8n, Make, or Zapier", 1],
      ["Custom GPTs or Claude Projects", 1],
      ["MCP servers", 1],
      ["None of the above", 0],
    ],
    4,
  ),
  single(
    "q14",
    "Your experience with AI agents (not just chatbots):",
    "automationTools",
    [
      ["I have never used an AI agent - I only use chat interfaces.", 0],
      ["I have tried built-in agent features (deep research, computer use, code interpreter).", 1],
      ["I have used dedicated agent tools like Hermes Agent, OpenCode, or Claude Code.", 2],
      ["I have built my own custom agents that run on a schedule.", 3],
      ["I run multiple agents that coordinate and hand off to each other.", 4],
    ],
  ),
  single(
    "q15",
    "When AI gives you an answer for something important, you typically:",
    "verification",
    [
      ["Trust it and move on.", 0],
      ["Skim it and spot-check the parts that look wrong.", 1],
      ["Verify it against another source.", 2],
      ["Cross-check it with a different AI model.", 3],
      ["Run it through a verification workflow I built for that purpose.", 4],
    ],
  ),
  single(
    "q16",
    "What is the most advanced AI thing you have shipped or used in your business?",
    "businessStrategy",
    [
      ["Nothing yet.", 0],
      ["A few useful ChatGPT habits.", 1],
      ["A custom GPT, Claude Project, or saved prompt I reuse.", 2],
      ["An automation that runs on a schedule without me starting it.", 3],
      ["A multi-agent system with memory that does meaningful work on its own.", 4],
    ],
  ),
  likert(
    "q17",
    'I understand what a "context window" is and how it limits what an AI can remember in one conversation.',
    "aiBasics",
  ),
  likert("q18", "My team has clear guidelines for what business data should and should not go into AI tools.", "teamPrivacyImplementation"),
  likert("q19", "I have a peer group of other business owners I regularly discuss AI strategy with.", "teamPrivacyImplementation"),
  single(
    "q20",
    "Twelve months from now, which best describes where you want your business to be?",
    "businessStrategy",
    [
      ["About the same - wait and see how AI shakes out.", 0],
      ["Using AI more in my own personal workflow.", 1],
      ["Have my whole team using AI consistently.", 2],
      ["Have custom AI tools built specifically for my business.", 3],
      ["Have AI agents running significant parts of the business on their own.", 4],
    ],
  ),
];
