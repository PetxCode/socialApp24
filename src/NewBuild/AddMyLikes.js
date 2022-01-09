import React, { useState, useEffect, useContext } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "styled-components";
import { AuthContext } from "./AuthProvider";
import { app } from "../base";
import ShowImage from "./ShowImage";
import ShowDetails from "./ShowDetails";
import NamedComp from "./NamedComp";

const AddMyLikes = ({
  named,
  icon,
  like,
  you,
  myID,
  total,
  view,
  image,
  x,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [likeData, setLikeData] = useState([]);

  const getPost = app
    .firestore()
    .collection("post")
    .doc(myID)
    .collection("like");

  const createLike = async () => {
    await getPost.doc(currentUser.uid).set({
      likedBy: currentUser.uid,
      toggle: true,
    });
  };

  const deleteLike = async () => {
    await getPost.doc(currentUser.uid).delete();
  };

  const getLikes = async () => {
    await getPost.onSnapshot((snapshot) => {
      const r = [];
      snapshot.forEach((doc) => {
        r.push({ ...doc.data(), id: doc.id });
      });
      setLikeData(r);
    });
  };

  useEffect(() => {
    getLikes();
  }, []);

  <Like onClick={createLike}>
    <FavoriteBorderIcon />
  </Like>;

  return (
    <div>
      <div>
        {you ? (
          <div>
            {likeData.find((el) => el.id === currentUser.uid) ? (
              <div> You and </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div>
        {like ? (
          <div>
            {likeData.find((el) => el.id === currentUser.uid) ? (
              <div style={{ marginLeft: "5px" }}>Others, love this post</div>
            ) : null}
            {/* <div>No body has like this post, yet!</div> */}
          </div>
        ) : null}
      </div>
      <div>
        {icon ? (
          <div>
            {likeData.find((el) => el.id === currentUser.uid) ? (
              <div style={{ marginLeft: "5px" }}>
                {" "}
                <Like>
                  <FavoriteIcon />
                </Like>
              </div>
            ) : (
              <div>
                <Like>
                  <FavoriteBorderIcon />
                </Like>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div>
        {total ? (
          <div style={{ marginLeft: "8px" }}>
            {likeData.find((el) => el.id === currentUser.uid) ? (
              <div>
                {likeData.length - parseInt(x) === 0 ? (
                  <div>hay</div>
                ) : (
                  <div>{likeData.length - 1} </div>
                )}
              </div>
            ) : (
              <div>
                {likeData.length - parseInt(x) === -1 ? null : (
                  <div>{likeData.length} </div>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div>
        {named ? (
          <div style={{ marginLeft: "8px" }}>
            {likeData.find((el) => el.id === currentUser.uid) ? (
              <div>
                <div>
                  {likeData.map(({ likedBy, id }) => (
                    <NamedComp name likedBy={likedBy} />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {likeData.length - parseInt(x) === -1 ? null : (
                  <div>{likeData.length} </div>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div>
        {image ? (
          <PutImage>
            {likeData?.map(({ id, likedBy, toggle }) => (
              <div key={id} style={{ display: "flex" }}>
                <ShowImage likedBy={likedBy} />
              </div>
            ))}
          </PutImage>
        ) : null}
      </div>
      <div>
        {view ? (
          <div>
            {likeData.every((el) => el.id !== currentUser.uid) ? (
              <Like onClick={createLike}>
                <FavoriteBorderIcon />
              </Like>
            ) : (
              <div>
                {likeData?.map(({ id, toggle, likedBy }) => (
                  <div>
                    {likedBy === currentUser.uid ? (
                      <div>
                        {toggle ? (
                          <Like onClick={deleteLike}>
                            <FavoriteIcon />
                          </Like>
                        ) : (
                          <Like onClick={createLike}>
                            <FavoriteBorderIcon />
                          </Like>
                        )}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddMyLikes;

const PutImage = styled.div`
  display: flex;
  margin-left: 7px;
  position: relative;
`;

const Like = styled.div`
  color: red;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid gray;
  object-fit: cover;
`;
