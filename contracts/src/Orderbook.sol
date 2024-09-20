// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Order} from "./utils/Types.sol";
import {console} from "forge-std/console.sol";

// --------- Errors ---------

contract Orderbook {
    // --------- State ---------

    uint256 public totalOrders = 1;

    // orderId -> orders
    mapping(uint256 => Order) private orders;

    constructor() {}

    // --------- Events ---------
    event Orderbook__MarketOrderPlaced(
        uint256 orderId,
        uint256 amountIn,
        uint256 inPrice,
        address traderAddress,
        address inToken,
        address outToken
    );

    // --------- Modifiers ---------

    // --------- Setter Functions ---------

    function placeMarketOrder(
        address _inToken,
        address _outToken,
        uint256 _amount
    ) public {
        uint256 price = getTokenPrice(_inToken);
        uint256 orderId = totalOrders;
        totalOrders++;

        Order memory marketOrder = Order({
            orderId: orderId,
            lpId: 0,
            amountIn: _amount,
            amountOut: 0,
            inPrice: price,
            traderAddress: msg.sender,
            inToken: _inToken,
            outToken: _outToken,
            isFulfilled: false
        });
        orders[orderId] = marketOrder;

        emit Orderbook__MarketOrderPlaced(
            orderId,
            _amount,
            price,
            msg.sender,
            _inToken,
            _outToken
        );
    }

    function placeLimitOrder(
        address _inToken,
        address _outToken,
        uint256 _amount,
        uint256 _price
    ) public {
        uint256 orderId = totalOrders;
        totalOrders++;

        Order memory marketOrder = Order({
            orderId: orderId,
            lpId: 0,
            amountIn: _amount,
            amountOut: 0,
            inPrice: _price,
            traderAddress: msg.sender,
            inToken: _inToken,
            outToken: _outToken,
            isFulfilled: false
        });
        orders[orderId] = marketOrder;

        emit Orderbook__MarketOrderPlaced(
            orderId,
            _amount,
            _price,
            msg.sender,
            _inToken,
            _outToken
        );
    }

    // --------- Getter Functions ---------

    function getTokenPrice(address _token) private pure returns (uint256) {
        return 1000;
    }

    function getMarketOrderById(
        uint256 _orderId
    ) public view returns (Order memory) {
        return orders[_orderId];
    }
}
