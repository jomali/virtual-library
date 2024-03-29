import React from "react";
import Snackbar from "./Snackbar";

const ACTION_OPEN = "ACTION_OPEN";
const ACTION_CLOSE = "ACTION_CLOSE";

export const SnackbarContext = React.createContext();

export const SnackbarProvider = ({ children }) => {
  const initialState = React.useMemo(
    () => ({
      message: "",
      open: false,
      variant: "success",
    }),
    []
  );
  const [state, dispatch] = React.useReducer((state, action) => {
    const { message, variant, ...otherAttributes } = action.payload;

    switch (action.type) {
      case ACTION_CLOSE:
        return {
          ...state,
          open: false,
        };
      case ACTION_OPEN:
        return {
          ...state,
          ...otherAttributes,
          message: message || initialState.message,
          open: true,
          variant: variant || initialState.variant,
        };
      default:
        return state;
    }
  }, initialState);

  const handleClose = () => {
    dispatch({
      payload: {},
      type: ACTION_CLOSE,
    });
  };

  const handleOpen = (message, options = {}) => {
    if (!state.open) {
      dispatch({
        payload: { ...options, message: message },
        type: ACTION_OPEN,
      });
    }
  };

  return (
    <>
      <SnackbarContext.Provider
        value={{
          open: handleOpen,
        }}
      >
        {children}
      </SnackbarContext.Provider>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        severity={state.variant}
      >
        {state.message}
      </Snackbar>
    </>
  );
};
