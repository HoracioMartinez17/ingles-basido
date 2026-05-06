// SCREEN: Pantalla del modo examen (preguntas múltiples)
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import ExamQuestion from "../components/ExamQuestion";
import { useExam } from "../hooks/useExam";
import phrases from "../data/phrases";

export default function Exam() {
  const exam = useExam(phrases);
  const [examFinished, setExamFinished] = useState(false);
  const [results, setResults] = useState(null);

  const handleFinish = () => {
    const finalResults = exam.finishExam();
    setResults(finalResults);
    setExamFinished(true);
  };

  if (!exam.examPhrase) {
    return (
      <div>
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p>Cargando examen...</p>
        </div>
      </div>
    );
  }

  if (examFinished && results) {
    return (
      <div>
        <Navigation />
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 sm:p-8 text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">
              🎉 ¡Examen Finalizado!
            </h1>
            <p className="text-sm sm:text-xl mb-2 sm:mb-4">Tu puntuación final:</p>
            <div className="text-4xl sm:text-6xl font-bold mb-2 sm:mb-4">
              {results.percentage}%
            </div>
            <p className="text-sm sm:text-lg">
              Acertaste <span className="font-bold">{results.correct}</span> de{" "}
              <span className="font-bold">{results.total}</span> preguntas
            </p>
          </div>

          {/* Desglose de respuestas */}
          <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
              Análisis de respuestas:
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {results.answers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-2 sm:p-4 rounded-lg border-2 text-xs sm:text-base ${
                    answer.isCorrect
                      ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800"
                  }`}
                >
                  <p className="font-semibold text-gray-800 dark:text-gray-100 mb-1 sm:mb-2">
                    P{index + 1}: {phrases.find((p) => p.id === answer.phraseId)?.english}
                  </p>
                  <p className={answer.isCorrect ? "text-green-700" : "text-red-700"}>
                    {answer.isCorrect ? "✓ Correcto" : "✗ Incorrecto"}
                  </p>
                  {!answer.isCorrect && (
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1">
                      Tu respuesta: {answer.selected}
                    </p>
                  )}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    Respuesta correcta: {answer.correct}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base"
            >
              🔄 Otro examen
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base"
            >
              🏠 Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1 sm:mb-2">
          ✏️ Modo Examen
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
          Pregunta {exam.currentIndex + 1} de {exam.totalQuestions}
        </p>

        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mb-3 sm:mb-4">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all"
            style={{
              width: `${((exam.currentIndex + 1) / exam.totalQuestions) * 100}%`,
            }}
          ></div>
        </div>

        {/* Contador de aciertos - Compacto */}
        <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-center">
          <p className="text-sm sm:text-base font-bold text-blue-800">
            ✓ Aciertos: <span className="text-lg sm:text-2xl">{exam.correctCount}</span> /{" "}
            {exam.totalQuestions}
          </p>
        </div>

        {/* Pregunta */}
        <div className="mb-4 sm:mb-6">
          <ExamQuestion
            phrase={exam.examPhrase}
            options={exam.options}
            selectedAnswer={exam.selectedAnswer}
            answered={exam.answered}
            onAnswer={exam.handleAnswer}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2 sm:gap-3 justify-center">
          {exam.answered && !exam.isExamFinished && (
            <button
              onClick={exam.nextQuestion}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base"
            >
              Siguiente →
            </button>
          )}

          {exam.isExamFinished && exam.answered && (
            <button
              onClick={handleFinish}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base"
            >
              🏁 Terminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
