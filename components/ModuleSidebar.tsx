import Link from "next/link";
import { Lesson } from "@/lib/types";

export function ModuleSidebar({ lessons }: { lessons: Lesson[] }) {
  return (
    <aside className="cyber-card rounded-xl p-4">
      <h2 className="mb-3 text-lg text-[#00aeef]">Модули</h2>
      <ul className="space-y-2 text-sm">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link className="hover:text-[#00FF00]" href={`/lesson/${lesson.id}`}>
              {lesson.moduleTitle}: {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
