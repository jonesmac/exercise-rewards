//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract ExerciseRewards {
    string public constant name = "ExerciseRewards";
    string public constant symbol = "ERWD";
    uint8 public constant decimals = 18;

    address payable private exerciser;
    address private approver;
    uint256 private payoutIncrement;
    uint256 public reward;

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint amount);
    event RewardStatus(bool indexed completeStatus, address indexed contractAddress,  uint256 indexed balance);

    constructor(address _exerciser, address _approver, uint256 _payoutIncrement) payable {
        require(msg.value > 0, "msg.value must be greater than 0");
        exerciser = payable(_exerciser);
        approver = _approver;
        payoutIncrement = _payoutIncrement;
        reward = msg.value;
    }

    function payout() public returns (uint256) {
        require(msg.sender == approver, "sender is not approver");
        if (reward > payoutIncrement) {
            exerciser.transfer(payoutIncrement);
            reward = reward - payoutIncrement;
            emit Transfer(address(this), exerciser, address(this).balance);
            return (reward);
        } else {
            exerciser.transfer(reward);
            emit Transfer(address(this), exerciser, address(this).balance);
            emit RewardStatus(true, address(this), address(this).balance);
            return (reward);
        }
    }
}
