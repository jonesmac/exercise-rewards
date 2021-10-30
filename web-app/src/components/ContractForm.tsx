import { BigNumberish, ethers } from "ethers";
import { useState, FormEvent } from "react";

interface ContractFormState {
  rewardTotal: string;
  readonly exerciserAddress: string;
  readonly approverAddress: string;
  payoutIncrement: string;
}

interface ContractPayload extends Omit<ContractFormState, 'rewardTotal' | 'payoutIncrement'> {
  rewardTotal: BigNumberish;
  payoutIncrement: BigNumberish;
}

const ContractForm = () => {
  const [contractFormState, setContractFormState] = useState<ContractFormState>({
    rewardTotal: '',
    exerciserAddress: '',
    approverAddress: '',
    payoutIncrement: ''
  });

  const handleInputChange = (event: { target: any; }) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setContractFormState({
      ...contractFormState,
      ...{
        [name]: value
      }
    });
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { rewardTotal, payoutIncrement } = contractFormState;
    const contractPayload: ContractPayload = {
      ...contractFormState,
      ...{ 
        rewardTotal: ethers.utils.parseUnits(rewardTotal, 'gwei'),
        payoutIncrement: ethers.utils.parseUnits(payoutIncrement, 'gwei')
      }
    };
    console.log(contractPayload);
  }

  return (
    <form id="setup_contract" onSubmit={onSubmit}>
      <div className="form-group">
        <p>
          <label htmlFor="Sender Address">Reward Total for Exercising (in ETH)</label><br />
          <input name="rewardTotal" type="string" className="form-control" id="reward-total" aria-describedby="fromAddressHelp"
            placeholder="Enter your amount" onChange={handleInputChange} />
        </p>
        <p>
          <label htmlFor="Exerciser Address">Exerciser Address</label><br />
          <input name="exerciserAddress" defaultValue="" type="string" className="form-control" id="exerciserAddress" aria-describedby="fromAddressHelp"
            placeholder="Enter your address" onChange={handleInputChange} />
        </p>
        <p>
          <label htmlFor="Approver Address">Approver Address</label><br />
          <input name="approverAddress" defaultValue="" type="string" className="form-control" id="approverAddress" aria-describedby="toAddressHelp"
            placeholder="Enter your address" onChange={handleInputChange} />
        </p>
        <p>
          <label htmlFor="Payout Amount">Payout Increment Amount (in ETH)</label><br />
          <input name="payoutIncrement" defaultValue="" type="string" className="form-control" id="payoutAmount" aria-describedby="payoutIncrementHelp"
            placeholder="Enter your amount" onChange={handleInputChange} />
        </p>
      </div>
      <button type="submit">Create Contract</button>
    </form>
  )
}

export default ContractForm;
