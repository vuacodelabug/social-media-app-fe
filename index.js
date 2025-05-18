import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import multer from "multer";

// import database connection
import db from "./connect.js";
// Import routes
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import postRoutes from "./routes/posts.js";
import storyRoutes from "./routes/stories.js";
import userRoutes from "./routes/users.js";
import relationshipRoutes from "./routes/relationships.js";

// middleware
const app = express();
app.use(express.json());
// Cho phép frontend ở domain khác gọi API
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // cho phép gửi cookie
  })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Lấy giá trị 'fd' từ query (?fd=avatar) hoặc form-data
    const fd = req.query.fd || req.body.fd || "posts";

    // Chỉ cho phép một số thư mục nhất định để tránh lỗ hổng bảo mật
    const allowedFolders = ["avatar", "cover", "posts", "stories"];
    const folderName = allowedFolders.includes(fd) ? fd : "posts";

    const uploadPath = "../social-media-app-client/public/images/" + folderName;
    // Tạo thư mục nếu chưa tồn tại
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const fd = req.query.fd || req.body.fd || "posts";
  const allowedFolders = ["avatar", "cover", "posts", "stories"];
  const folderName = allowedFolders.includes(fd) ? fd : "posts";

  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  // Đường dẫn để frontend truy cập ảnh
  const filePath = `/images/${folderName}/${file.filename}`;

  res.status(200).json(filePath);
});

// In log mọi route được gọi
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

const originalQuery = db.query;
db.query = (...args) => {
  console.log(" [DB] Query:");
  console.log("        " ,args[0], args[1]);
  return originalQuery.apply(db, args);
};

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/relationships", relationshipRoutes);

app.get("/", (req, res) => {
  // kiểm tra kết nối db
  db.query("SELECT NOW()", (err, result) => {});
  res.send("Welcome to social network API");
});

const PORT = process.env.PORT || 8800;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running on port", PORT);
});
