// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {MockERC20} from "../../src/mocks/MockERC20.sol";
import {LiquidityManager} from "../../src/LiquidityManager.sol";
import {DxtrRep} from "../../src/DxtrRep.sol";
import {Orderbook} from "../../src/Orderbook.sol";
import {StakeDextr} from "../../src/Stake.sol";
import {MockOracleClient} from "../../src/mocks/MockOracleClient.sol";

uint8 constant NUM_TOKENS = 4;

contract DeployAllTokens is Script {
    function run() external {
        // Create an array to hold the token addresses
        address[NUM_TOKENS] memory tokenAddresses;
        uint256[NUM_TOKENS] memory pairIds;

        // Start broadcasting the transactions
        vm.startBroadcast();

        // Deploy Token 1 (USDC)
        MockERC20 usdc = new MockERC20("USD Circle", "USDC");
        tokenAddresses[0] = address(usdc); // Store the address
        pairIds[0] = 89;
        console.log("USD Circle deployed at:", address(usdc));

        // Deploy Token 2 (WETH)
        MockERC20 weth = new MockERC20("Wrapped Ethereum", "WETH");
        tokenAddresses[1] = address(weth); // Store the address
        pairIds[1] = 19;
        console.log("Wrapped Ethereum deployed at:", address(weth));

        // Deploy Token 3 (WBNB)
        MockERC20 wbtc = new MockERC20("Wrapped BNB", "WBNB");
        tokenAddresses[2] = address(wbtc); // Store the address
        pairIds[2] = 49;
        console.log("Wrapped Bitcoin deployed at:", address(wbtc));

        // Deploy Token 4 (DEXTR)
        MockERC20 dxtr = new MockERC20("Dextr", "DEXTR");
        tokenAddresses[3] = address(dxtr); // Store the address
        pairIds[3] = 89;
        console.log("Dextr deployed at:", address(dxtr));

        MockOracleClient oracleClient = new MockOracleClient(address(1));
        console.log("MockOracleClient deployed at:", address(oracleClient));

        address[] memory supportedTokens = new address[](4);
        uint256[] memory pairs = new uint256[](4);
        for (uint i = 0; i < tokenAddresses.length; i++) {
            supportedTokens[i] = tokenAddresses[i];
            pairs[i] = pairIds[i];
        }

        LiquidityManager liquidityManager = new LiquidityManager(
            supportedTokens,
            pairs
        );
        console.log("MockOracleClient deployed at:", address(oracleClient));

        Orderbook orderbook = new Orderbook(
            address(liquidityManager),
            address(oracleClient)
        );
        console.log("Orderbook deployed at:", address(orderbook));

        DxtrRep repSBT = new DxtrRep();
        console.log("DxtrRep deployed at:", address(repSBT));

        StakeDextr stake = new StakeDextr(dxtr, repSBT);
        console.log("StakeDextr deployed at:", address(stake));

        // Stop broadcasting
        vm.stopBroadcast();
    }
}
