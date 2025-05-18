import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import db from "../connect.js";

// dang ky tai khoan
export const register = (req, res) => {
  // check if user exists
  const q = "SELECT * FROM users WHERE email = $1";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.rows.length) return res.status(409).json("User already exists");

    // create a new user
    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

     // Thêm người dùng
    const q = `
      INSERT INTO users (username, email, password, name, profilepic, coverpic, city, website)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
      null,
      null,
      req.body.city || "",
      req.body.website || ""
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json({ Error: err });
      return res.status(201).json({ message: "User created" });
    });
  });
};

// Tạo mã xác thực ngẫu nhiên 6 chữ số
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Mã 6 chữ số
};
// xác thực tài khoản bằng nodemailer
export const verifyAccount = (req, res) => {
  // Tạo mã xác thực ngẫu nhiên
  const verificationCode = generateVerificationCode();

  // Cấu hình Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Cấu hình email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.body.email,
    subject: "Xác thực tài khoản",
    text: `Mã xác thực của bạn là: ${verificationCode}` // Nội dung email
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Error sending email" });
    } else {
      console.log("Email sent successfully!");
      return res.status(200).json({code : verificationCode});
    }
  });
};

// dang nhap
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = $1";
  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      console.error("Database error:", err); // Log the error for debugging
      return res.status(500).json({success: false, message:  "Error sever!" });
    }
    if (!data.rows.length)
      return res.status(500).json({success: false, message: "Invalid email or password" }); // Sai email

    // check if password is correct
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data.rows[0].password
    );

    if (!checkPassword)
      return res.status(500).json({success: false, message: "Invalid email or password" }); // Sai mật khẩu

    const token = jwt.sign({ id: data.rows[0].id }, process.env.SECRET_KEY);

    const { password, ...others } = data.rows[0];

    res
      .cookie("access_token", token, {
        httpOnly: true
      })
      .status(200)
      .json(others);
  });
};


// dang xuat
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      secure: true,
      sameSite: "none"
    })
    .status(200)
    .json("Logged out");
};


//  kiểm tra đăng nhập
export const authenticate = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({success: false, message: "Not authenticated!" });
  
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({success: false, message: "Token is not valid!" });
    
    req.user = user;
    return res.status(200).json({ success: true, user }); 
  });
};