import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { NETWORK_CHAIN_IDS } from "./chain";
import { RPC_URLS } from "./enum";

export const Injected = new InjectedConnector({
  supportedChainIds: NETWORK_CHAIN_IDS
});

export const WalletConnect = (chainId) => new WalletConnectConnector({
  rpc: {...RPC_URLS},
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 8000,
  chainId: +chainId,
  supportedChainIds: NETWORK_CHAIN_IDS
});
