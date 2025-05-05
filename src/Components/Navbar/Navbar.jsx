import React, { useState } from "react";
import SearchBar from "./SearchBar";
import UserLinks from "./UserLinks";
const Navbar = ({ userLogin }) => {

  return (
    <div className="flex justify-between items-center border-b border-gray-100 w-full px-44 py-2 ">
      {/* logo */}
      <div className="text-3xl font-extrabold text-gray-900 dark:text-white font-roboto">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-400">
          Friendzy
        </span>{" "}
      </div>

      {/* Thanh bar ở giữa */}
      <div className="flex justify-center items-center flex-1 px-10">
        <div className="relative w-full max-w-md">
        <SearchBar onSearch={(query) => console.log("Đang tìm:", query)} />
        </div>
      </div>

      {/* Thanh bar bên phải */}
      <div className="flex justify-center items-center">
        <UserLinks userLogin={userLogin}></UserLinks>
      </div>
    </div>
  );
};

export default Navbar;
