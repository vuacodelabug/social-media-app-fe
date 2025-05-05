
const LIKE_KEY = "likes";

export const getLike = () => {
  return [
    {
      id: 1,
      id_user: 1,
      id_post: 1,
    },
    {
      id: 1,
      id_user: 2,
      id_post: 1,
    },
  ];
};

export const setLike = (likes) => {
  localStorage.setItem(LIKE_KEY, JSON.stringify(likes));
};
