import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { app } from "../base";
import firebase from "firebase";
import { AuthContext } from "../NewBuild/AuthProvider";

const MemoryBook = () => {
  const { currentUser } = useContext(AuthContext);

  const [memory, setMemory] = useState("");
  const [view, setView] = useState([]);

  const createMemories = async () => {
    await app
      .firestore()
      .collection("memories")
      .doc(currentUser.uid)
      .collection("memory")
      .doc()
      .set({
        memory,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: currentUser.uid,
      });
    setMemory("");
  };

  const viewMemories = async () => {
    await app
      .firestore()
      .collection("memories")
      .doc(currentUser.uid)
      .collection("memory")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setView(r);
      });
  };

  useEffect(() => {
    viewMemories();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Holder>
          <Input
            placeholder="Share your Memory"
            onChange={(e) => {
              setMemory(e.target.value);
            }}
          />
          <Button onClick={createMemories}>Add This Momory</Button>
        </Holder>
        <Record>
          Total Recorded Memories
          <span>{view.length}</span>
        </Record>
        <View>
          {view?.map((props) => (
            <div>
              {props.createdBy === currentUser.uid ? (
                <ViewMemo>{props.memory}</ViewMemo>
              ) : null}
            </div>
          ))}
        </View>
      </Wrapper>
    </Container>
  );
};

export default MemoryBook;

const Record = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  span {
    color: red;
    font-size: 20px;
    margin-left: 5px;
  }
`;

const ViewMemo = styled.div`
  width: 200px;
  padding: 0 10px;
  min-height: 60px;
  height: 100%;
  background: white;
  margin: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Input = styled.input`
  width: 350px;
  height: 40px;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin: 20px 0;
  padding-left: 10px;

  ::placeholder {
    font-family: Poppins;
  }
`;

const Button = styled.div`
  padding: 15px 30px;
  background: black;
  color: white;
  border-radius: 3px;
  transition: all 350ms;
  transform: scale(1);
  font-weight: bold;

  :hover {
    cursor: pointer;
    transform: scale(1.012);
  }
`;
const View = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Holder = styled.div`
  margin: 50px 0;
  width: 500px;
  /* height: 300px; */
  padding: 20px 0;
  background: white;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const Wrapper = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  height: 100%;
  background-color: lightgray;
`;
