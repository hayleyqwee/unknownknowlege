import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.upsert({
    where: { id: "seed-course-web-pentest" },
    update: {},
    create: {
      id: "seed-course-web-pentest",
      title: "Web Pentest Fundamentals",
      level: "Intermediate",
      durationMinutes: 140,
    },
  });

  const lesson = await prisma.lesson.upsert({
    where: { id: "seed-lesson-nmap" },
    update: {},
    create: {
      id: "seed-lesson-nmap",
      title: "Nmap Essentials",
      videoUrl: "https://www.youtube.com/embed/4t4kBkMsDbQ",
      markdown: "# Nmap Basics\n\n```bash\nnmap -sV 10.10.10.10\n```",
      moduleTitle: "Module 1: Recon",
      courseId: course.id,
    },
  });

  await prisma.quizQuestion.upsert({
    where: { id: "seed-question-sv" },
    update: {},
    create: {
      id: "seed-question-sv",
      lessonId: lesson.id,
      type: "single_choice",
      prompt: "Какой флаг nmap показывает версии сервисов?",
      options: ["-sV", "-Pn", "-A", "-O"],
      correctAnswer: "-sV",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
