import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Image from "next/image";
import { useTheme } from '@mui/material/styles';
import { CONNECTOR_TYPES } from '../../utility/enum';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '.MuiPaper-root' : {
    minWidth: '350px'
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function ChooseConnectorDialog({
  open, setOpen, handleConnect
}) {
  const theme = useTheme();
  const [connectTypes] = React.useState(() => {
    let list = [CONNECTOR_TYPES.browser, CONNECTOR_TYPES.walletconnect];
    if (window?.ethereum?.isAvacus) {
      list = [CONNECTOR_TYPES.avacus, CONNECTOR_TYPES.walletconnect];
    }
    return list;
  });

  const handleClose = () => {
    setOpen && setOpen(false);
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Connect a wallet
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Stack spacing={1} direction="row">
            {connectTypes.map((connect) => (
              <Button
                variant='text'
                key={connect.name}
                sx={{
                  width: `${100 / connectTypes.length}%`,
                  border: '1px solid',
                  borderColor: 'transparent',
                  borderRadius: 1,
                  '&:hover': {
                    borderColor: `${theme.palette.primary.main} !important`,
                  },
                }}
              >
                <Stack
                  onClick={() => {
                    handleConnect(connect.connector);
                    handleClose();
                  }}
                  spacing={1}
                  textAlign="center"
                  paddingY={1}
                >
                  <Image
                    src={connect.srcImg}
                    alt={connect.name}
                    width={64}
                    height={64}
                  />
                  <Typography sx={{
                    paddingTop: 1,
                    paddingBottom: 1.5,
                    textTransform: 'capitalize',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '24px',
                  }}>{connect.name}</Typography>
                </Stack>
              </Button>
          ))}
        </Stack>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
