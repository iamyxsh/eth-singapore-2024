import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Token, useLiquidityStore } from "./state/state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import CustomDropdown from "../CustomDropdown";

interface AddLiquidityProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddLiquidity: React.FC<AddLiquidityProps> = ({ isOpen, onClose }) => {
  const {
    depositToken,
    depositAmount,
    currentPrice,
    updateDepositToken,
    updateDepositAmount,
    updateCurrentPrice,
  } = useLiquidityStore();

  const [selectedSecondaryTokens, setSelectedSecondaryTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [primaryMinPrice, setPrimaryMinPrice] = useState<number | null>(null);
  const [primaryMaxPrice, setPrimaryMaxPrice] = useState<number | null>(null);
  const [secondaryMinPrice, setSecondaryMinPrice] = useState<number | null>(null);
  const [secondaryMaxPrice, setSecondaryMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (selectedToken) {
      const { minPrice: tokenMinPrice, maxPrice: tokenMaxPrice } = selectedToken;
      setSecondaryMinPrice(tokenMinPrice!);
      setSecondaryMaxPrice(tokenMaxPrice!);
    }
  }, [selectedToken]);

  const handlePrimaryPriceRangeChange = (value: number) => {
    const pricePercentage = (value / 100).toFixed(2);
    const newMinPrice = Math.max(0, parseFloat(pricePercentage) - 0.25);
    const newMaxPrice = parseFloat(pricePercentage);
    setPrimaryMinPrice(newMinPrice);
    setPrimaryMaxPrice(newMaxPrice);
    updateDepositToken({ ...depositToken, minPrice: newMinPrice, maxPrice: newMaxPrice });
  };

  const handleSecondaryPriceRangeChange = (value: number) => {
    if (selectedToken) {
      const pricePercentage = (value / 100).toFixed(2);
      const newMinPrice = Math.max(0, parseFloat(pricePercentage) - 0.25);
      const newMaxPrice = parseFloat(pricePercentage);
      setSecondaryMinPrice(newMinPrice);
      setSecondaryMaxPrice(newMaxPrice);
      updateDepositToken({ ...selectedToken, minPrice: newMinPrice, maxPrice: newMaxPrice });
    }
  };

  const handleConfirmPriceRange = () => {
    if (selectedToken) {
      const averagePrice = (secondaryMinPrice! + secondaryMaxPrice!) / 2;
      updateCurrentPrice(averagePrice.toFixed(4));
    }
  };

  const tokens: Token[] = [
    {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      availableBalance: 0,
      address: "0xWBTCAddress",
      minPrice: 40000,
      maxPrice: 60000,
    },
    {
      name: "Wrapped Ether",
      symbol: "WETH",
      availableBalance: 0,
      address: "0xWETHAddress",
      minPrice: 2500,
      maxPrice: 4000,
    },
    {
      name: "Dexter Token",
      symbol: "DXTR",
      availableBalance: 0,
      address: "0xDXTRAddress",
      minPrice: 0.1,
      maxPrice: 0.5,
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      availableBalance: 0,
      address: "0xUSDCAddress",
      minPrice: 1,
      maxPrice: 1.2,
    },
  ];

  const handleSecondaryTokenSelect = (tokenSymbol: string) => {
    const selectedToken = tokens.find((token) => token.symbol === tokenSymbol);
    if (selectedToken) {
      setSelectedToken(selectedToken);
      setSecondaryMinPrice(selectedToken.minPrice!);
      setSecondaryMaxPrice(selectedToken.maxPrice!);
    }
  };

  const addToken = () => {
    if (
      selectedToken &&
      selectedSecondaryTokens.length < 3 &&
      !selectedSecondaryTokens.some((t) => t.symbol === selectedToken.symbol)
    ) {
      setSelectedSecondaryTokens([...selectedSecondaryTokens, selectedToken]);
      setSelectedToken(null);
      setSecondaryMinPrice(null);
      setSecondaryMaxPrice(null);
    }
  };

  const removeSecondaryToken = (token: Token) => {
    setSelectedSecondaryTokens(selectedSecondaryTokens.filter((t) => t.symbol !== token.symbol));
  };

