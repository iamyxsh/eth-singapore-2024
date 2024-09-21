import { config } from 'dotenv'

config()

export { abi as MockOracleABI } from './MockOracle.json'

export { abi as OracleProofABI } from './OracleProof.json'

export const CHAIN_ID = '80084'
export const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY || ''
export const MOCK_ORACLE_ADDRESS = '0x0813277452AABAdB1523d747B5d8c3e6a824E3f7'
export const CHAIN_INFO = {
  '80002': {
    rpcUrl: 'https://rpc-amoy.polygon.technology',
  },
  '80084': {
    rpcUrl: 'https://bartio.rpc.berachain.com/',
  },
}

export const REST_ADDRESS = 'https://rpc-testnet-dora-2.supra.com'

// BTC_USD ETH_USD POL_USD BNB_USDT USDC_USD
export const PAIR_INDEXES = [18, 19, 197, 49, 89]
export const CHAIN_TYPE = 'evm'
