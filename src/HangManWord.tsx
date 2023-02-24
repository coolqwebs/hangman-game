import React from "react";

type HangManWordProps = {
  reveal?: boolean;
  guessedLetters: string[];
  word: string;
};

const HangManWord = ({
  reveal = false,
  guessedLetters,
  word,
}: HangManWordProps) => {
  return (
    <div className="word">
      {word.split("").map((letter, index) => (
        <span className="word__letter-wrapper" key={index}>
          <span
            className={`word__letter-${
              guessedLetters.includes(letter) || reveal ? "visible" : "hidden"
            } ${!guessedLetters.includes(letter) && reveal ? "red" : ""}`}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangManWord;
