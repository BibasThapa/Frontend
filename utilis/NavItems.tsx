"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export const NavItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <div className="flex items-center space-x-6">
        {NavItemsData.map((item, index) => (
          <Link key={index} href={item.url} passHref>
            <span
              className={`px-6 py-2 text-[18px] font-Poppins font-[400] transition-all duration-300 cursor-pointer ${
                resolvedTheme === "light" ? "text-black" : "text-white"
              } ${activeItem === index ? "text-crimson" : ""}`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            {NavItemsData.map((i, index) => (
              <Link href={i.url} key={index} passHref>
                <span
                  className={`block py-5 text-[18px] px-6 font-Poppins font-[400] transition-all duration-300 ${
                    resolvedTheme === "light" ? "text-black" : "text-white"
                  } ${activeItem === index ? "text-crimson" : ""}`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
