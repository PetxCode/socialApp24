import React from "react";
import styled from "styled-components";

const ButtonProps = ({ clr, icon, title, onClick }) => {
  return (
    <Container>
      <Wrapper onClick={onClick}>
        <Icon clr={clr}>{icon}</Icon>
        <p>{title}</p>
      </Wrapper>
    </Container>
  );
};

export default ButtonProps;

const Icon = styled.div`
  margin-top: 8px;

  .MuiSvgIcon-root {
    font-size: 50px;
    color: ${({ clr }) => clr};
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }

  p {
    font-weight: bold;
    font-size: 20px;
    margin-left: 10px;
    color: gray;
  }
`;
const Container = styled.div`
  padding: 4px 50px;
  transition: all 350ms;
  border-radius: 5px;
  margin: 0 10px;
  :hover {
    background: lightgray;
    cursor: pointer;
  }
`;
