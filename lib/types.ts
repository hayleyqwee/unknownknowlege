export type Course = {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationMinutes: number;
};

export type Lesson = {
  id: string;
  title: string;
  videoUrl: string;
  markdown: string;
  moduleTitle: string;
};

export type QuizQuestion = {
  id: string;
  lessonId: string;
  type: "single_choice" | "text";
  prompt: string;
  options?: string[];
};
