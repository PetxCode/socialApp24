import React, { useContext, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { app } from "../base";
import { AuthContext } from "./AuthProvider";
import { useEffect } from "react";

const ShowReply = ({ reply, createdBy, createdAt, id }) => {
  const { currentUser } = useContext(AuthContext);

  const [userData, setUserData] = useState([]);

  const getUserInfo = async () => {
    await app
      .firestore()
      .collection("newUsers")
      .doc(currentUser?.uid)
      .get()
      .then((user) => {
        setUserData(user.data());
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <div>
        <Div>
          <Reply>{reply}</Reply>
          <Holder>
            <MyHolder>
              {userData.avatar === "" ? (
                <ImageNon>{userData.userName.charAt(0)}</ImageNon>
              ) : (
                <Image24 src={userData?.avatar} />
              )}
            </MyHolder>
            <Name>{userData.userName}</Name>
            <Date>{moment(createdAt?.toDate()).fromNow()}</Date>
          </Holder>
        </Div>
      </div>
    </div>
  );
};

export default ShowReply;

const MyHolder = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
const Image24 = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid black;
  object-fit: cover;
  margin-left: 10px;
`;

const ImageNon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid gray;
  color: white;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: orange;
  font-size: 20px;
`;
const Holder = styled.div`
  display: flex;
  font-size: 13px;
  color: red;
  margin-bottom: 10px;
  align-items: center;
  font-weight: 500;
`;
const Name = styled.div`
  margin-right: 20px;
`;
const Date = styled.div``;
const Reply = styled.div`
  font-weight: 500;
`;
const Div = styled.div``;
