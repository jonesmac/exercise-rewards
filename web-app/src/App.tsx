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
          await connect(ethers.providers.Web3Provider);
          console.log('Connection Accepted');
          console.log(metaState);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [connect, metaState.isConnected, metaState]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Exercise Rewards</h1>
        <form id="setup_contract">
          <div className="form-group">
            <p>
              <label htmlFor="Sender Address">Reward Total (in ETH)</label><br />
              <input width="100%" type="string" className="form-control" id="fromAddress" aria-describedby="fromAddressHelp"
                placeholder="Enter your amount" required={true} />
            </p>
            <p>
              <label htmlFor="Exerciser Address">Exerciser Address</label><br />
              <input width="100%" value="" type="string" className="form-control" id="exerciserAddress" aria-describedby="fromAddressHelp"
                placeholder="Enter your amount" required={true} />
            </p>
            <p>
              <label htmlFor="Approver Address">Approver Address</label><br />
              <input width="100%" value="" type="string" className="form-control" id="approverAddress" aria-describedby="fromAddressHelp"
                placeholder="Enter your amount" required={true} />
            </p>
            <p>
              <label htmlFor="Payout Amount">Payout Amount (in ETH)</label><br />
              <input width="100%" value="" type="string" className="form-control" id="payoutAmount" aria-describedby="fromAddressHelp"
                placeholder="Enter your amount" required={true} />
            </p>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
