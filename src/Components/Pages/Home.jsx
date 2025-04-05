import React from 'react'
import { useState } from "react";
import { Avatar } from "@material-tailwind/react";
import { getUser } from "../fake_api/users";
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

const Home = () => {
    const userData = JSON.parse(localStorage.getItem("user")); // lay thong tin user tu localStorage
    const [user, setUser] = useState(userData); // luu user vao state
    const userList = getUser(); // goi getUser fake api tu user.js
    return (
        <div>
            <Avatar src={user.profilepic} alt="avatar" />  
            {/* user.profilepic. user duoc lay tu state */}
            <h1>Xin chào {user.name} đến với Friendzy </h1>
            <h2>Danh sách bạn bè:</h2>
      <ul>
        {userList.map((userItem) => ( 
          // userItem se duyet qua tưng ten co trong userList
          <li key={userItem.id}>
            {/* Sử dụng Link để chuyển hướng tới trang profile của người dùng */}
            <Link to={`/profile/${userItem.id}`}>
            <Avatar src={userItem.profilepic} alt="avatar" />
              {userItem.name}
            </Link>
          </li>
        ))}
      </ul>
        </div>

    )
}

export default Home