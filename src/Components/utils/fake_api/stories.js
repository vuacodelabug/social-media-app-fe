import { getUserById } from "./users";

const STORAGE_KEY = "stories";

let stories = [
    {
        id: 1,
        id_user: 1,
        name: "Kieu tien",
        img: "/Images/khuong.jpg",
        created_at: "08:45",
        expires_at: "12:10"
    },
    {
        id: 2,
        id_user: 2,
        name: "My linh",
        img: "/Images/anh1.jpg",
        created_at: "08:45",
        expires_at: "12:10"
    }
];

// 👉 Hàm lưu dữ liệu mẫu vào localStorage
function saveStoriesToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
}

// 👉 Gọi một lần duy nhất khi chưa có dữ liệu
if (!localStorage.getItem(STORAGE_KEY)) {
    saveStoriesToLocalStorage();
}

// 👉 Lấy stories từ localStorage
export const getStories = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// 👉 Thêm một story mới và lưu lại
export const addStory = (story) => {
    const existingStories = getStories();
    const user = getUserById(story.id_user);
    const storyWithAvatar = {
        ...story,
    };
    const updatedStories = [...existingStories, storyWithAvatar];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStories));
};
