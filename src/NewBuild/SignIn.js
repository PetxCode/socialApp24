import React from "react";
import styled from "styled-components";
import pix from "./demo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase";
import { app } from "../base";
import { Navigate } from "react-router-dom";

const Sign_In = () => {
  const navigate = useNavigate();
  const mySchema = yup.object().shape({
    email: yup.string().email().required("Please fill up this filed"),
    password: yup.string().required("Please fill up this filed"),
  });
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(mySchema),
  });

  const onSubmit = handleSubmit(async (val) => {
    console.log(val);
    const { email, password } = val;

    await app.auth().signInWithEmailAndPassword(email, password);

    reset();
    navigate.push("/");
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
          <InputForm onSubmit={onSubmit}>
            <Label>{errors.email?.message}</Label>
            <Input placeholder="Enter Email" {...register("email")} />
            <Label>{errors.password?.message}</Label>
            <Input placeholder="Enter Password" {...register("password")} />

            <Button type="submit">Sign In</Button>
            <Button1
              style={{ backgroundColor: "red" }}
              onClick={signUpWithPops}
            >
              Sign In with Google
            </Button1>
            <Title>
              Don't have an Account, Than <Span to="/register">Register</Span>
            </Title>
          </InputForm>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Sign_In;

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

  ::placeholder {
    font-family: Poppins;
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
  min-height: 200px;
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
