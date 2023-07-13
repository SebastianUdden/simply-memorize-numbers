import { useEffect, useRef, useState } from "react";
import "./App.css";
import styled from "styled-components";
import { CODE, NUMBERS } from "./data";
import List from "./List";
import Guess from "./Guess";
import Scoring from "./Scoring";
import Inputs from "./Inputs";

const getRandomNumberInRange = (
  min: number,
  max: number,
  disallowed?: number
) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (randomNumber === disallowed);

  return randomNumber;
};

const WAIT = 500;

function App() {
  const inputRef = useRef<any>(null);
  const [highscore, setHighscore] = useState(0);
  const [highscores, setHighscores] = useState([]);
  const [lowscores, setLowscores] = useState([]);
  const [previousHighscore, setPreviousHighscore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [guess, setGuess] = useState("");
  const [viewNumber, setViewNumber] = useState(
    getRandomNumberInRange(min, max)
  );

  useEffect(() => {
    const mn = getRandomNumberInRange(0, 90);
    const mx = mn + 10;
    setMin(mn);
    setMax(mx);
    const hs = JSON.parse(
      localStorage.getItem("NUMBER_MEMORY_HIGHSCORE") || "[]"
    );
    setHighscores(hs.slice(hs.length - 5).reverse());
    setLowscores(hs.filter((h: any) => h.highscore !== 0).slice(0, 5));
  }, []);

  useEffect(() => {
    if (guess === viewNumber.toString()) {
      setIsCorrect(true);
      setTimeout(() => {
        setHighscore(highscore + 1);
        setViewNumber(getRandomNumberInRange(min, max, viewNumber));
        setIsCorrect(false);
        inputRef.current.focus();
      }, WAIT);
      return;
    } else if (Number(guess) > 9) {
      setIsCorrect(true);
      setIsWrong(true);
      setTimeout(() => {
        setIsCorrect(false);
        setIsWrong(false);
        inputRef.current.focus();
      }, WAIT);
    }
    setHighscore(0);
    // eslint-disable-next-line
  }, [guess, min, max]);

  useEffect(() => {
    setViewNumber(getRandomNumberInRange(min, max));
  }, [min, max]);

  useEffect(() => {
    setPreviousHighscore(0);
    const highscores = JSON.parse(
      localStorage.getItem("NUMBER_MEMORY_HIGHSCORE") || "[]"
    );
    if (!highscores.some((h: any) => h.min === min && h.max === max)) {
      highscores.push({ min, max, highscore });
    }
    const newHighScores = highscores?.map((h: any) => {
      if (h.min === min && h.max === max) {
        setPreviousHighscore(h.highscore);
      }
      if (h.min === min && h.max === max && highscore > h.highscore) {
        return {
          min,
          max,
          highscore,
        };
      }
      return h;
    });
    localStorage.setItem(
      "NUMBER_MEMORY_HIGHSCORE",
      JSON.stringify(
        newHighScores.sort(
          (a: any, b: any) =>
            (a.max - a.min) * a.highscore - (b.max - b.min) * b.highscore
        )
      )
    );
  }, [min, max, highscore]);

  return (
    <>
      <Scoring
        highscore={highscore}
        previousHighscore={previousHighscore}
        highscores={highscores}
        lowscores={lowscores}
        onScoreClick={(mn: number, mx: number) => {
          setMin(mn);
          setMax(mx);
        }}
      />
      <Guess
        title={NUMBERS[viewNumber].label}
        isCorrect={isCorrect}
        isWrong={isWrong}
      />
      <Row>
        <Inputs
          min={min}
          max={max}
          onMinChange={(mn: number) => setMin(mn)}
          onMaxChange={(mx: number) => setMax(mx)}
          isCorrect={isCorrect}
          guess={guess}
          onGuess={(g: any) => setGuess(g)}
          inputRef={inputRef}
        />
      </Row>
      <Row>
        <List title="Code" list={CODE} />
        <List title="Numbers" list={NUMBERS} />
      </Row>
    </>
  );
}

const Row = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  min-width: 60vw;
`;

export default App;
