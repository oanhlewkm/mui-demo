import { useWeb3React } from "@web3-react/core";
import { ADDED_CHAINS } from "../utility/chain";

const useSwitchOrAddNetwork = () => {
  const { active, library} = useWeb3React();

  return async (chainId) => {
    const provider = active ? library?.provider : window?.ethereum;;

    if (!provider) return false;
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
    } catch (switchError) {
      if (switchError.code === 4001)
        return {
          message: switchError?.message,
          code: switchError.code,
        }; // The request was rejected by the user

      const network = ADDED_CHAINS.find(
        (n) => n.chainId === `0x${chainId.toString(16)}`
      );
      // This error code indicates that the chain has not been added to MetaMask.
      if (network) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [network],
          });
        } catch (addError) {
          return {
            message: switchError?.message,
            code: switchError.code,
          };
        }
      }
    }
  };
};

export default useSwitchOrAddNetwork;
