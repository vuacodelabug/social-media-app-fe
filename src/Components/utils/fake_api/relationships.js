const RELATIONSHIP_KEY = "relationshipData";

// Lấy dữ liệu từ localStorage hoặc khởi tạo mặc định
let relationships = JSON.parse(localStorage.getItem(RELATIONSHIP_KEY)) || [
  { id: 1, iduser_follower: 2, iduser_following: 1 }, // B -> A
  { id: 2, iduser_follower: 1, iduser_following: 2 }, // A -> B
  { id: 3, iduser_follower: 3, iduser_following: 2 }, // C -> B
  { id: 3, iduser_follower: 3, iduser_following: 1 }, // C -> B
];

// Lưu lại vào localStorage
const saveToLocalStorage = () => {
  localStorage.setItem(RELATIONSHIP_KEY, JSON.stringify(relationships));
};

// Lấy tất cả mối quan hệ
export const getRelationships = () => relationships;

// Thêm một mối quan hệ mới (follow)
export const addRelationship = (followerId, followingId) => {
  if (followerId === followingId) return;
  // Kiểm tra xem đã tồn tại chưa
  const exists = relationships.some(
      (r) => r.iduser_follower === followerId && r.iduser_following === followingId
  );
  if (!exists) {
    relationships.push({
      id: Date.now(), // hoặc Math.random() để tạo id tạm
      iduser_follower: followerId,
      iduser_following: followingId,
    });
    saveToLocalStorage();
  }
};

// Xoá mối quan hệ (unfollow)
export const removeRelationship = (followerId, followingId) => {
  relationships = relationships.filter(
      (r) => !(r.iduser_follower === followerId && r.iduser_following === followingId)
  );
  saveToLocalStorage();
};
