import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ModuleSidebar } from "@/components/ModuleSidebar";
import { Quiz } from "@/components/Quiz";
import { lessons, quizQuestions } from "@/lib/mock-data";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = lessons.find((l) => l.id === id) ?? lessons[0];
  const questions = quizQuestions.filter((q) => q.lessonId === lesson.id);

  return (
    <main className="mx-auto grid max-w-6xl gap-6 p-8 md:grid-cols-[260px_1fr]">
      <ModuleSidebar lessons={lessons} />

      <section>
        <h1 className="mb-4 text-3xl font-bold text-[#00FF00]">{lesson.title}</h1>
        <div className="cyber-card mb-6 overflow-hidden rounded-xl">
          <iframe
            className="aspect-video w-full"
            src={lesson.videoUrl}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <article className="cyber-card prose prose-invert max-w-none rounded-xl p-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Принудительно рендерим как текст для снижения XSS-риска.
              code(props) {
                return <code className="text-[#00aeef]">{String(props.children)}</code>;
              },
            }}
          >
            {lesson.markdown}
          </ReactMarkdown>
        </article>

        <Quiz lessonId={lesson.id} questions={questions} />
      </section>
    </main>
  );
}
