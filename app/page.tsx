"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Lock, ShieldCheck, TerminalSquare } from "lucide-react";
import { courses } from "@/lib/mock-data";

const levels = ["All", "Beginner", "Intermediate", "Advanced"] as const;

export default function HomePage() {
  const [activeLevel, setActiveLevel] = useState<(typeof levels)[number]>("All");

  const filteredCourses = useMemo(() => {
    if (activeLevel === "All") return courses;
    return courses.filter((course) => course.level === activeLevel);
  }, [activeLevel]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <header className="cyber-card mb-8 rounded-2xl p-6">
        <div className="mb-3 flex items-center gap-2 text-[#00FF00]">
          <ShieldCheck className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Cyber Academy LMS</h1>
        </div>
        <p className="text-[#9ae6ff]">Курсы по offensive / defensive security в стиле терминала.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level}
              className={`cyber-btn rounded-md px-3 py-1.5 text-sm ${
                activeLevel === level ? "shadow-[0_0_12px_rgba(0,255,0,0.5)]" : ""
              }`}
              onClick={() => setActiveLevel(level)}
            >
              {level}
            </button>
          ))}
          <Link className="cyber-btn rounded-md px-3 py-1.5 text-sm text-[#00aeef]" href="/dashboard">
            Личный кабинет
          </Link>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {filteredCourses.map((course) => (
          <article key={course.id} className="cyber-card rounded-xl p-5">
            <div className="mb-3 flex items-center justify-between">
              <TerminalSquare className="h-5 w-5 text-[#00aeef]" />
              <Lock className="h-4 w-4 text-[#00FF00]" />
            </div>
            <h2 className="text-lg font-bold text-[#00FF00]">{course.title}</h2>
            <p className="mt-2 text-sm text-[#9ae6ff]">Уровень: {course.level}</p>
            <p className="text-sm text-[#9ae6ff]">Длительность: {course.durationMinutes} мин</p>
            <Link href="/lesson/l1" className="cyber-btn mt-4 inline-block rounded-md px-3 py-2 text-sm">
              Открыть курс
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
