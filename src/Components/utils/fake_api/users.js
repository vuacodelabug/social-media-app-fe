export const getUser = () => {
  return [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "123456",
      name: "John Doe",
      profilepic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVGyvojqXJPEbHigzHv6km2VPqN30sdoOKig&s",
      coverpic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVGyvojqXJPEbHigzHv6km2VPqN30sdoOKig&s",
      city: "New York",
    },
    {
      id: 4,
      username: "khuong",
      email: "khuong@example.com",
      password: "123456",
      name: "Thu Khuong",
      profilepic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIpFcu373Qcx5paxS3u1efEAVL9hu7VDEesQ&s",
      coverpic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIpFcu373Qcx5paxS3u1efEAVL9hu7VDEesQ&s",
      city: "Việt Nam",
    },
  ];
};
export const getUserById = (id) => {
  const users = getUser(); // Lấy danh sách người dùng từ hàm getUser()
  return users.find((user) => user.id === parseInt(id)); // Tìm user có id khớp với id được truyền vào
};

export const getUserByEmail = (email) => {
  const users = getUser();
  return users.find((user) => user.email === email);
};
