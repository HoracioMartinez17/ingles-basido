// VIEW: Componente para mostrar una frase individual (compacta para móvil)
import { useFavorites } from "../context/FavoritesContext";
import AudioPlayer from "./AudioPlayer";

export default function PhraseCard({ phrase }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(phrase.id);

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 mb-3 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
      {/* Encabezado con inglés grande y estrella */}
      <div className="flex justify-between items-start mb-2 gap-2">
        <h2 className="text-lg font-bold text-blue-600 flex-1">{phrase.english}</h2>
        <button
          onClick={() => toggleFavorite(phrase)}
          className={`text-2xl transition-all flex-shrink-0 ${
            isFav ? "text-yellow-500" : "text-gray-300"
          } hover:scale-110`}
          title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          ★
        </button>
      </div>

      {/* Contenido: significado y pronunciación */}
      <div className="space-y-1 mb-3">
        <p className="text-gray-700 dark:text-gray-200 text-sm font-medium">
          {phrase.spanish}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs font-mono">
          {phrase.pronunciation}
        </p>
        {phrase.tip && (
          <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md px-3 py-2 mt-2">
            {phrase.tip}
          </p>
        )}
      </div>

      {/* Botón de audio en la derecha */}
      {phrase.audio && (
        <div className="flex justify-end">
          <AudioPlayer audioUrl={phrase.audio} phraseText={phrase.english} />
        </div>
      )}
    </div>
  );
}
