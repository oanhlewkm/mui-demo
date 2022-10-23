import * as React from "react";
import { Box, Stack, Container } from "@mui/material";
import { Header } from "./header";

export function DefaultLayout({ children }) {
  return (
    <Stack minHeight={"100vh"}>
      <Header />
      <Box
        flexGrow={1}
        sx={{
          background:
            "radial-gradient(50% 30% at 20% 10%, rgba(0, 137, 233, 0.2) 0%, rgba(0, 137, 233, 0) 100%), \
            radial-gradient(50% 50% at 100% -30%, rgba(250, 176, 5, 0.1) 0%, rgba(250, 176, 5, 0) 100%), \
            radial-gradient(70% 50% at 50% 125%, rgba(0, 137, 233, 0.3) 0%, rgba(0, 137, 233, 0) 100%)",
        }}
      >
        <Container
          sx={{
            padding: {
              xs: 2,
              md: 4,
            },
          }}
        >
          {children}
        </Container>
      </Box>
    </Stack>
  );
}
