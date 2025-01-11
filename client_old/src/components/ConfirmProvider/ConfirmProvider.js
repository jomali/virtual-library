import React from "react";
import ConfirmationDialog from "./ConfirmDialog";

export const ConfirmContext = React.createContext();

export const ConfirmProvider = ({ children }) => {
  const [callbacks, setCallbacks] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState({
    description:
      "Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.",
    title: "Confirm action",
  });

  const defaultCallbacks = React.useMemo(
    () => ({
      onAccept: () => null,
      onCancel: () => null,
    }),
    []
  );

  const defaultOptions = React.useMemo(
    () => ({
      description:
        "You cannot undo this action. Are you sure you want to continue?",
      title: "Confirmation dialog",
    }),
    []
  );

  const confirm = React.useCallback(
    (specificOptions, specificCallbacks = {}) => {
      setCallbacks({ ...defaultCallbacks, ...specificCallbacks });
      setOptions({ ...defaultOptions, ...specificOptions });
      setOpen(true);
    },
    [defaultCallbacks, defaultOptions]
  );

  return (
    <>
      <ConfirmContext.Provider value={confirm}>
        {children}
      </ConfirmContext.Provider>
      <ConfirmationDialog
        onAccept={() => {
          setOpen(false);
          callbacks.onSuccess();
        }}
        onCancel={() => {
          setOpen(false);
          callbacks.onCancel();
        }}
        open={open}
        {...options}
      />
    </>
  );
};
