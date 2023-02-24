import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.scss";
import words from "./words.json";
import HangManDrawing from "./HangManDrawing";
import HangManWord from "./HangManWord";
import Keyboard from "./Keyboard";

const getWord = () => {
  const word = words[Math.floor(Math.random() * words.length)];
  return word;
};

function App() {
  const [word, setWord] = useState(getWord);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = useMemo(() => {
    return guessedLetters.filter((letter) => !word.includes(letter));
  }, [guessedLetters]);

  const isGameOver = incorrectLetters.length >= 6;
  const isWinner = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isGameOver) {
      return;
    }
    setGuessedLetters((current) => [...current, letter]);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return;

      e.preventDefault();
      setWord(getWord());
      setGuessedLetters([]);
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div className="App">
      <div className="App__status-text">
        {!isWinner && !isGameOver
          ? "Guess the fucking word, you piece of shit!"
          : ""}
        {isWinner ? "You won, bitch! - Refresh page to try again." : null}
        {isGameOver ? "Game over, Loooser! - Refresh page to try again." : null}
      </div>
      <HangManDrawing numberOfGuesses={incorrectLetters.length} />
      <HangManWord
        reveal={isGameOver}
        guessedLetters={guessedLetters}
        word={word}
      />
      <div className="keyboard">
        <Keyboard
          disabled={isWinner || isGameOver}
          activeLetters={guessedLetters.filter((letter) =>
            word.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
