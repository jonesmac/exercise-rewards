import { useMetamask } from 'use-metamask';
import './App.css';
import ConnectWallet from './components/ConnectWallet';

const App = () => {
  const { metaState } = useMetamask();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Exercise Rewards</h1>
        {metaState.isConnected === false && <ConnectWallet />}
        {metaState.isConnected && (
          <form id="setup_contract">
            <div className="form-group">
              <p>
                <label htmlFor="Sender Address">Reward Total (in ETH)</label><br />
                <input width="100%" type="string" className="form-control" id="fromAddress" aria-describedby="fromAddressHelp"
                  placeholder="Enter your amount" required />
              </p>
              <p>
                <label htmlFor="Exerciser Address">Exerciser Address</label><br />
                <input width="100%" defaultValue="" type="string" className="form-control" id="exerciserAddress" aria-describedby="fromAddressHelp"
                  placeholder="Enter your amount" required />
              </p>
              <p>
                <label htmlFor="Approver Address">Approver Address</label><br />
                <input width="100%" defaultValue="" type="string" className="form-control" id="approverAddress" aria-describedby="fromAddressHelp"
                  placeholder="Enter your amount" required />
              </p>
              <p>
                <label htmlFor="Payout Amount">Payout Amount (in ETH)</label><br />
                <input width="100%" defaultValue="" type="string" className="form-control" id="payoutAmount" aria-describedby="fromAddressHelp"
                  placeholder="Enter your amount" required />
              </p>
            </div>
          </form>
        )}
      </header>
    </div>
  );
}

export default App;
