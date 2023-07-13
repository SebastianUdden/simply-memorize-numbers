import { useRef } from "react";
import styled from "styled-components";

const MIN_VALUES = Array.from({ length: 100 }, (_, index) => index);
const MAX_VALUES = Array.from({ length: 100 }, (_, index) => index + 1);
const createArray = (min: number, max: number) => {
  const length = max - min + 1;
  return Array.from({ length }, (_, index) => index + min);
};

interface IInputs {
  min: number;
  max: number;
  onMinChange: (mn: number) => void;
  onMaxChange: (mx: number) => void;
  isCorrect: boolean;
  guess: string;
  onGuess: (g: string) => void;
  inputRef: any;
}

const Inputs = ({
  min,
  max,
  onMinChange,
  onMaxChange,
  isCorrect,
  guess,
  onGuess,
  inputRef,
}: IInputs) => {
  const selectRef = useRef<any>(null);

  return (
    <>
      <Select
        defaultValue={min}
        value={min}
        onChange={(e: any) => {
          const newMin = Number(e.target.value);
          if (newMin >= max && newMin < 95) {
            onMaxChange(newMin + 5);
          } else if (newMin >= max) {
            onMaxChange(100);
          }
          onMinChange(newMin);
        }}
      >
        {MIN_VALUES.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </Select>
      <Input
        ref={inputRef}
        type="number"
        min={min}
        max={max}
        value={guess}
        disabled={isCorrect}
        onChange={(e: any) => onGuess(e.target.value)}
      />
      <Select
        ref={selectRef}
        disabled={isCorrect}
        onChange={(e: any) => {
          onGuess(e.target.value);
          selectRef.current.selectedIndex = 0;
        }}
      >
        <option value="" disabled selected>
          Guess
        </option>
        {createArray(min, max).map((v) => (
          <option value={v}>{v < 10 ? `0${v}` : v}</option>
        ))}
      </Select>
      <Select
        defaultValue={max}
        value={max}
        onChange={(e: any) => {
          const newMax = Number(e.target.value);
          if (newMax <= min && newMax > 5) {
            onMinChange(newMax - 5);
          } else if (newMax <= min) {
            onMinChange(0);
          }
          onMaxChange(newMax);
        }}
      >
        {MAX_VALUES.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </Select>
    </>
  );
};

const Input = styled.input`
  padding: 10px;
  width: 100%;
`;
const Select = styled.select`
  padding: 10px;
  width: 100%;
`;

export default Inputs;
