// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

struct Order {
    uint256 orderId;
    uint256 lpId;
    uint256 amountIn;
    uint256 amountOut;
    uint256 inPrice;
    address traderAddress;
    address inToken;
    address outToken;
    bool isFulfilled;
}

struct LiguidityGroup {
    uint256 lpId;
    address primaryToken;
    uint256 minPrice;
    uint256 maxPrice;
    uint256 availablePrimaryBalance;
}

struct TradingTokenGroup {
    uint256 lpId;
    address tradeToken;
    uint256 minPrice;
    uint256 maxPrice;
    uint256 availableTradingBalance;
}
