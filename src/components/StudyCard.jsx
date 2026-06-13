// VIEW: Componente específico para el modo estudio (flashcard)
import { useFavorites } from "../context/FavoritesContext";
import AudioPlayer from "./AudioPlayer";

export default function StudyCard({ phrase, showMeaning, reviewInfo, onToggleMeaning }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(phrase.id);

  return (
    <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-lg p-8 min-h-96 flex flex-col justify-center items-center text-center">
      {/* Botón de favorito */}
      <button
        onClick={() => toggleFavorite(phrase)}
        className={`absolute top-4 right-4 text-3xl transition-all hover:scale-110 ${
          isFav ? "text-yellow-500" : "text-gray-300"
        }`}
        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        ★
      </button>

      {/* Frase en inglés */}
      <div className="mb-8">
        <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">Frase:</p>
        <h2 className="text-4xl font-bold text-blue-600">{phrase.english}</h2>
        {reviewInfo?.lastGrade ? (
          <p className="mt-2 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Última respuesta: {reviewInfo.lastGrade}
          </p>
        ) : null}
        <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">Pronunciación:</p>
          <p className="text-2xl text-orange-700 font-mono font-semibold">
            {phrase.pronunciation}
          </p>
        </div>
        {phrase.audio && (
          <div className="mt-4">
            <AudioPlayer audioUrl={phrase.audio} phraseText={phrase.english} />
          </div>
        )}
      </div>

      {/* Significado */}
      {showMeaning && (
        <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-800 rounded-lg w-full">
          <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">Significado:</p>
          <p className="text-2xl text-green-700 font-semibold">{phrase.spanish}</p>
        </div>
      )}

      {phrase.tip && (
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-lg w-full text-left">
          <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">Truco rápido:</p>
          <p className="text-amber-800 dark:text-amber-200 font-medium">{phrase.tip}</p>
        </div>
      )}

      {/* Botón para revelar significado */}
      {!showMeaning && (
        <button
          onClick={onToggleMeaning}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg"
        >
          👁️ Mostrar Significado
        </button>
      )}
    </div>
  );
}
