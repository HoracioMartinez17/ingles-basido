// VIEW: Componente para mostrar un truco gramatical
export default function TrickCard({ trick }) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border-2 border-purple-200 dark:border-purple-700 p-6 mb-4 shadow-md hover:shadow-lg transition-shadow">
      {/* Encabezado con emoji y título */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl">{trick.emoji}</span>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100">
            {trick.title}
          </h3>
          <p className="text-xs uppercase tracking-wide text-purple-600 dark:text-purple-300 mt-1">
            {trick.category === "grammar" && "⏱️ Tiempos verbales"}
            {trick.category === "service" && "🎤 Servicio al cliente"}
            {trick.category === "hotel" && "🏨 Hotel"}
          </p>
        </div>
      </div>

      {/* Explicación */}
      <div className="mb-4 p-3 bg-white dark:bg-slate-800 rounded border-l-4 border-purple-500">
        <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
          {trick.explanation}
        </p>
      </div>

      {/* Ejemplos */}
      <div className="mb-4">
        <p className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-2 uppercase">
          Ejemplos en contexto
        </p>
        <div className="space-y-3">
          {trick.examples.map((example, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded p-3 border border-purple-100 dark:border-purple-800"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>ES:</strong> {example.spanish}
              </p>
              <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-1">
                <strong>EN:</strong> {example.english}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                <strong>PRON:</strong> {example.pronunciation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips finales */}
      {trick.tips && (
        <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded p-3">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>💡 Truco:</strong> {trick.tips}
          </p>
        </div>
      )}
    </div>
  );
}
