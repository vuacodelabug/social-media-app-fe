import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginInput from "../../loginInput";
import { getUser } from "../../unit/fake_api/users";
import { postLogin } from "../../utils/api";
import "./style.css";

const loginInfos = {
  email: "",
  password: "",
};
export default function Login() {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // fake api
    const users = getUser(); // Lấy danh sách user từ fake API
    // Kiểm tra email và mật khẩu có khớp không
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    postLogin(login);

    if (user) {
      console.log("Login successful!", user);
      setError(""); // Xóa thông báo lỗi nếu đăng nhập thành công
      alert(`Welcome, ${user.name}!`); // Thông báo đăng nhập thành công
    } else {
      console.log("Invalid credentials");
      setError("Invalid email or password");
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="" />
            <span>
              Facebook helps you connect and share with the people in your life.
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
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
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleLoginChange}
                    />
                    {error && <p className="error_message">{error}</p>}
                    <button type="submit" className="blue_btn">
                      Log In
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/forgot" className="forgot_password">
                Forgotten password ?
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
          </div>
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
}
