import { prisma } from "@/lib/prisma";

// Личный кабинет с отслеживанием прогресса. В реальном приложении userId берется из JWT.
export default async function DashboardPage() {
  const demoUserId = "demo-user";
  const progress = await prisma.progress.findMany({
    where: { userId: demoUserId },
    include: { lesson: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold text-[#00FF00]">Личный кабинет</h1>
      <p className="mt-2 text-[#9ae6ff]">Прогресс по урокам</p>

      <div className="mt-6 space-y-3">
        {progress.length === 0 && <p>Пока нет завершенных уроков.</p>}
        {progress.map((entry) => (
          <article key={entry.id} className="cyber-card rounded-lg p-4">
            <h3>{entry.lesson.title}</h3>
            <p className="text-sm text-[#9ae6ff]">Прогресс: {entry.percentage}%</p>
          </article>
        ))}
      </div>
    </main>
  );
}
