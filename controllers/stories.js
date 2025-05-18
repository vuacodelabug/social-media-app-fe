import jwt from "jsonwebtoken";
import db from "../connect.js";

export const getStories = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Unauthorized");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `
    SELECT st.*, u.name, u.profilepic
    FROM stories st
    JOIN users u ON u.id = st.id_user
    WHERE st.id_user = $1
      OR st.id_user IN (
        SELECT iduser_following
        FROM relationships
        WHERE iduser_follower = $1
      )
      AND st.expires_at > NOW()
    ORDER BY st.created_at DESC
  `;

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.rows);
    });
  });
};

export const postAddStories = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Unauthorized");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = ` 
        INSERT INTO stories (id_user, img, created_at, expires_at) 
        VALUES ($1, $2, NOW(), NOW() + INTERVAL '1 day');
        `;

    const values = [userInfo.id, req.body.img || null];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Story has been created");
    });
  });
};

// delete post
export const deleteStory = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Unauthorized");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = ` 
        DELETE FROM stories WHERE id = $1 AND id_user = $2;
        `;

    const values = [req.params.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Story has been deleted");
    });
  });
};
