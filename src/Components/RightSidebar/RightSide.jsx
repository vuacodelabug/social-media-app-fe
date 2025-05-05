import { Avatar } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addRelationship,
  getRelationships,
  removeRelationship,
} from "../utils/fake_api/relationships";
import { getUser } from "../utils/fake_api/users";

const RightSide = ({ userLogin }) => {
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [usersData, setUsersData] = useState([]);

  // Load user data và user đăng nhập
  useEffect(() => {
    const data = getUser();
    setUsersData(data);

    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(userLogin || parsedUser);
  }, [userLogin]);

  // Gọi khi user hoặc usersData đã có dữ liệu
  useEffect(() => {
    if (user && usersData.length > 0) {
      updateRelationships();
    }
  }, [user, usersData]);

  // Cập nhật danh sách follower/following
  const updateRelationships = () => {
    if (!user || !user.id) return;

    const rels = getRelationships();
    localStorage.setItem("relationships", JSON.stringify(rels));

    const currentFollowers = rels
      .filter((r) => r.iduser_following === user.id)
      .map((r) => usersData.find((u) => u.id === r.iduser_follower))
      .filter(Boolean); // lọc undefined nếu user không tìm thấy

    const currentFollowings = rels
      .filter((r) => r.iduser_follower === user.id)
      .map((r) => usersData.find((u) => u.id === r.iduser_following))
      .filter(Boolean);

    setFollowers(currentFollowers);
    setFollowings(currentFollowings);
  };

  const handleFollow = (targetId) => {
    if (!user || user.id === targetId) return;

    addRelationship(user.id, targetId);
    updateRelationships();
  };

  const handleUnfollow = (targetId) => {
    if (!user || user.id === targetId) return;

    removeRelationship(user.id, targetId);
    updateRelationships();
  };

  return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-l-2">
      <div className="flex-1 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="mt-4">
          <p className="font-roboto font-medium text-sm text-gray-700">
            Following: {user ? followings.length : 0}
          </p>
          {followings.map((following) => (
            <div
              key={following.id}
              className="flex items-center justify-between my-2"
            >
            <Link to={`/profile/${following.id}`}>
              <div className="flex items-center space-x-2">
                <Avatar size="sm" src={following.profilepic} />
                <p className="text-sm">{following.name}</p>
              </div>
              </Link>
              <button
                onClick={() => handleUnfollow(following.id)}
                className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
              >
                Unfollow
              </button>
            </div>
           
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
