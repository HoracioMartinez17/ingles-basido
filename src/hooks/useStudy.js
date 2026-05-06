// CONTROLLER: Hook para la lógica del modo estudio (flashcards tipo Anki)
import { useState, useEffect } from "react";

export const useStudy = (phrases) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [studyPhrase, setStudyPhrase] = useState(null);

  useEffect(() => {
    if (phrases && phrases.length > 0) {
      setStudyPhrase(phrases[currentIndex]);
    }
  }, [currentIndex, phrases]);

  const nextPhrase = () => {
    setShowMeaning(false);
    setShowPronunciation(false);
    if (currentIndex < phrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Vuelve al principio
    }
  };

  const previousPhrase = () => {
    setShowMeaning(false);
    setShowPronunciation(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(phrases.length - 1);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setShowMeaning(false);
    setShowPronunciation(false);
  };

  return {
    currentIndex,
    totalPhrases: phrases.length,
    studyPhrase,
    showMeaning,
    setShowMeaning,
    showPronunciation,
    setShowPronunciation,
    nextPhrase,
    previousPhrase,
    restart,
  };
};
