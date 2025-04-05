export const getUser = () => {
  return [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "123456",
      name: "John Doe",
      profilepic:
        "https://scontent.fsgn9-1.fna.fbcdn.net/v/t39.30808-1/483485932_1301285261148483_6733925204446856452_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGpY8QSHaBOX_qL9scgglt1FXd21_n9nw8Vd3bX-f2fDx2Az_xHPTpQYFf-_nwGsPx6opCGPSd2EaLy0E3Qfnxp&_nc_ohc=MPpLgbpUZuwQ7kNvgEoKlmV&_nc_oc=AdmBgVV2p64esfTbKTVBFZb81WwauDDNg5DzLdyZ0U7--LEmGRfWAlemoBuLSLdG5gE&_nc_zt=24&_nc_ht=scontent.fsgn9-1.fna&_nc_gid=_xvrZ1aJSyoVDEFo5NV_9A&oh=00_AYHpaMFC4D1QV2KKmixWWipZdGqvqt1UfrTzM7AaXPhVwg&oe=67F437EB",
      coverpic:
        "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/468505360_1696412094259433_7319599439402292222_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=xS6OjtWcbqMQ7kNvwEayQHB&_nc_oc=AdnhFqVTYNoFW1rlMNQSzTLg4JucXzbaF_cZMyBTbfZEhTI-Z_YlIa0IzYtvKvogQZQ&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=YqNU3EUU0kBp0KAkCDY3dg&oh=00_AYFK5_Td_f-ywSSSdMQXb9syuAQcj4knZkScg_o_6ksC-g&oe=67F53E35",
      city: "New York",
      website: "https://johndoe.com",
    },
    {
      id: 2,
      username: "khuong",
      email: "khuong@example.com",
      password: "123456",
      name: "Thu Khuong",
      profilepic:
        "https://scontent.fsgn9-1.fna.fbcdn.net/v/t39.30808-1/469650849_1779020349302622_3232380227851375626_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHupSas3EAzgo7iCKk8tuzEVSG3SWQG2jxVIbdJZAbaPMRVj9TYQ4deJj-uQh7SUdMlfFVX_DfWajVv5_AxSKPV&_nc_ohc=gN5bJBGdq2AQ7kNvgGQ9zh4&_nc_oc=Adka7ZaYi81LQJawEz8-WatEWC1Gz_6W4N9jveMoSvftx-4nX4kHMK1sZeZwtut5o94&_nc_zt=24&_nc_ht=scontent.fsgn9-1.fna&_nc_gid=s0Zo8H7h_foHbC8tazAUqw&oh=00_AYGxgn936yvuknjQnsjhRSoLMUDw_mbjesYp43udJ4hIAg&oe=67F4092D",
      coverpic:
        "https://scontent.fsgn9-1.fna.fbcdn.net/v/t39.30808-6/450197062_1000587805406793_6060140702909120421_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFcaNJg-8eOKTquzKk8ZXG-93yzeKpPy4D3fLN4qk_LgD0D92a01QJiUUddrYw7BZutJgdNuOPzUfAd238ZZKzJ&_nc_ohc=213AvwoTVZIQ7kNvgGfTU_6&_nc_oc=Adk2EIEqyjMSYHc_kZ_9QM9KgUVCiZ3F3rHo0QngmZFF127sTJoiN0p0Ws4gkk1FYRc&_nc_zt=23&_nc_ht=scontent.fsgn9-1.fna&_nc_gid=W_MIfw6MNQefR5WnSsg4ew&oh=00_AYH1F5vX2qdaxJ2Wd7B8rurFK9WrA39TU52DuPjWawHz2w&oe=67F41A7C",
      city: "Los Angeles",
      website: "https://janesmith.com",
    },
  ];
};
export const getUserById = (id) => {
  const users = getUser(); // Lấy danh sách người dùng từ hàm getUser()
  return users.find((user) => user.id === parseInt(id)); // Tìm user có id khớp với id được truyền vào
};
