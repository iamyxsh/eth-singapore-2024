import { ethers } from 'ethers'
import UserRegistry from './UserRegistry'
import MockERC20 from "./MockERC20"
import ERC20ABI from '../shared/abis/MockERC20ABI.json'



const userRegister = async () => {
  // Initialize provider and signer (e.g., with MetaMask or a test wallet)
  const provider = new ethers.JsonRpcProvider('http://localhost:8545') // Update with your provider
  const wallet = new ethers.Wallet('0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba') // #1 private key
  const signer = await wallet.connect(provider) // Assume the signer is the first account

  // Replace with the actual deployed contract address
  const userRegistryContractAddress = '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a'

  // Create an instance of UserRegistry
  const userRegistry = new UserRegistry(provider, signer, userRegistryContractAddress)
  userRegistry.contract.on("UserRegistered", (address) => {
    console.log("USer 123 ", address)
  })
  const userAddress = wallet.address

  const mockerc20 = new ethers.Contract("0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9", ERC20ABI, signer)
  console.log(await mockerc20.symbol())
  const tx1 = await mockerc20.mint(wallet.address, ethers.parseEther('1000'))
  await tx1.wait()
  const tx = await mockerc20.approve(userRegistryContractAddress, ethers.parseEther("100"))
  await tx.wait()

  // Check if the user is registered
  const isRegistered = await userRegistry.isUserRegistered(userAddress)
  console.log(`Is user registered? ${isRegistered}`)

  // Register the user if not already registered
  if (!isRegistered) {
    console.log('Registering user...')
    const tx3 = await userRegistry.contract.registerUser()
    await tx3.wait()
    console.log('User registered successfully.')
  } else {
    console.log('User already registered.')
  }

  // Listen for user registered events


  // Optional: Remove listener (you can call this at the end of your tests)
  // await userRegistry.removeUserRegisteredListener(callback);
}

// Call the function to execute the test flow
userRegister().catch(console.error)
