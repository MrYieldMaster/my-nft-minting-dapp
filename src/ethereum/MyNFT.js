import Web3 from "web3";
import MyNFT_ABI from "../contracts/MyNFT.json";

const getMyNFT = (web3) => {
  const address = "0xC375b83eCBA7Fa375F1af1d4dD21761F14683D62"; 
  const contract = new web3.eth.Contract(MyNFT_ABI.abi, address);
  if (contract) {
    console.log("Contract is loaded");
  } else {
    console.log("Contract is not loaded");
  }
  return contract;
};

export default getMyNFT;

