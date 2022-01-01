import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "./AuthProvider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { app } from "../base";

const MyLikePost = ({ myID }) => {
  const { currentUser } = useContext(AuthContext);
  const [myLike, setMyLike] = React.useState([]);

  const listPost = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(myID)
      .collection("likeIt")
      .doc(currentUser.uid)
      .set({
        whoLike: currentUser.uid,
        like: 1,
        toggle: true,
      });
  };

  const getLikePost = async () => {
    await app
      .firestore()
      .collection("like")
      .doc()
      .collection("likeIt")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setMyLike(r);
      });
  };

  React.useEffect(() => {
    getLikePost();
  }, []);

  return (
    <div>
      {myLike.every((el) => el.whoLike !== currentUser.uid) ? (
        <Like
          onClick={() => {
            listPost();
            console.log("Hellooooo: ");
          }}
        >
          <FavoriteBorderIcon />
        </Like>
      ) : (
        <div>
          {myLike.map(({ id, toggle, whoLike, like }) => (
            <div key={id}>
              {toggle ? (
                <Like
                  onClick={async () => {
                    await app
                      .firestore()
                      .collection("post")
                      .doc(myID)
                      .collection("likeIt")
                      .doc(currentUser.uid)
                      .update({
                        like: like - 1,
                        toggle: false,
                      });
                  }}
                >
                  ++++++
                  <FavoriteIcon />
                </Like>
              ) : (
                <Like
                  onClick={async () => {
                    await app
                      .firestore()
                      .collection("post")
                      .doc(myID)
                      .collection("likeIt")
                      .doc(currentUser.uid)
                      .update({
                        like: like + 1,
                        toggle: true,
                      });
                  }}
                >
                  -------
                  <FavoriteBorderIcon />
                </Like>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLikePost;

const Like = styled.div`
  margin-top: 10px;
  color: red;
  :hover {
    cursor: pointer;
  }
`;
