import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x13882', 
      token: 'Polygon Amoy',
      label: 'Amoy Testnet',
      rpcUrl: 'https://rpc-amoy.polygon.technology'  
    }
  ]
});

export {onboard}
