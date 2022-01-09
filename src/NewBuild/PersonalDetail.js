import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { app } from "../base";
import moment from "moment";

const PersonalDetail = ({ image, name, time, createdBy, createdAt }) => {
  const [myUser, setMyUser] = useState([]);

  const getUser = async () => {
    await app
      .firestore()
      .collection("newUsers")
      .doc(createdBy)
      .get()
      .then((user) => {
        setMyUser(user.data());
      });
  };
  useEffect(() => {
    getUser();
    console.log(myUser);
  }, []);

  return (
    <Container>
      {image ? <Avatar src={myUser?.avatar} /> : null}
      <Holder>
        {name ? <Name>{myUser?.userName}</Name> : null}
        {time ? <Time>{moment(createdAt?.toDate()).fromNow()}</Time> : null}
      </Holder>
    </Container>
  );
};

export default PersonalDetail;

const Avatar = styled.img`
  object-fit: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid gray;
  margin-right: 10px;
`;

const Holder = styled.div`
  display: flex;
  flex-direction: column;
`;
const Time = styled.div``;
const Name = styled.div`
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
`;
