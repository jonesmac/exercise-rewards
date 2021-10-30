import { useReducer, useContext, createContext, ReactNode } from 'react';
import builtContract from './8c1cd5eab28bc7cb0ae97fe45a71017d.json';

export enum ActionTypes {
  CONNECT = 'connect'
}
type Action = { type: ActionTypes, payload: any };
type Dispatch = (action: Action) => void;
type State = {
  abi: string;
};
type ContractProviderProps = { children: ReactNode };

const ContractStateContext = createContext<State | undefined>(undefined);
const ContractDispatchContext = createContext<Dispatch | undefined>(undefined);

const contractReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.CONNECT: {
      // TODO - interact with ABI
      return {
        ...state
      }
    }
    default: {
      return state;
    }
  }
};

const ContractProvider = ({ children }: ContractProviderProps) => {
  const { abi } = (builtContract as any).output.contracts['contracts/ExerciseRewards.sol'].ExerciseRewards;
  const [state, dispatch] = useReducer(contractReducer, { abi });

  return (
    <ContractStateContext.Provider value={state}>
      <ContractDispatchContext.Provider value={dispatch}>{children}</ContractDispatchContext.Provider>
    </ContractStateContext.Provider>
  );
};

const useContractState = () => {
  const context = useContext(ContractStateContext);
  if (context === undefined) {
    throw new Error('useContractState must be used within a ContractProvider');
  }
  return context;
};

const useContractDispatch = () => {
  const context = useContext(ContractDispatchContext);
  if (context === undefined) {
    throw new Error('useContractDispatch must be used within a ContractProvider');
  }
  return context;
};

export { ContractProvider, useContractState, useContractDispatch };
