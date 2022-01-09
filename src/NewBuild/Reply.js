import React, { useContext, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
import { app } from "../base";
import { AuthContext } from "./AuthProvider";
import firebase from "firebase";
import ShowReply from "./ShowReply";

const Reply = ({
  likeReply,
  myID,
  id,
  myReply,
  rep,
  post,
  createdAt,
  createdBy,
  display,
  count,
  replyCount,
}) => {
  const { currentUser } = useContext(AuthContext);

  const [userData, setUserData] = useState([]);
  const [allLike, setAllLike] = useState([]);
  const [allReply, setAllReply] = useState([]);
  const [chn, setChn] = useState(false);

  const [reply, setReply] = useState("");
  const onToggle = () => {
    setChn(!chn);
  };

  const getPost = app.firestore().collection("newUsers");
  console.log("myID", myID);

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

  const likeComment = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("comment")
      .doc(id)
      .collection("relyComment")
      .doc(currentUser.uid)
      .set({
        newID: id,
        oldID: myID,
        like: true,
        createdBy: currentUser.uid,
      });
  };
  const replyComment = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("comment")
      .doc(id)
      .collection("reply")
      .doc()
      .set({
        newID: id,
        oldID: myID,
        reply,
        createdBy: currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setReply("");
  };

  const showReplyComment = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("comment")
      .doc(id)
      .collection("reply")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setAllReply(r);
      });

    setReply("");
  };

  const unLikeComment = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("comment")
      .doc(id)
      .collection("relyComment")
      .doc(currentUser.uid)
      .update({
        like: chn,
      });
  };

  const getLikeComment = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("comment")
      .doc(id)
      .collection("relyComment")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setAllLike(r);
      });
  };

  useEffect(() => {
    getLikeComment();
    showReplyComment();
    getUserInfo();
  }, []);

  return (
    <div>
      {likeReply ? (
        <div>
          {allLike.length > 0 ? (
            <div>
              {allLike.map(({ toggle, id, like, createdBy }) => (
                <div>
                  {id === currentUser.uid ? (
                    <div>
                      {like ? (
                        <Like
                          onClick={() => {
                            onToggle();
                            unLikeComment();
                            console.log("clicked: ", like, chn);
                          }}
                        >
                          true Reply
                        </Like>
                      ) : (
                        <Like
                          onClick={() => {
                            likeComment();
                            console.log("clicked");
                          }}
                        >
                          false Reply
                        </Like>
                      )}
                    </div>
                  ) : (
                    <Like
                      onClick={() => {
                        likeComment();
                        console.log("clicked");
                      }}
                    >
                      try Reply
                    </Like>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Like
              onClick={() => {
                likeComment();
                console.log("clicked");
              }}
            >
              show Reply
            </Like>
          )}
        </div>
      ) : null}

      <div>{count ? <div>{allLike.length}</div> : null}</div>
      <div>
        {myReply ? (
          <div>
            {allLike.map(({ toggle, id, like, createdBy }) => (
              <div>
                {like ? (
                  <div>
                    {id === currentUser.uid ? (
                      <div>
                        <InputTag>
                          {userData.avatar === "" ? (
                            <ImageNon>{userData.userName.charAt(0)}</ImageNon>
                          ) : (
                            <Image24 src={userData?.avatar} />
                          )}

                          <FormTag>
                            <Input
                              placeholder={`reply, ${userData?.userName}...?`}
                              type="text"
                              value={reply}
                              onChange={(e) => {
                                setReply(e.target.value);
                              }}
                            />
                            <Button
                              type="submit"
                              onClick={(e) => {
                                e.preventDefault();
                                replyComment();
                              }}
                            >
                              Send
                            </Button>
                          </FormTag>
                        </InputTag>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div>{replyCount ? <div>{allReply.length}</div> : null}</div>
      <div>
        {display ? (
          <div>
            {allReply.map(({ id, reply, createdAt, createdBy }) => (
              <div key={id}>
                {" "}
                <ShowReply
                  reply={reply}
                  createdAt={createdAt}
                  createdBy={createdBy}
                  id={id}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Reply;

const Like = styled.div`
  /* margin-right: 10px; */
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
    margin-top: 5px;
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
