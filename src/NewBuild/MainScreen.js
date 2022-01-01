import React from "react";
import styled from "styled-components";
import TopPost from "./TopPost";
import ViewPost from "./ViewPost";

const MainScreen = () => {
  return (
    <Container>
      <TopPost />
      <ViewPost />
    </Container>
  );
};

export default MainScreen;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  background-color: lightgray;
  height: 100%;
  padding-bottom: 30px;
`;
