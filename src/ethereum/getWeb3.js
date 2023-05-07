import Web3 from "web3";

const getWeb3 = async () => {
  if (window.ethereum) { // Check for modern DApp browser
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Instantiate Web3 instance with ethereum provider
      const web3 = new Web3(window.ethereum);

      // Resolve the promise with Web3 instance
      return Promise.resolve(web3);

    } catch (error) {
      // Handle errors related to user account access or MetaMask disconnection
      return Promise.reject(error);
    }

  } else if (window.web3) { // Check for legacy DApp browser
    // Instantiate Web3 instance with current provider
    const web3 = new Web3(window.web3.currentProvider);

    // Check if the browser is a compatible MetaMask instance
    if (window.web3.currentProvider.isMetaMask) {
      // Resolve the promise with Web3 instance
      return Promise.resolve(web3);
      
    } else {
      // Reject the promise with an error message
      return Promise.reject(new Error("Injected web3 instance is not MetaMask"));
    }

  } else { // Non-DApp browser
    // Reject the promise with an error message
    return Promise.reject(new Error("Must install MetaMask extension"));
  }
}

export default getWeb3;
