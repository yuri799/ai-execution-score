import { NextResponse } from "next/server";
import { quizQuestions } from "@/lib/quiz-data";
import type { AnswerValue, QuizResult } from "@/lib/types";

function selectedIds(answer: AnswerValue | undefined) {
  if (Array.isArray(answer)) return answer;
  if (typeof answer === "string" && answer.length > 0) return [answer];
  return [];
}

function answerLabels(questionId: string, answer: AnswerValue | undefined) {
  const question = quizQuestions.find((item) => item.id === questionId);
  if (question && typeof answer === "number") {
    const option = question.options.find((item) => item.points === answer);
    return option ? [option.label] : [String(answer)];
  }
  if (!question) return selectedIds(answer);
  return selectedIds(answer).map((id) => question.options.find((option) => option.id === id)?.label ?? id);
}

function sheetPayload(result: QuizResult) {
  const answers = quizQuestions.map((question) => ({
    id: question.id,
    question: question.title,
    answer: answerLabels(question.id, result.answers[question.id]).join("; "),
  }));

  return {
    submittedAt: result.createdAt,
    name: result.name,
    email: result.email,
    overallScore: result.overallScore,
    rawScore: result.rawScore,
    percentile: result.percentile,
    profile: result.profile,
    level: result.level,
    pdfBand: result.pdfBand,
    categoryScores: result.categoryScores,
    recommendedProject: result.recommendedProject.name,
    generatedRoadmap: result.generatedRoadmap,
    answers,
  };
}

export async function POST(request: Request) {
  const result = (await request.json()) as QuizResult;
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ savedToSheets: false, reason: "GOOGLE_SHEETS_WEBHOOK_URL is not configured" });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(sheetPayload(result)),
    redirect: "follow",
  });

  if (!response.ok) {
    return NextResponse.json(
      { savedToSheets: false, error: await response.text() },
      { status: 502 },
    );
  }

  return NextResponse.json({ savedToSheets: true });
}
