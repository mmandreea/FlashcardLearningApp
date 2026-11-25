import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import starterDecks from '../data/starterDecks.json';

const DeckContext = createContext(null);

export function DeckProvider({ children }) {
  const [decks, setDecks, storageError] = useLocalStorage('flashcard_app_decks_v1', []);

  const createDeck = ({ title, description }) => {
    const newDeck = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      recentScores: [],
      cards: [],
    };
    setDecks((prev) => [newDeck, ...prev]);
    return newDeck;
  };

  const updateDeck = (deckId, { title, description }) => {
    setDecks((prev) =>
      prev.map((deck) =>
        deck.id === deckId
          ? { ...deck, title: title.trim(), description: description.trim() }
          : deck
      )
    );
  };

  const deleteDeck = (deckId) => {
    setDecks((prev) => prev.filter((deck) => deck.id !== deckId));
  };

  const addCard = (deckId, { front, back }) => {
    const newCard = {
      id: crypto.randomUUID(),
      front: front.trim(),
      back: back.trim(),
      needsPractice: false,
    };
    setDecks((prev) =>
      prev.map((deck) =>
        deck.id === deckId
          ? { ...deck, cards: [...deck.cards, newCard] }
          : deck
      )
    );
  };

  const updateCard = (deckId, cardId, updates) => {
    setDecks((prev) =>
      prev.map((deck) =>
        deck.id === deckId
          ? {
              ...deck,
              cards: deck.cards.map((card) =>
                card.id === cardId
                  ? {
                      ...card,
                      ...updates,
                      front: updates.front !== undefined ? updates.front.trim() : card.front,
                      back: updates.back !== undefined ? updates.back.trim() : card.back,
                    }
                  : card
              ),
            }
          : deck
      )
    );
  };

  const deleteCard = (deckId, cardId) => {
    setDecks((prev) =>
      prev.map((deck) =>
        deck.id === deckId
          ? { ...deck, cards: deck.cards.filter((card) => card.id !== cardId) }
          : deck
      )
    );
  };

  const importStarterDecks = () => {
    const existingIds = new Set(decks.map((d) => d.id));
    const decksToImport = starterDecks.filter((d) => !existingIds.has(d.id));

    if (decksToImport.length > 0) {
      setDecks((prev) => [...decksToImport, ...prev]);
    }
    return decksToImport.length;
  };

  const recordStudySession = (deckId, { known, total, ratingsByCardId }) => {
    const scoreEntry = {
      date: new Date().toISOString(),
      known,
      total,
    };

    setDecks((prev) =>
      prev.map((deck) => {
        if (deck.id !== deckId) return deck;

        const updatedCards = deck.cards.map((card) =>
          ratingsByCardId[card.id] !== undefined
            ? { ...card, needsPractice: ratingsByCardId[card.id] }
            : card
        );

        return {
          ...deck,
          cards: updatedCards,
          recentScores: [scoreEntry, ...deck.recentScores].slice(0, 5),
        };
      })
    );
  };

  const getDeckById = (deckId) => decks.find((deck) => deck.id === deckId);

  return (
    <DeckContext.Provider
      value={{
        decks,
        storageError,
        getDeckById,
        createDeck,
        updateDeck,
        deleteDeck,
        addCard,
        updateCard,
        deleteCard,
        importStarterDecks,
        recordStudySession,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}

export function useDecks() {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error('useDecks must be used within a DeckProvider');
  }
  return context;
}