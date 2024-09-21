// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {LiquidityToken, LiquidityGroup} from "./utils/Types.sol";

// --------- Errrors ---------

error TokenVault__TokenTransferFailed();

contract LiquidityManager {
    // --------- State ---------

    uint256 public totalLP = 1;

    // Supported Token Address => Yes/No
    mapping(address => bool) private supportedTokens;

    // LP Id => LP Info
    mapping(uint256 => LiquidityGroup) private liquidityPositions;

    // LP Group Id => Trading Token Address => Trading Token Info
    mapping(uint256 => mapping(address => LiquidityToken))
        private tradingTokens;

    constructor(address[] memory _supportedTokens) {
        for (uint i = 0; i < _supportedTokens.length; i++) {
            supportedTokens[_supportedTokens[i]] = true;
        }
    }

    // --------- Events ---------

    event TokenVault__TokenDepositedEvent(
        address _token,
        uint256 _amount,
        uint256 _lpId
    );

    // --------- Modifiers ---------

    // --------- Setter Functions ---------

    function createLiquidityPosition(
        address _primaryToken,
        uint256 _minPrice,
        uint256 _maxPrice,
        uint256 _amount,
        address[] memory _tradingTokens,
        uint256[] memory _tradingMinTokens,
        uint256[] memory _tradingMaxTokens
    ) public {
        uint256 lpId = totalLP;
        totalLP++;
        LiquidityToken memory primary = LiquidityToken({
            lpId: lpId,
            token: _primaryToken,
            minPrice: _minPrice,
            maxPrice: _maxPrice,
            availableBalance: _amount
        });

        LiquidityGroup memory lpGroup = LiquidityGroup({
            lpId: lpId,
            lpAddress: msg.sender,
            primaryToken: primary
        });

        depositTokens(msg.sender, _primaryToken, _amount);

        for (uint256 i = 0; i < _tradingTokens.length; i++) {
            LiquidityToken memory trading = LiquidityToken({
                lpId: lpId,
                token: _tradingTokens[i],
                minPrice: _tradingMinTokens[i],
                maxPrice: _tradingMaxTokens[i],
                availableBalance: _amount
            });
            tradingTokens[lpId][_tradingTokens[i]] = trading;
        }
        liquidityPositions[lpId] = lpGroup;
    }

    function removeLiquidityPosition(
        uint256 _lpId,
        address[] memory _tradingTokens,
        address _recipient
    ) external {
        LiquidityGroup memory liquidityPosition = getLiquidityPosition(_lpId);

        if (
            IERC20(liquidityPosition.primaryToken.token).balanceOf(
                address(this)
            ) > 0
        ) {
            IERC20(liquidityPosition.primaryToken.token).transfer(
                _recipient,
                liquidityPosition.primaryToken.availableBalance
            );
        }

        for (uint256 i = 0; i < _tradingTokens.length; i++) {
            LiquidityToken memory tradingToken = tradingTokens[_lpId][
                _tradingTokens[i]
            ];
            if (IERC20(tradingToken.token).balanceOf(address(this)) > 0) {
                IERC20(tradingToken.token).transfer(
                    _recipient,
                    tradingToken.availableBalance
                );
            }
        }
    }

    function updateLiquidityPosition(
        uint256 _lpId,
        uint256 _amount,
        bool _deduct,
        bool _isPrimary,
        address _tradingToken
    ) external {
        if (_isPrimary) {
            LiquidityGroup memory liquidityPosition = getLiquidityPosition(
                _lpId
            );
            liquidityPosition.primaryToken.availableBalance = _deduct
                ? liquidityPosition.primaryToken.availableBalance - _amount
                : liquidityPosition.primaryToken.availableBalance + _amount;
            liquidityPositions[_lpId] = liquidityPosition;
        } else {
            LiquidityToken memory tradingToken = getTradingToken(
                _lpId,
                _tradingToken
            );
            tradingToken.availableBalance = _deduct
                ? tradingToken.availableBalance - _amount
                : tradingToken.availableBalance + _amount;
            tradingTokens[_lpId][_tradingToken] = tradingToken;
        }
    }

    function depositTokens(
        address _user,
        address _token,
        uint256 _amount
    ) private {
        bool success = IERC20(_token).transferFrom(
            _user,
            address(this),
            _amount
        );

        if (!success) {
            revert TokenVault__TokenTransferFailed();
        }
    }

    // --------- Getter Functions ---------

    function isTokenSupported(
        address _tokenAddress
    ) public view returns (bool) {
        return supportedTokens[_tokenAddress];
    }

    function getLiquidityPosition(
        uint256 _lpId
    ) public view returns (LiquidityGroup memory) {
        return liquidityPositions[_lpId];
    }

    function getTradingToken(
        uint256 _lpId,
        address _token
    ) public view returns (LiquidityToken memory) {
        return tradingTokens[_lpId][_token];
    }
}
