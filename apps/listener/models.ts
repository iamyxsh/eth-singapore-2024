import mongoose, { Schema, Document } from 'mongoose'

// Interfaces
interface ILiquidityToken {
  contractAddress: string
  isPrimary: boolean
  minPrice: number
  maxPrice: number
  availableBalance: number
}

interface IFeeEarned {
  tokenAddress: string
  feeAmount: number
}

interface ILiquidityPosition {
  positionId: string
  tokens: ILiquidityToken[]
  feeEarned: IFeeEarned[]
}

interface IOrder {
  orderId: string
  orderType: 'LIMIT' | 'MARKET'
  matchedLPId: string
  tokenInAddress: string
  tokenOutAddress: string
  tokenOutPrice: number
  tokenInPrice: number
  tokenInAmount: number
  tokenOutAmount: number
}

interface IUser extends Document {
  address: string
  liquidityPositions: ILiquidityPosition[]
  repScore: number
  orders: IOrder[]
  stakedAmount: number
}

// Schemas
const liquidityTokenSchema = new Schema<ILiquidityToken>({
  contractAddress: { type: String, required: true },
  isPrimary: { type: Boolean, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  availableBalance: { type: Number, required: true },
})

const feeEarnedSchema = new Schema<IFeeEarned>({
  tokenAddress: { type: String, required: true },
  feeAmount: { type: Number, required: true },
})

const liquidityPositionSchema = new Schema<ILiquidityPosition>({
  positionId: { type: String, required: true },
  tokens: [liquidityTokenSchema],
  feeEarned: [feeEarnedSchema],
})

const orderSchema = new Schema<IOrder>({
  orderId: { type: String, required: true },
  orderType: { type: String, enum: ['LIMIT', 'MARKET'], required: true },
  matchedLPId: { type: String, required: true },
  tokenInAddress: { type: String, required: true },
  tokenOutAddress: { type: String, required: true },
  tokenOutPrice: { type: Number, required: true },
  tokenInPrice: { type: Number, required: true },
  tokenInAmount: { type: Number, required: true },
  tokenOutAmount: { type: Number, required: true },
})

// User Schema
const userSchema = new Schema<IUser>({
  address: { type: String, required: true, unique: true },
  liquidityPositions: [liquidityPositionSchema],
  repScore: { type: Number, default: 0 },
  orders: [orderSchema],
  stakedAmount: { type: Number, default: 0 },
})

const User = mongoose.model<IUser>('User', userSchema)

export { User, IUser }
