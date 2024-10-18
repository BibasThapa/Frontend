import React, { FC } from 'react';
import Image from 'next/image';
import avatarDefault from "@/public/assests/avatar.png"; // Corrected path
import { RiLockPasswordLine } from 'react-icons/ri';
import { useTheme } from 'next-themes';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';


type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: () => any;
};

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logOutHandler }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className='w-full'>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? (resolvedTheme === 'light' ? 'bg-gray-200' : 'dark:bg-slate-800') : 'bg-transparent'}`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar: avatarDefault}
          alt="User Avatar"
          width={30}
          height={30}
          className='w-[30px] h-[30px] rounded-full'
        />
        <h5 className='pl-2 hidden 800px:block font-Poppins dark:text-gray-100 text-black'>My Account</h5>
      </div>

      {/* Change Password Section */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? (resolvedTheme === 'light' ? 'bg-gray-200' : 'dark:bg-slate-800') : 'bg-transparent'}`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className='dark:text-white text-black' />
        <h5 className='pl-2 hidden 800px:block font-Poppins dark:text-gray-100 text-black'>Change Password</h5>
      </div>

      {/* Enrolled Courses Section */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? (resolvedTheme === 'light' ? 'bg-gray-200' : 'dark:bg-slate-800') : 'bg-transparent'}`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className='dark:text-white text-black' />
        <h5 className='pl-2 hidden 800px:block font-Poppins dark:text-gray-100 text-black'>Enrolled Courses</h5>
      </div>

      {/* Admin Dashboard Section */}
      {user?.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 6 ? (resolvedTheme === 'light' ? 'bg-gray-200' : 'dark:bg-slate-800') : 'bg-transparent'}`}
          href="/admin"
        >
          <MdOutlineAdminPanelSettings size={20} className='dark:text-white text-black' />
          <h5 className='pl-2 hidden 800px:block font-Poppins dark:text-gray-100 text-black'>Admin Dashboard</h5>
        </Link>
      )}

      {/* Log Out Section */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? (resolvedTheme === 'light' ? 'bg-gray-200' : 'dark:bg-slate-800') : 'bg-transparent'}`}
        onClick={logOutHandler}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className='pl-2 hidden 800px:block font-Poppins dark:text-gray-100 text-black'>Log Out</h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
