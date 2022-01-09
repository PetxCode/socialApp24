import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ButtonProps from "./ButtonProps";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { AuthContext } from "./AuthProvider";
import { app } from "../base";
import Picker from "emoji-picker-react";
import firebase from "firebase";
import LinearProgress from "@mui/material/LinearProgress";

const TopPost = () => {
  const { currentUser } = useContext(AuthContext);

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [percent, setPercent] = useState(0);
  const [userData, setUserData] = useState([]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [post, setPost] = useState("");

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

  const uploadMedia = async (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);

    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("postMedia/" + file.name).put(file);

    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const counter = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(counter);
        setPercent(counter);
      },
      (err) => console.log(err.message),
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          setAvatar(url);
          console.log(url);
        });
      }
    );
  };

  const makePost = async (id) => {
    await app.firestore().collection("post").doc().set({
      post,
      avatar,
      createdBy: currentUser.uid,
      like: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setPost("");
    setPercent(0);
  };

  useEffect(() => {
    getUserInfo();
    console.log(userData);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Card>
          <InputTag>
            {userData.avatar === "" ? (
              <ImageNon>{userData.userName.charAt(0)}</ImageNon>
            ) : (
              <Image src={userData?.avatar} />
            )}

            <Input
              placeholder={`What's on your mind, ${userData?.userName}...?`}
              type="text"
              value={post}
              onChange={(e) => {
                setPost(e.target.value);
              }}
            />
          </InputTag>

          <Space />

          {percent > 0 && percent < 99.99999 ? (
            <Div>
              <Done>Uploading File</Done>
              <Line>
                <LinearProgress variant="determinate" value={percent} />
              </Line>
              <Done>{Math.ceil(percent)}%</Done>
            </Div>
          ) : null}

          {percent === 100 ? (
            <Div>Media File uploaded successfully...!</Div>
          ) : null}

          <ButtonHolder>
            <Holder>
              <Label htmlFor="video">
                <ButtonProps
                  icon={<VideocamIcon />}
                  title="Video"
                  clr="#E73F5A"
                  onClick={() => {
                    console.log("This is for the Video");
                  }}
                />
              </Label>
              <InputLabel
                id="video"
                type="file"
                accept="video/mp4"
                onChange={uploadMedia}
              />
            </Holder>
            <Holder>
              <Label htmlFor="photo">
                <ButtonProps
                  icon={<PhotoSizeSelectActualIcon />}
                  title="Photo"
                  clr="#41B35D"
                  onClick={() => {
                    console.log("This is for the Photo");
                  }}
                />
              </Label>
              <InputLabel
                id="photo"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={uploadMedia}
              />
            </Holder>
          </ButtonHolder>

          <Button onClick={makePost}>Post</Button>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default TopPost;

// {like?.map(({ like, toggle, who }) => (
// <Like
//   onClick={() => {
//     updateLike(id);
//     console.log(
//       "Add Like counter: ",
//       id,
//       currentUser.uid
//     );
//   }}
// >
//   <FavoriteBorderIcon />
// </Like>
// ))}

const Button = styled.div`
  padding: 20px 160px;
  border-radius: 30px;
  background: #004080;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Line = styled.div`
  width: 250px;
  margin-right: 20px;
`;

const Div = styled.div`
  width: 500px;
  color: #e73f5a;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Space = styled.div`
  border-bottom: 1px solid;
  border-color: lightgray;
  width: 80%;
  margin: 20px 0;
`;

const Done = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  margin-top: 20px;
`;

const Label = styled.label``;
const InputLabel = styled.input`
  display: none;
`;

const Holder = styled.div``;

const ButtonHolder = styled.div`
  display: flex;
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
  margin: 0 10px;
  padding: 0 20px;
  outline: none;
  border: 2px solid lightgray;
  font-size: 20px;
  background: #e4e6e9;
  font-family: Poppins;

  ::placeholder {
    font-family: Poppins;
    color: black;
  }
`;

const ImageNon = styled.div`
  width: 70px;
  height: 70px;
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

const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid black;
  object-fit: cover;
  margin-left: 20px;
`;

const Card = styled.div`
  width: 700px;
  min-height: 200px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  padding-top: 20px;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  padding-top: 100px;
  padding-bottom: 50px;
`;
