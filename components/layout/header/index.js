import {
  Box,
  Stack,
  Container,
  AppBar,
  Link as MuiLink,
  Toolbar,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ConnectWallet } from "../../connect-wallet";

import SwitchChainSelect from "./switch-chain";

export function Header() {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "rgba(55, 55, 55, 0.5)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar>
          <Container
            maxWidth="xl"
            sx={{
              px: {
                xs: 0,
                sx: 2,
              },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link href="/" passHref>
                <MuiLink
                  variant="body2"
                  sx={{
                    display: "contents",
                    "&:hover": {
                      textDecoration: "none",
                    },
                  }}
                >
                  <Box sx={{ display: { md: "block", xs: "none" } }} mt={1}>
                    <Image
                      src={`/logos/logo.png`}
                      alt="Logo"
                      width={265}
                      height={34}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: { md: "none", xs: "block" },
                      marginTop: "6px",
                    }}
                  >
                    <Image
                      src={`/logos/logo-mobile.svg`}
                      alt="Logo"
                      width={110}
                      height={34}
                    />
                  </Box>
                </MuiLink>
              </Link>
              <Stack direction="row" spacing={2} alignItems="center">
                <ConnectWallet />
                <SwitchChainSelect />
              </Stack>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
