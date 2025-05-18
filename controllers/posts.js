import jwt from "jsonwebtoken";
import db from "../connect.js";

export const getUserPosts = (req, res) => {
  const { id } = req.params; // Lấy id từ tham số URL

  // SQL Query để lấy bài viết của user với ID cụ thể
  const query = `
        SELECT p.*, u.name, u.profilepic
        FROM posts p
        JOIN users u ON u.id = p.id_user
        WHERE p.id_user = $1
        ORDER BY p.created_at DESC
    `;

  // Truy vấn dữ liệu từ cơ sở dữ liệu
  db.query(query, [id], (err, data) => {
    if (err) {
      return res.status(500).json(err); // Xử lý lỗi khi query
    }

    // Trả về dữ liệu bài viết dưới dạng JSON
    return res.status(200).json(data.rows);
  });
};

export const getPosts = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Unauthorized");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `
    SELECT p.*, u.name, u.profilepic
    FROM posts p
    JOIN users u ON u.id = p.id_user
    WHERE p.id_user = $1
      OR p.id_user IN (
        SELECT iduser_following
        FROM relationships
        WHERE iduser_follower = $1
      )
    ORDER BY p.created_at DESC
  `;

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.rows);
    });
  });
};

export const postAddPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Unauthorized");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = ` 
        INSERT INTO posts (id_user, description, img, created_at) VALUES ($1, $2, $3, NOW());
        `;

    const values = [userInfo.id, req.body.description, req.body.img || null];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created");
    });
  });
};

// delete post
export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Unauthorized");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = ` 
        DELETE FROM posts WHERE id = $1 AND id_user = $2;
        `;

    const values = [req.params.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been deleted");
    });
  });
};

// tìm theo tên user hoặc bài đăng
export const getSearch = async (req, res) => {
  try {
    const searchValue = req.query.q || '';
    const values = [`%${searchValue}%`];

    // Tìm người dùng theo tên
    const userQuery = `SELECT id, name, profilepic FROM users WHERE name ILIKE $1`;
    const userResult = await db.query(userQuery, values);

    // Tìm bài viết theo mô tả
    const postQuery = `
      SELECT posts.*, users.name, users.profilepic
      FROM posts
      JOIN users ON posts.id_user = users.id
      WHERE posts.description ILIKE $1
      ORDER BY posts.created_at DESC
    `;
    const postResult = await db.query(postQuery, values);

    return res.status(200).json({
      users: userResult.rows,
      posts: postResult.rows
    });
  } catch (err) {
    console.error("Lỗi tìm kiếm:", err);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
