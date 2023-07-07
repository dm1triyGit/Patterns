import { Alert } from '@mui/material';
import { useToasterPosition, useToasterMessage } from './hooks';
import { StyledSnackbar } from './components';

const HIDE_TOASTER_TIME = 6000;

export const Toaster = (): JSX.Element => {
  const origin = useToasterPosition();
  const { open, setOpen, messageInfo, setMessageInfo } = useToasterMessage();

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleExited = (): void => {
    setMessageInfo(null);
  };

  return (
    <StyledSnackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={HIDE_TOASTER_TIME}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      message={messageInfo ? messageInfo.message : undefined}
      anchorOrigin={origin}
    >
      <Alert
        onClose={handleClose}
        severity={messageInfo?.severety}
        variant="filled"
      >
        {messageInfo?.message}
      </Alert>
    </StyledSnackbar>
  );
};
