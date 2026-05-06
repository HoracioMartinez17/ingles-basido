// SCREEN: Pantalla del modo estudio (flashcards tipo Anki)
import { useEffect, useMemo, useState } from "react";
import Navigation from "../components/Navigation";
import StudyCard from "../components/StudyCard";
import { useSpacedRepetition } from "../hooks/useSpacedRepetition";
import phrases from "../data/phrases";
import studyDecks from "../data/studyDecks";

const DECK_STORAGE_KEY = "english-waiter-selected-deck";

export default function Study() {
  const [selectedDeckId, setSelectedDeckId] = useState("basics");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedDeckId = window.localStorage.getItem(DECK_STORAGE_KEY);
    if (storedDeckId) {
      setSelectedDeckId(storedDeckId);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(DECK_STORAGE_KEY, selectedDeckId);
  }, [selectedDeckId]);

  const activeDeck = useMemo(
    () => studyDecks.find((deck) => deck.id === selectedDeckId) || studyDecks[0],
    [selectedDeckId],
  );

  const deckPhrases = useMemo(
    () => phrases.filter((phrase) => !phrase.deck || phrase.deck === selectedDeckId),
    [selectedDeckId],
  );

  const study = useSpacedRepetition(deckPhrases, selectedDeckId);

  if (!study.studyPhrase) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          🎓 Modo Estudio
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Repite las frases según su vencimiento, como en Anki, pero separadas por mazos.
        </p>

        <div className="mb-6 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
            Mazo de estudio
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {studyDecks.map((deck) => (
              <button
                key={deck.id}
                onClick={() => setSelectedDeckId(deck.id)}
                className={`text-left rounded-lg border-2 p-4 transition-all ${
                  selectedDeckId === deck.id
                    ? deck.id === "basics"
                      ? "border-green-500 bg-green-50"
                      : "border-blue-500 bg-blue-50"
                    : "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 hover:border-gray-300 dark:hover:border-slate-600"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-100">
                      {deck.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {deck.description}
                    </p>
                  </div>
                  <span className="text-xs font-bold uppercase text-gray-400">
                    {deck.id}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Cada mazo guarda su progreso por separado. Así luego puedes crear uno nuevo
            sin mezclarlo con el básico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700 font-semibold">Frases pendientes hoy</p>
            <p className="text-2xl font-bold text-blue-900">{study.dueCount}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-700 font-semibold">Total de frases</p>
            <p className="text-2xl font-bold text-green-900">{study.totalPhrases}</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-700 font-semibold">Método</p>
            <p className="text-2xl font-bold text-orange-900">SM-2</p>
          </div>
        </div>

        <div className="mb-8">
          <StudyCard
            phrase={study.studyPhrase}
            showMeaning={study.showMeaning}
            reviewInfo={study.studyCard}
            onToggleMeaning={() => study.setShowMeaning(!study.showMeaning)}
          />
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mb-3">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{
              width: `${(study.currentIndex / Math.max(study.totalPhrases - 1, 1)) * 100}%`,
            }}
          ></div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-300 mb-8 flex flex-wrap gap-3">
          <span>
            Siguiente repaso:{" "}
            <strong>
              {study.studyCard?.dueAt
                ? new Date(study.studyCard.dueAt).toLocaleString()
                : "ahora"}
            </strong>
          </span>
          <span>
            Repeticiones: <strong>{study.studyCard?.repetitions ?? 0}</strong>
          </span>
          <span>
            Intervalo: <strong>{study.studyCard?.interval ?? 0} días</strong>
          </span>
        </div>

        {/* Botones de control */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={study.previousPhrase}
            disabled={study.currentIndex === 0}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition-all"
          >
            ← Anterior
          </button>

          <button
            onClick={study.restart}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
          >
            🔄 Volver a hoy
          </button>

          <button
            onClick={study.nextPhrase}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
          >
            Siguiente →
          </button>
        </div>

        {/* Botones de repaso estilo Anki */}
        <div className="bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4 mb-6 shadow-sm">
          <p className="text-gray-700 dark:text-gray-200 font-semibold mb-3">
            ¿Qué tan bien la recordaste?
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => study.gradePhrase(2)}
              className="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3 px-4 rounded-lg transition-all"
            >
              Again
              <span className="block text-xs font-normal">Repetir pronto</span>
            </button>
            <button
              onClick={() => study.gradePhrase(3)}
              className="bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold py-3 px-4 rounded-lg transition-all"
            >
              Hard
              <span className="block text-xs font-normal">Difícil</span>
            </button>
            <button
              onClick={() => study.gradePhrase(4)}
              className="bg-green-100 hover:bg-green-200 text-green-700 font-bold py-3 px-4 rounded-lg transition-all"
            >
              Good
              <span className="block text-xs font-normal">Bien</span>
            </button>
            <button
              onClick={() => study.gradePhrase(5)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-3 px-4 rounded-lg transition-all"
            >
              Easy
              <span className="block text-xs font-normal">Muy fácil</span>
            </button>
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={study.resetProgress}
              className="text-sm text-gray-500 dark:text-gray-300 hover:text-red-600 underline"
            >
              Borrar progreso SRS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
