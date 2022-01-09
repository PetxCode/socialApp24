import React, { useContext, useState } from "react";
import styled from "styled-components";
import logo from "./Lays.png";
import pix from "./father.jpg";
import { AuthContext } from "./AuthProvider";
import { app } from "../base";
import { Link } from "react-router-dom";

const NewHeader = () => {
  const { currentUser } = useContext(AuthContext);
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState([]);

  const onAuth = () => {
    setAuth(!auth);
  };

  const readData = async () => {
    await app
      .firestore()
      .collection("newUsers")
      .doc(currentUser?.uid)
      .get()
      .then((user) => {
        setUserData(user.data());
      });
  };

  React.useEffect(() => {
    readData();
    console.log(userData);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Link to="/">
          <Logo src={logo} />
        </Link>
        <div>welcome back {userData?.userName}</div>

        <Nav to="/memory">My Diary Book</Nav>

        <Navigation />
        {currentUser ? (
          <Holder>
            {userData?.avatar === "" ? (
              <Div>{userData?.userName.charAt(0)}</Div>
            ) : (
              <Avatar src={userData?.avatar} />
            )}
            <AvatarText
              onClick={() => {
                app.auth().signOut();
              }}
            >
              Log Out
            </AvatarText>
          </Holder>
        ) : (
          <Holder onClick={onAuth}>
            <AvatarText>Register</AvatarText>
          </Holder>
        )}
      </Wrapper>
    </Container>
  );
};

export default NewHeader;

const Div = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid white;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 20px;
`;

const AvatarText = styled.div`
  padding: 15px 30px;
  margin-right: 20px;
  transition: all 350ms;
  transform: scale(1);
  border-radius: 3px;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

const Nav = styled(Link)`
  margin: 0 40px;
  padding: 15px 30px;
  border-radius: 3px;
  transition: all 350ms;
  text-decoration: none;
  color: white;

  :hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

const Holder = styled.div`
  display: flex;
  align-items: center;
`;

const Navigation = styled.div`
  flex: 1;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid white;
  margin: 0 20px;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: contain;
  cursor: pointer;
  margin: 0 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
`;
