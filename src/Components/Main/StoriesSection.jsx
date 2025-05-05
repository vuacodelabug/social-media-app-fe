import React, { useState, useEffect } from "react";
import NewStories from "./NewStories";
import { getStories } from "../fake_api/stories";

const StoriesSection = ({ userLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const data = getStories();
    setStories(data);
  }, [isOpen]);

  return (
      <div className="my-4 w-full p-4 bg-white rounded-2xl shadow-md">
        <div className="flex space-x-4 overflow-x-auto scrollbar-none">

          {/* Add Story */}
          <div
              className="flex-shrink-0 w-24 h-40 bg-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200"
              onClick={() => setIsOpen(true)}
          >
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl mb-2">+</div>
            <p className="text-xs text-center">Tạo tin</p>
          </div>

          {/* Story Cards */}
          {stories.map((story, index) => (
              <div key={index} className="flex-shrink-0 w-24 h-40 rounded-2xl relative cursor-pointer group">
                <img src={story.img} className="w-full h-full object-cover rounded-2xl" alt="Story" />
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img src={story.avatar} className="w-full h-full object-cover" alt="Avatar" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 text-xs text-white font-semibold truncate">{story.name}</div>
                <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>
              </div>
          ))}
        </div>

        {isOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
              <NewStories onClose={() => setIsOpen(false)} user={userLogin} />
            </div>
        )}
      </div>
  );
};

export default StoriesSection;
