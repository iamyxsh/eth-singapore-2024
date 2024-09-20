// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

// --------- Errrors ---------

error TokenVault__TokenTransferFailed();

contract TokenVault {
    // --------- State ---------

    // Supported Token Address => Yes/No
    mapping(address => bool) private supportedTokens;

    // LP Group ID  => Token Address => Amount
    mapping(uint256 => mapping(address => uint256)) lpTokenReciepts;

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

    function depositTokens(
        address _user,
        address _token,
        uint256 _amount,
        uint256 _lpId
    ) external {
        bool success = IERC20(_token).transferFrom(
            _user,
            address(this),
            _amount
        );

        if (!success) {
            revert TokenVault__TokenTransferFailed();
        }

        lpTokenReciepts[_lpId][_token] = _amount;

        emit TokenVault__TokenDepositedEvent(_token, _amount, _lpId);
    }

    // --------- Getter Functions ---------

    function isTokenSupported(
        address _tokenAddress
    ) public view returns (bool) {
        return supportedTokens[_tokenAddress];
    }

    function getDepositedToken(
        uint256 _lpId,
        address _token
    ) public view returns (uint256) {
        return lpTokenReciepts[_lpId][_token];
    }
}
