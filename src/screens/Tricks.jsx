// SCREEN: Pantalla de trucos gramaticales de aprendizaje rápido
import { useState, useMemo } from "react";
import Navigation from "../components/Navigation";
import TrickCard from "../components/TrickCard";
import tricks from "../data/tricks";

export default function Tricks() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "Todos los trucos", emoji: "✨" },
    { id: "grammar", label: "Tiempos verbales", emoji: "⏱️" },
    { id: "service", label: "Servicio al cliente", emoji: "🎤" },
    { id: "hotel", label: "Hotel", emoji: "🏨" },
  ];

  const filteredTricks = useMemo(
    () =>
      tricks
        .filter((trick) =>
          selectedCategory === "all" ? true : trick.category === selectedCategory,
        )
        .filter(
          (trick) =>
            trick.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trick.explanation.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    [selectedCategory, searchTerm],
  );

  return (
    <div>
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            ✨ Trucos de Aprendizaje Rápido
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Patrones y trucos gramaticales para aprender inglés de camarero de forma fluida y
            natural.
          </p>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar trucos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-slate-800 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
          />
        </div>

        {/* Filtros por categoría */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-purple-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600"
              }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Lista de trucos */}
        {filteredTricks.length > 0 ? (
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Mostrando {filteredTricks.length} truco{filteredTricks.length !== 1 ? "s" : ""}
            </p>
            <div className="space-y-4">
              {filteredTricks.map((trick) => (
                <TrickCard key={trick.id} trick={trick} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No se encontraron trucos con esa búsqueda.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Info en footer */}
        <div className="mt-12 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            💡 <strong>Consejo:</strong> Los trucos aquí son patrones que los hablantes nativos
            usan naturalmente. Práctica varios en contexto para que se queden en tu memoria. No
            necesitas memorizarlos todos a la vez.
          </p>
        </div>
      </div>
    </div>
  );
}
