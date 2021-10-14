import { useEffect } from 'react';
import { useMetamask } from 'use-metamask';
import { ethers } from "ethers";
import './App.css';

const App = () => {
  const { connect, metaState } = useMetamask();
  
  // instead of calling it from useEffect, you can also call connect method from button click handler
  useEffect(() => {
    if (!metaState.isConnected) {
      (async () => {
        try {
          // const provider = new ethers.providers.Web3Provider(window.ethereum);
          await connect(ethers.providers.Web3Provider);
          console.log('Connection Accepted');
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [connect, metaState.isConnected]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Exercise Rewards</h1>
      </header>
    </div>
  );
}

export default App;
