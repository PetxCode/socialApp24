import React from "react";
import styled from "styled-components";
import BodyProps from "./BodyProps";
import Top from "./Top";
const Home = () => {
  return (
    <Container>
      <Wrapper>
        <Top />

        <BodyProps />
      </Wrapper>
    </Container>
  );
};

export default Home;

const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
`;

const Container = styled.div`
min-height: calc (100vh - 100px)
height: 100%;
width: 100%
`;
