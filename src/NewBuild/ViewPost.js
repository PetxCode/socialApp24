import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { app } from "../base";
import PersonalDetail from "./PersonalDetail";
import { AuthContext } from "./AuthProvider";
import Likes from "./Likes";
import ShowDetails from "./ShowDetails";
import AddMyLikes from "./AddMyLikes";
import CommentPost from "./CommentPost";
import ViewComments from "./ViewComments";

const ViewPost = () => {
  const { currentUser } = useContext(AuthContext);
  const [postData, setPostData] = useState([]);

  // const [show, setShow] = useState(false)

  const getPost = app.firestore().collection("post");

  const gettingPost = async () => {
    await getPost.orderBy("createdAt", "desc").onSnapshot((snap) => {
      const item = [];
      snap.forEach((doc) => {
        item.push({ ...doc.data(), id: doc.id });
      });
      setPostData(item);
    });
  };

  useEffect(() => {
    gettingPost();
  }, []);

  return (
    <Container>
      <Wrapper>
        {postData?.map(({ toogle, id, avatar, createdBy, post, createdAt }) => (
          <Card key={id}>
            <TopBar>
              <Datail>
                <ShowDetails
                  myID={createdBy}
                  time={createdAt}
                  date
                  image
                  name
                />
              </Datail>

              <Icon>
                <MoreHorizIcon />
              </Icon>
            </TopBar>
            <Post>{post}</Post>
            {avatar === "" ? null : avatar?.split(".")[5].split("?")[0] ===
              "mp4" ? (
              <Video src={avatar} controls />
            ) : avatar?.split(".")[5].split("?")[0] === "jpg" ||
              "png" ||
              "gif" ? (
              <Image src={avatar} />
            ) : null}
            <Holder>
              <Hold>
                <Icons>
                  {" "}
                  <FavoriteIcon />
                  <AddMyLikes myID={id} you />
                  <AddMyLikes myID={id} total x="1" />
                  <AddMyLikes myID={id} like />
                  {/* <AddMyLikes myID={id} image /> */}
                </Icons>
                <PosHold>
                  <AddMyLikes myID={id} named />
                </PosHold>
              </Hold>

              <View>
                <ViewComments id={id} count />
              </View>
            </Holder>
            <NewHolder>
              <div>
                <div>
                  <AddMyLikes myID={id} view />
                </div>
              </div>
              <Comment
                onClick={async () => {
                  await getPost.doc(id).update({
                    toogle: !toogle,
                  });
                  console.log("I am Clicked: ", toogle);
                }}
              >
                comment
              </Comment>
            </NewHolder>
            {toogle ? (
              <CommentPost myID={id} myForm viewOne />
            ) : (
              <CommentPost myID={id} viewAll myForm />
            )}
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default ViewPost;

const View = styled.div`
  display: flex;
  align-items: center;
`;
const Space = styled.div`
  border-bottom: 2px solid red;
  width: 200px;
`;
const PosHold = styled.div`
  display: flex;
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px 30px;
  border-radius: 3px;
  opacity: 0;
  bottom: 0;

  :hover {
    display: flex;
    opacity: 1;
  }

  span {
    display: flex;
    :hover {
      display: flex;
    }
  }
`;

const Hold = styled.div`
  position: relative;
`;

const Rotate = styled.div`
  transform: rotate(180deg);
  /* margin-bottom: 10px; */
  /* background: red; */
`;

const Comment = styled.div`
  font-size: 20px;
  cursor: pointer;
`;
const NewHolder = styled.div`
  display: flex;
  justify-content: space-around;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: lightgray;

  padding: 20px 0;
`;
const Like = styled.div`
  margin-top: 10px;
  :hover {
    cursor: pointer;
  }
`;

const Comments = styled.div`
  font-size: 20px;
`;

const Icons = styled.div`
  display: flex;
  font-weight: bold;
  align-items: center;
  .MuiSvgIcon-root {
    color: red;
    margin-right: 8px;
  }
  span {
    margin: 0 5px;
  }
  :hover {
    cursor: pointer;
  }
`;
const Holder = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const Image = styled.img`
  width: 100%;
  min-height: 450px;
  max-height: 500px;
  object-fit: cover;
`;

const Video = styled.video`
  width: 100%;
  min-height: 400px;
  max-height: 500px;
  object-fit: cover;
`;

const Post = styled.div`
  font-size: 20px;
  margin: 5px 20px;
`;

const Icon = styled.div`
  .MuiSvgIcon-root {
    font-size: 40px;
    color: gray;
    transition: all 350ms;
  }

  :hover {
    cursor: pointer;
    .MuiSvgIcon-root {
      font-size: 40px;
      color: lightgray;
    }
  }
`;

const Datail = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const Avatar = styled.img`
  object-fit: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid gray;
`;

const TopBar = styled.div`
  display: flex;
  margin: 20px 15px;
  align-items: center;
`;

const Card = styled.div`
  margin: 20px 0;
  width: 100%;
  /* height: 100%; */
  min-height: 50px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 700px;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
