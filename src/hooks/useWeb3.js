import { useState, useEffect } from "react";
import getWeb3 from "../ethereum/getWeb3";

const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');

  useEffect(() => {
    const connectWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Failed to load web3:", error);
      }
    };
    connectWeb3();
  }, []);

  return { web3, account, setAccount };
};

export default useWeb3;


