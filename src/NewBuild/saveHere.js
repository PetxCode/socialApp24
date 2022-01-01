import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { app } from "../base";
import PersonalDetail from "./PersonalDetail";

const ViewPost = () => {
  const [postData, setPostData] = useState([]);

  const getData = async () => {
    await app
      .firestore()
      .collection("post")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setPostData(r);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Wrapper>
        {postData?.map(({ id, createdAt, createdBy, post, avatar }) => (
          <Card key={id}>
            <TopBar>
              {/* <Avatar /> */}
              <Datail>
                <PersonalDetail createdBy={createdBy} createdAt={createdAt} />
              </Datail>
              <Icon>
                <MoreHorizIcon />
              </Icon>
            </TopBar>
            <Post>{post}</Post>
            {avatar === "" ? null : avatar?.split(".")[5].split("?")[0] ===
              "mp4" ? (
              <Video controls src={avatar} />
            ) : avatar?.split(".")[5].split("?")[0] === "jpg" ||
              avatar?.split(".")[5].split("?")[0] === "gif" ||
              avatar?.split(".")[5].split("?")[0] === "png" ? (
              <Image src={avatar} />
            ) : null}

            <Holder>
              <Icons>
                <FavoriteBorderIcon />
              </Icons>
              <Comments>comment</Comments>
            </Holder>
            <NewHolder>
              <Like>
                <ThumbUpIcon />
              </Like>
              <Comment>comment</Comment>
            </NewHolder>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default ViewPost;

const Comment = styled.div`
  font-size: 20px;
`;
const NewHolder = styled.div`
  display: flex;
  justify-content: space-around;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: lightgray;

  padding: 20px 0;
`;
const Like = styled.div``;
const Comments = styled.div`
  font-size: 20px;
`;

const Icons = styled.div``;
const Holder = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const Image = styled.img`
  width: 100%;
  min-height: 400px;
  object-fit: cover;
`;

const Video = styled.video`
  width: 100%;
  min-height: 400px;
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

const Avatar = styled.img`\
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
