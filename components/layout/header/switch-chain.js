import React, { useEffect, useState } from "react";
import {
  Stack,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  ListItemText,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import useSwitchOrAddNetwork from "../../../hooks/use-switch-network";
import { NETWORK_CHAINS } from "../../../utility/chain";

const SwitchChainSelect = () => {
  // const dispatch = useDispatch();
  const theme = useTheme();
  const switchOrAddNetwork = useSwitchOrAddNetwork();
  const { account } = useWeb3React();

  const [selectedChainId, setSelectedChainId] = useState(
    NETWORK_CHAINS[0].id
  );
  const [currentChain, setCurrentChain] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const fetchCurrentChain = () => {
      let chain = NETWORK_CHAINS.find(
        (network) => `${network.id}` === `${selectedChainId}`
      );
      if (!chain) chain = NETWORK_CHAINS[0];
      setCurrentChain(chain);
    };
    if (selectedChainId) fetchCurrentChain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChainId]);

  const handleSwitchChain = async (chain) => {
    try {
      const result = await switchOrAddNetwork(chain.id);
      if (result === true) {
        setCurrentChain(chain);
      }
      else {
        console.log(result)
      }
    } catch (ex) {
      console.log("handleSwitchChain", ex);
    }
  };

  const onChangeChain = async (chain) => {
    handleClose();
    if (selectedChainId === chain.id) return;
    if (account) {
      handleSwitchChain(chain);
    }
    else {
      // dispatch(setCurrentChain(chain));
    }
  };

  return currentChain ? (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Button
        variant="outlined"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          textTransform: "none",
          padding: {
            xs: "5px 5px",
            md: "5px 15px",
          },
          minWidth: {
            xs: "36px",
          },
          height: "34px",
        }}
      >
        <Image
          src={`/chains/${currentChain.blockchainName}.svg`}
          height={18}
          width={18}
          alt={currentChain.fullName}
        />
        <Typography
          variant="button"
          color="primary"
          display={{ xs: "none", sm: "block", md: "block" }}
          ml={1}
        >
          {currentChain.fullName}
        </Typography>
      </Button>
      <Menu
        id="switch-chain-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 180,
            overflow: "visible",
            background: "rgba(15, 14, 14, 0.5)",
            backdropFilter: "blur(10px)",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "rgba(15, 14, 14, 0.5)",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {NETWORK_CHAINS.map((chain) => (
          <MenuItem
            key={chain.id}
            value={chain.id}
            onClick={() => onChangeChain(chain)}
          >
            <ListItemIcon>
              <Image
                src={`/chains/${chain.blockchainName}.svg`}
                height={18}
                width={18}
                alt={chain.fullName}
              />
            </ListItemIcon>
            <ListItemText
              sx={{
                fontSize: "14px",
                fontWeight:
                  `${selectedChainId}` !== `${chain.id}`
                    ? theme.typography.fontWeightMedium
                    : theme.typography.fontWeightBold,
              }}
            >
              {chain.fullName}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  ) : (
    <></>
  );
};

export default SwitchChainSelect;
