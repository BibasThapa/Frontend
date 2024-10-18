'use client'
import Courses from '@/components/Route/Courses'
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import Protected from '../hooks/useProtected';
import Heading from '@/utilis/Heading';
import Header from '@/components/Header';

const page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
            <Heading 
        title="Courses"
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
     <div className='pt-10'>
     <Courses/>
     </div>
    </div>
  )
}

export default page
