import React, { useEffect, useState } from "react";
import { create } from "zustand";
import CustomDropdown from "../CustomDropdown";

interface Order {
  groupId: string;
  quantity: number;
}

interface PairPrice {
  primary: string;
  secondary: string;
  liquidity: number;
}

interface Store {
  sellOrderData: Order[];
  pairPrices: PairPrice[];
  selectedPair: string;
  setSellOrderData: (data: Order[]) => void;
  setPairPrices: (data: PairPrice[]) => void;
  setSelectedPair: (pair: string) => void;
}

const useStore = create<Store>((set) => ({
  sellOrderData: [],
  pairPrices: [],
  selectedPair: "1",
  setSellOrderData: (data) => set({ sellOrderData: data }),
  setPairPrices: (data) => set({ pairPrices: data }),
  setSelectedPair: (pair) => set({ selectedPair: pair }),
}));

const LpOrderBook: React.FC = () => {
  const {
    sellOrderData,
    setSellOrderData,
    pairPrices,
    setPairPrices,
    selectedPair,
    setSelectedPair,
  } = useStore();

  const primaryToken = "USDC";
  const [primaryLiquidity, setPrimaryLiquidity] = useState<number>(0);

  const dummySellOrders: Order[] = [
    { groupId: "1", quantity: 25 },
    { groupId: "2", quantity: 40 },
    { groupId: "3", quantity: 15 },
  ];

  const pairPriceOptions: Record<string, PairPrice[]> = {
    "1": [
      { primary: primaryToken, secondary: "WETH", liquidity: 320 },
      { primary: primaryToken, secondary: "WBTC", liquidity: 150 },
      { primary: primaryToken, secondary: "DEXTR", liquidity: 200 },
    ],
    "4": [
      { primary: primaryToken, secondary: "DAI", liquidity: 400 },
      { primary: primaryToken, secondary: "USDT", liquidity: 250 },
    ],
    "5": [
      { primary: primaryToken, secondary: "LINK", liquidity: 100 },
      { primary: primaryToken, secondary: "MATIC", liquidity: 300 },
    ],
  };

  const handlePairChange = (value: string) => {
    setSelectedPair(value);
    setPairPrices(pairPriceOptions[value] || []);
  };

  useEffect(() => {
    setSellOrderData(dummySellOrders);
    setPrimaryLiquidity(
      dummySellOrders.reduce((total, order) => total + order.quantity, 0)
    );
    setPairPrices(pairPriceOptions[selectedPair]); // Set initial pair prices
  }, [setSellOrderData, setPairPrices, selectedPair]);

  return (
    <div className="rounded-2xl border border-gray-700 bg-bgPrimary p-2 h-full overflow-auto ">
      <div className="flex items-center justify-between rounded-2xl bg-bgPrimary px-3 py-1 font-primary text-lg font-semibold mt-1">
        <button className="rounded-lg px-2 py-0.5 bg-buttonPrimary text-whiteTextPrimary">
          LP
        </button>
        <CustomDropdown
          items={[
            { value: "1", label: "1" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
          ]}
          value={selectedPair}
          onChange={handlePairChange}
          placeholder="Select a pair"
          className="w-[180px]"
        />
      </div>

      <div className="mt-5 px-3.5">
        <table className="w-full table-fixed min-w-[220px] text-sm">
          <thead>
            <tr>
              <th className="text-left font-semibold">Token (Primary Token)</th>
              <th className="text-right font-semibold">Available Liquidity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-1 font-semibold text-left">{primaryToken}</td>
              <td className="py-1 text-right">{primaryLiquidity.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5 px-3.5">
        <table className="w-full table-fixed min-w-[220px] text-sm">
          <thead>
            <tr>
              <th className="text-left font-semibold">Token (Secondary Tokens)</th>
              <th className="text-right font-semibold">Available Liquidity</th>
            </tr>
          </thead>
          <tbody>
            {pairPrices.map((pair) => (
              <tr key={pair.secondary}>
                <td className="py-1 font-semibold text-left">{pair.secondary}</td>
                <td className="py-1 text-right">{pair.liquidity.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex justify-center ">
        {/* <Button className="min-w-full">Place Order</Button> */}
      </div>
    </div>
  );
};

export default LpOrderBook;
