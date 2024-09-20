// models.ts

const { Schema } = mongoose


// Interfaces
const ILiquidityToken = {
  contractAddress: String,
  isPrimary: Boolean,
  minPrice: Number,
  maxPrice: Number,
  availableBalance: Number,
}

const IFeeEarned = {
  tokenAddress: String,
  feeAmount: Number,
}

const ILiquidityPosition = {
  positionId: String,
  tokens: [ILiquidityToken],
  feeEarned: [IFeeEarned],
}

const IOrder = {
  orderId: String,
  orderType: { type: String, enum: ['LIMIT', 'MARKET'] },
  matchedLPId: String,
  tokenInAddress: String,
  tokenOutAddress: String,
  tokenOutPrice: Number,
  tokenInPrice: Number,
  tokenInAmount: Number,
  tokenOutAmount: Number,
}

const IUser = {
  address: { type: String, required: true, unique: true },
  liquidityPositions: [ILiquidityPosition],
  repScore: { type: Number, default: 0 },
  orders: [IOrder],
  stakedAmount: { type: Number, default: 0 },
}

// Schemas
const liquidityTokenSchema = new Schema({
  contractAddress: { type: String, required: true },
  isPrimary: { type: Boolean, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  availableBalance: { type: Number, required: true },
})

const feeEarnedSchema = new Schema({
  tokenAddress: { type: String, required: true },
  feeAmount: { type: Number, required: true },
})

const liquidityPositionSchema = new Schema({
  positionId: { type: String, required: true },
  tokens: [liquidityTokenSchema],
  feeEarned: [feeEarnedSchema],
})

const orderSchema = new Schema({
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
const userSchema = new Schema(IUser)

const User = mongoose.model('User', userSchema)

module.exports = { User }
