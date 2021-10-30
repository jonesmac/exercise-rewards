import { useMetamask } from 'use-metamask';
import { ethers } from "ethers";

const ConnectWallet = () => {
  const { connect } = useMetamask();

  const handleChange = () => {
    (async () => {
      try {
        await connect(ethers.providers.Web3Provider);
      } catch (error) {
        console.log(error);
      }
    })();
  }
  return (
    <button onClick={handleChange}>Connect Wallet</button>
  )
}

export default ConnectWallet;