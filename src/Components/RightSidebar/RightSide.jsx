import { Avatar } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../utils/api"; // API thật

const RightSide = ({ userLogin }) => {
  const [user, setUser] = useState(null);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const storedUser = userLogin || JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [userLogin]);

  useEffect(() => {
    if (user) {
      fetchFollowings();
      fetchFollowers();
    }
  }, [user]);

  const fetchFollowings = async () => {
    try {
      const res = await api.getFollowings(user.id); // API thật
      setFollowings(res.data);
    } catch (error) {
      console.error("Failed to fetch followings", error);
    }
  };
  const fetchFollowers = async () => {
    try {
      const res = await api.getFollowers(user.id); // API thật
      setFollowers(res.data);
    } catch (error) {
      console.error("Failed to fetch followers", error);
    }
  };

  const handleUnfollow = async (targetId) => {
    try {
      // hỏi người dùng có chắc chắn không
      const confirmUnfollow = window.confirm("Bạn có chắc chắn muốn bỏ theo dõi không?");
      if (!confirmUnfollow) return;

      await api.unfollowUser(user.id, targetId); // API thật
      fetchFollowings(); // Refresh
    } catch (error) {
      console.error("Failed to unfollow", error);
    }
  };

  const handleFollow = async (targetId) => {
    try {
      await api.followUser(user.id, targetId); // API thật
      fetchFollowings(); // Refresh
    } catch (error) {
      console.error("Failed to follow", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-l-2">
      <div className="flex-1 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="mt-4">
          <p className="font-roboto font-medium text-sm text-gray-700">
            Following: {followings.length}
          </p>
          {followings.map((following) => (
            <div key={following.id} className="flex items-center justify-between my-2">
              <Link to={`/profile/${following.iduser_following}`}>
                <div className="flex items-center space-x-2">
                  <Avatar size="sm" src={following.profilepic || "/images/avatar/avatar-0.png"} className="border-2" />
                  <p className="text-sm capitalize">{following.name}</p>
                </div>
              </Link>
              <button
                onClick={() => handleUnfollow(following.iduser_following)}
                className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
              >
                Unfollow
              </button>
            </div>
          ))}
        </div>

        {/* Follower */}
        <div className="mt-4">
          <p className="font-roboto font-medium text-sm text-gray-700">
            Follower: {followers.length}
          </p>
          {followers.map((follower) => {
              const isFollowing = followings.some(f => f.iduser_following === follower.iduser_follower);
      
            return (
            <div key={follower.id} className="flex items-center justify-between my-2">
              <Link to={`/profile/${follower.iduser_follower}`}>
                <div className="flex items-center space-x-2">
                  <Avatar size="sm" src={follower.profilepic || "/images/avatar/avatar-0.png"} className="border-2" />
                  <p className="text-sm capitalize">{follower.name}</p>
                </div>
              </Link>
               {/* Chỉ hiện nếu user không follow follower này */}
                {!isFollowing && (
                  <button
                    onClick={() => handleFollow(follower.iduser_follower)}
                    className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Following
                  </button>
                )}
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
