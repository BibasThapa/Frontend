import React, { FC } from 'react';
import Image from 'next/image';
import avatarDefault from "@/public/assests/avatar.png";
import { RiLockPasswordLine } from 'react-icons/ri';
import { useTheme } from 'next-themes';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';

// Define the User type
type User = {
  avatar?: string;
  name: string;
  email: string;
  role?: string; // Added role type
};

// Define the Props type
type Props = {
  user?: User;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: () => void;
};

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logOutHandler }) => {
  const { resolvedTheme } = useTheme(); // Get the current theme (light or dark)

  return (
    <div className='w-full'>
      {/* My Account Section */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1
            ? resolvedTheme === 'light'
              ? 'bg-gray-200'
              : 'dark:bg-slate-800'
            : 'bg-transparent'
          }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user?.avatar || avatar || avatarDefault}
          alt="User Avatar"
          width={30}   
          height={30} 
          className='w-[30px] h-[30px] cursor-pointer rounded-full'
        />
        <h5 className='pl-2 800px:block hidden font-Poppins dark:text-gray-100 text-black'>
          My Account
        </h5>
      </div>

      {/* Change Password Section */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2
            ? resolvedTheme === 'light'
              ? 'bg-gray-200'
              : 'dark:bg-slate-800'
            : 'bg-transparent'
          }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine
          size={20}
          className='dark:text-white text-black' />
        <h5 className='pl-2 800px:block hidden font-Poppins dark:text-gray-100 text-black'>
          Change Password
        </h5>
      </div>

      {/* Enrolled Courses Section */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3
            ? resolvedTheme === 'light'
              ? 'bg-gray-200'
              : 'dark:bg-slate-800'
            : 'bg-transparent'
          }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera
          size={20}
          className='dark:text-white text-black'
        />
        <h5 className='pl-2 800px:block hidden font-Poppins dark:text-gray-100 text-black'>
          Enrolled Courses
        </h5>
      </div>

      {/* Admin Dashboard Section (visible only for admin) */}
      {user?.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 6
              ? resolvedTheme === 'light'
                ? 'bg-gray-200'
                : 'dark:bg-slate-800'
              : 'bg-transparent'
            }`}
          href={"/admin"}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className='dark:text-white text-black'
          />
          <h5 className='pl-2 800px:block hidden font-Poppins dark:text-gray-100 text-black'>
            Admin Dashboard
          </h5>
        </Link>
      )}

      {/* Log Out Section */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4
            ? resolvedTheme === 'light'
              ? 'bg-gray-200'
              : 'dark:bg-slate-800'
            : 'bg-transparent'
          }`}
        onClick={logOutHandler}
      >
        <AiOutlineLogout
          size={20}
          className="dark:text-white text-black"
        />
        <h5 className='pl-2 800px:block hidden font-Poppins dark:text-gray-100 text-black'>
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
