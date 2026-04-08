"use client";

import { useState } from "react";

const options = ["nmap -Pn 10.10.10.10", "nmap -sV 10.10.10.10", "nmap -sn 10.10.10.10"];
const correct = "nmap -sV 10.10.10.10";

export function QuickCheck() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="cyber-card mt-6 rounded-xl p-4">
      <h3 className="mb-3 text-lg text-[#00FF00]">Быстрый интерактивный тест</h3>
      <p className="mb-3 text-sm">Выберите команду для определения версии сервисов:</p>
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = option === correct;

          return (
            <button
              key={option}
              className={`w-full rounded-md border px-3 py-2 text-left text-sm transition ${
                !isSelected
                  ? "border-[#00aeef]/40 hover:border-[#00aeef]"
                  : isCorrect
                    ? "option-good"
                    : "option-bad"
              }`}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
}
