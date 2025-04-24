import { useEffect, useState } from "react";
import { FaEdit, FaCamera } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getUserById } from "../fake_api/users";
import { getPost } from "../fake_api/posts";
import { getComments } from "../fake_api/comments.js";
import { getLike } from "../fake_api/like";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa";
import { PiCity } from "react-icons/pi";

export default function Profile() {
  const [bio, setBio] = useState("welcome to my profile");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    city: "",
  });

  // File ảnh
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null); // File ảnh
  const [profilePreview, setProfilePreview] = useState(null);
  // CommentComment
  const [openCommentId, setOpenCommentId] = useState(null);

  const toggleComment = (id) => {
    setOpenCommentId(openCommentId === id ? null : id);
  };
  // Modal editedit
  const handleOpenModal = () => {
    const userLS = {
      id: userProfile.id,
      name: userProfile.name,
      profilepic: userProfile.profilepic,
      coverpic: userProfile.coverpic,
      username: userProfile.username,
      city: userProfile.city,
    };
    // Hình
    setFormData(userLS);
    setProfilePreview(userLS.profilepic || null);
    setCoverPreview(userLS.coverpic || null);
    setIsModalOpen(true);
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    setProfileFile(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setProfilePreview(previewURL);
    }
  };
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setCoverPreview(previewURL);
    }
  };
  const [newBio] = useState(bio);
  // localStorage
  const userLogin = JSON.parse(localStorage.getItem("user")); // lay user dang đăng nhập
  const { id } = useParams(); // lay id user tu url
  const userProfile = getUserById(id); // tim user tuong ung voi id

  const details = [
    {
      icon: <PiCity className="w-4 h-4 text-gray-500" />,
      text: userProfile.city || "No city provided",
    },
  ];

  const [userPosts, setUserPosts] = useState([]); //userPosts luu user sau khi da loc
  const [openMenuPostId, setOpenMenuPostId] = useState(null);

  const togglePostMenu = (postId) => {
    setOpenMenuPostId(openMenuPostId === postId ? null : postId);
  };

  const deletePost = (postId) => {
    // Xóa post khỏi danh sách post (giả lập)
    const updatedPosts = userPosts.filter((p) => p.id !== postId);
    setUserPosts(updatedPosts); // bạn phải đảm bảo `setUserPosts` có sẵn nếu dùng useState
    setOpenMenuPostId(null); // ẩn menu sau khi xóa
  };
  const [likes, setLikes] = useState(getLike()); // khởi tạo từ fake API getLike()
  const hasLiked = (postId) => {
    return likes.some(
      (like) => like.id_post === postId && like.id_user === userLogin.id
    );
  };

  const handleLike = (postId) => {
    if (hasLiked(postId)) {
      // Bỏ like
      setLikes((prev) =>
        prev.filter(
          (like) => !(like.id_post === postId && like.id_user === userLogin.id)
        )
      );
    } else {
      // Thêm like
      const newLike = {
        id: Date.now(),
        id_user: userLogin.id,
        id_post: postId,
      };
      setLikes((prev) => [...prev, newLike]);
    }
  };

  useEffect(() => {
    const allPosts = getPost(); // lay tat ca bai viet tu fake api
    const filterPosts = allPosts.filter((item) => item.id_user === Number(id));
    // loc ra nhung bai viet co userId khop voi id tren url
    setUserPosts(filterPosts); // luu vao state
  }, [id]); // chay lai khi id tren url thay doi

  const ProfileButton = ({ id }) => {
    const [isFollowing, setIsFollowing] = useState(false); // mac dinh chua follow
    const handleFollowClick = () => {
      setIsFollowing((prev) => !prev); // đảo trang thai follow
    };

    if (id === userLogin.id) {
      // userLogin.id lay tu localStorage, id lay tu url
      return (
        <button
          onClick={handleOpenModal} // Mở modal khi nhấn vào Edit
          className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md text-sm"
        >
          Edit
        </button>
      );
    } else {
      return (
        <button
          onClick={handleFollowClick}
          className={`mt-2 px-4 py-1 rounded-md text-sm transition-all ${
            isFollowing
              ? "bg-light-green-900 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      );
    }
  };

  // Xử lý modal
  const handleModalClose = () => setIsModalOpen(false);

  const handleSave = () => {
    setBio(newBio); // Lưu thông tin mới
    handleModalClose();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* Cover Photo */}
      <div className="relative">
        <img
          src={userProfile.coverpic}
          alt="Cover"
          className="w-full h-40 object-cover"
        />
        <button className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full">
          <FaCamera />
        </button>
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center p-4 relative">
        <img
          src={userProfile.profilepic}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-white -mt-12"
        />
        <h2 className="text-lg font-bold">{userProfile.name}</h2>
        <ProfileButton id={userProfile.id} />
      </div>

      {/* Bio Section */}
      <div className="p-4 border-t">
        <h3 className="font-semibold">Intro</h3>
        <p className="text-sm text-gray-600 mt-1">{bio}</p>
        <button
          className="mt-2 text-blue-500 text-sm flex items-center"
          onClick={() => setBio(prompt("Edit your bio", bio) || bio)}
        >
          <FaEdit className="mr-1" /> Edit Bio
        </button>
      </div>

      {/* Details Section */}
      <div className="p-4">
        {details.map((item, index) => (
          <p
            key={index}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            {item.icon} {item.text}
          </p>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-center mb-4">
                Edit Profile
              </h1>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="Name"
              />

              {/* Avatar + Cover in one row */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Picture */}
                <div className="flex-1">
                  <label className="block mb-1 font-semibold">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded-md"
                  />
                  {profilePreview && (
                    <img
                      src={profilePreview}
                      alt="Profile Preview"
                      className="mt-2 w-32 h-32 object-cover rounded-full border"
                    />
                  )}
                </div>

                {/* Cover Picture */}
                <div className="flex-1">
                  <label className="block mb-1 font-semibold">
                    Cover Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="w-full p-2 border rounded-md"
                  />
                  {coverPreview && (
                    <img
                      src={coverPreview}
                      alt="Cover Preview"
                      className="mt-2 w-full h-32 object-cover rounded-md border"
                    />
                  )}
                </div>
              </div>

              {/* Other form fields */}
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="City"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="Old Email"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="New Email"
              />
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="Old Password"
              />
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="New Password"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Danh sách bài viết */}
      <div className="p-4 border-t">
        <h2 className="font-semibold text-lg mb-4">Danh sách bài viết</h2>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 border rounded-lg shadow-sm mb-4 bg-white"
            >
              {/* Header bài viết */}
              <div className="flex items-center justify-between mb-2">
                {/* Thông tin người dùng */}
                <div className="flex items-center">
                  <img
                    src={userProfile.profilepic}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">
                      {userProfile.name}
                    </h3>
                    <p className="flex gap-2 text-gray-400 text-xs">
                      <FaRegClock /> {post.created_at}
                    </p>
                  </div>
                </div>
                {/* Nút ba chấm */}
                <div className="right-auto relative">
                  <button
                    onClick={() => togglePostMenu(post.id)}
                    className=" hover:text-black"
                  >
                    ⋯
                  </button>
                  {openMenuPostId === post.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                      <button
                        onClick={() => deletePost(post.id)}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-red-100 text-red-600"
                      >
                        Xóa bài viết
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Nội dung bài viết */}
              <p className="text-gray-800 mb-2">{post.description}</p>
              <img
                src={post.img}
                alt="Post"
                className="w-full h-96 rounded-md object-cover"
              />

              {/* Các nút tương tác */}
              <div className="flex justify-around items-center border-t border-gray-200 pt-2 text-gray-700">
                {/* Cột Like */}
                <div className="flex flex-col items-center">
                  <p className="text-xs text-gray-500">
                    {likes.filter((l) => l.id_post === post.id).length} lượt
                    thích
                  </p>
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 mt-1 ${
                      hasLiked(post.id) ? "text-blue-600 font-semibold" : ""
                    }`}
                  >
                    <AiOutlineLike />
                    {hasLiked(post.id) ? "Đã thích" : "Thích"}
                  </button>
                </div>

                {/* Cột Bình luận */}
                <button
                  onClick={() => toggleComment(post.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-black"
                >
                  <FaRegComment />
                  Bình luận
                </button>

                {/* Cột Chia sẻ */}
                <button className="flex items-center gap-1 hover:underline">
                  <PiShareFatLight />
                  Chia sẻ
                </button>
              </div>

              {/* Ô bình luận */}
              {openCommentId === post.id && (
                <div className="mt-3">
                  {/* Ô nhập bình luận và nút Gửi */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Viết bình luận..."
                      className="flex-1 p-2 border rounded-md"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
                      Gửi
                    </button>
                  </div>

                  {/* Danh sách các comment */}
                  <div className="mt-4">
                    {getComments()
                      .filter((c) => c.id_post === post.id)
                      .map((comment) => {
                        const userProfile = getUserById(comment.id_user);
                        return (
                          <div
                            key={comment.id}
                            className="flex items-start gap-2 mt-2 text-sm"
                          >
                            <img
                              src={userProfile?.profilepic}
                              alt="avatar"
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-semibold text-gray-800">
                                {userProfile?.name}
                              </p>
                              <p className="text-gray-700">
                                {comment.description}
                              </p>
                            </div>
                            <div>
                              <span className="text-right">
                                {comment.created_at}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Chưa có bài viết nào.</p>
        )}
      </div>
    </div>
  );
}