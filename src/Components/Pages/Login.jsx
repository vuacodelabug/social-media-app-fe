import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../loginInput";
import { useState } from "react";
import { getUser } from "../fake_api/users";
import { postLogin } from "../utils/api";

const loginInfos = {
  email: "",
  password: "",
};


const Login = () => {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  console.log(login);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // fake api
    const users = getUser(); // Lấy danh sách user từ fake API
    // Kiểm tra email và mật khẩu có khớp tt ng dung nhập không
    const user = users.find( // tìm kiem user người dùng nhập khớp thì trả về đối tượng
      (u) => u.email === email && u.password === password
    );
// Luu vao localStorage
    const userLS = {
      id : user.id,
      name: user.name,
      profilepic: user.profilepic,
      coverpic: user.coverpic
    }

    postLogin(login);

    if (user) {
      console.log("Login successful!", user);
      setError(""); // Xóa thông báo lỗi nếu đăng nhập thành công
      localStorage.setItem("user",JSON.stringify(userLS)) // luu userLS
      window.location.href = '/'; // chuyển hướng trang
    } else {
      console.log("Invalid credentials");
      setError("Invalid email or password");
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  }; //cap nhap state khi nguoi dung nhap lieu vao o input

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <div className="mb-6 text-center">
        <div className="text-4xl text-center font-extrabold text-gray-900 dark:text-white font-roboto">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-400">
              Friendzy
              </span>
            </div>
          <span className="text-gray-500 text-lg">
          Connect with friends, stir up life
          </span>
        </div>
            <Formik
              enableReinitialize
              initialValues={{
                email,
                password,
              }}
            >
              {(formik) => (
                <Form onSubmit={handleLoginSubmit}>
                  <LoginInput
                    type="text"
                    name="email"
                    placeholder="Email address or phone number"
                    onChange={handleLoginChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleLoginChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  />
                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                  <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Log In
                  </button>
                </Form>
              )}
            </Formik>
            <Link to="/forgot" className="block text-blue-500 text-center mt-4">
              Forgotten password?
            </Link>
            <div className="sign_splitter my-4 border-t border-gray-300"></div>
            <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Create Account
            </button>
          </div>
        </div>
     
  );
}
export default Login;

