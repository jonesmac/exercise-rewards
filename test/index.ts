import { Wallet } from "@ethersproject/wallet";
import { expect } from "chai";
import { MockProvider } from "ethereum-waffle";
import { ethers, waffle } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe.only('ExerciseRewards', () => {
  const payoutIncrement =  ethers.utils.parseUnits('2', 'gwei');
  const initialContractValue = ethers.utils.parseUnits('10', 'gwei');
  const [approver, exerciser] = waffle.provider.getWallets();
  
  it('should payout when approver says so', async () => {
    const ExerciseRewards = await ethers.getContractFactory("ExerciseRewards");
    const exerciseRewards = await ExerciseRewards.deploy(
      exerciser.address,
      approver.address,
      payoutIncrement,
      { value: initialContractValue }
    );

    expect(await exerciseRewards.reward()).to.eq(initialContractValue);

    const payoutTx = await exerciseRewards.connect(approver).payout();

    // wait until the transaction is mined
    await payoutTx.wait();

    expect(await exerciseRewards.reward()).to.eq(8000000000);
  })
})