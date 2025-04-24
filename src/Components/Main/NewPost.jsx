import React, { useState, useEffect } from "react";
import { addNewPost } from "../fake_api/posts";
import { getUser } from "../fake_api/users";

const NewPost = ({ user, onClose, onPostSuccess }) => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!content.trim()) {
            alert("Vui lòng nhập nội dung!");
            return;
        }

        const newPost = {
            id: Date.now(),
            id_user: user.id,
            content: content,
            img: preview || "",
            date: new Date().toLocaleDateString("vi-VN"),
        };

        addNewPost(newPost);
        setContent("");
        setImage(null);
        setPreview(null);

        if (onPostSuccess) onPostSuccess();
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
            {preview && (
                <img
                    src={preview}
                    alt="preview"
                    className="h-40 object-cover rounded mb-4"
                />
            )}

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
                Đăng bài
            </button>
        </div>
    );
};

export default NewPost;
