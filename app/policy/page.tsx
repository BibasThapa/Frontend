'use client'
import React, { useState, useEffect } from 'react';
import Heading from '@/utilis/Heading';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Policy from './Policy';


type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");
  const [theme, setTheme] = useState('light-mode'); // Default to light mode

  // Example to toggle theme for demonstration purposes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light-mode' ? 'dark-mode' : 'light-mode'));
  };

  // Effect to apply the theme class to the body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={theme}>
      <Heading 
        title="Policy - Elearning"
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
      <Policy />
      <Footer />
      
    </div>
  );
}

export default Page;
