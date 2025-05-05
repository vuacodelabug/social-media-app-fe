import { getUserById } from "./users";
import avatar from "../../assets/images/avatar.png";
import linh from "../../assets/images/linh.jpg";

const STORAGE_KEY = "stories";

// Dữ liệu mẫu KHÔNG có name/avatar, chỉ có 4 thuộc tính theo bảng
let stories = [
    {
        id: 1,
        id_user: 1,
        img: avatar,
        created_at: "2025-05-05T08:45:00",
        expires_at: "2025-05-06T08:45:00"
    },
    {
        id: 2,
        id_user: 2,
        img: linh,
        created_at: "2025-05-05T09:00:00",
        expires_at: "2025-05-06T09:00:00"
    }
];

function saveStoriesToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
}

if (!localStorage.getItem(STORAGE_KEY)) {
    saveStoriesToLocalStorage();
}

// Lấy từ localStorage và bổ sung name + avatar
export const getStories = () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return stored.map(story => {
        const user = getUserById(story.id_user);
        return {
            ...story,
            name: user?.name || "Unknown",
            avatar: user?.profilepic || avatar
        };
    });
};

// Thêm story mới
export const addStory = (story) => {
    const existingStories = getStories();
    const { id_user, img, created_at, expires_at } = story;
    const newId = existingStories.length > 0 ? Math.max(...existingStories.map(s => s.id)) + 1 : 1;

    const baseStory = { id: newId, id_user, img, created_at, expires_at };

    const user = getUserById(id_user);
    const storyWithExtras = {
        ...baseStory,
        name: user?.name || "Unknown",
        avatar: user?.profilepic || avatar
    };

    const updated = [...existingStories, storyWithExtras];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
