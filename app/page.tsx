'use client'
import React, { FC, useState } from 'react';
import Heading from "../utilis/Heading";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Courses from "@/components/Route/Courses";
import Reviews from "@/components/Route/Reviews";
import Footer from "@/components/Footer";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div className="min-h-screen bg-white dark:bg-black"> {/* Full screen with dark mode background */}
      <Heading 
        title="ELearning"
        description="Elearning is a platform for students to learn"
        keywords="Programming"
      />
      <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Courses />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Page;
