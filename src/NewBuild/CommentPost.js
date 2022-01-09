import React, { useContext, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { app } from "../base";
import { AuthContext } from "./AuthProvider";
import firebase from "firebase";
import PostComp from "./PostComp";

const CommentPost = ({ viewAll, viewOne, myForm, myID, posting, view }) => {
  const { currentUser } = useContext(AuthContext);

  const [post, setPost] = useState("");
  const [userData, setUserData] = useState([]);
  const [getComment, setGetComment] = useState([]);
  const [getAllComment, setAllGetComment] = useState([]);

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

  const getCommentPost = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("comment")
      // .doc(currentUser.uid)
      // .collection("whoComment")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        const item = [];
        snapshot.forEach((doc) => {
          item.push({ ...doc.data(), id: doc.id });
        });
        setGetComment(item);
      });
  };

  const getAllCommentPost = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("comment")
      // .doc(currentUser.uid)
      // .collection("whoComment")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const item = [];
        snapshot.forEach((doc) => {
          item.push({ ...doc.data(), id: doc.id });
        });
        setAllGetComment(item);
      });
  };

  const commentPost = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("comment")
      // .doc(currentUser.uid)
      // .collection("whoComment")
      .doc()
      .set({
        myID,
        post,
        rep: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: currentUser.uid,
      });

    setPost("");
  };

  const commentHandled = (e) => {
    e.preventDefault();
    console.log("show");
    commentPost();
  };

  useEffect(() => {
    getUserInfo();
    getCommentPost();
    getAllCommentPost();
  }, []);

  return (
    <Container>
      {/* {posting ? ( */}
      {viewOne ? (
        <div>
          {getComment.map(({ myID, rep, post, createdAt, createdBy, id }) => (
            <div key={id}>
              <div>
                <PostComp
                  post={post}
                  createdAt={createdAt}
                  createdBy={createdBy}
                  rep={rep}
                  id={id}
                  myID={myID}
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {viewAll ? (
        <div>
          {getAllComment.map(
            ({ rep, myID, post, createdAt, createdBy, id }) => (
              <div key={id}>
                <div>
                  <PostComp
                    post={post}
                    createdAt={createdAt}
                    createdBy={createdBy}
                    myID={myID}
                    rep={rep}
                    id={id}
                  />
                </div>
              </div>
            )
          )}
        </div>
      ) : null}

      <Space />
      {myForm ? (
        <InputTag>
          {userData.avatar === "" ? (
            <ImageNon>{userData.userName.charAt(0)}</ImageNon>
          ) : (
            <Image src={userData?.avatar} />
          )}

          <FormTag>
            <Input
              placeholder={`Write comment, ${userData?.userName}...?`}
              type="text"
              value={post}
              onChange={(e) => {
                setPost(e.target.value);
              }}
            />
            <Button type="submit" onClick={commentHandled}>
              Send
            </Button>
          </FormTag>
        </InputTag>
      ) : null}
    </Container>
  );
};

export default CommentPost;

const FormTag = styled.form`
  display: flex;

  flex: 1;
  height: 55px;
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

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid black;
  object-fit: cover;
  margin-left: 20px;
`;

const ImageNon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid gray;
  color: white;
  margin-left: 20px;
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
  height: 55px;
  border-radius: 30px;
  margin: 0 2px;
  padding: 0 0px;
  outline: none;
  border: 0;
  font-size: 20px;
  background: #e4e6e9;
  font-family: Poppins;

  ::placeholder {
    font-family: Poppins;
    color: black;
  }
`;

const Space = styled.div`
  border-bottom: 1px solid;
  border-color: lightgray;
  width: 100%;
  margin: 20px 0;
`;

const Container = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 50px;
`;
