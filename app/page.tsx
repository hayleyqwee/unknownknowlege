import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[#00FF00]">Cyber Academy LMS</h1>
        <p className="mt-2 text-[#9ae6ff]">Каталог практических курсов по кибербезопасности.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section>
    </main>
  );
}
