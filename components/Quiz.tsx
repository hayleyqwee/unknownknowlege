"use client";

import { useState } from "react";
import { QuizQuestion } from "@/lib/types";

type Feedback = { questionId: string; correct: boolean; expected: string };

export function Quiz({ lessonId, questions }: { lessonId: string; questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  async function submitQuiz() {
    const payload = {
      lessonId,
      answers: questions.map((q) => ({ questionId: q.id, answer: answers[q.id] ?? "" })),
    };

    const res = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setFeedback(data.feedback ?? []);
  }

  return (
    <section className="cyber-card mt-6 rounded-xl p-4">
      <h3 className="mb-4 text-lg text-[#00FF00]">Проверка знаний</h3>
      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id}>
            <p className="mb-2">{q.prompt}</p>
            {q.type === "single_choice" ? (
              <div className="space-y-1">
                {q.options?.map((opt) => (
                  <label key={opt} className="block text-sm">
                    <input
                      type="radio"
                      className="mr-2"
                      name={q.id}
                      value={opt}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : (
              <input
                className="terminal-input w-full rounded-md p-2"
                placeholder="Например: nmap -sV 10.10.10.10"
                onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
              />
            )}

            {feedback.find((f) => f.questionId === q.id) && (
              <p className="mt-2 text-sm">
                {feedback.find((f) => f.questionId === q.id)?.correct ? "✅ Верно" : "❌ Неверно"}
              </p>
            )}
          </div>
        ))}
      </div>
      <button
        className="mt-4 rounded-md border border-[#00aeef] px-4 py-2 text-[#00aeef] hover:bg-[#00aeef]/10"
        onClick={submitQuiz}
      >
        Проверить ответы
      </button>
    </section>
  );
}
