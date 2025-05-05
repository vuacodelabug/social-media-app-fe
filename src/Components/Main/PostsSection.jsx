import React, { useEffect, useState } from "react";
import { addComment, getComments } from "../utils/fake_api/comments";
import { getLike, setLike } from "../utils/fake_api/like";
import { deletePost, getPost } from "../utils/fake_api/posts";
import { getUser, getUserById } from "../utils/fake_api/users";
import NewPost from "./NewPost";

import { AiOutlineLike } from "react-icons/ai";
import { FaRegClock, FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";

import { Avatar } from "@material-tailwind/react";
import { FaPhotoVideo, FaSmile, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";

const PostsSection = () => {
  const [posts, setPosts] = useState([]);
  const [userLogin, setUserLogin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likes, setLikes] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [openMenuPostId, setOpenMenuPostId] = useState(null);
  const [openCommentId, setOpenCommentId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserLogin(storedUser || null);
  }, []);

  useEffect(() => {
    refreshPosts();
  }, []);

  const refreshPosts = () => {
    const allUsers = getUser();
    const allPosts = getPost();
    const updatedPosts = allPosts.map((post) => {
      const user = allUsers.find((u) => u.id === post.id_user);
      return {
        ...post,
        avatar: user?.profilepic || "/default-avatar.jpg",
        username: user?.name || "Ẩn danh",
        comments: getComments().filter((c) => c.id_post === post.id)
      };
    });
    setPosts(updatedPosts);
  };

  useEffect(() => {
    const storedLikes = getLike();
    setLikes(storedLikes);
  }, []);

  const hasLiked = (postId) => {
    return likes.some(
      (like) => like.id_post === postId && like.id_user === userLogin.id
    );
  };

  const handleLike = (postId) => {
    const updatedLikes = hasLiked(postId)
      ? likes.filter(
          (like) => !(like.id_post === postId && like.id_user === userLogin.id)
        )
      : [...likes, { id: Date.now(), id_user: userLogin.id, id_post: postId }];
    setLikes(updatedLikes);
    setLike(updatedLikes);
  };

  // Hàm xóa comment
  const handleDeleteComment = async (commentId) => {
    try {
      //   await deleteCommentAPI(commentId); // gọi API xoá comment
      // cập nhật ui sau khi xoá
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.comments) {
            return {
              ...post,
              comments: post.comments.filter(
                (comment) => comment.id !== commentId
              )
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Lỗi khi xoá comment:", error);
    }
  };

  // Hàm thêm comment
  const handleAddComment = (postId) => {
    if (newComment.trim() === "") return;
    const comment = {
      id: Date.now(),
      id_post: postId,
      id_user: userLogin.id,
      description: newComment,
      created_at: new Date().toLocaleDateString()
    };
    addComment(comment);
    setNewComment("");
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      )
    );
  };

  // mở menu bài viết
  const togglePostMenu = (postId) => {
    setOpenMenuPostId(openMenuPostId === postId ? null : postId);
  };

  // mở comment
  const toggleComment = (postId) => {
    setOpenCommentId(openCommentId === postId ? null : postId);
  };

  if (!userLogin) {
    return <div>Vui lòng đăng nhập để xem bài viết.</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 w-full bg-white rounded-2xl shadow-md">
      {/* post bài viết */}
      <div className="bg-white rounded-lg shadow p-4">
        {/* Top input */}
        <div className="flex items-center space-x-3">
          <Avatar src={userLogin.profilepic} size="sm" />
          <input
            onClick={() => setIsModalOpen(true)}
            type="text"
            placeholder={userLogin.name + " ơi, bạn đang nghĩ gì thế?"}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
          />
        </div>
        <hr className="my-3" />
        {/* Action buttons */}
        <div className="flex justify-between text-sm text-gray-600">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1 hover:text-red-500"
          >
            <FaVideo className="text-red-500" />
            <span>Video trực tiếp</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1 hover:text-green-500"
          >
            <FaPhotoVideo className="text-green-500" />
            <span>Ảnh/video</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1 hover:text-yellow-500"
          >
            <FaSmile className="text-yellow-500" />
            <span>Cảm xúc/hoạt động</span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <NewPost
            user={userLogin}
            onClose={() => setIsModalOpen(false)}
            onPostSuccess={() => {
              refreshPosts();
              setIsModalOpen(false);
            }}
          />
        </div>
      )}

      <div className="p-4 border-t">
        <h2 className="font-semibold text-lg mb-4">Danh sách bài viết</h2>
        {posts.length > 0 ? (
          posts.map((post) => {
            const isOwnPost = post.id_user === userLogin?.id;
            return (
            <div
              key={post.id}
              className="p-4 border rounded-lg shadow-sm mb-4 bg-white"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Link to={`/profile/${post.id_user}`} className="flex items-center">
                    <img
                      src={post.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="font-semibold text-sm">{post.username}</h3>
                      <p className="flex gap-2 text-gray-400 text-xs">
                        <FaRegClock /> {post.created_at}
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="relative">
                  <button
                    onClick={() => togglePostMenu(post.id)}
                    className="hover:text-black"
                  >
                    ⋯
                  </button>
                  {isOwnPost && openMenuPostId === post.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                      <button
                        onClick={() => {
                          deletePost(post.id);
                          refreshPosts();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-red-100 text-red-600"
                      >
                        Xóa bài viết
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-800 mb-2">{post.content}</p>
              {post.img && (
                <img
                  src={post.img}
                  alt="Post"
                  className="w-full h-96 rounded-md object-cover"
                />
              )}

              <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                {/* Like summary */}
                <div className="flex items-center gap-1">
                  <span>
                    {likes.filter((l) => l.id_post === post.id).length} lượt
                    thích
                  </span>
                </div>

                {/* Comment and share details */}
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>{post.comments.length} bình luận</span>
                  <span>5 lượt chia sẻ</span>{" "}
                  {/* Hardcoded hoặc sau này làm thật */}
                </div>
              </div>

              <div className="flex justify-around items-center border-t border-gray-200 pt-2 text-gray-700">
                <div className="flex flex-col items-center">
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

                <button
                  onClick={() => toggleComment(post.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-black"
                >
                  <FaRegComment />
                  Bình luận
                </button>

                <button className="flex items-center gap-1 hover:underline">
                  <PiShareFatLight />
                  Chia sẻ
                </button>
              </div>

              {openCommentId === post.id && (
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Viết bình luận..."
                      className="flex-1 p-2 border rounded-md"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
                      onClick={() => handleAddComment(post.id)}
                    >
                      Gửi
                    </button>
                  </div>

                  <div className="mt-4">
                    {post.comments &&
                      post.comments.map((comment) => {
                        const userProfile = getUserById(comment.id_user);
                        const isOwnComment = comment.id_user === userLogin?.id;

                        return (
                          <div
                            key={comment.id}
                            className="flex items-start gap-2 mt-2 text-sm relative"
                          >
                            {/* Avatar */}
                            <Link
                              to={`/profile/${comment.id_user}`}
                              className="flex-shrink-0"
                            >
                              <img
                                src={
                                  userProfile?.profilepic ||
                                  "/default-avatar.jpg"
                                }
                                alt="avatar"
                                className="w-8 h-8 rounded-full"
                              />
                            </Link>

                            {/* Nội dung */}
                            <div className="flex-1 pr-10">
                              {" "}
                              {/* tránh đè lên nút xoá */}
                              <Link to={`/profile/${comment.id_user}`}>
                                <p className="font-semibold text-gray-800 hover:underline">
                                  {userProfile?.name || "Ẩn danh"}
                                </p>
                              </Link>
                              <p className="text-gray-700">
                                {comment.description}
                              </p>
                              
                              {/* Thời gian + nút xoá ở dưới cùng */}
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-400">
                                  {comment.created_at}
                                </span>
                                {isOwnComment && (
                                  <button
                                    onClick={() =>
                                      handleDeleteComment(comment.id)
                                    }
                                    className="text-red-500 text-xs hover:underline"
                                    >
                                      Xoá
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
            ) 
        })
        ) : (
          <p className="text-gray-500">Không có bài viết nào.</p>
        )}
      </div>
    </div>
  );
};

export default PostsSection;
