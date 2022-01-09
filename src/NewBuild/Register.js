import React, { useState } from "react";
import styled from "styled-components";
import pix from "./demo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase";
import { app } from "../base";
import LinearProgress from "@mui/material/LinearProgress";

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(pix);
  const [avatar, setAvatar] = useState("");

  const [percent, setPercent] = useState(0);

  const mySchema = yup.object().shape({
    userName: yup.string().required("Please fill up this filed"),
    email: yup.string().email().required("Please fill up this filed"),
    password: yup.string().required("Please fill up this filed"),
    confirm: yup.string().oneOf([yup.ref("password"), null]),
  });
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(mySchema),
  });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);

    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("userImage/" + file.name).put(file);

    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const counter = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(counter);
        console.log(counter);
      },
      (error) => console.log(errors),

      () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          setAvatar(url);
          console.log(url);
        });
      }
    );
  };

  const onSubmit = handleSubmit(async (val) => {
    console.log(val);
    const { email, userName, password } = val;

    const userData = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (userData) {
      await app.firestore().collection("newUsers").doc(userData.user.uid).set({
        userName,
        email,
        password,
        avatar,
        createdBy: userData.user.uid,
      });
    }
    reset();

    navigate("/");
  });

  const signUpWithPops = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const userData = await app.auth().signInWithPopup(provider);

    if (userData) {
      await app.firestore().collection("newUsers").doc(userData.user.uid).set({
        userName: userData.user.displayName,
        email: userData.user.email,
        avatar: userData.user.photoURL,
        createdBy: userData.user.uid,
      });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Card>
          <ImageHolder>
            <Image src={image} />
            {percent > 0 && percent < 99.999999 ? (
              <div style={{ width: "200px", marginTop: "20px" }}>
                <LinearProgress
                  variant="determinate"
                  value={Math.floor(percent)}
                />
              </div>
            ) : null}
            <ImageLabel htmlFor="pix">Upload an Image</ImageLabel>
            <ImageInput id="pix" onChange={uploadImage} type="file" />
          </ImageHolder>

          <InputForm onSubmit={onSubmit}>
            <Label>{errors.userName?.message}</Label>

            <Input placeholder="Enter UserName" {...register("userName")} />
            <Label>{errors.email?.message}</Label>

            <Input placeholder="Enter Email" {...register("email")} />
            <Label>{errors.password?.message}</Label>

            <Input placeholder="Enter Password" {...register("password")} />
            <Label>{errors.confirm?.message}</Label>

            <Input placeholder="Enter Confirm" {...register("confirm")} />

            <Button type="submit">Register</Button>

            <Button1
              style={{ backgroundColor: "red" }}
              onClick={signUpWithPops}
            >
              Register with Google
            </Button1>
            <Title>
              Already have an Account, Than <Span to="/signIn">Sign In</Span>
            </Title>
          </InputForm>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Register;

const Span = styled(Link)`
  font-weight: bold;
  color: red;
  cursor: pointer;
  margin-left: 5px;
  text-decoration: none;
`;

const Title = styled.div`
  font-size: 13px;
  margin-top: 20px;

  span {
    font-weight: bold;
    color: red;
    cursor: pointer;
  }
`;

const Button1 = styled.div`
  padding: 15px 60px;
  background: gray;
  color: white;
  border-radius: 5px;
  margin-top: 30px;
  transition: all 350ms;
  transform: scale(1);
  outline: none;
  border: 0;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Button = styled.button`
  padding: 15px 60px;
  background: gray;
  color: white;
  border-radius: 5px;
  margin-top: 30px;
  transition: all 350ms;
  transform: scale(1);
  outline: none;
  border: 0;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  padding-top: 50px;
`;

const Label = styled.label`
  color: red;
  font-size: 13px;
  width: 300px;
  display: flex;
  justify-content: flex-start;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 3px;
  outline: none;
  border: 1px solid lightgray;
  padding-left: 10px;
  margin-bottom: 10px;
  font-family: Poppins;

  ::placeholder {
    font-family: Poppins;
    color: gray;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  padding: 10px 20px;
  background-color: gray;
  margin: 10px 0;
  border-radius: 30px;
  color: white;

  transition: all 350ms;
  transform: scale(1);

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
  object-fit: cover;
`;

const ImageHolder = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  background: white;
  width: 500px;
  min-height: 500px;
  padding-top: 50px;
  padding-bottom: 50px;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  background: lightblue;
`;
