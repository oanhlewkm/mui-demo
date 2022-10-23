import { Box, Button, CircularProgress } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useRef, useState } from "react";
import AccountState from "./account-state";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect
} from '@web3-react/walletconnect-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector';
import Image from "next/image";
import ChooseConnectorDialog from "./choose-connector";
import { parseJson } from "../../utility/formats";
import { CONNECTORS } from "../../utility/enum";
import { getErrorMessage } from "../../helpers/ethereum-error-helper";
import useSwitchOrAddNetwork from "../../hooks/use-switch-network";
import useConnectWallet from "../../hooks/use-connect-wallet";
import { NETWORK_CHAINS } from "../../utility/chain";

export function ConnectWallet() {
  const [callConnect, setCallConnect] = useState(false);

  const switchOrAddNetwork = useSwitchOrAddNetwork();
  const { active, account, error, library } = useWeb3React();
  const [showError, setShowError] = useState(false);
  const [openChooseConnector, setOpenChooseConnector] = useState(false);
  const connectorMounted = useRef(undefined);
  const { connect, disconnect } = useConnectWallet();

  useEffect(() => {
    if (error) {
      if (
        error instanceof UserRejectedRequestErrorWalletConnect ||
        error instanceof UserRejectedRequestErrorInjected
      ) {
        handleDisconnect();
      }
      setCallConnect(false);
      const message = getErrorMessage(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    const connectOnReload = async (lastConnector) => {
      try {
        const id = localStorage.getItem("currentChainID") ?? currentChainId;
        connectorMounted.current = lastConnector;
        await connect(id, lastConnector);
      } catch (ex) {
        console.log("connectOnReload", ex);
        setCallConnect(false);
        handleDisconnect();
      }
    };

    const checkWalletIsConnected = async (isConnected) => {
      if (isConnected) {
        const { ethereum } = window;
        if (ethereum) {
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts.length <= 0) handleDisconnect();
          else if (!active) connectOnReload(CONNECTORS.injected);
        }
      } else {
        handleDisconnect();
        return;
      }
    };
    const isConnected = localStorage.getItem("isConnected") === "true";
    if (!active && !connectorMounted.current && isConnected) {
      const lastConnector = localStorage.getItem('connector');
      const walletconnect = localStorage.getItem('walletconnect');
      const objWalletconnect = walletconnect ? parseJson(walletconnect) : null;
      if (lastConnector === CONNECTORS.walletconnect && objWalletconnect?.connected) {
        connectOnReload(CONNECTORS.walletconnect);
      }
      else if (lastConnector === CONNECTORS.injected) checkWalletIsConnected(isConnected);
      else handleDisconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDisconnect = async () => {
    disconnect();
    setCallConnect(false);
    connectorMounted.current = undefined;
    setShowError(false);
  };

  const injectedConnect = async () => {
   
  };

  const handleConnect = async (connector) => {
    const currentChainId = localStorage.getItem('currentChainID') ?? NETWORK_CHAINS[0].id;
    connectorMounted.current = connector;
    if (connector === CONNECTORS.injected) injectedConnect();
    else if (connector === CONNECTORS.walletconnect) {
      await connect(currentChainId, connector)
    }
  }

  return (
    <>
      <Box>
        {active ? (
          <AccountState account={account} disconnect={handleDisconnect} />
        ) : (
          <Button
            variant="contained"
            onClick={() => setOpenChooseConnector(true)}
            startIcon={
              callConnect ? (
                <CircularProgress size={14} sx={{ color: "white" }} />
              ) : (
                <Image
                  src={`/icons/ic-link.svg`}
                  height={14}
                  width={14}
                  alt="Link icon"
                />
              )
            }
          >
            Connect Wallet
          </Button>
        )}
      </Box>
      {openChooseConnector && (
        <ChooseConnectorDialog
          open={openChooseConnector}
          setOpen={setOpenChooseConnector}
          handleConnect={handleConnect}
        />
      )}
    </>
  );
}
