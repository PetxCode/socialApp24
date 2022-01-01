import React from "react";
import styled from "styled-components";

const BodyProps = () => {
  return (
    <Container>
      <Wrapper>
        <Content>
          <Icon />
          <Header>Stay engaged & learn by doing</Header>
          <Sub>
            Actively learn by live discussions. Apply what you learn through
            activities, and get instant feedback from peers.
          </Sub>
        </Content>

        <Image />
      </Wrapper>
    </Container>
  );
};

export default BodyProps;

const Image = styled.img`
  width: 500px;
  height: 450px;
  background: lightgray;
`;

const Content = styled.div``;

const Sub = styled.div``;

const Header = styled.div``;

const Icon = styled.div``;

const Wrapper = styled.div`
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
