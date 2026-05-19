export type CourseLesson = {
  title: string;
  paragraphs: string[];
};

export type CourseModule = {
  id: string;
  title: string;
  subtitle: string;
  lessons: CourseLesson[];
  actionStep: string;
};

export const fullCourse: CourseModule[] = [
  {
    id: "module1",
    title: "Module 1: Demystifying AI",
    subtitle: "A plain-English breakdown of every buzzword you have been nodding along to in meetings.",
    lessons: [
      {
        title: "AI vs Machine Learning vs LLMs",
        paragraphs: [
          "Artificial Intelligence is the biggest box. It is the broad idea of getting computers to do things that normally require human intelligence: recognizing a face, recommending a product, beating you at chess, or writing an email.",
          "Machine Learning is a box inside AI. Instead of a human writing rules, machine learning systems learn patterns from data. You feed them examples and they infer the rules.",
          "Large Language Models are a box inside machine learning. They are trained on enormous amounts of text and are extraordinarily good at reading, writing, summarizing, drafting, reasoning, and coding.",
          "When most people say AI today, they almost always mean LLMs. ChatGPT, Claude, and Gemini are examples of LLMs.",
        ],
      },
      {
        title: "ChatGPT, Claude, Gemini, and the Main Players",
        paragraphs: [
          "OpenAI built ChatGPT and kicked off the consumer AI wave. It has strong brand recognition and deep integrations with Microsoft products.",
          "Anthropic built Claude, which is known for long-form writing, nuanced reasoning, coding, and being a cautious work partner.",
          "Google built Gemini and has deep integration into Google Workspace, Search, and Android. It is strong on multimodal work across text, images, and video.",
          "For day-to-day business work, most owners should pick ChatGPT or Claude as their daily driver, then keep the other available to sanity-check important answers.",
        ],
      },
      {
        title: "Automation vs AI",
        paragraphs: [
          "Automation is rule-based. When a form is submitted, send this email and add the contact to a spreadsheet. It is predictable, cheap, and reliable.",
          "AI is judgment-based. It looks at unstructured input such as an email, transcript, or customer message, then summarizes, classifies, drafts, translates, or reasons about context.",
          "The real magic is combining the two. Automation handles the plumbing. AI handles the judgment. Useful AI workflows almost always have an automation backbone underneath them.",
          "If a vendor pitches AI and what they describe is only an if-this-then-that rule, you are being upsold. Real AI involves a model interpreting something.",
        ],
      },
      {
        title: "Plain-English Glossary",
        paragraphs: [
          "AI: any computer system doing things that usually require human intelligence. In most business conversations today, it usually means an LLM.",
          "LLM: large language model. A model trained on huge amounts of text that can read, write, summarize, and reason.",
          "Prompt: the instructions, context, and question you give the AI. Good prompts create good output. Generic prompts create generic output.",
          "Token: how AI counts text. Pricing and context limits are based on tokens, not words.",
          "Context window: how much text the model can hold in its working memory at once.",
          "Hallucination: when AI confidently makes something up. This is common enough that important claims must be verified.",
          "API: the way other software talks to the AI directly without going through a chat window.",
          "Agent: an AI that can take actions, not just answer. Powerful, useful, and risky when not supervised.",
          "RAG: giving AI access to your specific documents so it can answer from your knowledge base.",
        ],
      },
    ],
    actionStep:
      "Pick three AI terms you have been pretending to understand. Write each one in your own words in one sentence. Bring those sentences to your session with Kai.",
  },
  {
    id: "module2",
    title: "Module 2: How AI Models Work",
    subtitle: "Understand what AI can and cannot do. No coding required.",
    lessons: [
      {
        title: "How AI Generates Text",
        paragraphs: [
          "An LLM is a machine that predicts the next word. You give it a prompt, it predicts the next token, then it does that again and again until it has produced an answer.",
          "It learned this by being shown a staggering amount of text and repeatedly learning what words tend to come next. The side effect is something that looks like reasoning, writing, and conversation.",
          "This mental model explains many strange behaviors. AI is confident even when wrong because it is producing plausible text, not automatically checking facts. It rambles when you do not constrain it. Small changes in prompts can produce very different answers.",
        ],
      },
      {
        title: "What a Prompt Really Is",
        paragraphs: [
          "A prompt is not a search query. It is the entire context the model uses to decide what to say next. Your tone, examples, role instructions, and output format all change the answer.",
          "Three things make a prompt good: context, constraints, and examples. Context tells the model what situation it is in. Constraints tell it what to include and avoid. Examples show what good looks like.",
          "If the output is generic, the prompt was probably generic. Garbage in, garbage out is the iron law of AI.",
        ],
      },
      {
        title: "Why AI Hallucinates",
        paragraphs: [
          "Hallucination is when the model confidently states something false. It happens because the model is predicting plausible-sounding text, not retrieving verified facts by default.",
          "Watch for fake citations, wrong numbers, fabricated quotes, and hallucinated tool features. Anything specific, such as a date, citation, legal claim, medical fact, quote, or statistic, needs verification.",
          "If the AI cannot show you a source you can click, treat the claim as unverified. Models with web search hallucinate less when they ground answers in real pages, but they still need review.",
        ],
      },
      {
        title: "Why Different Models Give Different Answers",
        paragraphs: [
          "ChatGPT, Claude, and Gemini give different answers because they have different training data, different post-training, different model sizes, and a small amount of randomness.",
          "Claude often feels more cautious and reflective. GPT is often eager and broad. Gemini is tightly tied to Google products and multimodal workflows.",
          "For anything important, get a second opinion from another model. It takes 30 seconds and often reveals weak assumptions.",
        ],
      },
      {
        title: "When to Trust AI and When to Verify",
        paragraphs: [
          "Trust freely for brainstorming, rewriting your own text, formatting, outlining, and summarizing documents you can inspect.",
          "Trust but verify for research summaries, competitive analysis, marketing copy, customer-facing emails, and anything with specific facts or numbers.",
          "Verify everything for legal text, medical claims, financial advice, contracts, citations, statistics, and anything that could harm a customer or expose you to liability.",
          "Do not use AI alone for regulated advice, HR decisions affecting individuals, or irreversible business decisions.",
        ],
      },
      {
        title: "Tokens, Context Windows, and Memory",
        paragraphs: [
          "Tokens are how models count text. A token is roughly three quarters of a word in English. At consumer scale this is mostly invisible. At API scale it becomes a real cost driver.",
          "The context window is the amount of text the model can hold in working memory at once: your prompt, attached documents, conversation history, and its own output.",
          "Memory across conversations is not the same thing. Unless a product explicitly remembers something, assume each new chat is a blank slate.",
        ],
      },
    ],
    actionStep:
      "Take one weekly task and write a specific prompt for it. Include context, constraints, and an example if you have one. Run it and bring the result to Kai.",
  },
  {
    id: "module3",
    title: "Module 3: AI Strategy for Your Business",
    subtitle: "Where to apply AI for maximum ROI as a busy owner.",
    lessons: [
      {
        title: "The Four Ways AI Creates ROI",
        paragraphs: [
          "AI saves time by doing in seconds what used to take minutes or hours: drafting emails, summarizing meetings, formatting documents, answering FAQs, transcribing calls, and cleaning data.",
          "AI saves money when work that would have justified a part-time assistant, junior marketer, or offshore VA can be absorbed by tools and workflows.",
          "AI makes money through faster lead response, better follow-up, smarter upsells, more consistent content, and voice agents that book appointments outside business hours.",
          "AI improves decisions by reading customer reviews, comparing competitors, summarizing data, and surfacing patterns owners rarely have time to find manually.",
        ],
      },
      {
        title: "How to Choose Your First AI Project",
        paragraphs: [
          "Most owners fail because they pick the wrong first project: too big, too vague, or too far from where time is actually being lost.",
          "A good first project is repetitive, language-heavy, measurable, and has tolerable failure modes. If AI gets it wrong, the worst case should be that a human edits it.",
          "For most small businesses, the first project is inbox triage, first-draft content, or meeting and customer-call summaries. Pick the one that drains you most this week.",
        ],
      },
      {
        title: "Lead Generation and Follow-Up",
        paragraphs: [
          "AI can draft personalized replies to inbound leads, summarize sales conversations, generate follow-up sequences, and remind the team when a lead needs attention.",
          "Fast response matters. The difference between replying in five minutes and one hour can dramatically change conversion. AI can help the team move quickly while still preserving human review.",
          "For high-volume lead businesses, voice AI for lead calling can become one of the highest-ROI projects, but it must be disclosed and carefully configured.",
        ],
      },
      {
        title: "Content, Marketing, Admin, and Operations",
        paragraphs: [
          "AI is a strong first drafter and editor for content. It can outline, repurpose, rewrite, generate hooks, and turn one long-form asset into many smaller assets.",
          "AI is weak as a final drafter when it has no human input. Specific stories, opinions, and lived experience still need to come from you.",
          "Admin and operations are often the quiet ROI winner. Inbox triage, meeting notes, action items, document drafting, data cleanup, and recurring reports can all return hours every week.",
        ],
      },
      {
        title: "Spotting AI Opportunities",
        paragraphs: [
          "Map your week. List every recurring task you, your team, or contractors do. Be granular. Marketing is not a task. Writing the Wednesday newsletter is.",
          "Tag each task by ROI bucket: time, money, revenue, or decisions. Then mark anything that involves reading, writing, summarizing, classifying, or replying.",
          "Pick the top three candidates by annual hours, ROI potential, language intensity, tolerable failure mode, and measurability.",
        ],
      },
    ],
    actionStep:
      "Do the AI opportunity audit. Bring your top three candidates ranked by estimated annual hours saved or revenue generated.",
  },
  {
    id: "module4",
    title: "Module 4: AI Tools You Will Actually Use",
    subtitle: "Hands-on with the tools that matter for your business.",
    lessons: [
      {
        title: "ChatGPT vs Claude vs Gemini",
        paragraphs: [
          "Pick one daily driver and use the others occasionally. Trying to use all tools equally is how owners end up paying for several subscriptions and using none well.",
          "ChatGPT is strong for broad consumer use, integrations, images, voice, and Microsoft ecosystems. Claude is strong for long-form writing, nuanced reasoning, coding, and long documents. Gemini is strong when your business lives inside Google Workspace.",
          "Add Perplexity when you need sourced research. Ignore most other tools until you have a specific reason.",
        ],
      },
      {
        title: "Prompting 101: R-C-T-F-E",
        paragraphs: [
          "Role: who should the AI be? Context: what situation is it working in? Task: what exactly should it do? Format: how should the answer be structured? Examples: what does good look like?",
          "Ask the AI to ask clarifying questions first when the task matters. Ask for multiple versions. Ask it to critique its own answer. Iterate instead of restarting.",
          "Save winning prompts. Over time, your prompt library becomes a business asset.",
        ],
      },
      {
        title: "Email, Content, and Customer Replies",
        paragraphs: [
          "For email, train the model on your voice by pasting real examples. For replies, paste the incoming message and give a one-line intention.",
          "For content, generate outlines first, approve the outline, then ask for the draft. Edit aggressively and add a human moment to every piece.",
          "For customer replies, build a voice and values document. Keep human review until you have seen the AI handle a meaningful volume correctly.",
        ],
      },
      {
        title: "Voice AI, No-Code Tools, and Agents",
        paragraphs: [
          "Voice AI can call inbound leads quickly, qualify them, answer simple calls, book appointments, and follow up with stale leads. Disclosure matters.",
          "Zapier, Make, and n8n are the plumbing for AI workflows. The AI is the brain; the automation tool is the body.",
          "Agents can take actions, not just answer. Treat them like smart interns: useful for scoped tasks, risky when unsupervised around customers, contracts, or money.",
        ],
      },
    ],
    actionStep:
      "Pick your daily-driver AI and build one R-C-T-F-E prompt for the task you identified earlier. Save it and use it three times this week.",
  },
  {
    id: "module5",
    title: "Module 5: Cost, Pricing, Privacy, and Security",
    subtitle: "Understand the real cost of AI and avoid careless privacy mistakes.",
    lessons: [
      {
        title: "What AI Actually Costs",
        paragraphs: [
          "AI costs split into subscriptions, API usage, and wrapper SaaS tools. Subscriptions are fixed monthly costs. API usage is pay-per-token. Wrapper tools package AI into products and usually mark up the underlying model cost.",
          "The free tier is fine for exploration, but not for serious company work. Business tiers usually include stronger privacy commitments, admin controls, and data handling terms.",
        ],
      },
      {
        title: "Chat Pricing vs API Pricing",
        paragraphs: [
          "Chat products are for humans. API pricing is for automation. If one person is doing the task in a browser, use the chat product. If a workflow runs hundreds or thousands of times, use the API.",
          "Input tokens are what you send. Output tokens are what the model writes back. Output tokens are often more expensive. Long prompts, verbose outputs, loops, retries, and the wrong model tier can inflate cost quickly.",
          "Control cost by tightening prompts, limiting output length, using smaller models when good enough, setting hard usage caps, and monitoring usage weekly at the start.",
        ],
      },
      {
        title: "What Not to Paste Into AI",
        paragraphs: [
          "Never paste passwords, API keys, recovery codes, government IDs, full credit card numbers, private client data, confidential contracts, trade secrets, or regulated health, legal, or financial information into unapproved consumer tools.",
          "Business and enterprise tiers are safer for company work because major providers typically do not train on your data there, but regulated industries still need formal compliance review.",
          "Use the cocktail napkin test: if you would not write it on a napkin and leave it in a bar in a city you do not live in, do not paste it into a free AI chat.",
        ],
      },
      {
        title: "Basic Security Checklist",
        paragraphs: [
          "Pick one or two approved AI tools. Use business tiers for company work. Turn off training on your data where settings allow it. Enable two-factor authentication.",
          "Write a one-page AI usage policy. Decide what data is off-limits. Revoke ex-employee access immediately. Audit AI subscriptions and permissions quarterly.",
          "For voice AI or agents that act on your behalf, set spending caps, off-hours rules, escalation triggers, and human approval for risky actions.",
        ],
      },
    ],
    actionStep:
      "Audit your team. Count AI accounts, identify free vs paid use, and consolidate company work onto one or two approved tools.",
  },
  {
    id: "module6",
    title: "Module 6: Team Adoption",
    subtitle: "A simple rollout plan for safe and consistent AI usage.",
    lessons: [
      {
        title: "Introduce AI Without Scaring the Team",
        paragraphs: [
          "Most teams hear AI and wonder if this is how they get replaced. Address that fear directly before training begins.",
          "Say that AI is meant to give back time, that people who use AI well become more valuable, and that the company will figure it out together.",
          "AI should be framed as a junior team member: brilliant, fast, occasionally wrong, and untrained on your specific company unless you train it.",
        ],
      },
      {
        title: "Pick 1-3 Pilot Use Cases",
        paragraphs: [
          "Do not try to AI-ify the whole business at once. Pick one to three use cases and run them for 30 to 90 days.",
          "Good pilots are high frequency, visibly save time, have low blast radius, have an internal champion, and can be measured.",
          "Common winning pilots include meeting summaries, inbox triage, content drafts, customer reply drafts, sales call prep, internal documentation, and weekly reporting.",
        ],
      },
      {
        title: "Create Simple Company AI Rules",
        paragraphs: [
          "You do not need a 40-page policy. You need a one-page rulebook people can read in three minutes.",
          "Cover approved tools, required tiers, prohibited data, disclosure rules, review requirements, who to ask when in doubt, how to flag bad AI output, and what to do when AI gets something wrong with a customer.",
        ],
      },
      {
        title: "Train Prompting and Document Workflows",
        paragraphs: [
          "Prompt quality is the biggest factor in whether the team gets value. Run a short training where each person brings a real task, writes a prompt, runs it, critiques the output, and improves it.",
          "Document any workflow that becomes more than a one-off chat. Capture purpose, inputs, prompts, tools, review step, and failure mode.",
          "Prevent tool overload by assigning one AI stack owner, running time-boxed pilots, and auditing subscriptions quarterly.",
        ],
      },
    ],
    actionStep:
      "Draft your one-page AI usage policy, identify your AI stack owner, and pick one pilot use case to run over the next 30 days.",
  },
  {
    id: "bonus",
    title: "Bonus: AI Myth-Busting and FAQ",
    subtitle: "Common fears, misconceptions, and honest answers.",
    lessons: [
      {
        title: "Will AI Replace My Team?",
        paragraphs: [
          "Not all of your team, and not the way most people fear. The repetitive, language-heavy, low-judgment parts of roles get absorbed first. Judgment, taste, relationships, accountability, and physical presence become more valuable.",
          "Your job as the owner is to help every role evolve into the version that uses AI well rather than competes against it.",
        ],
      },
      {
        title: "Is My Data Safe?",
        paragraphs: [
          "It depends on the tier, tool, and settings. Free consumer tiers are not safe by default. Business and enterprise tiers have stronger commitments and controls. API usage with major providers typically has stronger data handling terms.",
          "For healthcare, legal, financial, and other regulated industries, get a formal compliance review before using AI with sensitive information.",
        ],
      },
      {
        title: "How Do I Keep Up?",
        paragraphs: [
          "Tool names, prices, and feature lists will change quickly. The principles change much more slowly: how LLMs work, what prompts are, why hallucinations happen, how ROI is created, and why human review matters.",
          "Spend most of your learning energy on principles and a smaller amount staying current on tools. Doing one project well beats reading about ten.",
        ],
      },
      {
        title: "Where Do I Start?",
        paragraphs: [
          "Pick the most painful weekly recurring task in your inbox or content workflow. Build one prompt for it this week. Use it three times. That is the start.",
          "AI mastery in your business is not a strategy session. It is reps. Pick a small project, do it badly the first time, then make it better the second time.",
        ],
      },
    ],
    actionStep:
      "Do the action steps from at least three modules and bring the results to your next mastermind session with Kai.",
  },
];

