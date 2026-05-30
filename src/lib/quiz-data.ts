import type { CategoryKey, Question, QuestionOption } from "@/lib/types";

function option(id: string, label: string, category: CategoryKey, earnsPoints = false): QuestionOption {
  return { id, label, points: earnsPoints ? 10 : 0, category };
}

function single(id: string, title: string, category: CategoryKey, labels: string[], scoringIndex: number): Question {
  return {
    id,
    title,
    type: "single",
    options: labels.map((label, index) => option(`${id}_${String.fromCharCode(97 + index)}`, label, category, index === scoringIndex)),
  };
}

export const quizQuestions: Question[] = [
  single(
    "q1",
    'You receive a customer message: "I was charged twice for order #4471 and nobody answered my two emails." Which AI-drafted reply is best?',
    "prompting",
    [
      '"Thank you for your feedback! We value your business and will look into it. Have a great day!"',
      '"Dear valued customer, we apologize for any inconvenience. Your satisfaction is our top priority."',
      "\"I'm sorry about the double charge on #4471 and that your earlier emails went unanswered. I've flagged the duplicate for refund and will confirm by email within 24 hours.\"",
      "\"We've received your message about #4471. Please allow 5-7 business days for a response.\"",
    ],
    2,
  ),
  single(
    "q2",
    'AI tells you: "Ad spend rose 20% and sales rose 20% the same month, so the ads work - every dollar of spend returns a dollar of sales." What\'s the main problem?',
    "verification",
    [
      "Percentages should be shown as decimals.",
      "A matching percentage rise doesn't prove the ads caused the sales, and equal percentages don't mean a dollar-for-dollar return.",
      "20% is too small to matter.",
      "It should have compared to last year.",
    ],
    1,
  ),
  single(
    "q3",
    'A customer review reads: "Fast shipping and the product is solid, though the box was a bit dented." Which AI summary is accurate?',
    "verification",
    [
      '"Customer is happy with shipping and quality; minor complaint about packaging."',
      '"Customer is satisfied overall and would recommend to others."',
      '"Customer had shipping delays but liked the product."',
      '"Customer was unhappy with the product quality."',
    ],
    0,
  ),
  single(
    "q4",
    'Someone prompts "Give me advice on growing my business" and gets a vague, useless answer. Which single change improves the result most?',
    "prompting",
    [
      'Add "please" and "thank you."',
      'Tell it to "be more specific and detailed."',
      "Add what the business is, its size, the specific bottleneck, and what decision a good answer would let them make.",
      "Ask for the answer in bullet points.",
    ],
    2,
  ),
  single(
    "q5",
    "You want AI's help writing a hiring plan. Which prompt produces the best result?",
    "prompting",
    [
      '"Act as a world-class HR expert and write me a hiring plan."',
      '"Write a hiring plan."',
      "\"We're a 6-person agency adding 2 designers in 3 months on a $90k budget. Draft a hiring plan and tell me the biggest risk in my timeline.\"",
      '"Act as the best recruiter in the world and think step by step."',
    ],
    2,
  ),
  single(
    "q6",
    "For which task is it most acceptable to use AI output with little or no checking?",
    "verification",
    [
      "Brainstorming internal ideas you'll evaluate yourself anyway.",
      "The final figures on a client invoice.",
      "A public statement issued under your company's name.",
      "Summarizing a contract you're about to sign.",
    ],
    0,
  ),
  single(
    "q7",
    "You need 50 personalized outreach messages. Which approach gets all 50 done well with the least of your time?",
    "automationTools",
    [
      "Write all 50 yourself.",
      "Write one strong message and manually rewrite it 50 times.",
      "Write one template with instructions, give AI the 50 contacts' details, generate all at once, then spot-check a sample.",
      "Have AI write one message and send it identically to all 50.",
    ],
    2,
  ),
  single(
    "q8",
    "You want AI to screen inbound job applicants, but you've never defined what a strong applicant looks like. Strongest first move:",
    "teamPrivacyImplementation",
    [
      'Tell AI "build me an applicant screening system."',
      "Upgrade to the most advanced model.",
      "Write out, in your own words, the signals separating a strong applicant from a weak one - then build the screen around those.",
      "Have AI invent the criteria and use them as-is.",
    ],
    2,
  ),
  single(
    "q9",
    "You're deciding where to spend effort. Which task is a waste to put AI on, because the rule never changes?",
    "automationTools",
    [
      "Drafting replies to varied customer questions.",
      "Copying a customer's address from a form into your CRM every time one is submitted.",
      "Summarizing messy meeting notes.",
      "Deciding which leads look most promising.",
    ],
    1,
  ),
  single(
    "q10",
    "You want a system that, with no human touching it, researches a new lead, writes a tailored email, sends it, and books a call if they reply. What does this require, and what's the main risk?",
    "automationTools",
    [
      "One well-crafted prompt; risk is it runs too long.",
      "A bigger context window; risk is it forgets.",
      "An agent that can act across tools with defined permissions; risk is it taking wrong actions with no human review step.",
      "A faster model; risk is cost.",
    ],
    2,
  ),
  single(
    "q11",
    'You ask AI to "summarize this report in 3 bullets and flag any financial risks." It returns a clean, accurate 3-bullet summary. Most important thing to notice?',
    "verification",
    [
      "Whether the bullets are grammatically parallel.",
      "It never flagged the financial risks - AI often silently drops a second instruction.",
      "Whether 3 bullets is enough.",
      "Whether the tone is formal enough.",
    ],
    1,
  ),
  single(
    "q12",
    "AI's draft is 90% right but contains one clearly false claim about your industry. Best next move:",
    "prompting",
    [
      "Accept it and fix the claim yourself later.",
      "Throw it out and start with a brand-new prompt.",
      "Point to the specific false claim, explain why it's wrong, and have it revise the rest intact.",
      'Ask it to "double-check everything."',
    ],
    2,
  ),
  single(
    "q13",
    "Tool A costs $30/month and saves 1 hour a week of admin. Tool B costs $120/month and saves 8 hours a week on your highest-value work. How should you choose?",
    "businessStrategy",
    [
      "Pick A - it's cheaper.",
      "Weigh each tool's cost against the value of the time it frees, not its sticker price.",
      "Pick neither until both are free.",
      "Pick A because $120 is too much for software.",
    ],
    1,
  ),
  single(
    "q14",
    "If you could point AI at only one thing in your business for the biggest return, the best target is:",
    "businessStrategy",
    [
      "Whatever annoys you most.",
      "Whatever a competitor is doing.",
      "A task that's repetitive, high-volume, and follows a learnable pattern.",
      "The most complex, judgment-heavy decision you make.",
    ],
    2,
  ),
  single(
    "q15",
    'You give AI a 20-page report and ask for "the three biggest risks." It returns three - all drawn from the first two pages. Most likely explanation and fix?',
    "aiBasics",
    [
      "The report only has risks on the first two pages.",
      "The AI is lazy; just ask again.",
      "It may be over-weighting the start of a long input; have it work through the report section by section and list risks per section.",
      "You need a newer model.",
    ],
    2,
  ),
];
