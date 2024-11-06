// pages/about.tsx
import Footer from '@/components/Footer';
import React from 'react';
import { styles } from '../styles/style';


const About= () => {
  return (
    <div className='dark:text-white text-black'>
        <br />
      <div className={styles.title}>
        <h1>About Us</h1>
        <p>
          Welcome to our e-learning platform, where we empower learners to achieve their
          educational goals through engaging and interactive courses.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide accessible, high-quality education to everyone, everywhere. 
          We believe that learning should be a lifelong journey, and we aim to support 
          learners of all ages and backgrounds.
        </p>
        <h2>What We Offer</h2>
        <ul>
          <li>Comprehensive courses on a variety of topics</li>
          <li>Interactive quizzes and assessments to reinforce learning</li>
          <li>Access to a community of learners and educators</li>
          <li>Flexible learning schedules to fit your lifestyle</li>
        </ul>
        <h2>Join Us</h2>
        <p>
          Whether you're looking to upskill, change careers, or pursue a passion, our platform 
          is here to help you succeed. Join us on this learning journey!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
