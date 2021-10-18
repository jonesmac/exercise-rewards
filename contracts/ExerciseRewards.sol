//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

// interface IERC20 {

//     function totalSupply() external view returns (uint256);
//     function balanceOf(address account) external view returns (uint256);
//     function allowance(address owner, address spender) external view returns (uint256);

//     function transfer(address recipient, uint256 amount) external returns (bool);
//     function approve(address spender, uint256 amount) external returns (bool);
//     function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


//     event Transfer(address indexed from, address indexed to, uint256 value);
//     event Approval(address indexed owner, address indexed spender, uint256 value);
// }

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

    // using SafeMath for uint256;


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

// library SafeMath {
//     function sub(uint256 a, uint256 b) internal pure returns (uint256) {
//       assert(b <= a);
//       return a - b;
//     }

//     function add(uint256 a, uint256 b) internal pure returns (uint256) {
//       uint256 c = a + b;
//       assert(c >= a);
//       return c;
//     }
// }

