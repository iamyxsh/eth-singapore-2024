// // main.ts
// import { ethers } from 'ethers'
// import dotenv from 'dotenv'
// // const { ethers } = require('ethers')
// // const dotenv = require("dotenv")

// import mongoose, { ConnectOptions } from 'mongoose'
// import { saveUser } from './userService' // Import the saveUser function

// const mongoose = require('mongoose')
// const { saveUser } = require('./userService') // Import the saveUser function
// const ConnectOptions = mongoose.ConnectionOptions // Access ConnectOptions



import { ethers } from 'ethers'
import dotenv from 'dotenv'
import mongoose, { ConnectOptions } from 'mongoose'
import { saveUser } from './userService'


dotenv.config()

async function main() {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // } as typeof ConnectOptions)
  } as ConnectOptions)


  //   // Set up provider
  //   const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)

  //   // ABI for the UserRegistry contract (replace with your actual ABI)
  //   const abi = [
  //     "event UserRegistered(address indexed user)"
  //   ]

  //   // Contract address
  //   const contractAddress = process.env.CONTRACT_ADDRESS || ""
  //   console.log("🚀 ~ process.env.CONTRACT_ADDRESS:", contractAddress)

  //   // Create contract instance
  //   const contract = new ethers.Contract(contractAddress, abi, provider)

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
  const user = "0x1234567890"
  saveUser(user) // Call the save function

  //same for addLiquidity, addOrders, removeLiquidity, matchOrders, repScoreMinted, dxtrStaked, dxtrUnstaked, 

}

main().catch(console.error)
