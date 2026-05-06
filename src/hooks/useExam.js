// CONTROLLER: Hook para la lógica del modo examen (preguntas múltiples)
import { useState, useEffect } from "react";

export const useExam = (phrases) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [options, setOptions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [examPhrase, setExamPhrase] = useState(null);
  const [shuffledPhrases, setShuffledPhrases] = useState([]);

  // Inicializar y barajar frases
  useEffect(() => {
    if (phrases && phrases.length > 0) {
      const shuffled = [...phrases].sort(() => Math.random() - 0.5);
      setShuffledPhrases(shuffled);
      setExamPhrase(shuffled[0]);
      generateOptions(shuffled[0], shuffled);
    }
  }, [phrases]);

  const generateOptions = (correctPhrase, phrasesList) => {
    // Generar 3 opciones incorrectas al azar
    const incorrect = phrasesList
      .filter((p) => p.id !== correctPhrase.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => p.spanish);

    // Crear array de opciones
    const allOptions = [correctPhrase.spanish, ...incorrect];
    setOptions(allOptions.sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (option) => {
    if (!answered) {
      setSelectedAnswer(option);
      const isCorrect = option === examPhrase.spanish;

      setAnswers([
        ...answers,
        {
          phraseId: examPhrase.id,
          selected: option,
          correct: examPhrase.spanish,
          isCorrect,
        },
      ]);

      if (isCorrect) {
        setCorrectCount(correctCount + 1);
      }

      setAnswered(true);
    }
  };

  const nextQuestion = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < shuffledPhrases.length) {
      setCurrentIndex(nextIndex);
      setExamPhrase(shuffledPhrases[nextIndex]);
      generateOptions(shuffledPhrases[nextIndex], shuffledPhrases);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const finishExam = () => {
    // Retorna estadísticas del examen
    return {
      total: answers.length,
      correct: correctCount,
      percentage: Math.round((correctCount / answers.length) * 100),
      answers,
    };
  };

  const isExamFinished = currentIndex === shuffledPhrases.length - 1 && answered;

  return {
    currentIndex,
    totalQuestions: shuffledPhrases.length,
    examPhrase,
    options,
    selectedAnswer,
    answered,
    correctCount,
    handleAnswer,
    nextQuestion,
    finishExam,
    isExamFinished,
  };
};
