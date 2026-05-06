// VIEW: Componente para mostrar una pregunta de examen
export default function ExamQuestion({
  phrase,
  options,
  selectedAnswer,
  answered,
  onAnswer,
}) {
  const isCorrect = selectedAnswer === phrase.spanish;

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-3 sm:p-6">
      {/* Pregunta */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-300 dark:border-blue-800">
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2">
          ¿Cuál es el significado?
        </p>
        <h2 className="text-xl sm:text-3xl font-bold text-blue-600">{phrase.english}</h2>
      </div>

      {/* Opciones */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            disabled={answered}
            className={`w-full p-2 sm:p-4 rounded-lg font-semibold text-left transition-all text-sm sm:text-base ${
              selectedAnswer === option
                ? isCorrect
                  ? "bg-green-500 text-white border-2 border-green-600"
                  : "bg-red-500 text-white border-2 border-red-600"
                : answered && option === phrase.spanish
                  ? "bg-green-500 text-white border-2 border-green-600"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100 border-2 border-gray-200 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-600 hover:border-gray-300"
            } ${answered ? "cursor-default" : "cursor-pointer"}`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {answered && (
        <div
          className={`p-2 sm:p-4 rounded-lg font-semibold text-center text-sm sm:text-base ${
            isCorrect
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {isCorrect ? "✓ ¡Correcto!" : "✗ Incorrecto"}
        </div>
      )}
    </div>
  );
}
