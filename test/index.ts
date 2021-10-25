import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { ExerciseRewards } from "../typechain";

describe('ExerciseRewards', () => {
  const payoutIncrement = ethers.utils.parseUnits('2', 'gwei');
  const initialContractValue = ethers.utils.parseUnits('10', 'gwei');
  const [approver, exerciser] = waffle.provider.getWallets();
  let ExerciseRewards;
  let exerciseRewards: ExerciseRewards;

  beforeEach(async () => {
    ExerciseRewards = await ethers.getContractFactory("ExerciseRewards");
    exerciseRewards = await ExerciseRewards.deploy();
  })

  it('should setup the contract', async () => {
    const setupContractTx = await exerciseRewards.setupContract(
      exerciser.address,
      approver.address,
      payoutIncrement,
      { value: initialContractValue }
    );
    await setupContractTx.wait();
    expect(await exerciseRewards.reward()).to.eq(initialContractValue);
  });

  it('should payout when approver says so', async () => {
    const exerciserInitialBalance = await ethers.provider.getBalance(exerciser.address);
    const setupContractTx = await exerciseRewards.setupContract(
      exerciser.address,
      approver.address,
      payoutIncrement,
      { value: initialContractValue }
    );
    await setupContractTx.wait();

    expect(await exerciseRewards.reward()).to.eq(initialContractValue);

    const payoutTx = await exerciseRewards.connect(approver).payout();
    await payoutTx.wait();

    expect(await exerciseRewards.reward()).to.eq(8000000000);
    
    const exerciserNewBalance = await ethers.provider.getBalance(exerciser.address)
    expect(exerciserNewBalance).to.eq(exerciserInitialBalance.add(payoutIncrement));
  });

  it('should not payout when there is no reward', async () => {
    const setupContractTx = await exerciseRewards.setupContract(
      exerciser.address,
      approver.address,
      initialContractValue,
      { value: initialContractValue }
    );
    await setupContractTx.wait();

    const payoutTx = await exerciseRewards.connect(approver).payout();

    await payoutTx.wait();

    expect(await exerciseRewards.reward()).to.eq(0);
  });

  it('should allow for deposits to increase the reward', async () => {
    const deposit = ethers.utils.parseUnits('2', 'gwei');

    const setupContractTx = await exerciseRewards.setupContract(
      exerciser.address,
      approver.address,
      payoutIncrement,
      { value: initialContractValue }
    );

    await setupContractTx.wait();

    const depositTx = await exerciseRewards.deposit({ value: deposit });

    await depositTx.wait();

    expect(await exerciseRewards.reward()).to.eq(12000000000);
  })

  it('should fail to set up contract when exerciser is also approver', async () => {
    try {
      const setupContractTx = await exerciseRewards.setupContract(
        exerciser.address,
        exerciser.address,
        payoutIncrement,
        { value: initialContractValue }
      );
      await setupContractTx.wait();
      expect(true).to.eq(false);
    } catch (e) {
      expect((e as Error).toString()).to.contains('Exerciser cannot also be the approver');
    }
  });

  it('should fail to set up contract when exerciser is already set', async () => {
    try {
      const setupContractTx = await exerciseRewards.setupContract(
        exerciser.address,
        approver.address,
        payoutIncrement,
        { value: initialContractValue }
      );
      await setupContractTx.wait();

      // Exerciser already set
      await exerciseRewards.setupContract(
        exerciser.address,
        approver.address,
        payoutIncrement,
        { value: initialContractValue }
      );
      expect(true).to.eq(false);
    } catch (e) {
      expect((e as Error).toString()).to.contains('exerciser is already set');
    }
  });

  it('should fail to set up contract when reward is less than 1', async () => {
    try {
      const setupContractTx = await exerciseRewards.setupContract(
        exerciser.address,
        approver.address,
        payoutIncrement,
        { value: 0 }
      );
      await setupContractTx.wait();

    } catch (e) {
      expect((e as Error).toString()).to.contains('msg.value must be greater than 0');
    }
  });

  it('should fail to set up contract when _payoutIncrement is less than 1', async () => {
    try {
      const setupContractTx = await exerciseRewards.setupContract(
        exerciser.address,
        approver.address,
        0,
        { value: initialContractValue }
      );
      await setupContractTx.wait();

    } catch (e) {
      expect((e as Error).toString()).to.contains('_payoutIncrement must be greater than 0');
    }
  });
});
