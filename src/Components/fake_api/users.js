// fake_api/users.js
import avatar from "../../assets/images/avatar.png";
import khuong from "../../assets/images/khuong.jpg";
import linh from "../../assets/images/linh.jpg";
import card1 from "../../assets/images/Card1.jpg";
import card2 from "../../assets/images/Card2.jpg";

// Danh sách user mặc định
const defaultUsers = [
  {
    id: 1,
    username: "kieutien",
    email: "kt@example.com",
    password: "123456",
    name: "Kieu Tien",
    profilepic: avatar,
    coverpic: card1,
    city: "Phu Quoc",
    website: "https://kt.com",
  },
  {
    id: 2,
    username: "linh",
    email: "linh@example.com",
    password: "123456",
    name: "Mỹ Linh",
    profilepic: linh,
    coverpic: card2,
    city: "An Giang",
    website: "https://janesmith.com",
  },
  {
    id: 3,
    username: "thukhuong",
    email: "khuong@example.com",
    password: "123456",
    name: "Thu Khương",
    profilepic: khuong,
    coverpic: card2,
    city: "Binh Dinh",
    website: "https://janesmith.com",
  }
];

// Lưu dữ liệu vào localStorage nếu chưa có
const saveToLocalStorage = () => {
  const existing = localStorage.getItem("users");
  if (!existing) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }
};

// Hàm trả về danh sách user
export const getUser = () => {
  saveToLocalStorage();
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
};

// Hàm tìm user theo id
export const getUserById = (id) => {
  const users = getUser();
  return users.find((user) => user.id === parseInt(id));
};
