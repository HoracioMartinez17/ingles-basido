// SCREEN: Mini curso para aprender conversación por bloques
import Navigation from "../components/Navigation";
import CourseBlock from "../components/CourseBlock";
import conversationCourse from "../data/conversationCourse";

export default function ConversationCourse() {
  return (
    <div>
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            🧠 Mini curso de conversación
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            Aprende a responder aunque te saquen del guion. La idea es pensar en piezas
            pequeñas, como LEGO: pedir repetición, ganar tiempo, ofrecer alternativas y
            cerrar frases naturales.
          </p>
        </div>

        <div className="grid gap-6">
          {conversationCourse.map((lesson) => (
            <section
              key={lesson.id}
              className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-blue-100 dark:border-slate-700 p-5 sm:p-6 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{lesson.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {lesson.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">{lesson.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {lesson.blocks.map((block) => (
                  <CourseBlock key={block.label} block={block} />
                ))}
              </div>

              <div className="bg-blue-100/80 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Cuándo usarlo:</strong> {lesson.useCase}
                </p>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
          <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
            Cómo practicarlo
          </h3>
          <p className="text-sm text-amber-900 dark:text-amber-100">
            Empieza por dominar 3 piezas: pedir repetición, ganar tiempo y ofrecer una
            alternativa. Cuando eso salga automático, ya podrás construir frases nuevas
            sin quedarte bloqueado.
          </p>
        </div>
      </div>
    </div>
  );
}
