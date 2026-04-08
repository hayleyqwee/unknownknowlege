import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { quizSubmitSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = quizSubmitSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { lessonId, answers } = parsed.data;

  // Проверка на бэкенде через Prisma-параметризацию защищает от SQL-инъекций.
  const questions = await prisma.quizQuestion.findMany({ where: { lessonId } });
  const answerMap = new Map(answers.map((a) => [a.questionId, a.answer.trim().toLowerCase()]));

  const feedback = questions.map((q) => {
    const userAnswer = answerMap.get(q.id) ?? "";
    const expected = q.correctAnswer.trim().toLowerCase();
    const correct = userAnswer === expected;
    return { questionId: q.id, correct, expected: q.correctAnswer };
  });

  return NextResponse.json({ feedback });
}
