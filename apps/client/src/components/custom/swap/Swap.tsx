import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Token, useStore } from "./useSwapStore";

const SwapComponent: React.FC = () => {
  const {
    sellAmount,
    sellCurrency,
    sellBalance,
    sellPrice,
    buyAmount,
    buyCurrency,
    buyBalance,
    buyPrice,
    percentageChange,
    setSellAmount,
    setSellPrice, // To set the price for limit orders
    setSellCurrency,
    setBuyCurrency,
  } = useStore();
  const [activeTab, setActiveTab] = useState('Market')

  const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellAmount(Number(e.target.value));
  };

  const handleSellPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeTab === "Limit") {
      setSellPrice(Number(e.target.value));
    }
  };

  const handleSellCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSellCurrency(e.target.value as Token);
  };

  const handleBuyCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBuyCurrency(e.target.value as Token);
  };

  // Placeholder options for tokens
  const tokenOptions: Token[] = ["WBTC", "WETH", "DXTR", "USDC"];

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center w-full justify-center bg-background shadow-xl border border-gray-700 text-white p-6 rounded-lg max-w-sm">
        
        {/* Tabs for Market and Limit */}
        <Tabs defaultValue="Market" className="w-full">
          <TabsList className="flex space-x-4 border border-primary !bg-gray-800">
            <TabsTrigger
              value="Market"
              className="w-1/2 px-4 rounded-md font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-800 data-[state=inactive]:text-gray-400"
              onClick={()=>setActiveTab('Market')}
            >
              Market
            </TabsTrigger>
            <TabsTrigger
              value="Limit"
              className="w-1/2 px-4 rounded-md font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-800 data-[state=inactive]:text-gray-400"
              onClick={()=>setActiveTab("Limit")}
            >
              Limit
            </TabsTrigger>
          </TabsList>

          {/* Sell Section */}
          <TabsContent value="Market">
            <div className="w-full mb-4">
              <div className="flex justify-between items-center">
                <p>Sell</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                {/* Sell Amount Input */}
                <input
                  type="number"
                  value={sellAmount}
                  onChange={handleSellAmountChange}
                  className="bg-transparent text-3xl focus:outline-none w-2/3"
                />

                {/* Token Selector */}
                <select
                  className="bg-gray-800 text-white py-2 px-3 rounded-lg focus:outline-none w-1/3"
                  value={sellCurrency}
                  onChange={handleSellCurrencyChange}
                >
                  {tokenOptions.map((token) => (
                    <option key={token} value={token}>
                      {token}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between mt-2 text-gray-400 text-sm">
                <p>Balance: {sellBalance}</p>
                <p className="text-sm">${sellPrice}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="Limit">
            <div className="w-full mb-4">
              <div className="flex justify-between items-center">
                <p>Sell</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                {/* Sell Amount Input */}
                <input
                  type="number"
                  value={sellAmount}
                  onChange={handleSellAmountChange}
                  className="bg-transparent text-3xl focus:outline-none w-2/3"
                />

                {/* Token Selector */}
                <select
                  className="bg-gray-800 text-white py-2 px-3 rounded-lg focus:outline-none w-1/3"
                  value={sellCurrency}
                  onChange={handleSellCurrencyChange}
                >
                  {tokenOptions.map((token) => (
                    <option key={token} value={token}>
                      {token}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Field for Limit Orders */}
              <div className="flex justify-between mt-2 text-gray-400 text-sm">
                <input
                  type="number"
                  value={sellPrice}
                  onChange={handleSellPriceChange}
                  className="bg-transparent text-white text-sm focus:outline-none w-full"
                  placeholder="Price"
                />
              </div>

              <div className="flex justify-between mt-2 text-gray-400 text-sm">
                <p>Balance: {sellBalance}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Swap Arrow */}
        <div className="mb-4">
          <button
            className="swap-icon rounded-full bg-gray-800 p-2 focus:outline-none"
            aria-label="Swap"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6L12 4.5L13.5 6M13.5 18L12 19.5L10.5 18"
              ></path>
            </svg>
          </button>
        </div>

        {/* Buy Section */}
        <div className="w-full mb-4">
          <div className="flex justify-between items-center">
            <p>Buy</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-3xl">{buyAmount}</p>

            {/* Token Selector */}
            <select
              className="bg-gray-800 text-white py-2 px-3 rounded-lg focus:outline-none w-1/3"
              value={buyCurrency}
              onChange={handleBuyCurrencyChange}
            >
              {tokenOptions.map((token) => (
                <option key={token} value={token}>
                  {token}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between mt-2 text-gray-400 text-sm">
            <p>Balance: {buyBalance < 0.001 ? "<0.001" : buyBalance}</p>
            <p className="text-sm">${buyPrice}</p>
          </div>
          <div className="text-green-500 text-sm">({percentageChange}%)</div>
        </div>

        {/* Place Order Button */}
        <button className="w-full bg-primary text-white py-3 rounded-lg mt-4">
          {activeTab === "Market" ? "Place Market Order" : "Place Limit Order"}
        </button>
      </div>
    </div>
  );
};

export default SwapComponent;