export function findCourseModule(moduleTitle: string) {
  return fullCourse.find((module) => moduleTitle.toLowerCase().includes(module.title.split(":")[0].toLowerCase()));
}

const lessonExpansions: Record<string, string[]> = {
  aiBasics: [
    "For a business owner, the practical question is not whether a term sounds impressive. The practical question is what work it changes. If a tool reads, writes, summarizes, classifies, or drafts, it is probably using an LLM. If a tool simply moves data after a trigger, it is probably automation. This distinction keeps you from buying complexity when a simple workflow would do.",
    "Use this lesson as your filter in sales calls and vendor demos. Ask: what does the model interpret, what does the automation trigger, what data does it need, where does a human review the result, and how do we know it worked? Those five questions cut through most AI hype quickly.",
  ],
  prompting: [
    "The owner-level skill is not memorizing clever prompts. It is learning how to describe work clearly. Every useful prompt should make the invisible parts of your judgment visible: who the audience is, what good looks like, what should be avoided, and how the output will be used.",
    "When a result is weak, treat it like managing a new assistant. Do not say 'AI is bad at this.' Give clearer context, show an example, narrow the task, or ask the model to identify what information is missing. The improvement loop is where most of the value appears.",
  ],
  verification: [
    "Verification is not a lack of trust in AI. It is how you make AI usable in a real business. A draft can be useful and still require review. A summary can save time and still need spot checks. A recommendation can be insightful and still need a human decision-maker.",
    "The easiest review system is a three-tier rule: low-risk internal drafts can move fast, customer-facing work gets reviewed, and legal, financial, medical, HR, or sensitive data decisions require careful human approval. Write this down before the team starts improvising.",
  ],
  strategy: [
    "A strong AI strategy starts with business pain, not tools. Look for work that is frequent, language-heavy, measurable, and annoying enough that people will actually adopt a better workflow. The best first project usually feels obvious after you map where time is leaking.",
    "Keep the first project narrow enough to finish. 'Improve sales with AI' is too vague. 'Draft a same-day follow-up email from every discovery call transcript' is specific, measurable, and easy to review. Narrow projects become reusable systems faster.",
  ],
  tools: [
    "Do not build a stack before you have a workflow. Start with one strong chat tool and one place to save prompts, examples, and rules. Add Zapier, Make, n8n, voice AI, custom GPTs, or agents only when the manual version of the workflow is already useful.",
    "A good tool decision has a job attached to it. If you cannot name the recurring task, owner, input, output, review step, and success metric, wait before buying another subscription. Tool overload is one of the fastest ways to make AI feel chaotic.",
  ],
  safety: [
    "Privacy rules should be written before the first sensitive workflow is built. Decide what the team can paste into AI, what requires a business-tier tool, and what should never go into a model without formal approval. Ambiguity is where bad habits form.",
    "Cost rules matter too. Set usage caps, keep prompts concise, use smaller models when quality is good enough, and monitor early workflows weekly. AI costs usually stay reasonable when someone owns them and balloon when nobody is watching.",
  ],
  adoption: [
    "Team adoption depends on trust and repetition. People need to hear that AI is there to remove tedious work, then they need a real workflow that proves it. A vague instruction to 'use AI more' will not change behavior. A shared prompt that saves 30 minutes every Tuesday will.",
    "Document wins as soon as they happen. Save the prompt, before-and-after output, time saved, review rule, and owner. This turns scattered experiments into company capability and gives the next person a pattern they can copy.",
  ],
};

