import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AuthContext } from "./AuthProvider";
import { app } from "../base";

// const [likeCounter, setLikeCounter] = React.useState([]);

const Likes = ({ LikeID, count, total }) => {
  const { currentUser } = useContext(AuthContext);
  const [likeState, setLikeState] = useState([]);
  const dataDoc = app
    .firestore()
    .collection("post")
    .doc(LikeID)
    .collection("like");

  const getLikes = async () => {
    await dataDoc.onSnapshot((snapshot) => {
      const r = [];
      snapshot.forEach((doc) => {
        r.push({ ...doc.data(), id: doc.id });
      });
      setLikeState(r);
    });
  };

  const createLikes = async () => {
    await dataDoc.doc(currentUser.uid).set({
      toggle: true,
      like: 1,
      createdBy: currentUser.uid,
    });
  };

  const updateLikes = async () => {
    await dataDoc.doc(currentUser.uid).update({
      toggle: false,
      like: 1,
      createdBy: currentUser.uid,
    });
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      {likeState ? (
        <div>{total ? <div>{likeState.length - 1}</div> : null}</div>
      ) : null}
      {count ? (
        <div>
          {likeState.every((el) => el.id !== currentUser.uid) ? (
            <Like onClick={createLikes}>
              <FavoriteBorderIcon />
            </Like>
          ) : (
            <div>
              {likeState?.map(({ toggle, like, id, createdBy }) => (
                <>
                  {createdBy === currentUser.uid ? (
                    <div>
                      {toggle ? (
                        <div>
                          <Like
                            onClick={async () => {
                              await dataDoc.doc(currentUser.uid).delete();
                            }}
                          >
                            <FavoriteIcon />
                          </Like>
                        </div>
                      ) : (
                        <div>
                          {" "}
                          <Like
                            onClick={async () => {
                              await dataDoc.doc(currentUser.uid).delete();
                            }}
                          >
                            <FavoriteBorderIcon />
                          </Like>
                        </div>
                      )}
                    </div>
                  ) : null}
                </>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Likes;

const Like = styled.div`
  color: red;
  transition: all 350ms;
  transform: scale(1);
  :hover {
    cursor: pointer;
    transform: scale(1.09);
  }
`;
