export const orderBookAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_lpManager',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_oracleClient',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getOrderById',
    inputs: [
      {
        name: '_orderId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct Order',
        components: [
          {
            name: 'orderId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'lpId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amountIn',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amountOut',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'inPrice',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'traderAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'inToken',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'outToken',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'isFulfilled',
            type: 'bool',
            internalType: 'bool',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPairId',
    inputs: [
      {
        name: '_token',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'matchOrder',
    inputs: [
      {
        name: '_orderId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_lpId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_amountOut',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_tradingToken',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'placeLimitOrder',
    inputs: [
      {
        name: '_inToken',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_outToken',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_amount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_price',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'placeMarketOrder',
    inputs: [
      {
        name: '_inToken',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_outToken',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'priceIndex',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalOrders',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'Orderbook__OrderMatched',
    inputs: [
      {
        name: 'orderId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'matchedLpId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Orderbook__OrderPlaced',
    inputs: [
      {
        name: 'orderId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'amountIn',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'inPrice',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'traderAddress',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'inToken',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'outToken',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'Orderbook__InvalidMatching',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Orderbook__TokenTransferFailed',
    inputs: [],
  },
]

export const oracleAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_sValueFeed',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getDerivedValueOfPair',
    inputs: [
      {
        name: 'pair_id_1',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'pair_id_2',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'operation',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'price',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'decimals',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPrice',
    inputs: [
      {
        name: '_priceIndex',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'price',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'decimals',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getSupraSvalueFeed',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract ISupraSValueFeed',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateDerivedPricePairValues',
    inputs: [
      {
        name: 'pairIndexs1',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: 'pairIndexs2',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: 'prices',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updatePricePairValues',
    inputs: [
      {
        name: 'pairs',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: 'decimals',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: 'prices',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateSupraSvalueFeed',
    inputs: [
      {
        name: '_newSValueFeed',
        type: 'address',
        internalType: 'contract ISupraSValueFeed',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'OracleClient__InvaildOp',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
]

export const stakeAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_stakingToken',
        type: 'address',
        internalType: 'contract ERC20',
      },
      {
        name: '_rewardsToken',
        type: 'address',
        internalType: 'contract ERC20',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'rewardsToken',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract ERC20' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'stake',
    inputs: [{ name: 'amount', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'stakingToken',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract ERC20' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalStaked',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'unstake',
    inputs: [{ name: 'amount', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'userStake',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'StakeDextr__Staked',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'StakeDextr__Unstaked',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'SafeERC20FailedOperation',
    inputs: [{ name: 'token', type: 'address', internalType: 'address' }],
  },
]

export const dextrRepAbi = [
  {
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'decimals',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      {
        name: '_recipient',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DxtrRep_MintSBT',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'DxtrRep__IsSBT',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ERC20InsufficientAllowance',
    inputs: [
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'allowance',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'needed',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InsufficientBalance',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'balance',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'needed',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InvalidApprover',
    inputs: [
      {
        name: 'approver',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InvalidReceiver',
    inputs: [
      {
        name: 'receiver',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InvalidSender',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InvalidSpender',
    inputs: [
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
]

export const liqManagerAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_supportedTokens',
        type: 'address[]',
        internalType: 'address[]',
      },
      { name: '_pairIds', type: 'uint256[]', internalType: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'createLiquidityPosition',
    inputs: [
      {
        name: '_primaryToken',
        type: 'address',
        internalType: 'address',
      },
      { name: '_minPrice', type: 'uint256', internalType: 'uint256' },
      { name: '_maxPrice', type: 'uint256', internalType: 'uint256' },
      { name: '_amount', type: 'uint256', internalType: 'uint256' },
      {
        name: '_tradingTokens',
        type: 'address[]',
        internalType: 'address[]',
      },
      {
        name: '_tradingMinTokens',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: '_tradingMaxTokens',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getLiquidityPosition',
    inputs: [{ name: '_lpId', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct LiquidityGroup',
        components: [
          { name: 'lpId', type: 'uint256', internalType: 'uint256' },
          {
            name: 'lpAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'primaryToken',
            type: 'tuple',
            internalType: 'struct LiquidityToken',
            components: [
              {
                name: 'lpId',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'minPrice',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxPrice',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'availableBalance',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTokenPairId',
    inputs: [{ name: '_token', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTradingToken',
    inputs: [
      { name: '_lpId', type: 'uint256', internalType: 'uint256' },
      { name: '_token', type: 'address', internalType: 'address' },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct LiquidityToken',
        components: [
          { name: 'lpId', type: 'uint256', internalType: 'uint256' },
          { name: 'token', type: 'address', internalType: 'address' },
          {
            name: 'minPrice',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'maxPrice',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'availableBalance',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isTokenSupported',
    inputs: [
      {
        name: '_tokenAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'removeLiquidityPosition',
    inputs: [
      { name: '_lpId', type: 'uint256', internalType: 'uint256' },
      {
        name: '_tradingTokens',
        type: 'address[]',
        internalType: 'address[]',
      },
      { name: '_recipient', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'totalLP',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'updateLiquidityPosition',
    inputs: [
      { name: '_lpId', type: 'uint256', internalType: 'uint256' },
      { name: '_amount', type: 'uint256', internalType: 'uint256' },
      { name: '_deduct', type: 'bool', internalType: 'bool' },
      { name: '_isPrimary', type: 'bool', internalType: 'bool' },
      {
        name: '_tradingToken',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'TokenVault__LiquidityPositionCreated',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'lpId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'primaryToken',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'minPrice',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'maxPrice',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'tradingTokens',
        type: 'address[]',
        indexed: false,
        internalType: 'address[]',
      },
      {
        name: 'tradingMinTokens',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
      {
        name: 'tradingMaxTokens',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TokenVault__LiquidityPositionRemoved',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'lpId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TokenVault__LiquidityPositionUpdated',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'lpId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'token',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'TokenVault__TokenTransferFailed', inputs: [] },
]
