import db from "../connect.js";

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
  const q = `DELETE FROM comments WHERE id_user = $1 AND id_post = $2`;
  
  const values = [req.body.id_user, req.body.id_post];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Comment has been deleted");
  });
};