// CONTROLLER: Repetición espaciada tipo Anki con persistencia en localStorage
import { useEffect, useMemo, useState } from "react";

const ONE_DAY = 24 * 60 * 60 * 1000;
const INITIAL_DUE_DELAY = 10 * 60 * 1000;

function getNow() {
  return Date.now();
}

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function getStorageKey(deckId) {
  return `english-waiter-srs-v1:${deckId}`;
}

function loadProgress(deckId) {
  if (typeof window === "undefined") return {};

  const raw = window.localStorage.getItem(getStorageKey(deckId));
  if (!raw) return {};

  return safeParse(raw);
}

function saveProgress(deckId, progress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getStorageKey(deckId), JSON.stringify(progress));
}

function createDefaultCard() {
  return {
    repetitions: 0,
    interval: 0,
    easeFactor: 2.5,
    dueAt: getNow(),
    lastReviewedAt: null,
    lastGrade: null,
  };
}

function updateCard(card, grade) {
  const next = { ...card };
  const now = getNow();

  next.lastReviewedAt = now;
  next.lastGrade = grade;

  if (grade < 3) {
    next.repetitions = 0;
    next.interval = 0;
    next.dueAt = now + INITIAL_DUE_DELAY;
    next.easeFactor = Math.max(1.3, next.easeFactor - 0.2);
    return next;
  }

  next.easeFactor = Math.max(
    1.3,
    next.easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)),
  );

  if (next.repetitions === 0) {
    next.interval = 1;
  } else if (next.repetitions === 1) {
    next.interval = 6;
  } else {
    next.interval = Math.max(1, Math.round(next.interval * next.easeFactor));
  }

  next.repetitions += 1;
  next.dueAt = now + next.interval * ONE_DAY;

  return next;
}

export function useSpacedRepetition(phrases, deckId = "basics") {
  const [progress, setProgress] = useState({});
  const [hydrated, setHydrated] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);

  useEffect(() => {
    setProgress(loadProgress(deckId));
    setHydrated(true);
  }, [deckId]);

  useEffect(() => {
    if (!hydrated) return;
    saveProgress(deckId, progress);
  }, [deckId, progress, hydrated]);

  const cards = useMemo(() => {
    if (!phrases?.length) return [];

    const activePhrases = phrases.filter(
      (phrase) => !phrase.deck || phrase.deck === deckId,
    );

    return activePhrases.map((phrase) => ({
      phrase,
      card: progress[phrase.id] || createDefaultCard(),
    }));
  }, [deckId, phrases, progress]);

  const orderedCards = useMemo(() => {
    return [...cards].sort((a, b) => {
      const aDue = a.card.dueAt ?? 0;
      const bDue = b.card.dueAt ?? 0;

      if (aDue !== bDue) return aDue - bDue;
      return a.phrase.id - b.phrase.id;
    });
  }, [cards]);

  const dueCards = useMemo(() => {
    const now = getNow();
    return orderedCards.filter((item) => item.card.dueAt <= now);
  }, [orderedCards]);

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    if (!orderedCards.length) return;

    const currentExists = orderedCards.some((item) => item.phrase.id === currentId);
    if (!currentExists) {
      setCurrentId((dueCards[0] || orderedCards[0])?.phrase.id ?? null);
    }
  }, [orderedCards, dueCards, currentId]);

  const currentItem = useMemo(() => {
    if (!orderedCards.length || currentId == null) return null;
    return orderedCards.find((item) => item.phrase.id === currentId) || null;
  }, [orderedCards, currentId]);

  const currentIndex = Math.max(
    0,
    orderedCards.findIndex((item) => item.phrase.id === currentId),
  );

  const gradePhrase = (grade) => {
    if (!currentItem) return;

    const nextProgress = updateCard(currentItem.card, grade);
    const nextState = {
      ...progress,
      [currentItem.phrase.id]: nextProgress,
    };

    setProgress(nextState);
    setShowMeaning(false);

    const nextDueCards = orderedCards
      .map((item) => ({
        ...item,
        card:
          item.phrase.id === currentItem.phrase.id
            ? nextProgress
            : nextState[item.phrase.id] || item.card,
      }))
      .filter(
        (item) => item.card.dueAt <= getNow() && item.phrase.id !== currentItem.phrase.id,
      )
      .sort((a, b) => a.card.dueAt - b.card.dueAt || a.phrase.id - b.phrase.id);

    const nextCard =
      nextDueCards[0] ||
      orderedCards.find((item) => item.phrase.id !== currentItem.phrase.id) ||
      currentItem;
    setCurrentId(nextCard.phrase.id);
  };

  const nextPhrase = () => {
    if (!orderedCards.length) return;
    setShowMeaning(false);
    const nextIndex = (currentIndex + 1) % orderedCards.length;
    setCurrentId(orderedCards[nextIndex].phrase.id);
  };

  const previousPhrase = () => {
    if (!orderedCards.length) return;
    setShowMeaning(false);
    const prevIndex = (currentIndex - 1 + orderedCards.length) % orderedCards.length;
    setCurrentId(orderedCards[prevIndex].phrase.id);
  };

  const restart = () => {
    if (!orderedCards.length) return;
    setCurrentId((dueCards[0] || orderedCards[0]).phrase.id);
    setShowMeaning(false);
  };

  const resetProgress = () => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(getStorageKey(deckId));
    setProgress({});
    setCurrentId(phrases[0]?.id ?? null);
    setShowMeaning(false);
  };

  const dueCount = dueCards.length;
  const totalCount = orderedCards.length;

  return {
    currentIndex,
    totalPhrases: totalCount,
    studyPhrase: currentItem?.phrase || null,
    studyCard: currentItem?.card || null,
    showMeaning,
    setShowMeaning,
    nextPhrase,
    previousPhrase,
    restart,
    resetProgress,
    dueCount,
    gradePhrase,
    currentState: currentItem,
  };
}
