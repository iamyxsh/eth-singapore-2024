import LpOrderBook from "@/components/custom/trade/LPOrderBook";
import RecentOrdersMatched from "@/components/custom/trade/RecentOrdersMatched";
import AllPairs from "@/components/custom/trade/AllPairs";
import { useEffect, useState } from "react";
import Swap from "@/components/custom/swap/Swap";

// Dummy data for RecentOrdersMatched
const dummyOrders = [
  {
    orderId: "1",
    tokenIn: "ETH",
    tokenOut: "USDT",
    tokenInAmount: 1.2,
    tokenOutAmount: 2400,
    status: 'pending',
  },
  {
    orderId: "2",
    trader: "TraderB",
    tokenIn: "BTC",
    tokenOut: "ETH",
    tokenInAmount: 0.5,
    tokenOutAmount: 7.5,
    status: 'in progress',
  },
  {
    orderId: "3",
    trader: "TraderC",
    tokenIn: "SOL",
    tokenOut: "BTC",
    tokenInAmount: 10,
    tokenOutAmount: 0.025,
    status: 'completed',
  },
];

const Trade = () => {
  const [orders, setOrders] = useState(dummyOrders);

  // Function to simulate receiving a new order
  const addNewOrder = (newOrder: any) => {
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders, newOrder];
      return updatedOrders.sort((a, b) => {
        const idA = a.orderId || ""; // Default to empty string if undefined
        const idB = b.orderId || ""; // Default to empty string if undefined
        return idB.localeCompare(idA);
      });
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newOrder = {
        orderId: "4",
        tokenIn: "ADA",
        tokenOut: "SOL",
        tokenInAmount: 1000,
        tokenOutAmount: 150,
        status: 'completed',
      };
      addNewOrder(newOrder);
    }, 5000);

    // Cleanup on unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 ">
        <div className="min-w-full min-h-[300px]">
          <LpOrderBook />
        </div>
        <div className=" min-h-[300px]">
          <Swap />
        </div>
        <div className="min-h-[300px] ">
          <AllPairs />
        </div>
      </div>
      <div className="flex w-full mt-4">
        <RecentOrdersMatched />
      </div>
    </>
  );
};

export default Trade;
