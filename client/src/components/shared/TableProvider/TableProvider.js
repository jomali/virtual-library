import React from 'react';
import PropTypes from 'prop-types';
import * as objectUtils from 'components/shared/objectUtils';

export const TableContext = React.createContext();

export const TableProvider = ({
  children,
  columns,
  count = -1,
  initialState = {},
  loading = false,
  onChange = () => null,
  onClick = () => null,
  onSelect = () => null,
  rows = [],
  selectable = false,
  selected = [],
  selector = (value) => value,
  state,
}) => {
  const [includedColumns, setIncludedColumns] = React.useState([]);

  const handleChangeFilter = (newValue) => {
    onChange({
      ...state,
      filters: objectUtils.clearObject(newValue),
      paging: {
        ...state.paging,
        page: 0,
      },
    });
  };

  const handleChangePage = (event, newPage) => {
    onChange({
      ...state,
      paging: {
        ...state.paging,
        page: newPage,
      },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    onChange({
      ...state,
      paging: {
        ...state.paging,
        page: 0,
        rowsPerPage: parseInt(event.target.value, 10),
      },
    });
  };

  const handleChangeSorting = (newValue) => {
    if (newValue) {
      onChange({
        ...state,
        sorting: newValue,
      });
    }
  };

  const handleClick = (value) => {
    if (selectable) {
      onClick(value);
      if (selectable !== 'multiple') {
        onSelect(
          selected.find((element) => element === selector(value))
            ? []
            : [selector(value)]
        );
      }
    }
  };

  const handleQuickSearch = (newValue) => {
    if (Boolean(newValue) || Boolean(state?.quickSearch)) {
      onChange({
        ...state,
        quickSearch: newValue === '' ? undefined : newValue,
      });
    }
  };

  const handleSelect = (newValue) => {
    onSelect(newValue);
  };

  /**
   * Uses the `columns` prop to initialize the `includedColumns` array. If
   * data already exists in the internal table state, this effect compares the
   * `columns` and `includedColumns` arrays, and only updates the
   * `includedColumns` under the following conditions:
   *
   * A) the length of the `includedColumns` is different from the prop value.
   *
   * B) for any value N, `column[N].attribute` is different from
   * `includedColumns[N].attribute`
   */
  React.useEffect(
    () => {
      // we filter all excluded columns from the `columns` array
      const filteredColumns = columns.filter(
        (column) => column.options?.display !== 'excluded'
      );
      if (
        filteredColumns.length !== includedColumns.length ||
        !filteredColumns.every(
          (column, columnIndex) =>
            column.attribute === includedColumns[columnIndex].attribute
        )
      ) {
        setIncludedColumns(
          filteredColumns.map((column) => {
            const columnDisplay = column.options?.display;
            const labelDisplay = column.options?.displayLabel;
            return {
              ...column,
              options: {
                ...column.options,
                display:
                  columnDisplay !== undefined && columnDisplay !== null
                    ? columnDisplay
                    : true,
                displayLabel:
                  labelDisplay !== undefined && labelDisplay !== null
                    ? labelDisplay
                    : true,
              },
            };
          })
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns]
  );

  return (
    <TableContext.Provider
      value={{
        columns,
        count,
        includedColumns,
        initialState,
        loading,
        onChangeFilter: handleChangeFilter,
        onChangePage: handleChangePage,
        onChangeRowsPerPage: handleChangeRowsPerPage,
        onChangeSorting: handleChangeSorting,
        onClick: handleClick,
        onQuickSearch: handleQuickSearch,
        onSelect: handleSelect,
        rows: rows || [],
        selectable,
        selected,
        selector,
        setIncludedColumns,
        state,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

TableProvider.propTypes = {
  /**
   * The table contents.
   */
  children: PropTypes.node,
  /**
   * The table columns.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      attribute: PropTypes.string.isRequired,
      label: PropTypes.string,
      options: PropTypes.shape({
        align: PropTypes.oneOf(['center', 'left', 'right']),
        display: PropTypes.oneOf([false, true, 'excluded']),
        displayLabel: PropTypes.oneOf([false, true]),
        format: PropTypes.func,
        setCellProps: PropTypes.func,
      }),
    })
  ).isRequired,
  /**
   * The total number of rows. To enable server side pagination for an unknown
   * number of items, provide `-1`.
   */
  count: PropTypes.number,
  /**
   * Initial state (used in reset actions).
   */
  initialState: PropTypes.exact({
    filters: PropTypes.object,
    paging: PropTypes.shape({
      lastValue: PropTypes.object,
      page: PropTypes.number,
      rowsPerPage: PropTypes.number,
    }),
    quickSearch: PropTypes.string,
    sorting: PropTypes.arrayOf(
      PropTypes.exact({
        field: PropTypes.string,
        sort: PropTypes.oneOf(['asc', 'desc']),
      })
    ),
  }),
  /**
   * If `true`, the table behaves as if an API request is being made.
   */
  loading: PropTypes.bool,
  /**
   * Callback fired when the user causes a change on the table state.
   * @param {Object} value - object with the new table state
   * @param {Object} value.pagination - object with the pagination state
   * @param {Number} value.pagination.page - new table page
   * @param {Number} value.pagination.rowsPerPage - new table rows per page
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the user clicks on a table row.
   * @param {Object} value - the row data
   */
  onClick: PropTypes.func,
  /**
   * Callback fired when the user selects/deselects a table row.
   * @param {Array} value - new selected items
   */
  onSelect: PropTypes.func,
  /**
   * The table data.
   */
  rows: PropTypes.array,
  /**
   * If `true` or `multiple`, the user can clic on table rows to select them:
   * - `true`: only one item can be selected any given time. When the user
   *    clics on a new item, the previous one is deselected.
   * - `multiple`: multiple items can be selected any given time. When the user
   *    clics on a new item, it is added to the selected array.
   */
  selectable: PropTypes.oneOf([false, true, 'multiple']),
  /**
   * Array with the references of all the elements currently selected in the
   * table.
   */
  selected: PropTypes.array,
  /**
   * Function used to identify a table value.
   * @param {Object} value - A row in the data array
   * @returns The identifier for the given value
   */
  selector: PropTypes.func,
  /**
   * Internal table state. It registers the following information:
   * - `filters`. Active query filters.
   * - `lastClickedValued`. Last value clicked by the user.
   * - `paging`. Pagination options.
   * - `quickSearch`. Value of the quick search field.
   * - `selected`. Array with ids of the values selected by the user.
   * - `sorting`. Sort options.
   */
  state: PropTypes.exact({
    filters: PropTypes.object,
    paging: PropTypes.shape({
      lastValue: PropTypes.object,
      page: PropTypes.number,
      rowsPerPage: PropTypes.number,
    }),
    quickSearch: PropTypes.string,
    sorting: PropTypes.arrayOf(
      PropTypes.exact({
        attribute: PropTypes.string,
        order: PropTypes.oneOf(['asc', 'desc']),
      })
    ),
  }).isRequired,
};
