// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract UserRegistry {
    IERC20 public stakedToken;
    address public stakingContract;

    mapping(address => bool) public userRegistry;

    event UserRegistered(address indexed user);

    constructor(IERC20 _stakedToken, address _stakingContract) {
        stakedToken = _stakedToken;
        stakingContract = _stakingContract;
    }

    function isUserRegistered(address user) external view returns (bool) {
        return userRegistry[user];
    }

    function registerUser() external {
        require(!userRegistry[msg.sender], "User is already registered");

        uint256 amountToStake = 100 * 10**18; // Example amount to stake
        // Perform the token transfer and handle the error accordingly
        bool success = stakedToken.transferFrom(msg.sender, stakingContract, amountToStake);
        require(success, "Token transfer failed");

        // Update the user registry mapping
        userRegistry[msg.sender] = true;

        // Emit event
        emit UserRegistered(msg.sender);
    }
}
