import db from "../connect.js";
import jwt from "jsonwebtoken";

// lấy danh sách bình luận của một bài viết
export const getComments = (req, res) => {
  const q = `SELECT c.*, u.name, u.profilepic 
        FROM comments c 
        JOIN users u ON u.id = c.id_user
        WHERE c.id_post = $1
        ORDER BY c.created_at DESC`;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows || []);
  });
};

// thêm bình luận vào một bài viết
export const postAddComment = (req, res) => {
  const q = `INSERT INTO comments (id_user, id_post, description) VALUES ($1, $2, $3)`;
  const values = [req.body.id_user, req.body.id_post, req.body.description];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Comment has been created");
  });
};

// xóa bình luận của một bài viết
export const deleteComment = (req, res) => {
  const token = req.cookies.access_token;  
  if (!token) return res.status(401).json("Unauthorized");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `
      DELETE FROM comments
      WHERE id = $1 AND id_user = $2
    `;

    const values = [req.params.id, userInfo.id]; // id = id comment

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.rowCount === 0) {
        return res.status(403).json("Bạn không có quyền xoá comment này hoặc comment không tồn tại.");
      }

      return res.status(200).json("Comment has been deleted");
    });
  });
};