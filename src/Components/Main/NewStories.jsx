import React, { useState } from "react";
import { addStory } from "../fake_api/stories";

const NewStories = ({ onClose, user }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!image || !user) return;

    const now = new Date();
    const created_at = now.toLocaleTimeString();
    const expires_at = new Date(now.getTime() + 24 * 60 * 60 * 1000).toLocaleTimeString();

    const newStory = {
      id: user.id,
      id_user: user.id,
      name: user.name,
      img: image,
      created_at,
      expires_at,
    };

    addStory(newStory); // Lưu vào localStorage (sẽ chỉnh hàm này ở bước tiếp)
    onClose();
  };

  return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Tạo Story Mới</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
            <img src={image} alt="Preview" className="mt-4 w-full h-48 object-cover rounded-md" />
        )}
        <div className="flex justify-end mt-4 space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Hủy
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
            Đăng
          </button>
        </div>
      </div>
  );
};
export default NewStories;
