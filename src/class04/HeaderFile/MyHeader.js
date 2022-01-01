import React, { useContext, useState } from "react";
import styled from "styled-components";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import pix from "./Lays.png";
import babe from "./babe.jpg";
import { app } from "../../base";
import { Link } from "react-router-dom";
import { AuthContext } from "../Global/AuthProvider";

const MyHeader = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  const getUserInfo = async () => {
    await app
      .firestore()
      .collection("userInfo")
      .doc(currentUser?.uid)
      .get()
      .then((user) => {
        setUserData(user.data());
      });
  };
  React.useEffect(() => {
    getUserInfo();
  }, [userData]);

  return (
    <Container>
      <Wrapper>
        <Logo src={pix} />

        {currentUser ? (
          <Name>
            Welcome Back {userData?.userName}
            {/* {currentUser?.uid}{" "} */}
          </Name>
        ) : null}

        {currentUser ? (
          <Navigation>
            <Avatar src={userData?.avatar} />
            <Nav
              onClick={() => {
                app.auth().signOut();
              }}
            >
              <Icon>
                <DoorBackIcon />
              </Icon>
              <span>LogOut</span>
            </Nav>
          </Navigation>
        ) : (
          <Navigation>
            <Nav1 to="/register">
              <Icon>
                <MeetingRoomIcon />
              </Icon>
              <span>Register</span>
            </Nav1>
          </Navigation>
        )}
      </Wrapper>
    </Container>
  );
};

export default MyHeader;

const Name = styled.div``;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background: gray;
  margin-right: 10px;
`;

const Icon = styled.div`
  margin-right: 5px;
  margin-top: 5px;
`;

const Nav1 = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  padding: 7px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 3px;

  :hover {
    cursor: pointer;
  }

  span {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 3px;

  :hover {
    cursor: pointer;
  }

  span {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Logo = styled.img`
  margin: 0 20px;
  width: 80px;
  height: 40px;
  border-radius: 3px;
  object-fit: contain;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: #004080;
  color: white;
`;
