import React, { useEffect, useState } from "react";
import { getUser } from "../fake_api/users";
import { Avatar } from "@material-tailwind/react";
import { getRelationships, addRelationship, removeRelationship } from "../fake_api/relationships";

const RightSide = ({ userLogin }) => {
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const data = getUser();
    setUsersData(data);

    const currentUser = data.find((u) => u.id === userLogin?.id) || data.find((u) => u.id === 1);
    setUser(currentUser);
  }, [userLogin]);

  useEffect(() => {
    if (user && usersData.length > 0) {
      updateRelationships();
    }
  }, [user, usersData]);

  const updateRelationships = () => {
    const rels = getRelationships();
    localStorage.setItem("relationships", JSON.stringify(rels)); // Lưu vào localStorage

    const currentFollowers = rels
        .filter((r) => r.iduser_following === user.id)
        .map((r) => usersData.find((u) => u.id === r.iduser_follower));

    const currentFollowings = rels
        .filter((r) => r.iduser_follower === user.id)
        .map((r) => usersData.find((u) => u.id === r.iduser_following));

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
      <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-l-xl">
        <div className="flex-1 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">

          <div className="mt-4">
            <p className="font-roboto font-medium text-sm text-gray-700">Following: {followings.length}</p>
            {followings.map((following) => (
                <div key={following.id} className="flex items-center justify-between my-2">
                  <div className="flex items-center space-x-2">
                    <Avatar size="sm" src={following.profilepic} />
                    <p className="text-sm">{following.name}</p>
                  </div>
                  <button
                      onClick={() => handleUnfollow(following.id)}
                      className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Unfollow
                  </button>
                </div>
            ))}
          </div>

          <div className="mt-4">
            <p className="font-roboto font-medium text-sm text-gray-700">Follower: {followers.length}</p>
            {followers
                .filter((follower) => !followings.some((f) => f.id === follower.id))
                .map((follower) => (
                    <div key={follower.id} className="flex items-center justify-between my-2">
                      <div className="flex items-center space-x-2">
                        <Avatar size="sm" src={follower.profilepic} />
                        <p className="text-sm">{follower.name}</p>
                      </div>
                      <button
                          onClick={() => handleFollow(follower.id)}
                          className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Follow
                      </button>
                    </div>
                ))}
          </div>

        </div>
      </div>
  );
};

export default RightSide;
