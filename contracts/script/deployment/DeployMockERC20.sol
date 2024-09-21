// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {MockERC20} from "../../src/mocks/MockERC20.sol";
import {LiquidityManager} from "../../src/LiquidityManager.sol";
import {Orderbook} from "../../src/Orderbook.sol";
import {MockOracleClient} from "../../src/mocks/MockOracleClient.sol";

uint8 constant NUM_TOKENS = 4;

contract DeployMockTokens is Script {
    function run() external returns (address[NUM_TOKENS] memory) {
        // Create an array to hold the token addresses
        address[NUM_TOKENS] memory tokenAddresses;

        // Start broadcasting the transactions
        vm.startBroadcast();

        // Deploy Token 1 (USDC)
        MockERC20 usdc = new MockERC20("USD Circle", "USDC");
        tokenAddresses[0] = address(usdc); // Store the address
        console.log("USD Circle deployed at:", address(usdc));

        // Deploy Token 2 (WETH)
        MockERC20 weth = new MockERC20("Wrapped Ethereum", "WETH");
        tokenAddresses[1] = address(weth); // Store the address
        console.log("Wrapped Ethereum deployed at:", address(weth));

        // Deploy Token 3 (WBTC)
        MockERC20 wbtc = new MockERC20("Wrapped Bitcoin", "WBTC");
        tokenAddresses[2] = address(wbtc); // Store the address
        console.log("Wrapped Bitcoin deployed at:", address(wbtc));

        // Deploy Token 4 (DEXTR)
        MockERC20 dxtr = new MockERC20("Dextr", "DEXTR");
        tokenAddresses[3] = address(dxtr); // Store the address
        console.log("Dextr deployed at:", address(dxtr));

        MockOracleClient oracleClient = new MockOracleClient(address(1));

        address[] memory supportedTokens = new address[](4);
        for (uint i = 0; i < tokenAddresses.length; i++) {
            supportedTokens[i] = tokenAddresses[i];
        }

        LiquidityManager liquidityManager = new LiquidityManager(
            supportedTokens
        );

        Orderbook orderbook = new Orderbook(
            address(liquidityManager),
            address(oracleClient)
        );

        // Stop broadcasting
        vm.stopBroadcast();

        // Return the array of token addresses
        return tokenAddresses;
    }
}
