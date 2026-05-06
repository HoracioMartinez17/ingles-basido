// SCREEN: Pantalla de lista de todas las frases con paginación
import { useState, useMemo } from "react";
import Navigation from "../components/Navigation";
import PhraseCard from "../components/PhraseCard";
import phrases from "../data/phrases";

const ITEMS_PER_PAGE = 20;

export default function Phrases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPhrases = useMemo(
    () =>
      phrases.filter(
        (phrase) =>
          phrase.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
          phrase.spanish.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );

  const totalPages = Math.ceil(filteredPhrases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPhrases = filteredPhrases.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          📚 Frases Esenciales
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por palabra en inglés o español..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Estadísticas y paginación */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <p className="text-gray-600 dark:text-gray-300">
            Mostrando{" "}
            <span className="font-bold text-blue-600">
              {filteredPhrases.length === 0 ? 0 : startIndex + 1}
              {filteredPhrases.length > endIndex
                ? ` - ${endIndex}`
                : ` - ${filteredPhrases.length}`}
            </span>{" "}
            de <span className="font-bold">{filteredPhrases.length}</span> frases
          </p>
          {totalPages > 1 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Página <span className="font-bold">{currentPage}</span> de{" "}
              <span className="font-bold">{totalPages}</span>
            </p>
          )}
        </div>

        {/* Tarjetas de frases */}
        <div className="mb-8">
          {paginatedPhrases.length > 0 ? (
            paginatedPhrases.map((phrase) => (
              <PhraseCard key={phrase.id} phrase={phrase} />
            ))
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-800 rounded-lg p-6 text-center">
              <p className="text-yellow-800 dark:text-yellow-300 font-semibold">
                No se encontraron frases con "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        {/* Botones de paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-600"
            >
              ← Anterior
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-600"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-600"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
