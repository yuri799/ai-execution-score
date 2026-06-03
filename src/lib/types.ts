export type CategoryKey =
  | "aiBasics"
  | "prompting"
  | "verification"
  | "businessStrategy"
  | "automationTools"
  | "teamPrivacyImplementation";

export type QuestionType = "single" | "multi" | "likert";

export type AnswerValue = string | string[] | number;

export type Answers = Record<string, AnswerValue>;

export type QuestionOption = {
  id: string;
  label: string;
  points: number;
  category: CategoryKey;
};

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  options: QuestionOption[];
  maxPoints?: number;
  reverseScored?: boolean;
};

export type CategoryScores = Record<CategoryKey, number>;

export type CourseRecommendation = {
  module: string;
  status: "Full" | "Summary" | "Skip" | "Practical" | "Beginner" | "Advanced";
  lessons: string[];
  reason: string;
};

export type ProjectRecommendation = {
  name: string;
  description: string;
};

export type QuizResult = {
  name: string;
  email?: string | null;
  answers: Answers;
  categoryScores: CategoryScores;
  rawScore: number;
  overallScore: number;
  percentile: number;
  profile: string;
  level: string;
  pdfBand: "beginner" | "intermediate" | "advanced";
  profileDescription: string;
  strengths: string[];
  gaps: string[];
  skippedModules: CourseRecommendation[];
  recommendedModules: CourseRecommendation[];
  optionalReviewLessons: string[];
  recommendedProject: ProjectRecommendation;
  actionPlan: string[];
  riskFlags: string[];
  generatedRoadmap: string;
  createdAt: string;
};
