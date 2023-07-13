import styled from "styled-components";

interface IGuess {
  title: string;
  isCorrect: boolean;
  isWrong: boolean;
}

const Guess = ({ title, isCorrect, isWrong }: IGuess) => {
  return (
    <Wrapper>
      {title}
      <Check isCorrect={isCorrect}>
        {isWrong ? <>&#10006;</> : <>&#10004;</>}
      </Check>
    </Wrapper>
  );
};

const Wrapper = styled.h1`
  margin: 0 0 10px;
  font-size: 33px;
  text-align: center;
`;
const Check = styled.span<{ isCorrect: boolean }>`
  margin-left: 10px;
  opacity: ${(p) => (p.isCorrect ? 1 : 0)};
  transition: opacity 300ms ease;
`;
export default Guess;