  const dropdownItems = tokens.map(token => ({
    value: token.symbol,
    label: token.symbol,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full min-w-[80%]">
        <DialogHeader>
          <DialogTitle>Add Liquidity</DialogTitle>
          <DialogDescription>
            Provide liquidity to the selected pool by adding your tokens here.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 bg-[#1b1b1b] rounded-lg max-w-full mx-auto">
          <h2 className="text-white text-2xl mb-4">ADD LIQUIDITY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex space-x-2 bg-primary p-4 rounded-lg mb-4">
                <p className="text-white">Current Available Balance:</p>
                <p className="text-white">0 {depositToken.symbol}</p>
              </div>

              <div className="mb-4">
                <Label className="text-white mb-4">Select Deposit Token</Label>
                <CustomDropdown
                  items={dropdownItems}
                  placeholder="Select Deposit Token"
                  value={depositToken.symbol}
                  onChange={(tokenSymbol) => {
                    const selectedToken = tokens.find((token) => token.symbol === tokenSymbol);
                    if (selectedToken) {
                      updateDepositToken(selectedToken);
                    }
                  }}
                  className="bg-[#1b1b1b] text-white"
                />
              </div>

              <div className="mb-4">
                <Label className="text-white mb-2">Deposit Amount</Label>
                <Input
                  placeholder="Enter Amount"
                  value={depositAmount}
                  onChange={(e) => updateDepositAmount(e.target.value)}
                  className="bg-[#1b1b1b] text-white mt-2"
                />
              </div>

              <div className="mb-4">
                <Label className="text-white mb-2">Set Primary Price Range</Label>
                <Slider
                  className="w-full"
                  max={100}
                  defaultValue={[50]}
                  step={1}
                  onValueChange={(value) => handlePrimaryPriceRangeChange(value[0])}
                />
                <div className="flex justify-between mt-2 text-white">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="mb-4">
                <Label className="text-white mb-2">Select Up to 3 Secondary Tokens</Label>
                <CustomDropdown
                  items={dropdownItems.filter(
                    (token) => token.value !== depositToken.symbol
                  )}
                  placeholder="Select Token"
                  value={selectedToken?.symbol || ""}
                  onChange={handleSecondaryTokenSelect}
                  className="bg-[#1b1b1b] text-white"
                />
                <Button
                  className="bg-primary mt-2"
                  onClick={addToken}
                  disabled={
                    !selectedToken || selectedSecondaryTokens.length >= 3
                  }
                >
                  Add Token
                </Button>
                <div className="flex space-x-2 mt-2">
                  {selectedSecondaryTokens.map((token) => (
                    <div
                      key={token.symbol}
                      className="bg-primary text-white px-3 py-1 rounded-full flex items-center space-x-2"
                    >
                      <span>{token.symbol}</span>
                      <button
                        onClick={() => removeSecondaryToken(token)}
                        className="text-red-400"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white mb-4">Set Secondary Price Range</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col bg-[#2a2a2a] rounded-lg p-4">
                  <Label className="text-gray-400 mb-2">
                    Minimum Price {selectedToken ? `(${selectedToken.symbol})` : `(${depositToken.symbol})`} {selectedToken ? "(Editing)" : ""}
                  </Label>
                  <Input
                    value={secondaryMinPrice?.toFixed(4) || ""}
                    onChange={(e) => setSecondaryMinPrice(parseFloat(e.target.value))}
                    className="text-white flex-1 text-center rounded-lg"
                  />
                  <span className="text-gray-400 text-sm mt-2">
                    This is the minimum price for your liquidity position.
                  </span>
                </div>

                <div className="flex flex-col bg-[#2a2a2a] rounded-lg p-4">
                  <Label className="text-gray-400 mb-2">
                    Maximum Price {selectedToken ? `(${selectedToken.symbol})` : `(${depositToken.symbol})`} {selectedToken ? "(Editing)" : ""}
                  </Label>
                  <Input
                    value={secondaryMaxPrice?.toFixed(4) || ""}
                    onChange={(e) => setSecondaryMaxPrice(parseFloat(e.target.value))}
                    className="text-white flex-1 text-center rounded-lg"
                  />
                  <span className="text-gray-400 text-sm mt-2">
                    This is the maximum price for your liquidity position.
                  </span>
                </div>
              </div>

              {/* Current Price */}
              <div className="flex flex-col bg-[#2a2a2a] rounded-lg p-4 text-center">
                <Label className="text-gray-400 mb-2 text-lg">
                  Current Price
                </Label>
                <div className="text-white text-2xl font-bold">
                  {currentPrice} USD per USDC
                </div>
                <span className="text-gray-400 mt-2 text-sm">
                  This is the current market price of the token pair.
                </span>
              </div>

              <Button
                className="bg-primary w-full"
                onClick={handleConfirmPriceRange}
              >
                Confirm Price Range
              </Button>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button className="bg-primary w-full mt-10 max-w-md flex self-center">
              Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLiquidity;
