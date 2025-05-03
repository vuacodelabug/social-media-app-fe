export const getUser = () => {
  return [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "123456",
      name: "John Doe",
      profilepic:
      "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/469650849_1779020349302622_3232380227851375626_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=9f3R35ZDKsgQ7kNvwF2vMQI&_nc_oc=AdnMOfqTZZViAVM0JFgvx2LwE0Rl85ZtCtCrPL0a0J_-7V0M61VFBH_GvfCnE2-gico&_nc_zt=24&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=K5zOxgpRU1nAWpPEg_qzHQ&oh=00_AfHYtJEpueo2YEZ4euD6M-nIH85dBjssoriPiU7m75dNgw&oe=681AB52D",
      coverpic:
        "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/468505360_1696412094259433_7319599439402292222_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=xS6OjtWcbqMQ7kNvwEayQHB&_nc_oc=AdnhFqVTYNoFW1rlMNQSzTLg4JucXzbaF_cZMyBTbfZEhTI-Z_YlIa0IzYtvKvogQZQ&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=YqNU3EUU0kBp0KAkCDY3dg&oh=00_AYFK5_Td_f-ywSSSdMQXb9syuAQcj4knZkScg_o_6ksC-g&oe=67F53E35",
      city: "New York",
    },
    {
      id: 2,
      username: "khuong",
      email: "khuong@example.com",
      password: "123456",
      name: "Thu Khuong",
      profilepic:
        "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/468505360_1696412094259433_7319599439402292222_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=ct9Z-6ItR34Q7kNvwENessf&_nc_oc=AdnUPaOubrKsOJnNc-RVcVOGPOw66FAsAe52WKAmDD_WD3hZPRaxL2v8GKpLdxQO5sc&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=p0nxknnsMEgouWjFD3NrIA&oh=00_AfGOLnhsIUfaovifzx5pOJCajT3HcHhwllzguD6n94mNPQ&oe=681A98B5",
      coverpic:
        "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/468505360_1696412094259433_7319599439402292222_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=ct9Z-6ItR34Q7kNvwENessf&_nc_oc=AdnUPaOubrKsOJnNc-RVcVOGPOw66FAsAe52WKAmDD_WD3hZPRaxL2v8GKpLdxQO5sc&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=p0nxknnsMEgouWjFD3NrIA&oh=00_AfGOLnhsIUfaovifzx5pOJCajT3HcHhwllzguD6n94mNPQ&oe=681A98B5",
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
