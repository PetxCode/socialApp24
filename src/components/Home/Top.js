import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <Content>
          <Header>Learn live with others, in small groups</Header>
          <Sub>
            Engaging online courses, facilitated by your peers and <br />
            taught by top industry professionals
          </Sub>
        </Content>
        <ImageHolder>
          <Image src={"/asset/bg.png"} />
        </ImageHolder>
      </Wrapper>
    </Container>
  );
};

export default Home;

const Sub = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const Header = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  margin: 0 20px;
  line-height: 1;
`;

const Image = styled.img`
  height: 700px;
  width: 100%;
  object-fit: contain;

  @media screen and (max-width: 500px) {
    width: 500px;
    height: 500px;
    object-fit: contain;
  }
`;

const ImageHolder = styled.div`
  width: 100%;
  min-height: 500px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("/asset/bg1.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 500px) {
    width: 20%;
    height: 300px;
    object-fit: contain;
    background: gray;
  }
`;

const Content = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
`;

const Container = styled.div`
  padding-top: 50px;
  width: 100%;
  min-height: 80vh;
  height: 100%;
  background-color: #e4e6fd;
  padding-bottom: 20px;
`;
