import { useEffect, useState } from "react";
import { FaEdit, FaCamera } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { getUserById } from "../fake_api/users";  // Giả sử bạn có hàm này lấy thông tin người dùng
import { getPost } from "../fake_api/posts";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";

export default function Profile() {
  const [bio, setBio] = useState("welcome to my profile");
  const details = [
    { icon: "❤️", text: "Độc thân" },
    { icon: "🏫", text: "Sinh viên tại trường Đại học Tài Nguyên và Môi Trường TPHCM" },
    { icon: "📍", text: "Sống tại Thành phố Hồ Chí Minh" },
    { icon: "🌍", text: "Đến từ Quy Nhơn" }
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBio, setNewBio] = useState(bio);

  const userLogin = JSON.parse(localStorage.getItem("user")); // lay user dang đăng nhập
  const { id } = useParams(); // lay id user tu url
  const userProfile = getUserById(id); // tim user tuong ung voi id

  const [userPosts, setUserPosts] = useState([]); //userPosts luu user sau khi da loc

  useEffect (() => {
    const allPosts = getPost(); // lay tat ca bai viet tu fake api
    const filterPosts = allPosts.filter(item => item.userId===Number(id)); 
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
          onClick={() => setIsModalOpen(true)}  // Mở modal khi nhấn vào Edit
          className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md text-sm">
          Edit
        </button>
      );
    } else {
      return (
        <button 
          onClick={handleFollowClick} 
          className={`mt-2 px-4 py-1 rounded-md text-sm transition-all ${
            isFollowing ? "bg-light-green-900 text-white" : "bg-blue-500 text-white"
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
    setBio(newBio);  // Lưu thông tin mới
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
          <p key={index} className="flex items-center gap-2 text-sm text-gray-700">
            {item.icon} {item.text}
          </p>
        ))}
      </div>

      {/* Modal Edit Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
              rows="4"
              placeholder="Update your bio"
            />
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
             {/* Danh sách bài viết */}
      <div className="p-4 border-t">
        <h2 className="font-semibold text-lg mb-4">Danh sách bài viết</h2>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg shadow-sm mb-4 bg-white">
              {/* Header bài viết */}
              <div className="flex items-center mb-2">
                <img
                  src={userProfile.profilepic}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold text-sm">{userProfile.name}</h3>
                  <p className="text-gray-400 text-xs">🕒 {post.day}</p>
                </div>
              </div>
              {/* Noi dung bai viet */}
              <p className="text-gray-800 mb-2">{post.content}</p>
              <img src={post.image} alt="Post" className="w-full h-auto rounded-md" />
              <div className="flex justify-around border-t border-gray-200 pt-2 text-gray-700">
                <button className="flex items-center gap-1 hover:underline"><AiOutlineLike />Thích</button>
                <button className="flex items-center gap-1 hover:underline"><FaRegComment />Bình luận</button>
                <button className="flex items-center gap-1 hover:underline"><PiShareFatLight /> Chia sẻ</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Chưa có bài viết nào.</p>
        )}
      </div>
    </div>
  );
}