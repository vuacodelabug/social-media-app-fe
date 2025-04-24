import axios from "axios";

const API_ROOT = "http://172.20.10.3:8800/";

export function postLogin(userInfo) {
  return axios.post(`${API_ROOT}/api/auth/login`, userInfo);
}