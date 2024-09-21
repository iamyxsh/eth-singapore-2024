import {create} from 'zustand';

interface ContractStore {
  contract: any | null;
  provider: any | null;
  signer: any | null;
  setContract: (contract: any) => void;
  setProvider: (provider: any) => void;
  setSigner: (signer: any) => void;
}

export const useContractStore = create<ContractStore>((set) => ({
  contract: null,
  provider: null,
  signer: null,
  setContract: (contract) => set({ contract }),
  setProvider: (provider) => set({ provider }),
  setSigner: (signer) => set({ signer }),
}));
