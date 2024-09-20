// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {TokenVault} from "../src/TokenVault.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {TestUtils} from "../script/utils/TestUtils.sol";

contract TokenVaultTest is Test {
    TestUtils testUtils;

    TokenVault public tokenVault;

    address[] public tokenAddresses;

    address address1 = address(1);

    function setUp() public returns (TokenVault) {
        testUtils = new TestUtils();

        address[] memory testTokens = new address[](5);
        for (uint i = 0; i < 5; i++) {
            testTokens[i] = address(testUtils.returnErc20());
            tokenAddresses.push(testTokens[i]);
        }

        tokenVault = new TokenVault(testTokens);

        return tokenVault;
    }

    function test_Init() public view {
        assertEq(tokenVault.isTokenSupported(tokenAddresses[0]), true);
    }

    function test_Tokendeposit() public {
        IERC20 token = IERC20(tokenAddresses[0]);
        uint256 amount = 1 ether;
        vm.prank(address1);
        token.approve(address(tokenVault), amount);

        tokenVault.depositTokens(address1, address(token), amount, 1);

        assertEq(tokenVault.getDepositedToken(1, address(token)), 1 ether);
    }
}
