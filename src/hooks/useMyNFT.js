import { useState, useEffect } from 'react';
import getMyNFT from '../ethereum/MyNFT';

const useMyNFT = (web3) => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (web3) {
      const loadMyNFT = async () => {
        const myNFT = await getMyNFT(web3);
        setContract(myNFT);
      };
      loadMyNFT();
    }
  }, [web3]);

  return contract;
};

export default useMyNFT;
