// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Orderbook} from "../src/Orderbook.sol";
import {MockERC20} from "../src/mocks/MockERC20.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {TestUtils} from "../script/utils/TestUtils.sol";

contract OrderbookTest is Test {
    Orderbook public orderbook;
    MockERC20 inToken;
    MockERC20 outToken;
    TestUtils testUtils;

    function setUp() public {
        testUtils = new TestUtils();
        orderbook = new Orderbook();

        inToken = testUtils.returnErc20();
        outToken = testUtils.returnErc20();
    }

    function test_PlaceMarketOrder() public {
        orderbook.placeMarketOrder(
            address(inToken),
            address(outToken),
            1 ether
        );

        assertEq(orderbook.getMarketOrderById(1).orderId, 1);
        assertEq(orderbook.getMarketOrderById(1).amountIn, 1 ether);
        assertEq(orderbook.getMarketOrderById(1).inToken, address(inToken));
        assertEq(orderbook.getMarketOrderById(1).outToken, address(outToken));
    }
}
