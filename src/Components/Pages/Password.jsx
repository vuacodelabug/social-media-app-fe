import React, { useState } from "react";

const Password = () => {
  const [code, setCode] = useState(""); // Lưu trữ giá trị mã xác thực
  const [newPassword, setNewPassword] = useState(""); // Lưu trữ mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(""); // Lưu trữ mật khẩu xác nhận
  const [error, setError] = useState(""); // Lưu trữ thông báo lỗi
  const [isCodeValid, setIsCodeValid] = useState(false); // Kiểm tra mã xác thực hợp lệ

  // Giả lập API kiểm tra mã xác thực (fake API)
  const fakeApiCheckCode = (code) => {
    return code === "123456";
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value); // Cập nhật giá trị mã xác thực khi người dùng nhập
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value); // Cập nhật mật khẩu mới
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value); // Cập nhật mật khẩu xác nhận
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra mã xác thực
    if (fakeApiCheckCode(code)) {
      setIsCodeValid(true); // Nếu mã xác thực hợp lệ, hiển thị form đổi mật khẩu
      setError(""); // Reset lỗi
    } else {
      setIsCodeValid(false); // Nếu mã không hợp lệ, không hiển thị form
      setError("Mã xác thực không hợp lệ.");
    }
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      alert("Mật khẩu đã được thay đổi thành công!");
    } else {
      setError("Mật khẩu mới và mật khẩu xác nhận không khớp.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {isCodeValid ? "Đổi mật khẩu" : "Nhập mã xác thực"}
        </h1>

        {/* Form nhập mã xác thực */}
        {!isCodeValid ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Nhập mã xác thực:
              </label>
              <input
                type="text"
                id="code"
                name="code" 
                value={code}
                onChange={handleCodeChange}
                required
                placeholder="Nhập mã xác thực"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Xác nhận
            </button>
          </form>
        ) : (
          // Nếu mã xác thực đúng, hiển thị form đổi mật khẩu
          <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu mới:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
                placeholder="Nhập mật khẩu mới"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Xác nhận mật khẩu:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                placeholder="Nhập lại mật khẩu"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Đổi mật khẩu
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Password;
