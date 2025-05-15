import { getUserById } from "./users";
const STORAGE_KEY = "posts";

const defaultPosts =[
    {
      id: 1, // id bai viet
      id_user: 1, // id nguoi dung dang bai
      description: "Hôm nay thât mệt",
      img: "/images/khuong.jpg",
      created_at: "04-04-2025",
    },
    {
      id: 3,
      id_user: 1,
      description: "Hôm nay thật hạnh phúc",
      img: "/images/nhom.jpg",
      created_at: "04-04-2025",
    },
    {
      id: 2,
      id_user: 2,
      description: "Hôm nay mình rất vui",
      img: "/images/anh1.jpg",
      created_at: "04-05-2025",
    },
];


// 👉 Lấy danh sách bài viết từ localStorage
export const getPost = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// 👉 Hàm lưu dữ liệu mẫu nếu localStorage chưa có
const savePostsToLocal = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
  }
};

// 👉 Gọi khi file được load (ví dụ đặt trong useEffect bên ngoài)
savePostsToLocal();


// 👉 Thêm bài viết mới
export const addNewPost = (post) => {
  const currentPosts = getPost();

  // Optionally: thêm avatar dựa trên user
  const user = getUserById(post.id_user);
  const postWithAvatar = {
    ...post,
    avatar: user?.profilepic || "../../assets/images/avatar-0.png", // Đường dẫn đến ảnh đại diện mặc định
  };

  const updatedPosts = [postWithAvatar, ...currentPosts];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
};
export const deletePost = (postId) => {
  const currentPosts = getPost();
  const updatedPosts = currentPosts.filter(post => post.id !== postId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
};
