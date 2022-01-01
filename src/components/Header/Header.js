import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <Logo />
        <Navigation>
          <Nav to="/">
            <Icon>
              <HomeIcon />
            </Icon>
            <span>For Learners</span>
          </Nav>
          <Nav to="/courses">
            <Icon>
              <AppsIcon />
            </Icon>
            <span>Courses</span>
          </Nav>
          <Nav to="/creators">
            <Icon>
              <EmojiObjectsIcon />
            </Icon>
            <span>For Creators</span>
          </Nav>
        </Navigation>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Icon = styled.div`
  margin-top: 7px;
  margin-right: 5px;
  margin-left: 5px;
`;

const Nav = styled(NavLink)`
  height: 50px;
  align-items: center;
  display: flex;
  transition: all 350ms;
  text-decoration: none;
  color: black;
  font-weight: bold;
  margin: 0 20px;

  &.active {
    color: #004080;
  }
  :hover {
    cursor: pointer;
  }

  span {
    font-size: 20px;
  }
`;

const Navigation = styled.div`
  display: flex;

  margin-right: 60px;
`;

const Logo = styled.img`
  width: 150px;
  height: 70px;
  object-fit: contain;
  margin-left: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
`;

const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  color: black;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  position: fixed;
`;
