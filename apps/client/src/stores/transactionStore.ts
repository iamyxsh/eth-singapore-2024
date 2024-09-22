import { create } from "zustand";

interface Order {
  orderId: string;
  tokenIn: string;
  tokenOut: string;
  tokenInAmount: string;
  tokenOutAmount: string;
  status: string;
}

interface TransactionStore {
  orders: Order[]; // Array of order objects
  addOrder: (order: Order) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  orders: [],
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order], // Add new order to the orders array
    })),
}));
