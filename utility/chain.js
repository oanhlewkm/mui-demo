const BLOCKCHAIN_NETWORK = process.env.NEXT_PUBLIC_BLOCKCHAIN ?? "testnet";

const MATIC = {
  name: "Matic Token",
  symbol: "MATIC",
  decimals: 18,
};

const BNB = {
  name: "BNB",
  symbol: "BNB",
  decimals: 18,
};

const ETH = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

export const KNOWN_CHAINS = new Map([
  [
    56,
    {
      id: 56,
      nativeCurrency: BNB,
      fullName: "Binance Smart Chain",
      shortName: "BSC Mainnet",
      explorerUrl: `https://bscscan.com`,
      networks: ["mainnet"],
      blockchainName: "bsc",
    },
  ],
  [
    97,
    {
      id: 97,
      nativeCurrency: BNB,
      fullName: "BSC Testnet",
      shortName: "BSC Testnet",
      explorerUrl: `https://testnet.bscscan.com`,
      networks: ["testnet"],
      blockchainName: "bsc",
    },
  ],
  [
    80001,
    {
      id: 80001,
      nativeCurrency: MATIC,
      type: "mumbai",
      fullName: "Polygon Testnet",
      shortName: "Mumbai",
      explorerUrl: `https://mumbai.polygonscan.com`,
      networks: ["testnet"],
      isSupported: true,
      blockchainName: "polygon",
    },
  ],
  [
    137,
    {
      id: 137,
      nativeCurrency: MATIC,
      type: "matic",
      fullName: "Polygon",
      shortName: "Matic",
      explorerUrl: `https://polygonscan.com`,
      networks: ["mainnet"],
      isSupported: true,
      blockchainName: "polygon",
      subgraph: "",
      lendingFunds: [],
      isSupportedClaimReward: false,
    },
  ],
  [
    1,
    {
      id: 1,
      nativeCurrency: ETH,
      type: "main",
      fullName: "Ethereum",
      shortName: "Mainnet",
      explorerUrl: `https://etherscan.io`,
      networks: ["mainnet"],
      blockchainName: "ethereum",
      isSupported: false,
    },
  ],
  [
    4,
    {
      id: 4,
      nativeCurrency: ETH,
      type: "rinkeby",
      fullName: "Ethereum Rinkeby",
      shortName: "Rinkeby",
      explorerUrl: `https://rinkeby.etherscan.io`,
      networks: ["testnet"],
      blockchainName: "ethereum",
      isSupported: true,
    },
  ],
]);

export const ADDED_CHAINS = [
  {
    chainId: "0x38", //56
    chainName: KNOWN_CHAINS.get(56)?.fullName,
    nativeCurrency: BNB,
    rpcUrls: ["https://bsc-dataseed1.ninicoin.io/"],
    blockExplorerUrls: [KNOWN_CHAINS.get(56)?.explorerUrl],
  },
  {
    chainId: "0x61", // 97
    chainName: KNOWN_CHAINS.get(97)?.fullName,
    nativeCurrency: BNB,
    rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545/"],
    blockExplorerUrls: [KNOWN_CHAINS.get(97)?.explorerUrl],
  },
  {
    chainId: "0x89", //137
    chainName: KNOWN_CHAINS.get(137)?.fullName,
    nativeCurrency: MATIC,
    rpcUrls: [
      "https://polygon-rpc.com/",
      "https://rpc-mainnet.maticvigil.com/",
    ],
    blockExplorerUrls: [KNOWN_CHAINS.get(137)?.explorerUrl],
  },
  {
    chainId: "0x13881", //80001
    chainName: KNOWN_CHAINS.get(80001)?.fullName,
    nativeCurrency: MATIC,
    rpcUrls: [
      "https://matic-mumbai.chainstacklabs.com",
      "https://rpc-mumbai.matic.today/",
    ],
    blockExplorerUrls: [KNOWN_CHAINS.get(80001)?.explorerUrl],
  },
];

export const NETWORK_CHAINS = Array.from(KNOWN_CHAINS.values()).reduce(
  (result, chain) => {
    if (chain.networks && chain.networks.includes(BLOCKCHAIN_NETWORK)) {
      result.push(chain);
    }
    return result;
  },
  []
);

export const NETWORK_CHAIN_IDS = NETWORK_CHAINS.reduce(
  (result, chain) => {
    chain.id && result.push(chain.id);
    return result;
  },
  []
);
