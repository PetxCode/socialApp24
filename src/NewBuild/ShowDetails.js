import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { app } from "../base";
import { AuthContext } from "./AuthProvider";
import moment from "moment";

const ShowDetails = ({ date, image, name, myID, time }) => {
  const { currentUser } = useContext(AuthContext);

  const [getData, setGetData] = useState([]);

  const getPost = app.firestore().collection("newUsers");

  const gettingPost = async () => {
    await getPost
      .doc(myID)
      .get()
      .then((user) => {
        setGetData(user.data());
      });
  };
  useEffect(() => {
    gettingPost();
  }, [getData]);

  return (
    <div>
      <Div>
        {image ? (
          <div>
            {getData.avatar === "" ? (
              <ImageItem>{getData?.userName.charAt(0)}</ImageItem>
            ) : (
              <Image src={getData?.avatar} />
            )}
          </div>
        ) : null}
        <Container>
          {name ? <Name>{getData?.userName}</Name> : null}
          {date ? <Time>{moment(time?.toDate()).fromNow()}</Time> : null}
        </Container>
      </Div>
    </div>
  );
};

export default ShowDetails;

const ImageItem = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid gray;
  margin-right: 10px;
  background: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

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
