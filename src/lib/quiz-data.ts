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
    "You ask AI to draft a supplier negotiation email. It threatens to cancel the contract unless prices drop 15%, but you never said you had another supplier. What is the main flaw?",
    "prompting",
    [
      ["The email is too aggressive; supplier emails should always be friendly.", 3],
      ["The AI invented leverage and chose a risky tactic without knowing your real position.", 10],
      ["The prompt should have asked for a shorter email.", 1],
      ["The AI should have included more industry jargon to sound credible.", 0],
    ],
  ),
  weightedSingle(
    "q2",
    "AI says your lead funnel improved because conversion rate rose from 10% to 15%. Last month you had 1,000 leads; this month you had 500. What should you check before celebrating?",
    "verification",
    [
      ["Whether the conversion rate was formatted as a percentage or decimal.", 0],
      ["Whether total converted customers, revenue, and lead quality actually improved despite lower volume.", 10],
      ["Whether the AI used the newest model to analyze the funnel.", 1],
      ["Whether the increase from 10% to 15% is large enough to mention.", 3],
    ],
  ),
  weightedSingle(
    "q3",
    'AI recommends a software tool and says it "launched a new enterprise plan last week," but provides no source. What is the correct mental model?',
    "aiBasics",
    [
      ["Treat the claim as plausible text until verified against a current source.", 10],
      ["Trust it if the rest of the recommendation sounds detailed.", 2],
      ["Ask the same model again; if it repeats the claim, it is probably true.", 3],
      ["Ignore the date because tool details do not affect business decisions.", 0],
    ],
  ),
  weightedSingle(
    "q4",
    "You need AI to classify customer messages as Refund, Tech Issue, Angry, or Sales Lead. Which prompt design is most likely to produce consistent results?",
    "prompting",
    [
      ['"Read each message carefully and choose the best label."', 3],
      ["Define each label, give edge-case examples, require one label plus confidence, and specify what to do when two labels fit.", 10],
      ['"Act as a senior customer support expert and think step by step."', 4],
      ["Ask for labels, sentiment, summary, and reply draft in one output so the model has more context.", 2],
    ],
  ),
  weightedSingle(
    "q5",
    "You can run one AI project this month. Which one is the strongest first bet?",
    "businessStrategy",
    [
      ["A rare pricing strategy decision with high upside but little repeatable data.", 2],
      ["A daily customer-message triage workflow with examples, volume, measurable accuracy, and a human review step.", 10],
      ["A payroll compliance assistant that files forms automatically.", 1],
      ["A brand-new product idea generator because innovation has the biggest upside.", 3],
    ],
  ),
  weightedSingle(
    "q6",
    'AI summarizes a meeting as: "Send the revised contract Friday." The transcript says: "Do not send the revised contract until legal reviews it." What should you conclude?',
    "verification",
    [
      ["The summary converted a blocker into an action item, so it needs correction before anyone acts.", 10],
      ["The summary is close enough because Friday was mentioned in the meeting.", 2],
      ["The issue is only that the summary should include more context.", 4],
      ["Legal review is probably implied, so the action item is safe.", 1],
    ],
  ),
  weightedSingle(
    "q7",
    "Support tickets arrive as messy text. You want urgent billing issues routed to a manager and basic how-to questions routed to a help article. What is the best system shape?",
    "automationTools",
    [
      ["Use AI to classify the messy text, then use deterministic rules to route each class.", 10],
      ["Ask AI to read each ticket and decide everything, including who should handle it.", 5],
      ["Use fixed keyword rules only; AI is unnecessary for messy language.", 3],
      ["Send every ticket to a manager until AI becomes fully reliable.", 1],
    ],
  ),
  weightedSingle(
    "q8",
    "Your team is pasting customer emails, names, and order details into personal AI accounts to save time. What is the first governance move?",
    "teamPrivacyImplementation",
    [
      ["Ban all AI until a full legal policy is written.", 3],
      ["Define what data may be used, which tools are approved, who owns review, and what must never be pasted.", 10],
      ["Tell everyone to remove names manually and keep using any tool they prefer.", 5],
      ["Upgrade the team to paid AI accounts and assume privacy is solved.", 2],
    ],
  ),
  weightedSingle(
    "q9",
    "Which workflow should be automated without AI first?",
    "automationTools",
    [
      ["If a web form is submitted, create a CRM contact and send the same welcome email.", 10],
      ["Read a complaint and decide whether it is angry, urgent, or routine.", 2],
      ["Summarize a discovery call into next steps.", 2],
      ["Turn rough notes into a client-ready follow-up.", 1],
    ],
  ),
  weightedSingle(
    "q10",
    "An AI agent can access your CRM, email, calendar, and payment system. Which permission design is most intelligent for launch?",
    "automationTools",
    [
      ["Give full access so the agent can prove whether it saves time.", 0],
      ["Let it read broadly, draft actions, and require approval for sends, calendar changes, discounts, refunds, or payments.", 10],
      ["Let it act freely only during business hours so mistakes can be caught quickly.", 3],
      ["Give access only to email because calendar and payments are more sensitive.", 5],
    ],
  ),
  weightedSingle(
    "q11",
    "AI gives you a confident market-size claim and includes a link. The linked page exists, but it does not support the number. What failed?",
    "verification",
    [
      ["The answer used a real-looking citation without source-to-claim support.", 10],
      ["The source is probably correct because the URL exists.", 1],
      ["The issue is that market-size numbers change too often to use.", 3],
      ["The claim should be trusted if another AI gives the same number.", 2],
    ],
  ),
  weightedSingle(
    "q12",
    "AI gives three marketing ideas. They are creative, but none fit your budget, team, or sales cycle. What follow-up best turns creativity into usable judgment?",
    "prompting",
    [
      ["Ask for ten more creative ideas so there are more options.", 2],
      ["Give budget, team capacity, sales cycle, and success metric, then ask it to rank ideas by expected payoff and execution risk.", 10],
      ["Ask it to make the ideas sound more practical.", 3],
      ["Pick the most exciting idea and ask AI to write a launch plan.", 5],
    ],
  ),
  weightedSingle(
    "q13",
    "Two AI tools save time. Tool A saves 6 admin hours/month. Tool B saves 20 sales hours/month but requires two weeks of setup. What matters most?",
    "businessStrategy",
    [
      ["The monthly subscription price alone.", 1],
      ["Net business value after setup cost, adoption effort, risk, and value of the hours saved.", 10],
      ["Which tool has more features and integrations.", 3],
      ["Which tool is easiest to start using today.", 5],
    ],
  ),
  weightedSingle(
    "q14",
    'You paste a long operations manual into AI and ask, "What are the biggest process risks?" It mostly discusses the opening section. What is the best fix?',
    "aiBasics",
    [
      ["Ask the same question again with stronger wording.", 2],
      ["Break the manual into sections, extract risks per section, then ask AI to rank the combined list.", 10],
      ["Use a more polite prompt so the model pays attention.", 0],
      ["Assume the opening section has the biggest risks because it appears first.", 1],
    ],
  ),
  weightedSingle(
    "q15",
    "Salespeople ignore an AI lead score even though the model looks accurate in a demo. What is the most likely missing system element?",
    "teamPrivacyImplementation",
    [
      ["A feedback loop that shows why leads were scored, lets reps challenge scores, and connects the score to a real sales action.", 10],
      ["A more colorful dashboard so the score is easier to notice.", 2],
      ["A larger model so reps trust the score more.", 3],
      ["A rule that reps must follow the AI score without debate.", 1],
    ],
  ),
  weightedSingle(
    "q17",
    "Have you built or are you actively using agentic AI tools or workflows, such as OpenClaw, Hermes, custom agents, or tool-using assistants?",
    "automationTools",
    [
      ["Yes - in a real workflow with clear permissions, logs, and human approval for risky actions.", 10],
      ["I have built or tested prototypes, but they are not reliable enough for real operations yet.", 6],
      ["I use chatbots or simple automations, but not agents that can act across tools.", 3],
      ["No, or I am not sure what agentic AI means yet.", 0],
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
];
