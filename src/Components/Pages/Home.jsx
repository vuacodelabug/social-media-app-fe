import React, { useState } from "react";
import { getUser } from "../utils/fake_api/users";

import LeftSide from "../LeftSidebar/LeftSide";
import PostsSection from "../Main/PostsSection";
import StoriesSection from "../Main/StoriesSection";
import Navbar from "../Navbar/Navbar";
import RightSide from "../RightSidebar/RightSide";



const Home = () => {
  const userData = JSON.parse(localStorage.getItem("user")); // lay thong tin user tu localStorage
  const userLogin = JSON.parse(localStorage.getItem("user"));
  console.log("userLogin:", userLogin);

  // không có user thì chuyển hướng về trang login
  if (!userData) {
    window.location.href = "/login";
  }

  const [user, setUser] = useState(userData); // luu user vao state
  const userList = getUser(); // goi getUser fake api tu user.js
  return (
    <div>
      
      {/* Navbar cố định */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
        <Navbar />
      </div>

      {/* Wrapper có padding-top để tránh bị Navbar đè */}
      <div className="pt-[64px] flex">
        {/* LeftSide */}
        <div className="fixed top-[64px] left-0 w-[20%] bg-gray-100 overflow-y-auto">
          <LeftSide />
        </div>

        {/* RightSide */}
        <div className="fixed top-[64px] right-0 w-[20%] bg-gray-100 overflow-y-auto">
          <RightSide userLogin={userLogin} />
        </div>

        {/* Main content */}
        <div className="absolute left-[20%] w-[60%]">
          <div className="w-[80%] mx-auto">
         
            <StoriesSection userLogin={userLogin} />
            <PostsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
