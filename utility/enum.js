export const RPC_URLS = Object.freeze({
  56: "https://bsc-dataseed1.ninicoin.io/",
  97: "https://data-seed-prebsc-2-s3.binance.org:8545/",
  137: "https://rpc-mainnet.maticvigil.com/",
  80001: "https://matic-mumbai.chainstacklabs.com",
  4: "https://rinkeby.infura.io/v3/2919ba76d1cc4c58a3649de1a7222768",
  1: "https://rinkeby.infura.io/v3/2919ba76d1cc4c58a3649de1a7222768",
});

export const CONNECTORS = Object.freeze({
  injected: 'injected',
  walletconnect: 'walletconnect'
});

export const CONNECTOR_TYPES = Object.freeze({
  avacus: {
    name: 'Avacus Wallet',
    srcImg: '/connects/metamask.svg',
    connector: CONNECTORS.injected
  },
  browser: {
    name: 'Browser Wallet',
    srcImg: '/connects/metamask.svg',
    connector: CONNECTORS.injected
  },
  walletconnect: {
    name: 'WalletConnect',
    srcImg: '/connects/walletconnect.svg',
    connector: CONNECTORS.walletconnect
  },
});