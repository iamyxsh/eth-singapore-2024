// userService.ts
// import { User } from './models'
// import { User } from "./models.ts"
const { User } = require('./models')

const saveUser = async (userAddress: string): Promise<void> => {
  try {
    const user = new User({ address: userAddress })
    await user.save()
    console.log(`User saved: ${userAddress}`)
  } catch (error: any) {
    console.error(`Error saving user: ${error.message}`)
  }
}

export { saveUser }
