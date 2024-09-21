import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trade, Faucet } from "@/pages";
import { Button } from "../ui/button";
import { onboard } from "@/lib/web3Onboard";
import useWalletStore from "@/stores/walletStore";
import CustomDropdown from "./CustomDropdown";
import shortenAddress from "@/lib/shortenAddress";
import { useState } from "react";
import ManageLiquidity from "@/pages/ManageLiquidity";
import Stake from "@/pages/Stake";
import useContract from "@/hooks/useContract";
import { dummyABI } from "@/data/dummyAbi";

const contractAddress = "0x4dC9a75DA9D44e3C8B26e5B7C6f03418a31E8eA4"; // Example test contract address (replace with a valid test contract address if needed)


const HeaderWithTabs = () => {
  const connectedWalletAddress = useWalletStore((state) => state.address);
  const isWalletConnected = useWalletStore((state) => state.connected);
  const setWallet = useWalletStore((state) => state.setWallet);
  const disconnect = useWalletStore((state) => state.disconnect);
  const [activeTab, setActiveTab] = useState("trade");

    // Initialize the contract with the hook
  useContract(contractAddress, dummyABI);

  const handleConnect = async () => {
    const wallets = await onboard.connectWallet();

    if (wallets.length) {
      const connectedWallet = wallets[0];
      const address = connectedWallet.accounts[0].address;
      const chainId = connectedWallet.chains[0]?.id;

      setWallet(address, chainId);

      await onboard.setChain({ chainId: "0x13882" });
    } else {
      console.log("No wallet connected");
    }
  };

  const handleLogout = () => {
    disconnect();
  };

  const dropdownItems = [
    {
      value: connectedWalletAddress || "",
      label: shortenAddress(connectedWalletAddress!) || "Wallet Address",
    },
    { value: "logout", label: "Log Out" },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);

  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col h-screen ">
      <div className="sticky top-0 z-50 ">
        <nav className="flex items-center justify-between p-5 pl-2 mx-auto max-w-7xl">
          <p className="text-lg font-bold">
            <img src="src/assets/dextr-white.png" alt="Logo" className="h-7" />
          </p>
          <div className="flex flex-1 justify-center">
            <TabsList className="flex space-x-4 border border-primary !bg-gray-800">
              <TabsTrigger
                value="trade"
                className="font-bold px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-800 data-[state=inactive]:text-gray-400"
              >
                Trade
              </TabsTrigger>
              <TabsTrigger
                value="faucet"
                className="font-bold px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-800 data-[state=inactive]:text-gray-400"
              >
                Faucet
              </TabsTrigger>
              <TabsTrigger
                value="manage-liquidity"
                className="font-bold px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-800 data-[state=inactive]:text-gray-400"
              >
                Manage Liquidity
              </TabsTrigger>
              <TabsTrigger
                value="stake"
                className="font-bold px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-800 data-[state=inactive]:text-gray-400"
              >
                Stake
              </TabsTrigger>
            </TabsList>
          </div>
          {isWalletConnected ? (
            <div>
              <CustomDropdown
                value=""
                items={dropdownItems}
                placeholder={shortenAddress(connectedWalletAddress!) || ""}
                onChange={(value) => {
                  if (value === "logout") {
                    handleLogout();
                  }
                }}
                className="rounded-xl"
              />
            </div>
          ) : (
            <Button onClick={handleConnect}>Connect</Button>
          )}
        </nav>
      </div>

      <div className="flex-1 overflow-auto px-4">
        <TabsContent value="trade">
          <Trade />
        </TabsContent>

        <TabsContent value="faucet">
          <Faucet />
        </TabsContent>

        <TabsContent value="manage-liquidity">
          <ManageLiquidity />
        </TabsContent>

        <TabsContent value="stake">
          <Stake />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default HeaderWithTabs;
