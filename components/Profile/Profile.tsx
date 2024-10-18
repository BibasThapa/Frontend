"use client";
import React, { FC, useState, useEffect } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

type User = {
  avatar?: string;
  name: string;
  email: string;
};

type Props = {
  user: User;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, { skip: !logout });
  const [active, setActive] = useState(1);


  const logOutHandler = async () => {
    signOut();
    await setLogout(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="w-[85%] flex mx-auto">
        <div
          className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-black bg-white bg-opacity-90 border dark:border-[#ffffff16] border-[#00000014] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${
            scroll ? "top-[120px]" : "top-[30px]"
          } left-[30px]`}
        >
          <SideBarProfile
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
            logOutHandler={logOutHandler}
          />
        </div>
        <div
          className="w-full h-full bg-transparent mt-[80px]"
        >
          {active === 1 && <ProfileInfo avatar={avatar} user={user} />}
          {active === 2 && <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
