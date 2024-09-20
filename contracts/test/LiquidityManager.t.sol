// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {LiquidityManager} from "../src/LiquidityManager.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {TestUtils} from "../script/utils/TestUtils.sol";

contract LiquidityManagerTest is Test {
    TestUtils testUtils;

    LiquidityManager public liquidityManager;

    address[] public tokenAddresses;

    address address1 = address(1);

    function setUp() public returns (LiquidityManager) {
        testUtils = new TestUtils();

        address[] memory testTokens = new address[](5);
        for (uint i = 0; i < 5; i++) {
            testTokens[i] = address(testUtils.returnErc20());
            tokenAddresses.push(testTokens[i]);
        }

        liquidityManager = new LiquidityManager(testTokens);

        return liquidityManager;
    }

    function test_Init() public view {
        assertEq(liquidityManager.isTokenSupported(tokenAddresses[0]), true);
    }

    function test_Tokendeposit() public {
        IERC20 token = IERC20(tokenAddresses[0]);
        uint256 amount = 1 ether;
        vm.prank(address1);
        token.approve(address(liquidityManager), amount);

        liquidityManager.depositTokens(address1, address(token), amount, 1);

        assertEq(
            liquidityManager.getDepositedToken(1, address(token)),
            1 ether
        );
    }
}
