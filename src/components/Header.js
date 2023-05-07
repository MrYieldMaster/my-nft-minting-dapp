import React from 'react';
import { FiUser } from 'react-icons/fi';
import { ImTelegram } from 'react-icons/im';
import useWeb3 from '../hooks/useWeb3';
import logo from '../assets/images/TGLogo.gif'; // Import your logo image file here

const Header = () => {
  const { web3, account, connectWeb3 } = useWeb3(); 

  const handleConnectWallet = async () => {
    if (!web3 && !account) {
      connectWeb3();
    }
  };

  const telegramGroup = "https://t.me/butanechain";

  return ( 
  <header className="bg-indigo-500 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-14 w-auto" /> {/* Adjust the height here */}
          <div className="text-white font-semibold text-lg ml-4">
            Butane
          </div>
        </div>
        <div className="space-x-6 flex items-center">
          <button
            onClick={handleConnectWallet}
            className="flex items-center space-x-2 text-white font-semibold px-6 py-2 rounded-md border-2 border-white hover:bg-white hover:text-indigo-500"
            disabled={!!web3 || !!account}
          >
            <FiUser />
            <span>Connect Wallet</span>
          </button>
          <a
            href={telegramGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-300"
          >
            <ImTelegram size="2.5em" /> {/* Increase the icon size */}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;



