import { createClient } from "@supabase/supabase-js";
import type { QuizResult } from "@/lib/types";

type SupabaseAdminRow = {
  created_at: string;
  overall_score: number;
  profile: string;
  recommended_project: QuizResult["recommendedProject"];
  users: { name?: string; email?: string } | Array<{ name?: string; email?: string }> | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function saveQuizResult(result: QuizResult) {
  const existing = getLocalResults();
  localStorage.setItem("ai-execution-results", JSON.stringify([result, ...existing]));

  if (!supabase) return { savedToSupabase: false };

  const { data: user, error: userError } = await supabase
    .from("users")
    .insert({ name: result.name, email: result.email })
    .select("id")
    .single();

  if (userError) throw userError;

  const { error } = await supabase.from("quiz_responses").insert({
    user_id: user.id,
    answers: result.answers,
    ai_basics_score: result.categoryScores.aiBasics,
    prompting_score: result.categoryScores.prompting,
    verification_score: result.categoryScores.verification,
    business_strategy_score: result.categoryScores.businessStrategy,
    automation_tools_score: result.categoryScores.automationTools,
    team_privacy_score: result.categoryScores.teamPrivacyImplementation,
    overall_score: result.overallScore,
    profile: result.profile,
    recommended_modules: result.recommendedModules,
    skipped_modules: result.skippedModules,
    recommended_project: result.recommendedProject,
    generated_roadmap: result.generatedRoadmap,
  });

  if (error) throw error;
  return { savedToSupabase: true };
}

export async function loadAdminResults() {
  if (!supabase) return getLocalResults();

  const { data, error } = await supabase
    .from("quiz_responses")
    .select("created_at, overall_score, profile, recommended_project, users(name, email)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data as SupabaseAdminRow[]).map((row) => {
    const user = Array.isArray(row.users) ? row.users[0] : row.users;
    return {
      name: user?.name ?? "Unknown",
      email: user?.email ?? "",
      overallScore: Number(row.overall_score),
      profile: row.profile,
      recommendedProject: row.recommended_project,
      createdAt: row.created_at,
    };
  });
}

export function getLocalResults(): QuizResult[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("ai-execution-results") ?? "[]");
  } catch {
    return [];
  }
}
