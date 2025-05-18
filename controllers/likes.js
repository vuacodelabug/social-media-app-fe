import db from "../connect.js";

// Lấy danh sách người đã thích bài viết
export const getLikes = (req, res) => {
    const q = `SELECT l.*, u.name, u.profilepic 
            FROM likes l 
            JOIN users u ON u.id = l.id_user
            WHERE l.id_post = $1`;
    
    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);    
        return res.status(200).json(data.rows || []);
    });
}

// Thêm người thích bài viết
export const postAddLike = (req, res) => {
    const q = `INSERT INTO likes (id_user, id_post) VALUES ($1, $2)`;
    const values = [req.body.id_user, req.body.id_post];
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Like has been created");
    });
}

// Xóa người thích bài viết
export const deleteLike = (req, res) => {
    const q = `DELETE FROM likes WHERE id_user = $1 AND id_post = $2`;
    const values = [req.body.id_user, req.body.id_post];
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Like has been deleted");
    });
}