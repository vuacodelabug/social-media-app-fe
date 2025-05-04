import React, { useState, useEffect } from "react";
import { getPost, addNewPost, deletePost } from "../fake_api/posts";
import { getUser, getUserById } from "../fake_api/users";
import { getLike, setLike } from "../fake_api/like";
import { getComments, addComment } from "../fake_api/comments";
import NewPost from "./NewPost";
import { FaRegClock, FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";

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
    }, [userLogin]);

    const refreshPosts = () => {
        const allUsers = getUser();
        const allPosts = getPost();
        const updatedPosts = allPosts.map((post) => {
            const user = allUsers.find((u) => u.id === post.id_user);
            return {
                ...post,
                avatar: user?.profilepic || "/default-avatar.jpg",
                username: user?.name || "Ẩn danh",
                comments: getComments().filter(c => c.id_post === post.id)
            };
        });
        setPosts(updatedPosts);
    };

    useEffect(() => {
        const storedLikes = getLike();
        setLikes(storedLikes);
    }, []);

    const hasLiked = (postId) => {
        return likes.some(like => like.id_post === postId && like.id_user === userLogin.id);
    };

    const handleLike = (postId) => {
        const updatedLikes = hasLiked(postId)
            ? likes.filter(like => !(like.id_post === postId && like.id_user === userLogin.id))
            : [...likes, { id: Date.now(), id_user: userLogin.id, id_post: postId }];
        setLikes(updatedLikes);
        setLike(updatedLikes);
    };

    const handleAddComment = (postId) => {
        if (newComment.trim() === "") return;
        const comment = {
            id: Date.now(),
            id_post: postId,
            id_user: userLogin.id,
            description: newComment,
            created_at: new Date().toLocaleDateString(),
        };
        addComment(comment);
        setNewComment("");
        setPosts(prev =>
            prev.map(post =>
                post.id === postId
                    ? { ...post, comments: [...(post.comments || []), comment] }
                    : post
            )
        );
    };

    const togglePostMenu = (postId) => {
        setOpenMenuPostId(openMenuPostId === postId ? null : postId);
    };

    const toggleComment = (postId) => {
        setOpenCommentId(openCommentId === postId ? null : postId);
    };

    if (!userLogin) {
        return <div>Vui lòng đăng nhập để xem bài viết.</div>;
    }

    return (
        <div className="flex flex-col gap-4 p-4 w-full bg-white rounded-2xl shadow-md">
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-max"
            >
                Tạo bài viết
            </button>

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
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="p-4 border rounded-lg shadow-sm mb-4 bg-white">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <img
                                        src={post.avatar}
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-sm">{post.username}</h3>
                                        <p className="flex gap-2 text-gray-400 text-xs">
                                            {post.created_at}
                                        </p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={() => togglePostMenu(post.id)}
                                        className="hover:text-black"
                                    >
                                        ⋯
                                    </button>
                                    {openMenuPostId === post.id && (
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
                                    className="rounded-md mx-auto max-w-full"
                                />
                            )}

                            <div className="flex justify-around items-center border-t border-gray-200 pt-2 text-gray-700">
                                <div className="flex flex-col items-center">
                                    <p className="text-xs text-gray-500">
                                        {likes.filter(l => l.id_post === post.id).length} lượt thích
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
                                <div className="flex flex-col items-center">
                                    <p className="text-xs text-gray-500">
                                        {post.comments?.length || 0} lượt bình luận
                                    </p>
                                    <button
                                        onClick={() => toggleComment(post.id)}
                                        className="flex items-center gap-1 text-gray-600 hover:text-black"
                                    >
                                        <FaRegComment />
                                        Bình luận
                                    </button>
                                </div>
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
                                                return (
                                                    <div
                                                        key={comment.id}
                                                        className="flex items-start gap-2 mt-2 text-sm"
                                                    >
                                                        <img
                                                            src={userProfile?.profilepic || "/default-avatar.jpg"}
                                                            alt="avatar"
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-gray-800">
                                                                {userProfile?.name || "Ẩn danh"}
                                                            </p>
                                                            <p className="text-gray-700">
                                                                {comment.description}
                                                            </p>
                                                            <span className="text-xs text-gray-400">
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
                    <p className="text-gray-500">Không có bài viết nào.</p>
                )}
            </div>
        </div>
    );
};

export default PostsSection;
