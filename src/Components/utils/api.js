import axios from "axios";

const API_ROOT = "http://localhost:8800";

export const Register = async (formData) => {
  return await fetch(`${API_ROOT}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });
};

export const search = async (query) => {
  return await fetch(`${API_ROOT}/api/posts/search-form?q=${encodeURIComponent(query)}`);
};

export const verifyEmail = async (email) => {
  return await fetch(`${API_ROOT}/api/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
};

// login 
export function postLogin(userInfo) {
  return axios.post(`${API_ROOT}/api/auth/login`, userInfo, {
    withCredentials: true, 
  });
}
export async function isLogin() {
  try {
    const res = await axios.get(`${API_ROOT}/api/auth/authenticate`, {
      withCredentials: true,
    });

    // Kiểm tra kết quả trả về từ server
    if (res.data?.success) {
      return true;
    } else {
      // Trường hợp server trả về nhưng success = false
      window.location.href = "/login";
      return false;
    }
  } catch (error) {
    // Trường hợp lỗi kết nối hoặc lỗi status 401, 403
    console.warn("Auth error:", error.response?.data || error.message);
    window.location.href = "/login";
    return false;
  }
}

// lay bài viết cho user
export function getPosts() {
  return axios.get(`${API_ROOT}/api/posts`, {
    withCredentials: true, 
  });
}
// lay bài viết của user
export function getUserPosts(user_id) {
  return axios.get(`${API_ROOT}/api/posts/${user_id}`, {
    withCredentials: true, 
  });
}

// tạo bài viết mới
export function postCreatePost(description, img = null) {
  return axios.post(`${API_ROOT}/api/posts`, {
    description,
    img,
  }, {
    withCredentials: true,
  });
}

// upload ảnh
export function uploadImage(file, field) {
  if (!file) return null;
  const fd = new FormData();
  fd.append("file", file);

  return axios.post(`${API_ROOT}/api/upload?fd=${field}`, fd, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// lay coment cho bai viet
export function getComments(postId) {
  return axios.get(`${API_ROOT}/api/comments/`, {
    params: { postId },
    withCredentials: true, 
  });
}
export const postAddComment = (data) => axios.post(`${API_ROOT}/api/comments`, data);
export const deleteComment = (id) => axios.delete(`${API_ROOT}/api/comments/${id}`);
export const getLikes = (postId) => axios.get(`${API_ROOT}/api/likes`,{
  params: { postId },
});
export const postAddLike = (data) => axios.post(`${API_ROOT}/api/likes`, data);
export const deleteLike = (data) => axios.delete(`${API_ROOT}/api/likes`, { data });

export const getUserById = (id) => axios.get(`${API_ROOT}/api/users/${id}`);

// lấy stories
export const getStories = () => axios.get(`${API_ROOT}/api/stories`, {
  withCredentials: true, 
});

// tạo stories mới  
export const postCreateStory = (data) => axios.post(`${API_ROOT}/api/stories`, data, {
  withCredentials: true,
});

// update user:
export const updateUser = (userId, data) => axios.post(`${API_ROOT}/api/users/${userId}`, data, {
  withCredentials: true,
});

// get followings
export const getFollowings = (userId) => axios.get(`${API_ROOT}/api/relationships/following`, {
  params: { userId },
  withCredentials: true,
});
// get followers
export const getFollowers = (userId) => axios.get(`${API_ROOT}/api/relationships/follower`, {
  params: { userId },
  withCredentials: true,
});
// unfollow user
export const unfollowUser = (userId, targetId) => axios.delete(`${API_ROOT}/api/relationships/`, {
  data: {
    iduser_follower: userId,
    iduser_following: targetId,
  },
  withCredentials: true,
});
// follow user
export const followUser = (userId, targetId) =>
  axios.post(`${API_ROOT}/api/relationships/`, {
    iduser_follower: userId,
    iduser_following: targetId,
  }, {
    withCredentials: true,
  });
  
// GET /api/relationships/check?follower=1&following=2
export const checkFollow = (userId, targetId) =>
  axios.get(`${API_ROOT}/api/relationships/check`, {
    params: { follower: userId, following: targetId },
    withCredentials: true,
  });