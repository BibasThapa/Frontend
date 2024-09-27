"use client";
import { ThemeSwitcher } from "@/utilis/ThemeSwitcher";
import React, { FC, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {};

const DashboardHeader: FC<Props> = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 right-0 w-auto p-4 z-50 bg-transparent dark:bg-black">
      <div className="flex items-center space-x-4">
        {/* ThemeSwitcher */}
        <div className="border border-gray-300 dark:border-gray-700 p-2 rounded-full">
          <ThemeSwitcher />
        </div>

        {/* Notification Bell */}
        <div
          className="relative cursor-pointer border border-gray-300 dark:border-gray-700 p-2 rounded-full"
          onClick={() => setOpen(!open)}
        >
          <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
          <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] text-[12px] flex items-center justify-center text-white">
            3
          </span>
        </div>
      </div>

      {/* Notification Dropdown */}
      {open && (
        <div className="absolute top-[60px] right-0 w-[350px] max-h-[50vh] bg-white dark:bg-black shadow-xl z-50 rounded overflow-auto border border-gray-300 dark:border-gray-700">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          <div className="dark:bg-[#1a1a1a] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">New Question Received</p>
              <p className="text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
              Notification details here
            </p>
            <p className="p-2 text-black dark:text-white text-[14px]">
              5 days ago
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
