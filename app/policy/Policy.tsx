'use client';
import React from 'react';
import Heading from '@/utilis/Heading';

const Policy = () => {
  return (
    <div
      style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}
      className="dark:bg-black bg-white dark:text-white text-black"
    >
      <Heading 
        title="E-Learning Platform Policy"
        description="Terms and Conditions for using our e-learning services"
        keywords="Policy, Terms of Service, Privacy Policy"
      />

      <h2>1. Introduction</h2>
      <p>
        Welcome to our e-learning platform! By accessing or using our services, you agree to comply with the following terms and conditions.
      </p>

      <h2>2. User Accounts</h2>
      <p>
        To access certain features of our platform, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      </p>

      <h2>3. Content Usage</h2>
      <p>
        All content provided on our platform is for educational purposes only. You may not reproduce, distribute, or create derivative works based on our content without prior written permission.
      </p>

      <h2>4. Privacy Policy</h2>
      <p>
        We value your privacy. Please review our <a href="/privacy-policy">Privacy Policy</a> to understand how we collect, use, and protect your information.
      </p>

      <h2>5. Code of Conduct</h2>
      <p>
        We expect all users to interact respectfully and constructively. Harassment, hate speech, or any form of discrimination will not be tolerated.
      </p>

      <h2>6. Changes to the Policy</h2>
      <p>
        We may update our policy from time to time. Any changes will be communicated to you through our platform. Your continued use of the service after any modifications signifies your acceptance of the updated terms.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions or concerns regarding our policy, please contact us at support@example.com.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        This policy is governed by the laws of [Your Country/State]. Any disputes will be resolved in the appropriate courts in [Your Jurisdiction].
      </p>
    </div>
  );
}

export default Policy;
