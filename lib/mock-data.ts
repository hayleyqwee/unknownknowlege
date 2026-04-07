import { Course, Lesson, QuizQuestion } from "./types";

export const courses: Course[] = [
  { id: "c1", title: "Network Recon Basics", level: "Beginner", durationMinutes: 90 },
  { id: "c2", title: "Web Pentest Fundamentals", level: "Intermediate", durationMinutes: 140 },
  { id: "c3", title: "Blue Team Incident Response", level: "Advanced", durationMinutes: 180 },
];

export const lessons: Lesson[] = [
  {
    id: "l1",
    title: "Nmap Essentials",
    videoUrl: "https://www.youtube.com/embed/4t4kBkMsDbQ",
    moduleTitle: "Module 1: Recon",
    markdown: `# Сканирование сети\n\nИспользуйте \`nmap\` для базовой инвентаризации:\n\n\`\`\`bash\nnmap -sV 192.168.1.10\n\`\`\`\n\n> Важно запускать команды только в легальной лаборатории.`,
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    lessonId: "l1",
    type: "single_choice",
    prompt: "Какой флаг nmap используется для определения версий сервисов?",
    options: ["-sV", "-Pn", "-O", "-A"],
  },
  {
    id: "q2",
    lessonId: "l1",
    type: "text",
    prompt: "Введите команду для сканирования версии сервиса на хосте 10.10.10.10",
  },
];
