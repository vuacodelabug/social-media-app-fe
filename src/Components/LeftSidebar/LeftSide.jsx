import React, { useEffect, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import { getUser } from "../fake_api/users";

const LeftSide = ( ) =>{

    const [user, setUser] = useState(null);
    
      useEffect(() => {
        const data = getUser();
        const defaultUser = data.find((user) => user.id === 1);
        setUser(defaultUser);
      }, []);

    return (
        <div className="flex flex-col h-screen bg-white pb-4 bottom-2 rounded-r-xl shadow-lg m-4">
                    
        
                {/* Danh sách menu */}
                <ul className="space-y-4 text-gray-700">
                    <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                    🏠 <span>Trang chủ</span>
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                    👤 <span>Trang cá nhân</span>
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                    👥 <span>Bạn bè</span>
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                    🎥 <span>Video</span>
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                    ⚙️ <span>Cài đặt</span>
                    </li>
                </ul>
               

        </div>
    )
}
export default LeftSide;