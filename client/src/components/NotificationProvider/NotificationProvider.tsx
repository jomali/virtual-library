import React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const NotificationContext = React.createContext<INotifications>({
  error: () => null,
  info: () => null,
  success: () => null,
  warning: () => null,
});

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [snackPack, setSnackPack] = React.useState<readonly ISnackbarMessage[]>(
    []
  );
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<
    ISnackbarMessage | undefined
  >(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const handleOpen = React.useCallback(
    (message: string, variant: "error" | "info" | "success" | "warning") => {
      setSnackPack((previousValue) => [
        ...previousValue,
        {
          message,
          key: new Date().getTime(),
          variant,
        },
      ]);
    },
    []
  );

  const notifications: INotifications = React.useMemo(
    () => ({
      error: (message: string) => handleOpen(message, "error"),
      info: (message: string) => handleOpen(message, "info"),
      success: (message: string) => handleOpen(message, "success"),
      warning: (message: string) => handleOpen(message, "warning"),
    }),
    [handleOpen]
  );

  return (
    <NotificationContext.Provider value={notifications}>
      {children instanceof Function ? children(notifications) : children}

      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        autoHideDuration={6000}
        onClose={handleClose}
        open={open}
        TransitionProps={{ onExited: handleExited }}
      >
        <Alert
          onClose={handleClose}
          severity={messageInfo ? messageInfo.variant : undefined}
          variant="standard"
        >
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

interface ISnackbarMessage {
  message: string;
  key: number;
  variant: "error" | "info" | "success" | "warning";
}

interface INotifications {
  error: (message: string) => void;
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
}

export type NotificationProviderProps = {
  children:
    | ((notifications: INotifications) => React.ReactNode)
    | React.ReactNode;
};

export default NotificationProvider;
