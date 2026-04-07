import { Course } from "@/lib/types";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="cyber-card rounded-xl p-5 transition hover:scale-[1.01]">
      <h3 className="text-xl font-bold text-[#00FF00]">{course.title}</h3>
      <p className="mt-3 text-sm text-[#9ae6ff]">Сложность: {course.level}</p>
      <p className="text-sm text-[#9ae6ff]">Длительность: {course.durationMinutes} мин</p>
    </article>
  );
}
