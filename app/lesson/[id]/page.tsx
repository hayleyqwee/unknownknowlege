import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronLeft, ShieldAlert } from "lucide-react";
import { ModuleSidebar } from "@/components/ModuleSidebar";
import { Quiz } from "@/components/Quiz";
import { QuickCheck } from "@/components/QuickCheck";
import { lessons, quizQuestions } from "@/lib/mock-data";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = lessons.find((l) => l.id === id) ?? lessons[0];
  const questions = quizQuestions.filter((q) => q.lessonId === lesson.id);

  return (
    <main className="mx-auto grid max-w-6xl gap-6 p-8 md:grid-cols-[260px_1fr]">
      <ModuleSidebar lessons={lessons} />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-3xl font-bold text-[#00FF00]">
            <ShieldAlert className="h-7 w-7" />
            {lesson.title}
          </h1>
          <Link href="/" className="cyber-btn inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm">
            <ChevronLeft className="h-4 w-4" />
            Назад к каталогу
          </Link>
        </div>

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
              code(props) {
                return <code className="text-[#00aeef]">{String(props.children)}</code>;
              },
            }}
          >
            {lesson.markdown}
          </ReactMarkdown>
        </article>

        <QuickCheck />
        <Quiz lessonId={lesson.id} questions={questions} />
      </section>
    </main>
  );
}
