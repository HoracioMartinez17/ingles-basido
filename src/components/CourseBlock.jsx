// VIEW: Bloque reutilizable del mini curso de conversación
export default function CourseBlock({ block }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-blue-300 mb-2">
        {block.label}
      </p>
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
        {block.english}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{block.spanish}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
        {block.pronunciation}
      </p>
    </div>
  );
}
