import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import Profile from "./Profile";
import Login from "./Login";
import Forgot from "./Forgot";
import Password from "./Password";

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/password" element={<Password />} />
      </Routes>
    </div>
  );
};

export default Pages;
