// SCREEN: Pantalla de inicio
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <div>
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8 mb-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-2">🍷 English Waiter App</h1>
          <p className="text-xl opacity-90">
            Aprende inglés básico de camarero en 10 días
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/phrases"
            className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-all border-t-4 border-blue-500 cursor-pointer"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              📚 Frases Esenciales
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Explora todas las frases disponibles con sus significados y pronunciación.
            </p>
          </Link>

          <Link
            to="/study"
            className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-all border-t-4 border-green-500 cursor-pointer"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              🎓 Modo Estudio
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Aprende con flashcards tipo Anki y repetición espaciada. Muestra significado
              y pronunciación cuando lo necesites.
            </p>
          </Link>

          <Link
            to="/exam"
            className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-all border-t-4 border-orange-500 cursor-pointer"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              ✏️ Modo Examen
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Ponte a prueba con preguntas aleatorias y 4 opciones de respuesta.
            </p>
          </Link>

          <Link
            to="/favorites"
            className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-all border-t-4 border-yellow-500 cursor-pointer"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              ⭐ Mis Favoritos
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Visualiza y estudia solo las frases que has marcado como favoritas.
            </p>
          </Link>
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-slate-800 border-2 border-blue-200 dark:border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            💡 ¿Cómo usar la app?
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>✓ Comienza en "Frases Esenciales" para conocer el vocabulario.</li>
            <li>
              ✓ Usa "Modo Estudio" para aprender con flashcards y repetición espaciada.
            </li>
            <li>
              ✓ Marca las frases difíciles como "Favoritas" para enfocarte en ellas.
            </li>
            <li>✓ Pruébate en "Modo Examen" cuando te sientas preparado.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
