'use client'
import React, { FC, useState } from 'react';
import Heading from '@/utilis/Heading';
import Header from '@/components/Header';

const page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
            <Heading 
        title="About"
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
    </div>
  )
}

export default page
