import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { BiSearch } from 'react-icons/bi';

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col md:flex-row items-center bg-white dark:bg-black px-4 py-10 md:px-16 lg:px-24">
      
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://edmy-react.hibootstrap.com/images/banner/banner-img-1.png"
          alt="Hero Image"
          className="object-contain w-full max-w-[80%] md:max-w-[70%] lg:max-w-[60%] h-auto"
        />
      </div>

      
      <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 mt-8 md:mt-0">
        <h2 className="text-[24px] lg:text-[32px] font-Josefin font-bold dark:text-[#e0e0e0] text-[#111] leading-tight">
          Improve Your Online Learning Experience Better Instantly
        </h2>
        <p className="text-[16px] lg:text-[18px] font-medium dark:text-[#f5f5f5] text-[#333] mb-6">
          We have 40k+ Online courses & 500k+ Online registered students. Find your desired Courses from them.
        </p>

        {/* Search Input */}
        <div className="flex items-center w-full max-w-md mb-6">
          <input
            type="search"
            placeholder="Search Courses..."
            className="flex-grow bg-transparent border border-gray-300 dark:border-gray-600 rounded-[5px] p-3 outline-none dark:placeholder-[#f5f5f5] placeholder-[#333]"
          />
          <BiSearch className="ml-3 text-[#111] dark:text-[#fff]" />
        </div>

        
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="https://edmy-react.hibootstrap.com/images/banner/client-3.jpg"
            alt="Client Image 1"
            className="rounded-full w-12 h-12 lg:w-16 lg:h-16"
          />
          <img
            src="https://edmy-react.hibootstrap.com/images/banner/client-1.jpg"
            alt="Client Image 2"
            className="rounded-full w-12 h-12 lg:w-16 lg:h-16"
          />
          <img
            src="https://edmy-react.hibootstrap.com/images/banner/client-2.jpg"
            alt="Client Image 3"
            className="rounded-full w-12 h-12 lg:w-16 lg:h-16"
          />
        </div>

      
        <p className="text-[14px] lg:text-[16px] font-Josefin font-medium dark:text-[#f5f5f5] text-[#333]">
          500k+ People already trusted us.{' '}
          <Link href="/courses" className="text-[crimson] dark:text-[#4caf50]">
            View Courses
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Hero;
