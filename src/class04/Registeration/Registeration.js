import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import demo from "./demo.png";
import { app } from "../../base";
import firebase from "firebase";
import { Link } from "react-router-dom";

const Registeration = () => {
  const [image, setImage] = useState(demo);
  const [avatar, setAvatar] = useState("");

  const schema = yup.object().shape({
    userName: yup.string().required("This field should be filled..."),
    email: yup.string().email().required("This field should be filled..."),
    password: yup.string().required("This field should be filled..."),
    confirm: yup.string().oneOf([yup.ref("password"), null]),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
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

        console.log(counter);
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

  const onSubmit = handleSubmit(async (val) => {
    console.log(val);
    const { userName, email, password } = val;

    const userData = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(userData);

    if (userData) {
      await app.firestore().collection("userInfo").doc(userData.user.uid).set({
        email,
        userName,
        avatar,
        createdBy: userData.user.uid,
      });
    }

    reset();
  });

  return (
    <Container>
      <Wrapper>
        <Card>
          <ImageHolder>
            <Image src={image} />
            <ImageLabel htmlFor="pix">Upload an Image</ImageLabel>
            <ImageInput id="pix" onChange={uploadImage} type="file" />
          </ImageHolder>

          <InputHolder onSubmit={onSubmit}>
            <Label>{errors.userName?.message}</Label>
            <Input placeholder="UserName" {...register("userName")} />
            <Label>{errors.email?.message}</Label>
            <Input placeholder="Email" {...register("email")} />
            <Label>{errors.password?.message}</Label>
            <Input placeholder="Password" {...register("password")} />
            <Label>{errors.confirm?.message}</Label>
            <Input placeholder="Confirm" {...register("confirm")} />

            <ButtonHolder>
              <Button type="submit">Register</Button>
            </ButtonHolder>
          </InputHolder>

          <Name>
            Already have an Account, Then
            <span>
              <LinkTag to="/signIn">SignIn</LinkTag>
            </span>
          </Name>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Registeration;

const LinkTag = styled(Link)`
  text-decoration: none;
  color: red;
`;

const Name = styled.div`
  span {
    margin-left: 5px;
    font-weight: bold;
    color: red;
    cursor: pointer;
  }
`;
const ButtonHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 15px 50px;
  background: #004080;
  color: white;
  border-radius: 2px;
  transition: all 350ms;
  transform: scale(1);
  margin-bottom: 20px;

  :hover {
    transform: scale(1.07);
    cursor: pointer;
  }

  ::button {
    font-family: Poppins;
  }
`;

const InputHolder = styled.form`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
`;

const Label = styled.label`
  color: red;
  font-size: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 3px;
  outline: none;
  border: 1px solid gray;
  padding-left: 10px;
  margin: 10px 0;

  margin-top: 0px;
  margin-bottom: 20px;

  ::placeholder {
    font-family: Poppins;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  background: #004080;
  padding: 10px 15px;
  color: white;
  border-radius: 20px;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const ImageHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const Card = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  width: 500px;
  min-height: 300px;
  height: 100%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  background-color: lightgray;
`;
