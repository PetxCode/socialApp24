import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "./AuthProvider";
import { app } from "../base";

const ShowImage = ({ likedBy }) => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  const displayImage = async () => {
    await app
      .firestore()
      .collection("newUsers")
      .doc(likedBy)
      .get()
      .then((userData) => setUser(userData.data()));
  };

  useEffect(() => {
    displayImage();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {likedBy === currentUser.uid ? null : (
        <Holder>
          <Image src={user?.avatar} />
        </Holder>
      )}
    </div>
  );
};

export default ShowImage;

const Holder = styled.div`
  /* position: relative;
  left: -10px; */
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid gray;
  object-fit: cover;
`;
