import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { app } from "../base";
import { AuthContext } from "./AuthProvider";
import moment from "moment";

const NamedComp = ({ name, likedBy }) => {
  const { currentUser } = useContext(AuthContext);

  const [getData, setGetData] = useState([]);

  const getPost = app.firestore().collection("newUsers");

  const gettingPost = async () => {
    await getPost
      .doc(likedBy)
      .get()
      .then((user) => {
        setGetData(user.data());
      });
  };
  useEffect(() => {
    gettingPost();
  }, []);

  return (
    <div>
      <Div>
        <Container>{name ? <Name>{getData?.userName}</Name> : null}</Container>
      </Div>
    </div>
  );
};

export default NamedComp;

const Time = styled.div``;

const Name = styled.div`
  font-weight: bold;
`;
const Container = styled.div``;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid gray;
  object-fit: cover;
  margin-right: 10px;
`;

const Div = styled.div`
  display: flex;
`;
