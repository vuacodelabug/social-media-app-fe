import React from "react";
import { Avatar } from "@material-tailwind/react";

const UserLinks = ({ userLogin }) => {
  return (
      <div className="flex justify-center items-center cursor-pointer">
        <div className="mx-4 items-center">
          {userLogin ? (
              <>
                <Avatar src={userLogin.profilepic} alt={userLogin.name} />
                <span className="ml-2">{userLogin.name}</span>
              </>
          ) : (
              <span>Loading...</span>
          )}
        </div>
      </div>
  );
};

export default UserLinks;
