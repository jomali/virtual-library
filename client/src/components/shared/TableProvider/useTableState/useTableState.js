import React from 'react';
import * as tableActions from './tableActions';

const tableReducer = (state, action) => {
  switch (action.type) {
    case tableActions.RESET:
      return {
        ...action.payload,
      };
    case tableActions.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case tableActions.SET_FILTER:
      return {
        ...state,
        filter: {
          content: {
            ...action.payload.content,
          },
          page: action.payload.page,
          quickSearch: action.payload.quickSearch,
          rowsPerPage: action.payload.rowsPerPage,
        },
      };
    case tableActions.SET_LAST_CLICKED:
      return {
        ...state,
        lastClicked: action.payload,
      };
    case tableActions.SET_ROW_COUNT:
      return {
        ...state,
        rowCount: action.payload,
      };
    case tableActions.SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      throw new Error();
  }
};

export default function useTableState(
  initialRowsPerPage = 25,
  initialFilterContent = {}
) {
  const initialState = {
    data: [],
    filter: {
      content: initialFilterContent,
      page: 0,
      quickSearch: null,
      rowsPerPage: initialRowsPerPage,
    },
    lastClicked: null,
    rowCount: -1,
    selected: [],
  };

  const [state, dispatch] = React.useReducer(tableReducer, initialState);

  const reset = React.useCallback(() => {
    dispatch({
      type: tableActions.RESET,
      payload: initialState,
    });
  }, [initialState]);

  const setData = React.useCallback((data) => {
    dispatch({
      type: tableActions.SET_DATA,
      payload: data,
    });
  }, []);

  const setFilter = React.useCallback((filter) => {
    dispatch({
      type: tableActions.SET_FILTER,
      payload: filter,
    });
  }, []);

  const setLastClicked = React.useCallback((lastClicked) => {
    dispatch({
      type: tableActions.SET_LAST_CLICKED,
      payload: lastClicked,
    });
  }, []);

  const setRowCount = React.useCallback((rowCount) => {
    dispatch({
      type: tableActions.SET_ROW_COUNT,
      payload: rowCount,
    });
  }, []);

  const setSelected = React.useCallback((selected) => {
    dispatch({
      type: tableActions.SET_SELECTED,
      payload: Boolean(selected) ? selected : [],
    });
  }, []);

  return {
    data: state.data,
    filter: state.filter,
    lastClicked: state.lastClicked,
    rowCount: state.rowCount,
    selected: state.selected,
    state: state,
    dispatch,
    reset,
    setData,
    setFilter,
    setLastClicked,
    setRowCount,
    setSelected,
  };
}
