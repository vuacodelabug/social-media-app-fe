import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftSide from "../LeftSidebar/LeftSide";
import RightSide from "../RightSidebar/RightSide";
import StoriesSection from "../Main/StoriesSection";
import PostsSection from "../Main/PostsSection";

const Home = () => {

    const userLogin = JSON.parse(localStorage.getItem("user"));

    return (

        <div className="w-full">

            <div className="fixed top-0 z-10 w-full bg-white">
                <Navbar></Navbar>
            </div>

            <div className="fixed bg-gray-100">
                
                {/* Thanh bên  trái  */}
                <div className="flex-auto w-[20%] fixed top-12">
                    <LeftSide></LeftSide>
                </div>
            </div>

            <div className="flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl">
                <div className="w-[80%] mx-auto">
                    <StoriesSection userLogin={userLogin}></StoriesSection>
                    <PostsSection></PostsSection>
                </div>
            </div>
            
            <div className="flex-auto w-[20%] fixed right-0 top-12">
                <RightSide userLogin={userLogin}></RightSide>
            </div>
        </div>
    )
}

export default Home;