export function expandedLessonParagraphs(moduleId: string, lessonTitle: string, paragraphs: string[]) {
  const title = lessonTitle.toLowerCase();
  const key =
    moduleId === "module1"
      ? "aiBasics"
      : moduleId === "module2" && title.includes("prompt")
        ? "prompting"
        : moduleId === "module2"
          ? "verification"
          : moduleId === "module3"
            ? "strategy"
            : moduleId === "module4"
              ? "tools"
              : moduleId === "module5"
                ? "safety"
                : "adoption";

  return [...paragraphs, ...lessonExpansions[key]];
}

const paragraphExpansions: Record<string, string> = {
  module1:
    "In practice, this gives you better judgment when a vendor, team member, or tool claims something is AI-powered. You can ask what the system is actually doing, whether it is interpreting language or simply following rules, and whether the result needs review before it affects customers or revenue.",
  module2:
    "The business value of this mental model is confidence. Once you understand why the model behaves this way, you stop treating weak answers as mysterious and start improving the inputs, checking risky claims, and using AI where it is strongest.",
  module3:
    "For your own business, translate this idea into one workflow, one owner, and one measurable result. If the workflow cannot be described in a sentence and measured in time saved, revenue protected, errors reduced, or decisions improved, it is not ready to build yet.",
  module4:
    "Before adding another tool, decide how this would show up in a real workday. The strongest setup is usually simple: one tool for drafting or reasoning, one place to store reusable prompts and examples, and one review habit that keeps quality high.",
  module5:
    "This is where owners need to slow down. A workflow can be useful and still be unsafe if the wrong data is pasted into the wrong tool. Write the rule once, make it visible to the team, and review it before any automation starts touching sensitive information.",
  module6:
    "Adoption improves when the team sees a real before-and-after. Do not announce AI as a vague initiative. Pick one repeated task, show the old way, show the AI-assisted way, assign a human review step, and make the time savings visible.",
  bonus:
    "Use this as a decision filter instead of a headline. AI news changes quickly, but the owner questions stay the same: what work changes, what risk is introduced, who reviews the output, and what measurable business result improves?",
};

export function expandParagraphForPdf(moduleId: string, paragraph: string) {
  return [paragraph, paragraphExpansions[moduleId] ?? paragraphExpansions.bonus];
}
