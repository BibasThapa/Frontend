"use client";

import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import NavItems from "../utilis/NavItems";
import { ThemeSwitcher } from "../utilis/ThemeSwitcher";
import { useTheme } from "next-themes";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utilis/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "@/public/assests/avatar.png";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ open, setOpen, activeItem, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {data:userData, isLoading, refetch} = useLoadUserQuery(undefined,{})
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const { resolvedTheme } = useTheme();
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, { skip: !logout ? true : false });

  useEffect(() => {
    if(!isLoading){
    if (!userData) {
      if (data) {
        socialAuth({ email: data?.user?.email, name: data?.user?.name, avatar: data.user?.image });
        refetch()
      }
      }
      if (data !== null){
         if(isSuccess) {
        toast.success("Login Successfully");
      }
    }
      if (data === null && !isLoading && !userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80); // Add background shadow after 80px of scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseSidebar = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative z-[50]">
      <div
        className={`fixed top-0 left-0 w-full h-[80px] z-[80] border-b shadow-xl transition duration-500 ${
          active ? "bg-opacity-90" : "bg-opacity-100"
        } ${
          resolvedTheme === "light" ? "bg-white border-black" : "bg-black border-white"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            {/* Logo */}
            <Link
              href="/"
              className={`text-[25px] font-Poppins font-semibold ${
                resolvedTheme === "light" ? "text-black" : "text-white"
              }`}
            >
              E-Learning
            </Link>

            {/* Desktop Navigation and Icons */}
            <div className="hidden 800px:flex items-center space-x-6">
              <NavItems activeItem={activeItem} isMobile={false} />
              <div className="relative flex items-center space-x-4">
                <ThemeSwitcher />
                {userData ? (
                  <Link href="/profile">
                    <Image
                      src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                      alt="User Avatar"
                      className="w-[30px] h-[30px] rounded-full cursor-pointer"
                      width={30}
                      height={30}
                    />
                  </Link>
                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className="cursor-pointer dark:text-white text-black"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>
            </div>

            {/* Mobile Menu Icon */}
            <div className="800px:hidden flex items-center space-x-4">
              <HiOutlineMenuAlt3
                size={25}
                className="cursor-pointer dark:text-white text-black"
                onClick={() => setOpenSidebar(true)}
              />
              {userData ? (
                <Link href="/profile">
                  <Image
                    src={userData?.user.avatar ?userData.user.avatar.url : avatar}
                    alt="User Avatar"
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                    width={30}
                    height={30}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] bg-[#000000e6] dark:bg-[#000000] dark:bg-opacity-100" // Full black background in moon mode
            onClick={handleCloseSidebar}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-black dark:bg-opacity-100 top-0 right-0 flex flex-col p-4">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer dark:text-white text-black mt-4"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        )}
      </div>

      {route === "Login" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          refetch={refetch}
        />
      )}
      {route === "Sign-Up" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}
      {route === "Verification" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}

      <div className="pt-[80px]"></div>
    </div>
  );
};

export default Header;
