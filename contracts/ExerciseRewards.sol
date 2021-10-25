//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract ExerciseRewards {
    string public constant name = "ExerciseRewards";

    address payable private exerciser;
    address private approver;
    uint256 private payoutIncrement;
    uint256 public reward;

    event Transfer(address indexed from, address indexed to, uint amount);
    event RewardStatus(bool indexed completeStatus, address indexed contractAddress,  uint256 indexed balance);

    function setupContract(address _exerciser, address _approver, uint256 _payoutIncrement) public payable returns (bool) {
        require(exerciser == address(0), "exerciser is already set");
        require(approver == address(0), "approver is already set");
        require(_exerciser != _approver, "Exerciser cannot also be the approver");
        require(msg.value > 0, "msg.value must be greater than 0");
        require(_payoutIncrement > 0, "_payoutIncrement must be greater than 0");
        exerciser = payable(_exerciser);
        approver = _approver;
        reward = msg.value;
        payoutIncrement = _payoutIncrement;
        return true;
    }

    function payout() public returns (uint256) {
        require(msg.sender == approver, "sender is not approver");
        require(reward > 0, "cannot payout because there is no reward available");
        if (reward > payoutIncrement) {
            exerciser.transfer(payoutIncrement);
            reward = reward - payoutIncrement;
            emit Transfer(address(this), exerciser, address(this).balance);
            return (reward);
        } else {
            exerciser.transfer(reward);
            reward = 0;
            emit Transfer(address(this), exerciser, address(this).balance);
            emit RewardStatus(true, address(this), address(this).balance);
            return (reward);
        }
    }

    function deposit() public payable returns (uint256) {
        require(msg.value > 0, "deposits must be greater than 0");
        reward = reward + msg.value;
        return reward;
    }
}
