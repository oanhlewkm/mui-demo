import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useEffect, useRef } from "react";
import { NETWORK_CHAINS } from "../utility/chain";
import { injected, walletconnect } from "../utility/connectors";
import {CONNECTORS} from '../utility/enum'

const useConnectWallet = () => {
  const { deactivate, active, activate, chainId, connector } = useWeb3React();
  const connectorMounted = useRef(undefined);

  useEffect(() => {
    if (!active && connectorMounted.current) disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    if (connector) {
      let currnetConnector;
      if (connector instanceof InjectedConnector) currnetConnector = CONNECTORS.injected;
      if (connector instanceof WalletConnectConnector) currnetConnector = CONNECTORS.walletconnect;
      localStorage.setItem("isConnected", JSON.stringify(true));
      if (currnetConnector) {
        localStorage.setItem("connector", currnetConnector);
        // dispatch(setCurrentConnector(currnetConnector));
        connectorMounted.current = currnetConnector;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector]);

  useEffect(() => {
    if (chainId) {
      localStorage.setItem("currentChainID", `${chainId}`);
      const chainObj = NETWORK_CHAINS.find((el) => el.id === chainId);
      // dispatch(setCurrentChain(chainObj));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);


  const connect = async (chainId, connectType) => {
    let dataActivate = null;
    if (connectType === CONNECTORS.injected ) {
      dataActivate = injected;
    } else if (connectType === CONNECTORS.walletconnect) {
      dataActivate = walletconnect(+chainId);
    }
    if (!dataActivate) return;
    await activate(dataActivate, undefined, true).catch((error) => {
      console.log("activate method", error)
    });
  };

  const disconnect = () => {
    active && deactivate();
    localStorage.removeItem("isConnected");
    localStorage.removeItem("connector");
    connectorMounted.current = undefined;
    // dispatch(setCurrentConnector(undefined));
  };

  return { disconnect, connect };
};

export default useConnectWallet;
