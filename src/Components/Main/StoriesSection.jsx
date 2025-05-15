import React, { useEffect, useState } from "react";
// import { getStories } from "../utils/fake_api/stories";
import { getStories } from "../utils/api";
import NewStories from "./NewStories";

const StoriesSection = ({ userLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stories, setStories] = useState([]);
  const [viewStory, setViewStory] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await getStories();
        setStories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy stories:", error);
      }
    };
  
    fetchStories();
  }, [isOpen]);

  // Xử lý khi người dùng nhấp vào story
  const handleViewStory = (story) => {
    setViewStory(story);
  };
  return (
    <div className="my-4 w-full p-4 bg-white rounded-2xl shadow-md">
      <div className="flex space-x-4 overflow-x-auto scrollbar-none">
        {/* Add Story */}
        <div
          className="flex-shrink-0 w-24 h-40 bg-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl mb-2">
            +
          </div>
          <p className="text-xs text-center">Tạo tin</p>
        </div>

        {/* Story Cards */}
        {stories.map((story, index) => (
          <div
            key={index}
            onClick={() => handleViewStory(story)}
            className="flex-shrink-0 w-24 h-40 rounded-2xl relative cursor-pointer group"
          >
            <img
              src={story.img}
              className="w-full h-full object-cover rounded-2xl"
              alt="Story"
            />
            <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-white overflow-hidden">
              <img
                src={story.profilepic || "/images/avatar/avatar-0.png"}
                className="w-full h-full object-cover border-2"
                alt="Avatar"
              />
            </div>
            <div className="absolute bottom-2 left-2 right-2 text-xs text-white font-semibold truncate capitalize">
              {story.name}
            </div>
            <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <NewStories onClose={() => setIsOpen(false)} user={userLogin} />
        </div>
      )}

      {viewStory && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white rounded-xl w-[90%] max-w-md overflow-hidden shadow-lg relative">
            <button
              onClick={() => setViewStory(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
            <img
              src={viewStory.img}
              alt="Story"
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={viewStory.profilepic || "/images/avatar/avatar-0.png"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2"
                />
                <span className="font-semibold text-sm capitalize">{viewStory.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesSection;
