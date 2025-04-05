import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import Profile from "./Profile";
import Login from "./Login";
const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/profile/:id" element={<Profile></Profile>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
};

export default Pages;