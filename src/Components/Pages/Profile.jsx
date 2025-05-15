import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { PiCity } from "react-icons/pi";
import { useParams } from "react-router-dom";
import LeftSide from "../LeftSidebar/LeftSide";
import PostsSection from "../Main/PostsSection";
import Navbar from "../Navbar/Navbar";
import { getUserById, isLogin, uploadImage, updateUser } from "../utils/api";

export default function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    profilepic: "",
    coverpic: ""
  });
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [userLogin, setUserLogin] = useState(null); // Đảm bảo khai báo state đúng nơi

  const { id } = useParams();

  useEffect(() => {
    isLogin();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserLogin(user);
    }
  }, []);

  useEffect(() => {
    if (userLogin) {
      const fetchUser = async () => {
        try {
          const res = await getUserById(id);
          setUserProfile(res.data);
        } catch (error) {
          console.error("Lỗi khi lấy user:", error);
        }
      };
      fetchUser();
    }
  }, [id, userLogin]); // Chạy lại effect khi userLogin thay đổi

  const handleOpenModal = () => {
    setFormData({
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      city: userProfile?.city || "",
      profilepic: userProfile?.profilepic || "",
      coverpic: userProfile?.coverpic || ""
    });
    setProfilePreview(userProfile?.profilepic || "");
    setCoverPreview(userProfile?.coverpic || "");
    setIsModalOpen(true);
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    setProfileFile(file);
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleSave = async () => {
    try {
      let profileUrl = null;
      let coverUrl = null;

      // Chỉ upload nếu có file mới
      if (profileFile) {
        const res = await uploadImage(profileFile, "avatar");
        profileUrl = res.data;
      }

      if (coverFile) {
        const res = await uploadImage(coverFile, "cover");
        coverUrl = res.data;
      }

      const updatedUser = {
        ...formData,
        profilepic: profileUrl || formData.profilepic,
        coverpic: coverUrl || formData.coverpic
      };

      await updateUser(userProfile.id, updatedUser);
      setUserProfile((prev) => ({ ...prev, ...updatedUser }));
      setUserLogin((prev) => ({ ...prev, ...updatedUser }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userLogin, ...updatedUser })
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
    }
  };

  const ProfileButton = ({ id }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    if (id === userLogin?.id) {
      return (
        <button
          onClick={handleOpenModal}
          className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md text-sm"
        >
          Edit
        </button>
      );
    } else {
      return (
        <button
          onClick={() => setIsFollowing((prev) => !prev)}
          className={`mt-2 px-4 py-1 rounded-md text-sm ${
            isFollowing ? "bg-green-600" : "bg-blue-500 text-white"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      );
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
        <Navbar />
      </div>
      <div className="pt-[64px] flex">
        <div className="fixed top-[64px] left-0 w-[20%] bg-gray-100">
          <LeftSide />
        </div>
        <div className="ml-[20%] w-[60%] mx-auto">
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Edit Profile
                </h2>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-md mb-2 capitalize"
                  placeholder="Name"
                />

                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="City"
                />

                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label>Profile Picture</label>
                    <input
                      type="file"
                      onChange={handleProfileChange}
                      className="w-full"
                    />
                    {profilePreview && (
                      <img
                        src={profilePreview}
                        alt="Preview"
                        className="mt-2 w-32 h-32 rounded-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <label>Cover Picture</label>
                    <input
                      type="file"
                      onChange={handleCoverChange}
                      className="w-full"
                    />
                    {coverPreview && (
                      <img
                        src={coverPreview}
                        alt="Preview"
                        className="mt-2 w-full h-32 object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
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

          <div className="relative">
            <img
              src={userProfile?.coverpic || "/images/avatar/avatar-0.png"}
              className="w-full h-60 object-cover"
            />
            <button className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full">
              <FaCamera />
            </button>
          </div>

          <div className="flex flex-col items-center p-4 relative">
            <img
              src={userProfile?.profilepic || "/images/avatar/avatar-0.png"}
              className="w-24 h-24 rounded-full border-4 border-white -mt-12"
              alt="Avatar"
            />
            <h2 className="text-lg font-bold capitalize">{userProfile?.name}</h2>
            <ProfileButton id={userProfile?.id} />
          </div>

          <hr />

          <div className="p-4">
            <p className="flex items-center gap-2 text-sm text-gray-700">
              <PiCity className="w-4 h-4 text-gray-500" />{" "}
              {userProfile?.city || "No city provided"}
            </p>
          </div>

          <PostsSection isUserProfile={true} idUser={id} />
        </div>
      </div>
    </>
  );
}
