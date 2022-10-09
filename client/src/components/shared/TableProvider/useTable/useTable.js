import React from 'react';

const ACTION_RESET_STATE = 'ACTION_RESET_STATE';
const ACTION_SET_LAST_CLICKED = 'ACTION_SET_LAST_CLICKED';
const ACTION_SET_SELECTED = 'ACTION_SET_SELECTED';
const ACTION_SET_STATE = 'ACTION_SET_STATE';
const DEFAULT_ROWS_PER_PAGE = 100;
const STORAGE_MAIN_KEY = 'tableFilters';

/**
 * @typedef {Object} TableState
 * @property {Object} controls - Object with the current filter, paging and
 * sorting options active in the table.
 * @property {Object} lastClicked - Reference to the element in the last row
 * clicked by the user.
 * @property {Array} selected - Array with the references of all the elements
 * currently selected in the table.
 * @property {Function} setLastClicked - Sets the last clicked row object.
 * @property {Function} setSelected - Sets the selected rows array.
 * @property {Function} reset - Resets the state to its initial values.
 * @property {Function} updateControls - Updates the filter, pagination and
 * sorting table state.
 */

/**
 * @param {Object} options
 * @param {Object} [options.initialFilters]
 * @param {number} [options.initialRowsPerPage]
 * @param {string} [options.storageId] - The ID used by the local storage
 * @returns {TableState} The internal state of the table
 */
export default function useTable(options = {}) {
  const initialState = React.useMemo(
    () => ({
      filters: options.initialFilters || {},
      pagination: {
        lastValue: {},
        page: 0,
        rowsPerPage: options.initialRowsPerPage || DEFAULT_ROWS_PER_PAGE,
      },
      selected: [],
      sorting: [],
    }),
    [options.initialFilters, options.initialRowsPerPage]
  );

  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case ACTION_RESET_STATE:
        return action.payload;
      case ACTION_SET_SELECTED:
        return {
          ...state,
          lastClickedValue: action.payload.lastClickedValue,
          selected: action.payload.selected,
        };
      case ACTION_SET_STATE:
        return {
          ...state,
          filters: action.payload.filters,
          paging: action.payload.paging,
          sorting: action.payload.sorting,
        };
      default:
        // TODO - create a suitable error in case the developer uses an
        // incorrect action
        throw new Error();
    }
  }, initialState);

  const storeValue = React.useCallback(
    (value) => {
      if (options.storageId) {
        // XXX - The quick search filter is not persisted:
        const { quickSearch, ...filter } = value;
        const storageFilters =
          JSON.parse(localStorage.getItem(STORAGE_MAIN_KEY)) || {};
        localStorage.setItem(
          STORAGE_MAIN_KEY,
          JSON.stringify({ ...storageFilters, [options.storageId]: filter })
        );
      }
    },
    [options.storageId]
  );

  const handleReset = React.useCallback(() => {
    dispatch({
      type: ACTION_RESET_STATE,
      payload: initialState,
    });
  }, [initialState]);

  const handleSelect = React.useCallback((selected, lastClickedValue) => {
    dispatch({
      type: ACTION_SET_SELECTED,
      payload: { lastClickedValue, selected },
    });
  }, []);

  const handleSetLastClickedValue = React.useCallback((lastClickedValue) => {
    dispatch({
      type: ACTION_SET_LAST_CLICKED,
      payload: lastClickedValue,
    });
  }, []);

  const handleUpdate = React.useCallback(
    (data, cancelStorage) => {
      if (!cancelStorage) {
        storeValue(data);
      }
      dispatch({
        type: ACTION_SET_STATE,
        payload: data,
      });
    },
    [storeValue]
  );

  return {
    controls: {
      filters: {},
      initialFilters: {},
      initialPagination: {},
      initialQuickSearch: {},
      initialSorting: {},
      pagination: { lastValue: null, page: 0, rowsPerPage: 100 },
      quickSearch: null,
      sorting: [],
    },
    selected,
    setSelected,
    updateControls: () => null,

    // lastClicked,
    // selected,
    // state,
    // setLastClicked,
    // setSelected,
    // reset: handleReset,
    // update: handleUpdate,
  };
}
