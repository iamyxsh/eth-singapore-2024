import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTransactionStore } from "@/stores/transactionStore"

// Define the interface for each order item
interface OrderMatched {
  orderId: string
  tokenIn: string
  tokenOut: string
  tokenInAmount: number
  tokenOutAmount: number
  status: string
}

const RecentOrdersMatched: React.FC = () => {
  const [displayedOrders, setDisplayedOrders] = useState<OrderMatched[]>([])
  const [loading, setLoading] = useState(false)
  const [previousOrdersLength, setPreviousOrdersLength] = useState(0)
  const { orders } = useTransactionStore()


  useEffect(() => {
    console.log({ orders })
  }, [orders])

  useEffect(() => {
    if (orders.length > previousOrdersLength) {
      setLoading(true) // Show loader
      const newOrders = orders.slice(previousOrdersLength).map((order) => {
        // Convert the incoming order data to match OrderMatched type
        const tokenInAmount = typeof order.tokenInAmount === "string"
          ? parseFloat(order.tokenInAmount)
          : order.tokenInAmount

        const tokenOutAmount = typeof order.tokenOutAmount === "string"
          ? parseFloat(order.tokenOutAmount)
          : order.tokenOutAmount

        // Ensure that the order matches OrderMatched interface
        return {
          ...order,
          tokenInAmount,
          tokenOutAmount,
        } as OrderMatched
      })

      // After 5 seconds, display the new orders and hide loader
      setTimeout(() => {
        setDisplayedOrders((prevOrders) => [
          ...prevOrders,
          ...newOrders,
        ])
        setLoading(false) // Hide loader
        setPreviousOrdersLength(orders.length) // Update previous length

        // Change status of new orders to 'completed' after 8 seconds
        newOrders.forEach((order) => {
          setTimeout(() => {
            setDisplayedOrders((prevOrders) =>
              prevOrders.map((o) =>
                o.orderId === order.orderId
                  ? { ...o, status: "completed" }
                  : o
              )
            )
          }, 3000) // 8 seconds delay to change status
        })
      }, 0) // 5 seconds delay before showing the new orders
    }
  }, [orders.length, previousOrdersLength])

  return (
    <div className="w-full border border-gray-700 rounded-xl">
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="loader">Loading new orders...</div>
        </div>
      )}
      <Table className="border border-gray-700">
        <TableCaption className="text-gray-400">
          List of recently matched orders
        </TableCaption>
        <TableHeader className="bg-gray-800 text-gray-300 py-2">
          <TableRow>
            <TableHead className="bg-gray-800 text-gray-300 py-2">
              Order ID
            </TableHead>
            <TableHead className="bg-gray-800 text-gray-300 py-2">
              Token In
            </TableHead>
            <TableHead className="bg-gray-800 text-gray-300 py-2">
              Token Out
            </TableHead>
            <TableHead className="bg-gray-800 text-gray-300 py-2">
              Token In Amount
            </TableHead>
            <TableHead className="bg-gray-800 text-gray-300 py-2">
              Token Out Amount
            </TableHead>
            <TableHead className="bg-gray-800 text-gray-300 py-2">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedOrders.map((order) => (
            <TableRow
              key={order.orderId}
              className="hover:bg-gray-700 transition-colors"
            >
              <TableCell className="border-b border-gray-600">
                {order.orderId}
              </TableCell>
              <TableCell className="border-b border-gray-600">
                {order.tokenIn}
              </TableCell>
              <TableCell className="border-b border-gray-600">
                {order.tokenOut}
              </TableCell>
              <TableCell className="border-b border-gray-600">
                {order.tokenInAmount}
              </TableCell>
              <TableCell className="border-b border-gray-600">
                {order.tokenOutAmount}
              </TableCell>
              <TableCell className="border-b border-gray-600">
                <span
                  className={`${order.status === "completed"
                    ? "text-green-500"
                    : order.status === "in progress"
                      ? "text-yellow-500"
                      : "text-red-500"
                    }`}
                >
                  {order.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RecentOrdersMatched
