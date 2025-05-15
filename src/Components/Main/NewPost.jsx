import React, { useState } from "react";
import { postCreatePost, uploadImage } from "../utils/api";

const NewPost = ({ user, onClose, onPostSuccess }) => {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Nội dung không được để trống.");
      return;
    }

    setLoading(true);
    try {
      let filename = null;

      if (imageFile) {
        const res = await uploadImage(imageFile);
        filename = res.data;
        
      }

      await postCreatePost(content, filename);
      alert("Đã tạo bài viết!");

      // Reset form
      setContent("");
      setImageFile(null);
      setPreviewUrl(null);

      onPostSuccess?.();
      onClose?.();
    } catch (err) {
      console.error("Tạo bài viết lỗi:", err);
      alert("Đăng bài thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
      >
        &times;
      </button>
      <h2 className="text-xl font-semibold mb-4">Tạo bài viết mới</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Bạn đang nghĩ gì?"
        className="w-full border p-3 rounded mb-4 resize-none"
        rows="4"
      ></textarea>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          className="h-40 object-cover rounded mb-4"
        />
      )}

      <button
        onClick={handleSubmitPost}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        {loading ? "Đang đăng..." : "Đăng bài"}
      </button>
    </div>
  );
};

export default NewPost;
