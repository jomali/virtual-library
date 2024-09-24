import React from "react";

type StateAction = "RESET" | "SELECT";

type TableState = {
  selected: any;
};

const useTable = () => {
  const initialState: TableState = {
    selected: null,
  };

  const [state, dispatch] = React.useReducer(
    (
      state: TableState,
      action: { payload?: Partial<TableState>; type: StateAction }
    ) => {
      switch (action.type) {
        case "RESET":
          return initialState;
        case "SELECT":
          return {
            ...state,
            ...action.payload,
          };
        default:
          // XXX - create a suitable error in case the developer uses an
          // incorrect action
          throw new Error();
      }
    },
    initialState
  );

  const handleReset = () => {
    dispatch({
      type: "RESET",
    });
  };

  const handleSelect = (data?: Partial<TableState>) => {
    dispatch({
      type: "SELECT",
      payload: { selected: data },
    });
  };

  return {
    ...state,
    reset: handleReset,
    select: handleSelect,
  };
};

export default useTable;
