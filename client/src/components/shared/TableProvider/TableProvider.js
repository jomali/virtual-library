import React from 'react';
import PropTypes from 'prop-types';
import * as objectUtils from 'components/shared/objectUtils';

export const TableContext = React.createContext();

export const TableProvider = ({
  children,
  columns,
  controls = {},
  count = -1,
  loading = false,
  onChangeControls = () => null,
  onClick = () => null,
  onSelect = () => null,
  rows = [],
  selectable = false,
  selected = [],
  selector = (value) => value,
}) => {
  const [includedColumns, setIncludedColumns] = React.useState([]);

  const handleChangeFilter = (newValue) => {
    onChangeControls({
      ...controls,
      filters: objectUtils.clearObject(newValue),
      pagination: {
        ...controls.pagination,
        page: 0,
      },
    });
  };

  const handleChangePage = (event, newPage) => {
    onChangeControls({
      ...controls,
      pagination: {
        ...controls.pagination,
        page: newPage,
      },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    onChangeControls({
      ...controls,
      pagination: {
        ...controls.pagination,
        page: 0,
        rowsPerPage: parseInt(event.target.value, 10),
      },
    });
  };

  const handleChangeSorting = (newValue) => {
    if (newValue) {
      onChangeControls({
        ...controls,
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
    if (Boolean(newValue) || Boolean(controls?.quickSearch)) {
      onChangeControls({
        ...controls,
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
        controls,
        count,
        includedColumns,
        initialState: {
          filters: controls?.initialFilters,
          pagination: controls?.initialPagination,
          quickSearch: controls?.initialQuickSearch,
          sorting: controls?.initialSorting,
        },
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
   * Pagination, filtering and sorting controls.
   */
  controls: PropTypes.exact({
    filters: PropTypes.object,
    initialFilters: PropTypes.object,
    initialPagination: PropTypes.object,
    initialQuickSearch: PropTypes.string,
    initialSorting: PropTypes.array,
    pagination: PropTypes.shape({
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
  }),
  /**
   * The total number of rows. To enable server side pagination for an unknown
   * number of items, provide `-1`.
   */
  count: PropTypes.number,
  /**
   * If `true`, the table displays a loading indicator.
   */
  loading: PropTypes.bool,
  /**
   * Callback fired when the user causes a change on the table controls.
   * @param {Object} value - object with the new controls
   */
  onChangeControls: PropTypes.func,
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
};
