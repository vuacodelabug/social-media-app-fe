import db from "../connect.js";

// Bạn đang theo dõi ai
export const getFollowings = (req, res) => {
  const q = `
    SELECT r.*, u.name, u.profilepic 
    FROM relationships r 
    JOIN users u ON u.id = r.iduser_following
    WHERE r.iduser_follower = $1
  `;
  db.query(q, [req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows || []);
  });
};

// Ai đang theo dõi bạn	
export const getFollowers = (req, res) => {
  const q = `
    SELECT r.*, u.name, u.profilepic 
    FROM relationships r 
    JOIN users u ON u.id = r.iduser_follower
    WHERE r.iduser_following = $1
  `;
  db.query(q, [req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows || []);
  });
};

// Thêm mối quan hệ follow: người dùng thực hiện follow (iduser_follower) follow người được theo dõi (iduser_following)
export const postAddRelationship = (req, res) => {
  const q = `
    INSERT INTO relationships (iduser_follower, iduser_following)
    VALUES ($1, $2)
  `;
  const values = [req.body.iduser_follower, req.body.iduser_following];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Relationship has been created");
  });
};

// Xóa mối quan hệ follow dựa trên cặp iduser_follower và iduser_following
export const deleteRelationship = (req, res) => {

  const q = `
    DELETE FROM relationships
    WHERE  iduser_follower = $1 AND  iduser_following= $2
  `;
  const values = [req.body.iduser_follower, req.body.iduser_following];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Relationship has been deleted");
  });
};

// check Follow
export const checkFollow = (req, res) => {
  const { follower, following } = req.query;
  const q = `
    SELECT 1 FROM relationships
    WHERE iduser_follower = $1 AND iduser_following = $2
  `;
  db.query(q, [follower, following], (err, result) => {
    if (err) return res.status(500).json({ error: "Lỗi máy chủ" });
    res.status(200).json({ following: result.rowCount > 0 });
  });
};
