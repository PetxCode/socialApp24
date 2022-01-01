import React, { useContext, useState } from "react";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { app } from "../base";
import { AuthContext } from "./AuthProvider";
import { useEffect } from "react";

const LikePost = ({ myID }) => {
  const { currentUser } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [likeCounter, setLikeCounter] = useState([]);

  const addCounter = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("like")
      .doc(currentUser.uid)
      .set({
        like: 1,
        toggle: true,
        likedBy: currentUser.uid,
      });
  };

  const counterMinus = async (x) => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("like")
      .doc(currentUser.uid)
      .update({
        like: x - 1,
        toggle: true,
      });
  };

  const counterPlus = async (x) => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("like")
      .doc(currentUser.uid)
      .update({
        like: x + 1,
        toggle: true,
      });
  };

  const viewCount = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("like")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setLikeCounter(r);
      });
  };

  const getDone = () => {
    let checked = likeCounter.filter((el) => el.id).length;
    console.log("Trying out: ", checked);
    // setTotal(project.length);
  };

  useEffect(() => {
    viewCount();
    getDone();
  }, []);

  return (
    <div>
      {likeCounter.every((el) => el.likedBy !== currentUser.uid) ? (
        <Like
          onClick={() => {
            addCounter();
            console.log("Add Like counter: ", myID, currentUser.uid);
          }}
        >
          <FavoriteBorderIcon />
        </Like>
      ) : (
        <div>
          {likeCounter.map(({ id, likedBy, like, toggle }) => (
            <div key={id}>
              {id === currentUser.uid ? (
                <div>
                  {toggle ? (
                    <Like
                      onClick={async () => {
                        await app
                          .firestore()
                          .collection("post")
                          .doc(myID)
                          .collection("like")
                          .doc(currentUser.uid)
                          .update({
                            like: like - 1,
                            toggle: false,
                          });

                        console.log("This is the ID: ", myID, currentUser.uid);
                      }}
                    >
                      +++++
                      <FavoriteIcon />
                    </Like>
                  ) : (
                    <Like
                      onClick={async () => {
                        await app
                          .firestore()
                          .collection("post")
                          .doc(myID)
                          .collection("like")
                          .doc(currentUser.uid)
                          .update({
                            like: like + 1,
                            toggle: true,
                          });

                        console.log("This is the ID: ", myID, currentUser.uid);
                      }}
                    >
                      ____
                      <FavoriteBorderIcon />
                    </Like>
                  )}
                </div>
              ) : (
                <div>
                  {id === currentUser.uid ? (
                    <Like
                      onClick={() => {
                        addCounter();
                        console.log(
                          "Add Like counter: ",
                          myID,
                          currentUser.uid
                        );
                      }}
                    >
                      <FavoriteBorderIcon />
                    </Like>
                  ) : 
                  null}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikePost;

const Like = styled.div`
  margin-top: 10px;
  color: red;
  :hover {
    cursor: pointer;
  }
`;
