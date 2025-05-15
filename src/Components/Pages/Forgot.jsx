import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import { getUserByEmail } from "../utils/fake_api/users"; // Import hàm lấy thông tin người dùng

const Forgot = () => {
  const [email, setEmail] = useState(""); // Để lưu trữ giá trị của email
  const [error, setError] = useState(""); // Để lưu trữ thông báo lỗi
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Cập nhật giá trị email khi người dùng nhập
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra xem email có tồn tại không thông qua API giả
    const user = getUserByEmail(email);
    if (user) {
      setError(""); // Đặt lỗi về lại trống
      // Nếu email hợp lệ, chuyển hướng đến trang /password
      navigate("/password");
    } else {
      setError("Email không tồn tại. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Nhập email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Nhập email của bạn"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-blue-800"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
