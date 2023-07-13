import { useState } from "react";
import styled from "styled-components";

interface IList {
  title: string;
  list: {
    i: string;
    label: string;
  }[];
}

const List = ({ title, list }: IList) => {
  const [show, setShow] = useState(false);
  return (
    <Wrapper>
      <Title onClick={() => setShow(!show)}>{title}</Title>
      {show && (
        <UL>
          {list.map((n) => (
            <li>
              {n.i}: <label>{n.label}</label>
            </li>
          ))}
        </UL>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
const Title = styled.button`
  margin-top: 10px;
  background-color: inherit;
`;
const UL = styled.ul`
  margin: 0;
  padding: 0 25px;
  font-family: verdana;
  li {
  }
  label {
    color: orange;
  }
`;

export default List;
