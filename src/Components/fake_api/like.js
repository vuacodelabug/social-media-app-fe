const LIKE_KEY = "likes";

export const getLike = () => {
    return JSON.parse(localStorage.getItem(LIKE_KEY)) || [];
};

export const setLike = (likes) => {
    localStorage.setItem(LIKE_KEY, JSON.stringify(likes));
};
