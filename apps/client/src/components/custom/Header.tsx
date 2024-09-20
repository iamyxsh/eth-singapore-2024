import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trade, Earn, Faucet, Portfolio } from "@/pages";
import { Button } from "../ui/button";
import { onboard } from "@/lib/web3Onboard";
import useWalletStore from "@/stores/walletStore";
import CustomDropdown from "./CustomDropdown";
import shortenAddress from "@/lib/shortenAddress";

const HeaderWithTabs = () => {
  const connectedWalletAddress = useWalletStore((state) => state.address);
  const isWalletConnected = useWalletStore((state) => state.connected);
  const setWallet = useWalletStore((state) => state.setWallet);
  const disconnect = useWalletStore((state) => state.disconnect);

  const handleConnect = async () => {
    // Connect the wallet first
    const wallets = await onboard.connectWallet();

    if (wallets.length) {
      const connectedWallet = wallets[0];
      const address = connectedWallet.accounts[0].address;
      const chainId = connectedWallet.chains[0]?.id;

      setWallet(address, chainId);
      console.log("Connected Wallet:", wallets[0].accounts[0].address);

      // Now set the Amoy Testnet chain
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
    }, // Fallback to empty string
    { value: "logout", label: "Log Out" },
  ];

  return (
    <Tabs defaultValue="trade" className="flex flex-col h-screen ">
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
                value="earn"
                className="font-bold px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-800 data-[state=inactive]:text-gray-400"
              >
                Earn
              </TabsTrigger>
              <TabsTrigger
                value="portfolio"
                className="font-bold px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-800 data-[state=inactive]:text-gray-400"
              >
                Portfolio
              </TabsTrigger>
            </TabsList>
          </div>
          {isWalletConnected ? (
            <div>
              <CustomDropdown
                value=""
                items={dropdownItems}
                placeholder="Wallet"
                // label=""
                onChange={(value) => {
                  if (value === "logout") {
                    handleLogout();
                  }
                }}
              />
            </div>
          ) : (
            <Button onClick={handleConnect}>Connect</Button>
          )}
        </nav>
      </div>

      {/* Tabs Content Section */}
      <div className="flex-1 overflow-auto px-4">
        <TabsContent value="trade">
          <Trade />
        </TabsContent>

        <TabsContent value="faucet">
          <Faucet />
        </TabsContent>

        <TabsContent value="earn">
          <Earn />
        </TabsContent>

        <TabsContent value="portfolio">
          <Portfolio />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default HeaderWithTabs;
