import React from "react";
import Home from "./home";
import { Routes, Route } from "react-router-dom";
import ProFile from "./ProFile";
import NewStories from "../Main/NewStories";
import Login from "./Login";
const Pages = () => {
    return  (
        <div>
           <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/new-story" element={<NewStories></NewStories>}></Route>
                <Route path="/profile" element={<ProFile></ProFile>}></Route>
                <Route path="/log-in" element={<Login></Login>}></Route>
                <Route path="/profile" element={<ProFile></ProFile>}></Route>
            </Routes>
        </div> 
    )
}
export default Pages;