"use client";

import { useEffect, useState } from "react";

type QuizOption = {
  id: string;
  label: string;
  isCorrect: boolean;
};

const quizOptions: QuizOption[] = [
  { id: "a", label: "nmap -Pn 10.10.10.10", isCorrect: false },
  { id: "b", label: "nmap -sV 10.10.10.10", isCorrect: true },
  { id: "c", label: "nmap -sn 10.10.10.10", isCorrect: false },
];

export default function CourseQuiz() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState("Выберите один вариант ответа");

  // useEffect реагирует на выбор ответа и обновляет текст фидбека.
  useEffect(() => {
    if (!selectedAnswer) return;

    const picked = quizOptions.find((option) => option.id === selectedAnswer);
    if (!picked) return;

    setResultMessage(picked.isCorrect ? "✅ Верно! Отличная работа." : "❌ Неверно. Попробуйте еще раз.");
  }, [selectedAnswer]);

  function handleAnswer(answerId: string) {
    setSelectedAnswer(answerId);
  }

  return (
    <section className="mx-auto mt-6 w-full max-w-xl rounded-xl border border-emerald-500/30 bg-slate-900 p-5">
      <h2 className="mb-4 text-xl font-bold text-emerald-400">Мини-тест по уроку</h2>
      <p className="mb-4 text-sm text-slate-300">Какой флаг Nmap показывает версии сервисов?</p>

      <div className="space-y-2">
        {quizOptions.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const stateClass =
            !isSelected
              ? "bg-slate-800 hover:bg-slate-700"
              : option.isCorrect
                ? "bg-green-600 hover:bg-green-500"
                : "bg-red-600 hover:bg-red-500";

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleAnswer(option.id)}
              className={`w-full rounded-md px-4 py-3 text-left text-sm text-white transition-colors ${stateClass}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-cyan-300">{resultMessage}</p>
    </section>
  );
}
