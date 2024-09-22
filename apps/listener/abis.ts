export const orderBookAbi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_lpManager",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_oracleClient",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getOrderById",
    "inputs": [
      {
        "name": "_orderId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct Order",
        "components": [
          {
            "name": "orderId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lpId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "amountIn",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "amountOut",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "inPrice",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "traderAddress",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "inToken",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "outToken",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "isFulfilled",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPairId",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "matchOrder",
    "inputs": [
      {
        "name": "_orderId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_lpId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_amountOut",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_tradingToken",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "placeLimitOrder",
    "inputs": [
      {
        "name": "_inToken",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_outToken",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_price",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "placeMarketOrder",
    "inputs": [
      {
        "name": "_inToken",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_outToken",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "priceIndex",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalOrders",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "Orderbook__OrderMatched",
    "inputs": [
      {
        "name": "orderId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "matchedLpId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Orderbook__OrderPlaced",
    "inputs": [
      {
        "name": "orderId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "amountIn",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "inPrice",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "traderAddress",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "inToken",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "outToken",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "Orderbook__InvalidMatching",
    "inputs": []
  },
  {
    "type": "error",
    "name": "Orderbook__TokenTransferFailed",
    "inputs": []
  }
]

export const oracleAbi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_sValueFeed",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getDerivedValueOfPair",
    "inputs": [
      {
        "name": "pair_id_1",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "pair_id_2",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "operation",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "price",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "decimals",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPrice",
    "inputs": [
      {
        "name": "_priceIndex",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "price",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "decimals",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSupraSvalueFeed",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract ISupraSValueFeed"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateDerivedPricePairValues",
    "inputs": [
      {
        "name": "pairIndexs1",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "pairIndexs2",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "prices",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updatePricePairValues",
    "inputs": [
      {
        "name": "pairs",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "decimals",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "prices",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateSupraSvalueFeed",
    "inputs": [
      {
        "name": "_newSValueFeed",
        "type": "address",
        "internalType": "contract ISupraSValueFeed"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "OracleClient__InvaildOp",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  }
]