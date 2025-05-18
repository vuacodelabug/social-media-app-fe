import db from "../connect.js";
// get all user
export const getUsers = (req, res) => {
    const q = `SELECT id, name, email, profilepic, coverpic, city  FROM users`;
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.rows);
    });
}

// get user by id
export const getUserById = (req, res) => {
    const q = `SELECT id, name, email, profilepic, coverpic, city, website  FROM users WHERE id = $1`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.rows[0]);
    });
}

// update user
export const postUpdateUser = (req, res) => {
    const { name, profilepic, coverpic, city, website  } = req.body;
    const userId = req.params.id;
  
    const q = `
      UPDATE users
      SET name = $1, profilepic = $2, coverpic = $3, city = $4, website =$5
      WHERE id = $6
    `;
    const values = [name, profilepic, coverpic, city, website , userId];
  
    db.query(q, values, (err) => {
      if (err) return res.status(500).json({ error: "Update failed", detail: err });
      return res.status(200).json({ message: "User has been updated" });
    });
  };

  