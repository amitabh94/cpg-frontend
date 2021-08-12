export interface MerchantWallets {
  unvalidatedBalance: number;
  validatedBalance: number;
  cryptocurrency: CryptoType;
};

export interface CryptoType {
  longname: string;
};


export interface MerchantTransactions {
  cryptocurrency: CryptoType;
  status: number;
  fromAddress: string;
  toAddress: string;
  amount: number;
  blockNumber: number;
  gasFee: number;
  transactionHash: number;
};
