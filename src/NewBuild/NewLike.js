import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { app } from "../base";
import styled from "styled-components";

const NewLike = ({ myID }) => {
  const { currentUser } = useContext(AuthContext);
  const [likeData, setLikeData] = useState([]);

  const addLike = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("like")
      .doc(currentUser.uid)
      .set({
        who: currentUser.uid,
        like: 1,
        change: true,
      });
  };

  const viewLikes = async () => {
    await app
      .firestore()
      .collection("post")
      .doc()
      .collection("like")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setLikeData(r);
      });
  };

  useEffect(() => {
    console.log(likeData);
    viewLikes();
  }, []);
  return (
    <div>
      {likeData.every((el) => el.who !== currentUser.uid) ? (
        <Like onClick={addLike}>
          <FavoriteBorderIcon />
        </Like>
      ) : (
        <div>
          {likeData?.map(({ who, id, change, like }) => (
            <div>
              {id === currentUser.uid ? (
                <div>
                  {change ? (
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
                            change: false,
                          });
                      }}
                    >
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
                            change: true,
                          });
                      }}
                    >
                      <FavoriteBorderIcon />
                    </Like>
                  )}
                </div>
              ) : (
                <div>
                  {id === currentUser.uid ? (
                    <Like onClick={addLike}>
                      <FavoriteBorderIcon />
                    </Like>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewLike;

const Like = styled.div`
  margin-top: 10px;
  color: red;
  :hover {
    cursor: pointer;
  }
`;
