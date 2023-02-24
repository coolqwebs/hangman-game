import React from "react";

const HEAD = <div key="head" className="hangman__head"></div>;
const BODY = <div key="body" className="hangman__body"></div>;
const RIGHT_HAND = <div key="right-hand" className="hangman__right-hand"></div>;
const LEFT_HAND = <div key="left-hand" className="hangman__left-hand"></div>;
const RIGHT_LEG = <div key="right-leg" className="hangman__right-leg"></div>;
const LEFT_LEG = <div key="left-leg" className="hangman__left-leg"></div>;

const BODY_PARTS = [HEAD, BODY, RIGHT_HAND, LEFT_HAND, RIGHT_LEG, LEFT_LEG];

type HangManDrawingProps = {
  numberOfGuesses: number;
};

const HangManDrawing = ({ numberOfGuesses }: HangManDrawingProps) => {
  return (
    <div className="hangman">
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div className="hangman__r-bar" />
      <div className="hangman__t-bar" />
      <div className="hangman__l-bar" />
      <div className="hangman__b-bar" />
    </div>
  );
};

export default HangManDrawing;
