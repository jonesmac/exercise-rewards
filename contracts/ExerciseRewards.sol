//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ExerciseRewards {
    address payable private exerciser;
    address private approver;
    int256 private payoutIncrement;

    constructor(
        address memory _exerciser,
        address memory _approver,
        uint256 memory _payoutIncrement
    ) {
        console.log("Deploying a ExerciseRewards");
        exerciser = _exerciser;
        approver = _approver;
        reward = msg.value;
        payoutIncrement = _payoutIncrement;
    }

    function payout() public view returns (boolean memory) {
        require(msg.sender == approver, "sender is not approver");
        if (address(this).balance > payoutIncrement) {
            exerciser.transfer(payoutIncrement);
        } else {
            exerciser.transfer(address(this).balance);
        }
    }
}
