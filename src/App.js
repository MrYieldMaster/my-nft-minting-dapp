import { useState, useEffect } from "react";
import useWeb3 from "./hooks/useWeb3";
import useMyNFT from "./hooks/useMyNFT";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const { web3, account } = useWeb3();
  const contract = useMyNFT(web3);
  const [tokenURI, setTokenURI] = useState("");
  const [mintingPrice, setMintingPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMintingPrice = async () => {
      if (web3 && account && contract) {
        try {
          const price = await contract.methods.getMintingPrice().call();
          setMintingPrice(web3.utils.fromWei(price));
        } catch (error) {
          console.error("Failed to fetch minting price:", error);
          setError("Failed to fetch minting price. Please try again later.");
        }
      }
    };
    fetchMintingPrice();
  }, [web3, account, contract]);

  const mintNFT = async () => {
    setIsLoading(true);
    setError(null);

    if (!account) {
        setError("Please connect to MetaMask.");
        setIsLoading(false);
        return;
    }

    if (!tokenURI) {
        setError("Token URI must be set.");
        setIsLoading(false);
        return;
    }

    if (!mintingPrice) {
        setError("Minting price not found.");
        setIsLoading(false);
        return;
    }

    try {
        const tx = await contract.methods.mintNFT(account).send({ from: account, value: web3.utils.toWei(mintingPrice, "ether") });
        console.log(tx);
        alert("NFT successfully minted!");
    } catch (error) {
        console.error("Minting failed:", error);
        setError(`NFT minting failed. ${error.message}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col justify-between">
      <Header />
  
      <main className="py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="block pl-2 font-semibold text-xl text-gray-700">
                  <h2 className="leading-relaxed">Mint your NFT</h2>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Token URI:</label>
                    <input
                      type="text"
                      id="tokenURI"
                      value={tokenURI}
                      onChange={(e) => setTokenURI(e.target.value)}
                      className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 px-4 py-2 rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Minting Price:</label>
                    <span className="text-gray-700">{mintingPrice ? `${mintingPrice} BNB` : 'Loading...'}</span>
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button
                    onClick={mintNFT}
                    className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none bg-indigo-500 hover:bg-indigo-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Minting....." : "Mint NFT"}
                  </button>

                  {error && <p className="text-red-500">{error}</p>}


                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <Footer />
    </div>
  );
}



export default App;

