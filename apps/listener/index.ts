import { ethers } from 'ethers'
import {
  liqManagerAddress,
  oracleAddress,
  orderbookAddress,
  repAddress,
  stakeAddress,
} from './constants.js'
import dotenv from 'dotenv'
import mongoose, { ConnectOptions } from 'mongoose'

import {
  createLiquidityPosition,
  createOrder,
  dxtrStaked,
  dxtrUnstaked,
} from './userService.js'

import {
  orderBookAbi,
  oracleAbi,
  stakeAbi,
  dextrRepAbi,
  liqManagerAbi,
} from './abis.js'

dotenv.config()

async function main() {
  // Connect to MongoDB
  await mongoose.connect(
    process.env.MONGODB_URI as string,
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // } as typeof ConnectOptions)
    } as ConnectOptions
  )

  const provider = new ethers.WebSocketProvider('ws://127.0.0.1:8545')
  const wallet = new ethers.Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  )
  const signer = wallet.connect(provider)

  const orderbookContract = new ethers.Contract(
    orderbookAddress,
    orderBookAbi,
    signer
  )
  const oracleClient = new ethers.Contract(oracleAddress, oracleAbi, signer)
  const stakeContract = new ethers.Contract(stakeAddress, stakeAbi, signer)
  const repContract = new ethers.Contract(repAddress, dextrRepAbi, signer)
  const liqManagerContract = new ethers.Contract(
    liqManagerAddress,
    liqManagerAbi,
    signer
  )

  orderbookContract.on('Orderbook__OrderPlaced', async (...params) => {
    console.log('params Orderbook__OrderPlaced', params)
    const [outPrice] = await oracleClient.getPrice(19)
    const [inPrice] = await oracleClient.getPrice(89)

    const outAmount =
      BigInt(params[2] * params[1]) / BigInt(outPrice / BigInt(1e8))

    params[2] = inPrice

    createOrder(
      params[3], //traderAddress
      params[0], //orderId
      'MARKET',
      params[4], //inToken
      params[5], //outToken
      parseInt(outPrice.toString()), // tokenOutPrice
      params[2].toString(), // tokenInPrice
      params[1].toString(), // tokenInAmount
      parseInt(outAmount.toString()) // tokenOutAmount
    )
  })

  orderbookContract.on('Orderbook__OrderMatched', (...params) => {
    console.log('params Orderbook__OrderMatched', params)
  })

  stakeContract.on('StakeDextr__Staked', async (...params) => {
    const user = params[0]
    const amount = params[1]

    const tx = await repContract.mint(user, amount / 100)
    await tx.await()

    await dxtrStaked(user, amount)
  })

  stakeContract.on('StakeDextr__Unstaked', async (...params) => {
    const user = params[0]
    const amount = params[1]

    const tx = await repContract.mint(user, amount / 100)
    await tx.await()

    await dxtrUnstaked(user, amount)
  })

  liqManagerContract.on(
    'TokenVault__LiquidityPositionCreated',
    async (...params) => {
      await createLiquidityPosition(
        params[0],
        params[1],
        params[2],
        params[3],
        params[4],
        params[5],
        params[6],
        params[7],
        params[8]
      )
    }
  )

  //   console.log('Starting listener.....')

  //   // Listen for the UserRegistered event
  //   //@ts-ignore
  //   contract.on("UserRegistered", (user: string) => {
  //     console.log(`User registered: ${user}`)
  //     saveUser(user) // Call the save function
  //   })

  //   // Keep the script running
  //   console.log(`Listening for UserRegistered events on ${contractAddress}...`)

  //TESTING

  // testCreateUser()
  // testCreateLiquidityPosition()
  // testRemoveLiquidity()
  // testCreateOrder()
  // testMatchOrder()
  // testRepScoreMinted()
  // testDxtrStaked()
  // testDxtrUnStaked()
}

main().catch(console.error)
