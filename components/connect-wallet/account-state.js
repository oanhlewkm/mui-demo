import {
  Divider,
  Stack,
  Button,
  Menu,
  MenuItem,
  Typography,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import multiavatar from "@multiavatar/multiavatar";
import parse from "html-react-parser";
import React, { useState, useMemo } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MessageIcon from "@mui/icons-material/Message";
import Link from "next/link";
import Image from "next/image";
import { shortenAddress } from "../../utility/formats";

export default function AccountState({
  account,
  disconnect,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const avatar = useMemo(() => {
    return multiavatar(account);
  }, [account]);

  return (
    <>
      <Button
        sx={{
          p: 0,
          minWidth: 0,
          "& svg": {
            height: "36px",
          },
        }}
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {parse(`${avatar}`)}
      </Button>
      <Menu
        id="account-menu"
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
        <MenuItem>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              padding: 1,
              background: "#757078",
              borderRadius: 1,
            }}
          >
            <AccountBalanceWalletIcon />
            <Typography variant="body2">{shortenAddress(account)}</Typography>
            <IconButton
              sx={{
                p: 0,
              }}
            >
              <Image
                src="/icons/ic-explore.svg"
                alt="Explore icon"
                height="24px"
                width="24px"
              />
            </IconButton>
          </Stack>
        </MenuItem>
        <Divider
          variant="middle"
          sx={{
            borderStyle: "dashed",
            borderColor: "#757078",
          }}
        />
        <MenuItem>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextSnippetIcon />
            <Link href={`/${account}/offers`} passHref>
              <MuiLink variant="body2" onClick={handleClose}>
                My Offers
              </MuiLink>
            </Link>
          </Stack>
        </MenuItem>
        <MenuItem>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MessageIcon />
            <Link href={`/${account}/ads`} passHref>
              <MuiLink variant="body2" onClick={handleClose}>
                My Advertisements
              </MuiLink>
            </Link>
          </Stack>
        </MenuItem>
        <Divider
          variant="middle"
          sx={{
            borderStyle: "dashed",
            borderColor: "#757078",
          }}
        />
        <MenuItem>
          <Button variant="outlined" fullWidth onClick={() => disconnect()}>
            Disconnect Wallet
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
}
