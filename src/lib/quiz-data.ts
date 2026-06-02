import type { CategoryKey, Question, QuestionOption } from "@/lib/types";

function option(id: string, label: string, category: CategoryKey, earnsPoints = false): QuestionOption {
  return { id, label, points: earnsPoints ? 10 : 0, category };
}

function scoredOption(id: string, label: string, category: CategoryKey, points: number): QuestionOption {
  return { id, label, points, category };
}

function weightedSingle(id: string, title: string, category: CategoryKey, labels: Array<[string, number]>): Question {
  return {
    id,
    title,
    type: "single",
    options: labels.map(([label, points], index) => scoredOption(`${id}_${String.fromCharCode(97 + index)}`, label, category, points)),
  };
}

export const quizQuestions: Question[] = [
  weightedSingle(
    "q1",
    'A customer writes: "I was charged twice for order #4471 and nobody answered my two emails." Which AI reply shows the best judgment before it is sent?',
    "prompting",
    [
      ["A warm apology that says the company values the customer, but avoids mentioning the double charge until support verifies it.", 3],
      ["Acknowledge the double charge and the missed emails, say the duplicate charge is being checked, give a specific update window, and avoid promising a refund until verified.", 10],
      ["Immediately promise a refund and a discount because financial complaints should be handled aggressively.", 5],
      ["Keep it short: say the team received the message and will respond as soon as possible.", 2],
    ],
  ),
  weightedSingle(
    "q2",
    'AI says: "Ad spend rose 20% and sales rose 20%, so the ads created a dollar-for-dollar return." Which missing fact most weakens that conclusion?',
    "verification",
    [
      ["The AI did not say which ad platform was used.", 2],
      ["The same percentage increase does not prove causation or dollar return; you need actual dollars, margins, and a baseline or control period.", 10],
      ["The AI should have rounded the percentages before comparing them.", 0],
      ["A 20% increase is too small to analyze.", 1],
    ],
  ),
  weightedSingle(
    "q3",
    'A review says: "Fast shipping and the product is solid, though the box was a bit dented." Which summary is safest for a business dashboard?',
    "verification",
    [
      ["Positive shipping and product feedback, with a minor packaging issue. No evidence of product damage or recommendation intent.", 10],
      ["The customer is satisfied overall and would recommend the product.", 5],
      ["The customer liked the product but had shipping delays.", 1],
      ["The customer is unhappy because the packaging was damaged.", 2],
    ],
  ),
  weightedSingle(
    "q4",
    'You prompt AI with "Give me advice on growing my business" and get generic advice. Which revision most turns the prompt into a decision tool?',
    "prompting",
    [
      ['"Give me 10 specific ideas in bullet points and make them practical."', 4],
      ['"Act as a world-class growth strategist and think step by step."', 3],
      ['"We are a 6-person local service business with 300 leads/month, weak follow-up, and a $2k/month budget. Rank 3 growth moves by expected ROI, effort, and risk so I can choose one this week."', 10],
      ['"Make the answer shorter, clearer, and more actionable."', 2],
    ],
  ),
  weightedSingle(
    "q5",
    "AI drafts a hiring plan that says you can hire two senior designers in three weeks on a $90k total budget. What follow-up best tests whether the plan is realistic?",
    "prompting",
    [
      ['Ask it to "make the plan more detailed."', 2],
      ["Ask it to list the salary, recruiting, onboarding, timing, and quality assumptions, then identify which assumption is most likely to break.", 10],
      ["Ask it to rewrite the plan in a more confident executive tone.", 0],
      ["Ask it to find cheaper candidates so the budget works.", 4],
    ],
  ),
  weightedSingle(
    "q6",
    "Which AI output can safely receive the lightest human review?",
    "verification",
    [
      ["A brainstormed list of internal campaign ideas that you will filter before using.", 10],
      ["Final invoice numbers for a client.", 0],
      ["A public statement about a sensitive customer issue.", 1],
      ["A summary of a contract you are about to sign.", 2],
    ],
  ),
  weightedSingle(
    "q7",
    "You need 50 personalized outreach messages. You have contact data, a strong example message, and limited time. Which workflow best balances speed, quality, and risk?",
    "automationTools",
    [
      ["Generate all 50 from the contact data and send them automatically because personalization is the main goal.", 3],
      ["Write one template, define the personalization fields, generate all 50, then spot-check a sample and manually review any high-value prospects.", 10],
      ["Write all 50 yourself because AI personalization is too risky.", 2],
      ["Ask AI for one great message and send it to all 50 contacts.", 0],
    ],
  ),
  weightedSingle(
    "q8",
    "You want AI to screen inbound job applicants, but nobody has defined what a strong applicant looks like. What is the real bottleneck?",
    "teamPrivacyImplementation",
    [
      ["The model is not advanced enough yet.", 1],
      ["The team has not made the judgment criteria explicit, so AI has no reliable target to screen against.", 10],
      ["The applicant data needs to be pasted into more AI tools to compare outputs.", 0],
      ["The workflow should be automated first; criteria can be adjusted after the AI starts screening.", 3],
    ],
  ),
  weightedSingle(
    "q9",
    "Which task should be handled by deterministic automation before involving AI?",
    "automationTools",
    [
      ["Drafting replies to varied customer questions.", 2],
      ["Copying a customer's address from a form into the same CRM fields every time.", 10],
      ["Summarizing messy meeting notes.", 3],
      ["Deciding which leads look most promising from messy notes and call history.", 2],
    ],
  ),
  weightedSingle(
    "q10",
    "You want an agent that researches a new lead, drafts a tailored email, sends it, and books a call if they reply. What design is safest?",
    "automationTools",
    [
      ["Let the agent do everything once the prompt is detailed enough.", 1],
      ["Give the agent clear tool permissions, let it research and draft, and require human approval before external sends or calendar changes until it has proven reliable.", 10],
      ["Use a larger context window so the agent remembers the instructions.", 3],
      ["Use the fastest model so mistakes are easier to correct quickly.", 0],
    ],
  ),
  weightedSingle(
    "q11",
    'You ask AI to "summarize this report in 3 bullets and flag any financial risks." It returns three clean bullets but no risk flag. What should you notice?',
    "verification",
    [
      ["The summary may still be useful, but the model silently dropped a second instruction; check each requested output separately.", 10],
      ["The report probably has no financial risks because the AI did not mention any.", 1],
      ["Three bullets is too short for financial analysis.", 3],
      ["The main issue is whether the bullets are written in the same grammatical style.", 0],
    ],
  ),
  weightedSingle(
    "q12",
    "AI's draft is mostly useful but includes one false industry claim that affects a recommendation. What is the best next move?",
    "prompting",
    [
      ["Reject the whole draft and start over with a more powerful prompt.", 2],
      ["Point to the false claim, explain what is wrong, ask it to revise the affected reasoning, and preserve the parts that still hold.", 10],
      ['Ask it to "double-check everything" without naming the error.', 3],
      ["Fix the false sentence yourself and leave the rest unchanged.", 5],
    ],
  ),
  weightedSingle(
    "q13",
    "Tool A costs $30/month and saves 4 hours/month of low-value admin work. Tool B costs $120/month and saves 32 hours/month of high-value sales work. How should you reason about the choice?",
    "businessStrategy",
    [
      ["Pick Tool A because it is cheaper and easier to justify.", 1],
      ["Pick Tool B if the value of the sales time it frees exceeds its higher price; compare net value, not sticker price.", 10],
      ["Pick both only if each tool has a free trial.", 3],
      ["Pick Tool A because smaller tools are safer for a first AI project.", 4],
    ],
  ),
  weightedSingle(
    "q14",
    "You can only improve one workflow with AI this month. Which candidate is strongest?",
    "businessStrategy",
    [
      ["A rare strategic decision that only the owner understands.", 1],
      ["A recurring workflow with high volume, clear examples, measurable outcomes, and a human review point before anything risky happens.", 10],
      ["Whatever task is most annoying this week.", 3],
      ["The workflow a competitor seems to be automating, even if your team has no examples yet.", 2],
    ],
  ),
  weightedSingle(
    "q15",
    'You give AI a 20-page report and ask for "the three biggest risks." It returns three risks, all from the first two pages. What is the best explanation and fix?',
    "aiBasics",
    [
      ["The report probably only contains risks near the beginning.", 1],
      ["The AI may be over-weighting the start of a long input; have it analyze the report section by section, list risks per section, then rank them across the whole report.", 10],
      ["The AI is being lazy; ask the same question again with stronger wording.", 2],
      ["You need a newer model, because newer models do not have this problem.", 3],
    ],
  ),
  {
    id: "q16",
    title: "Do you have a group of people you meet with regularly to bounce AI ideas off of?",
    type: "single",
    options: [
      option("q16_a", "Yes, I meet with them regularly.", "teamPrivacyImplementation"),
      option("q16_b", "Sometimes, but not consistently.", "teamPrivacyImplementation"),
      option("q16_c", "No, I do not have that yet.", "teamPrivacyImplementation"),
    ],
  },
  weightedSingle(
    "q17",
    "Have you built or are you actively using agentic AI tools or workflows, such as OpenClaw, Hermes, custom agents, or tool-using assistants?",
    "automationTools",
    [
      ["Yes - I use one in a real workflow with clear permissions, logs, and human review for risky actions.", 10],
      ["I have built or tested prototypes, but they are not yet reliable enough for production work.", 6],
      ["I use chatbots or simple automations, but not agents that can act across tools.", 3],
      ["No, or I am not sure what agentic AI means yet.", 0],
    ],
  ),
];
