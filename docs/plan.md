#Project Plan - Flashcard Learning App

## 1. Initial idea
- **Problem:** Flashcard studying solves the problem of passive learning abd rapid forgetting by forcing your brain to actively retrieve information.
- **Intended users:** Students
- **Project goals:** Build a focused, responsive React application that support deck/card management, guided study sessions with answear reveal and confidence ratings, prioritization of difficult cards, and local persistence.
- **Why this idea was selected:** Flashcards allow you to focus more on challenging topics wile reviewing easier ones less frequently, optimizing you study efficiency.

## 2. Scope
- **Must-have features:**
  - Create, edit, delete, and search decks and cards.
  - Import starter decks from a bundled JSON file (preventing duplicate imports).
  - Run a study session one card at a time with Reveal and confidence rating (Needs practice vs Known).
  - Prioritize cards marked Needs practice at the start of a session.
  - Display a session summary and track recent scores per deck.
  - Persist all user changes in localStorage.
- **Optional features (if time allows):**
  - Filter a study session to review only cards marked Needs practice.
- **Deliberately left out:**
  - Authentication, user accounts, or custom backend.
  - Chat features.

## 3. User Journey
1. User lands on the **Dashboard (`/`)**, views existing decks, or clicks **Import Starter Decks** if the list is empty.
2. User searches for a deck or creates a new deck via a validated modal/form.
3. User opens a deck (**`/decks/:deckId`**) to view its cards, recent scores, and add/edit/delete individual cards.
4. User clicks **Start Study Session** (**`/decks/:deckId/study`**), where cards marked *Needs practice* appear first.
5. For each card, the user reads the prompt, reveals the answer, and rates their confidence.
6. At the end of the session, the user sees a **Session Summary** (score, count of cards needing practice) and can restart or return to the deck.