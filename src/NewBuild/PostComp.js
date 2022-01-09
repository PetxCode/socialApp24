import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { app } from "../base";
import { AuthContext } from "./AuthProvider";
import moment from "moment";
import LikeReply from "./LikeReply";
import Reply from "./Reply";

const PostComp = ({ myID, id, rep, post, createdAt, createdBy }) => {
  const { currentUser } = useContext(AuthContext);

  const [getData, setGetData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [reply, setReply] = useState("");

  const getPost = app.firestore().collection("newUsers");
  console.log("myID", myID);

  const gettingPost = async () => {
    await getPost
      .doc(createdBy)
      .get()
      .then((user) => {
        setGetData(user.data());
      });
  };

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

  const updated = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("comment")
      .doc(id)
      .update({
        rep: !rep,
      });
  };

  useEffect(() => {
    gettingPost();
    getUserInfo();
  }, []);

  return (
    <Container>
      <Wrapper>
        {getData.avatar === "" ? (
          <Image1>{getData.userName.charAt(0)} </Image1>
        ) : (
          <Image src={getData.avatar} />
        )}
        <MyPost>
          <Name>{getData.userName}</Name>

          <Post>{post}</Post>

          <MyHolder>
            <span>
              <Reply id={id} myID={myID} count />
            </span>
            {/* <Dot2 /> */}
            <Like>
              <LikeReply id={id} myID={myID} />
            </Like>

            <MyReply>
              <span>
                <Reply id={id} myID={myID} replyCount />
              </span>
              {/* <Dot2 /> */}
              <Reply id={id} myID={myID} likeReply />
            </MyReply>
            <Dot />
            <Time>{moment(createdAt?.toDate()).fromNow()}</Time>
          </MyHolder>
          <Reply id={id} myID={myID} display />

          <Reply id={id} myID={myID} myReply />
        </MyPost>
      </Wrapper>
    </Container>
  );
};

export default PostComp;

const Dot2 = styled.div`
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: gray;
  margin: 0 3px;
  margin-right: 6px;
`;

const Dot = styled.div`
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: gray;
  margin: 0 10px;
`;
const Time = styled.div``;

const MyHolder = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-weight: bold;
  font-size: 15px;

  span {
    margin-right: 3px;
  }
`;
const MyReply = styled.div`
  display: flex;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);
  align-items: center;

  :hover {
    cursor: pointer;
    text-decoration: underline;
    transform: scale(1.05);
  }
  span {
    margin-right: 5px;
  }
`;
const Like = styled.div`
  margin-right: 10px;
  transition: all 350ms;
  transform: scale(1);
  font-size: 15px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
    transform: scale(1.05);
  }

  .MuiSvgIcon-root {
    font-size: 23px;
    margin-top: 10px;
  }
`;

const FormTag = styled.form`
  display: flex;
  flex: 1;
  height: 35px;
  border-radius: 30px;
  margin: 0 10px;
  padding: 0 20px;
  outline: none;
  border: 2px solid lightgray;
  font-size: 20px;
  background: #e4e6e9;
  font-family: Poppins;
`;

const Button = styled.button`
  background: transparent;
  border: 0;
  outline: none;
  display: none;
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

const InputTag = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex: 1;
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  border-radius: 30px;
  margin: 0 2px;
  padding: 0 0px;
  outline: none;
  border: 0;
  font-size: 15px;
  background: #e4e6e9;
  font-family: Poppins;

  ::placeholder {
    font-family: Poppins;
    color: black;
  }
`;

const Image1 = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: orange;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  color: white;
  text-transform: uppercase;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: orange;
  margin: 0 10px;
`;
const Name = styled.div`
  font-weight: bold;
`;
const Post = styled.div``;
const MyPost = styled.div`
  padding: 10px 20px;
  background: lightblue;
  border-radius: 3px;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 10px;
`;
const Container = styled.div``;
