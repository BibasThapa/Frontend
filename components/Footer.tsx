import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className=" bg-[#002d62] dark:bg-black"> {/* Ensure full-screen background and dark mode */}
      <div className="border border-[#00000006] dark:border-[#ffffff1e]" />
      <br />
      <div className='w-[95%] 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8'>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className='text-[20px] font-[600] text-white dark:text-white'>About</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className='text-base text-white dark:text-gray-300 dark:hover:text-white'>Our story</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-base text-white dark:text-gray-300 dark:hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/faq" className="text-base text-white dark:text-gray-300 dark:hover:text-white">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h3 className='text-[20px] font-[600] text-white dark:text-white'>Quick Links</h3>
            <ul className='space-y-4'>
              <li>
                <Link href="/courses" className="text-base text-white dark:text-gray-300 dark:hover:text-white">Courses</Link>
              </li>
              <li>
                <Link href="/profile" className="text-base text-white
                 dark:text-gray-300 dark:hover:text-white">My Account</Link>
              </li>
              <li>
                <Link href="/course-dashboard" className="text-base text-white
                 dark:text-gray-300 dark:hover:text-white">Course Dashboard</Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h3 className='text-[20px] font-[600] text-white
             dark:text-white'>Social Links</h3>
            <ul className='space-y-4'>
              <li>
                <Link href="/courses" className="text-base text-white
                 dark:text-gray-300 dark:hover:text-white">Facebook</Link>
              </li>
              <li>
                <Link href="/profile" className="text-base text-white
                 dark:text-gray-300 dark:hover:text-white">Instagram</Link>
              </li>
              <li>
                <Link href="/course-dashboard" className="text-base text-white
                 dark:text-gray-300 dark:hover:text-white">Github</Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h3 className='text-[20px] font-[600] text-white
             dark:text-white'>Contact Info</h3>
            <p className="text-base text-white
             dark:text-gray-300 dark:hover:text-white pb-2">Call us: 975463723</p>
            <p className="text-base text-white
             dark:text-gray-300 dark:hover:text-white pb-2">Address: Thankot Chandaragiri near Tribhuvan Park</p>
            <p className="text-base text-white
             dark:text-gray-300 dark:hover:text-white pb-2">Mail us: ross@gmail.com</p>
          </div>
        </div>
        <br />
        <hr />
        <p className="text-center text-white
         dark:text-white">Copyright 2023 Ross Gopali | All Rights Reserved</p>
      </div>
      <br />
    </footer>
  )
}

export default Footer
