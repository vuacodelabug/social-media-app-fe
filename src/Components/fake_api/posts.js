import { getUserById } from "./users"; // nếu bạn có dùng avatar theo user
import loopy from "../../assets/images/loopy.jpg";
import avatar from "../../assets/images/avatar.png";
import linh from "../../assets/images/linh.jpg";

const STORAGE_KEY = "posts";

// Danh sách bài viết mặc định
const defaultPosts = [
  {
    id: 1,
    id_user: 1,
    description: "Hôm nay thật mệt",
    img: loopy,
    created_at:"2025-05-01",
  },
  {
    id: 2,
    id_user: 2,
    description: "Hôm nay thật hạnh phúc",
    img: linh,
    created_at: "2025-05-04",
  }
];

// 👉 Hàm lưu dữ liệu mẫu nếu localStorage chưa có
const savePostsToLocal = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
  }
};

// 👉 Gọi khi file được load (ví dụ đặt trong useEffect bên ngoài)
savePostsToLocal();

// 👉 Lấy danh sách bài viết từ localStorage
export const getPost = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// 👉 Thêm bài viết mới
export const addNewPost = (post) => {
  const currentPosts = getPost();

  // Optionally: thêm avatar dựa trên user
  const user = getUserById(post.id_user);
  const postWithAvatar = {
    ...post,
    avatar: user?.profilepic || avatar,
  };

  const updatedPosts = [postWithAvatar, ...currentPosts];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
};
export const deletePost = (postId) => {
  const currentPosts = getPost();
  const updatedPosts = currentPosts.filter(post => post.id !== postId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
};
