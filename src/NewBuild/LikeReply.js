import React, { useContext, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
import { app } from "../base";
import { AuthContext } from "./AuthProvider";

const LikeReply = ({ myID, id, rep, post, createdAt, createdBy }) => {
  const { currentUser } = useContext(AuthContext);

  const [allLike, setAllLike] = useState([]);

  const likeComment = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("comment")
      .doc(id)
      .collection("like")
      .doc(currentUser.uid)
      .set({
        newID: id,
        oldID: myID,
        like: true,
        createdBy: currentUser.uid,
      });
  };

  const getLikeComment = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("comment")
      .doc(id)
      .collection("like")
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
  }, []);

  return (
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
                        likeComment();
                        console.log("clicked");
                      }}
                    >
                      <FavoriteIcon />
                    </Like>
                  ) : (
                    <Like
                      onClick={() => {
                        likeComment();
                        console.log("clicked");
                      }}
                    >
                      <FavoriteBorderIcon />
                    </Like>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default LikeReply;

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
