import { useMetamask } from 'use-metamask';
import './App.css';
import ConnectWallet from './components/ConnectWallet';
import ContractForm from './components/ContractForm';
import CurrentConnection from './components/CurrentConnection';
import { ContractProvider } from './components/_context/contract';
import { useValidateEnvs } from './components/_hooks/useValidateEnvs';

const App = () => {
  // Before anything else
  useValidateEnvs();

  const { metaState } = useMetamask();

  return (
    <ContractProvider>
      <div className="App">
        <header className="App-header">
          <h1>Exercise Rewards</h1>
          {metaState.isConnected === false ? <ConnectWallet /> : <CurrentConnection />}
          {metaState.isConnected && <ContractForm />}
        </header>
      </div>
    </ContractProvider>
  );
}

export default App;
