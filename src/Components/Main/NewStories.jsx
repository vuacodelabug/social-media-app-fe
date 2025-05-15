import { useState } from "react";
import { postCreateStory, uploadImage } from "../utils/api";

const NewStories = ({ onClose, user }) => {
  const [file, setFile] = useState(null);       // lưu file thực
  const [preview, setPreview] = useState(null); // để hiển thị
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // lưu lại file thật

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // hiện ảnh preview
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file || !user) return;

    setLoading(true);
    try {
      const res = await uploadImage(file, "stories"); 
      const imageUrl = res.data; // backend nên trả về { url: "https://..." }

      await postCreateStory({ img: imageUrl });
      onClose();
    } catch (error) {
      alert("Không thể tạo story.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-lg font-semibold mb-4">Tạo Story Mới</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <img src={preview} alt="Preview" className="mt-4 w-full h-48 object-cover rounded-md" />
      )}
      <div className="flex justify-end mt-4 space-x-2">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose} disabled={loading}>
          Hủy
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Đang đăng..." : "Đăng"}
        </button>
      </div>
    </div>
  );
};

export default NewStories;