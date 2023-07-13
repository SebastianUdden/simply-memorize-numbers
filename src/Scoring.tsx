import styled from "styled-components";

type Highscore = {
  min: number;
  max: number;
  highscore: number;
};

interface IScoring {
  highscore: number;
  previousHighscore: number;
  highscores: Highscore[];
  lowscores: Highscore[];
  onScoreClick: (mn: number, mx: number) => void;
}

const Scoring = ({
  highscore,
  previousHighscore,
  highscores,
  lowscores,
  onScoreClick,
}: IScoring) => {
  return (
    <>
      <Highscore>
        Hot streak: <span>{highscore}</span>
        <br />
        Previous hot streak: <span>{previousHighscore}</span>
      </Highscore>
      <Highscores>
        <strong>Top areas</strong>
        {highscores.map((hs) => (
          <li>
            <Button onClick={() => onScoreClick(hs.min, hs.max)}>
              {hs.min}-{hs.max}: <span>{hs.highscore}</span>
            </Button>
          </li>
        ))}
      </Highscores>
      <Lowscores>
        <strong>Bottom areas</strong>
        {lowscores.map((hs) => (
          <li>
            <Button onClick={() => onScoreClick(hs.min, hs.max)}>
              {hs.min}-{hs.max}: <span>{hs.highscore}</span>
            </Button>
          </li>
        ))}
      </Lowscores>
    </>
  );
};

const Button = styled.button`
  background-color: inherit;
  color: inherit;
  margin: 2px;
  padding: 2px;
`;
const Highscore = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  span {
    color: orange;
  }
`;
const Highscores = styled.ul`
  position: absolute;
  text-align: right;
  top: 10px;
  right: 10px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    span {
      color: orange;
    }
  }
`;
const Lowscores = styled(Highscores)`
  top: auto;
  bottom: 10px;
`;

export default Scoring;
