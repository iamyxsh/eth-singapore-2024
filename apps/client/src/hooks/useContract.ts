// useContract.ts
import { useEffect } from 'react';
import { ethers } from 'ethers';
import { useContractStore } from '@/stores/contract/contractStore';

const useContract = (contractAddress: string, contractABI: any) => {
  const setContract = useContractStore((state) => state.setContract);
  const setProvider = useContractStore((state) => state.setProvider);
  const setSigner = useContractStore((state) => state.setSigner);

  useEffect(() => {
    const initProvider = async () => {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum); // Change to BrowserProvider
        const signer = await provider.getSigner(); // Use await here
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        const testing = await contractInstance.getAddress();
        console.log({provider, signer, contractInstance, testing}, "Intialized...")
        setProvider(provider);
        setSigner(signer);
        setContract(contractInstance);
      }
    };

    initProvider();
  }, [contractAddress, contractABI, setContract, setProvider, setSigner]);
};

export default useContract;
