import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { app } from "../base";
import { AuthContext } from "./AuthProvider";

const ViewComments = ({ id, count, show }) => {
  const { currentUser } = useContext(AuthContext);
  const [view, setView] = useState([]);
  const viewComment = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(id)
      .collection("comment")
      .onSnapshot((snap) => {
        const r = [];
        snap.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setView(r);
      });
  };

  useEffect(() => {
    viewComment();
  }, []);

  return (
    <Container>
      <Wrapper>
        {count ? (
          <div>
            {view.every((el) => el > 0) ? (
              <Holder>No comment yet</Holder>
            ) : (
              <Holder bld>{view.length} Comments</Holder>
            )}
          </div>
        ) : null}
        {show ? (
          <div>
            {view?.map((props) => (
              <div key={props.id}>Heeee</div>
            ))}
          </div>
        ) : null}
      </Wrapper>
    </Container>
  );
};

export default ViewComments;

const Holder = styled.div`
  font-weight: ${({ bld }) => (bld ? "bold" : "normal")};
  margin-right: 5px;
  margin-top: 3px;
  font-size: 20px;
`;
const Wrapper = styled.div``;
const Container = styled.div``;
