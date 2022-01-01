import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainScreen from "./NewBuild/MainScreen";
import NewHeader from "./NewBuild/NewHeader";
import Register from "./NewBuild/Register";
import Sign_In from "./NewBuild/SignIn";
import PrivateRoute from "./class04/Global/PrivateRoute";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NewHeader />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainScreen />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/signIn" element={<Sign_In />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
