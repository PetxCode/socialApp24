import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../NewBuild/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/register" />;
};

export default PrivateRoute;
