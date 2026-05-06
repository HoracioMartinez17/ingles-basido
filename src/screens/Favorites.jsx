// SCREEN: Pantalla de favoritos
import { useFavorites } from "../context/FavoritesContext";
import Navigation from "../components/Navigation";
import PhraseCard from "../components/PhraseCard";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div>
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          ⭐ Mis Favoritos
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Tienes <span className="font-bold text-yellow-600">{favorites.length}</span>{" "}
          frase
          {favorites.length !== 1 ? "s" : ""} guardada
          {favorites.length !== 1 ? "s" : ""}
        </p>

        {favorites.length > 0 ? (
          <div>
            {favorites.map((phrase) => (
              <PhraseCard key={phrase.id} phrase={phrase} />
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-800 rounded-lg p-8 text-center">
            <p className="text-yellow-800 dark:text-yellow-300 font-semibold text-lg mb-3">
              📭 Aún no tienes favoritos
            </p>
            <p className="text-yellow-700 dark:text-yellow-200">
              Haz clic en el ★ en cualquier frase para añadirla a favoritos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
