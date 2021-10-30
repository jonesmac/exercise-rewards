import { useReducer, useContext, createContext, ReactNode } from 'react';
import { abi, bytecode } from '../../external/ExerciseRewards.json';

export enum ActionTypes {
  CONNECT = 'connect'
}
type Action = { type: ActionTypes, payload: any };
type Dispatch = (action: Action) => void;
type State = {
  deployment: {
    abi: any;
    bytecode: string;
  }
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
  console.log(abi, bytecode);
  const [state, dispatch] = useReducer(contractReducer, { deployment: { abi, bytecode } });

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
