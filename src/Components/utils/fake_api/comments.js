const COMMENT_KEY = "comments";

const defaultComments = [
    {
      id: 1,
      id_post: 1,
      id_user: 2,
      description: "Xinh",
      created_at: "04-04-2025",
    },
    {
      id: 1,
      id_post: 1,
      id_user: 1,
      description: "Xinh ne",
      created_at: "04-04-2025",
    },
  ];
// Hàm lưu dữ liệu mẫu vào localStorage nếu chưa có 
const saveCommentsToLocalStorage = () => {
  if (!localStorage.getItem(COMMENT_KEY)) {
    localStorage.setItem(COMMENT_KEY, JSON.stringify(defaultComments));
  }
};
// Gọi hàm lưu dữ liệu mẫu khi file được load
saveCommentsToLocalStorage();

// Hàm lấy tất cả bình luận từ localStorage
export const getComments = () => {
  return JSON.parse(localStorage.getItem(COMMENT_KEY)) || [];
};

// Hàm thêm bình luận mới vào localStorage
export const addComment = (comment) => {
  const comments = getComments();
  comments.push(comment);
  localStorage.setItem(COMMENT_KEY, JSON.stringify(comments));
};
