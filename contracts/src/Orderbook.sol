// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Order} from "./utils/Types.sol";
import {console} from "forge-std/console.sol";
import {LiquidityManager} from "./LiquidityManager.sol";
import {MockERC20} from "./mocks/MockERC20.sol";
import {Order, LiquidityGroup, LiquidityToken} from "./utils/Types.sol";

// --------- Errors ---------

error Orderbook__InvalidMatching();
error Orderbook__TokenTransferFailed();

contract Orderbook {
    // --------- State ---------

    LiquidityManager immutable lpManager;

    uint256 public totalOrders = 1;

    // orderId -> orders
    mapping(uint256 => Order) private orders;

    constructor(address _lpManager) {
        lpManager = LiquidityManager(_lpManager);
    }

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

        bool success = MockERC20(_inToken).transferFrom(
            msg.sender,
            address(lpManager),
            _amount
        );

        if (!success) {
            revert Orderbook__TokenTransferFailed();
        }

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

    function matchOrder(
        uint256 _orderId,
        uint256 _lpId,
        address _tradingToken
    ) public {
        Order memory order = getOrderById(_orderId);

        LiquidityGroup memory lp = lpManager.getLiquidityPosition(_lpId);

        LiquidityToken memory tradingToken = lpManager.getTradingToken(
            _lpId,
            _tradingToken
        );

        uint256 currPrice = getTokenPrice(_tradingToken);

        if (order.outToken == _tradingToken) {
            if (
                currPrice <= tradingToken.maxPrice &&
                currPrice >= tradingToken.minPrice &&
                order.amountOut <= tradingToken.availableBalance
            ) {
                lpManager.updateLiquidityPosition(
                    _lpId,
                    order.amountOut,
                    true,
                    false,
                    _tradingToken
                );
                bool isPrimary = order.inToken == lp.primaryToken.token;
                lpManager.updateLiquidityPosition(
                    _lpId,
                    order.amountIn,
                    false,
                    isPrimary,
                    order.inToken
                );
            } else {
                revert Orderbook__InvalidMatching();
            }
        } else {
            if (
                currPrice <= lp.primaryToken.maxPrice &&
                currPrice >= lp.primaryToken.minPrice &&
                order.amountOut <= lp.primaryToken.availableBalance
            ) {
                lpManager.updateLiquidityPosition(
                    _lpId,
                    order.amountOut,
                    true,
                    true,
                    _tradingToken
                );
                bool isPrimary = order.inToken == lp.primaryToken.token;
                lpManager.updateLiquidityPosition(
                    _lpId,
                    order.amountIn,
                    false,
                    isPrimary,
                    order.inToken
                );
            } else {
                revert Orderbook__InvalidMatching();
            }
        }
    }

    // --------- Getter Functions ---------

    function getTokenPrice(address _token) private pure returns (uint256) {
        return 1000;
    }

    function getOrderById(uint256 _orderId) public view returns (Order memory) {
        return orders[_orderId];
    }
}
