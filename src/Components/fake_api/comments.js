const COMMENT_KEY = "comments";

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
