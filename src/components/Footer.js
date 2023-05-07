import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center space-y-4">
      <div className="flex justify-center space-x-4">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="hover:text-blue-500" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="hover:text-blue-400" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-pink-500" />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} My NFT Minting DApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
