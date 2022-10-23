import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: "https://mainnet.infura.io/v3/1c3acca035dd41dfbf400abac71e59a7" },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 8000
});
