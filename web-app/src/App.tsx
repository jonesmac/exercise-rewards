import { useMetamask } from 'use-metamask';
import './App.css';
import ConnectWallet from './components/ConnectWallet';
import ContractForm from './components/ContractForm';
import CurrentConnection from './components/CurrentConnection';

const App = () => {
  const { metaState } = useMetamask();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Exercise Rewards</h1>
        {metaState.isConnected === false ? <ConnectWallet /> : <CurrentConnection />}
        {metaState.isConnected && <ContractForm />}
      </header>
    </div>
  );
}

export default App;
