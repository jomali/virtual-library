import React from 'react';
import PropTypes from 'prop-types';
import * as objectUtils from 'components/shared/objectUtils';

export const TableContext = React.createContext();

export const TableProvider = (props) => {
  const {
    children,
    columns,
    filter,
    count = -1,
    loading = false,
    onChange = () => null,
    onClick = () => null,
    onSelect = () => null,
    rows = [],
    selectable = false,
    selected = [],
    selector = (value) => value,
  } = props;

  const [includedColumns, setIncludedColumns] = React.useState([]);

  const handleChangeFilter = (newValue) => {
    onChange({
      ...filter,
      content: objectUtils.clearObject(newValue),
      page: 0,
    });
  };

  const handleChangePage = (event, newPage) => {
    onChange({
      ...filter,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    onChange({
      ...filter,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  const handleClick = (value) => {
    if (Boolean(selectable)) {
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
    if (Boolean(newValue) || Boolean(filter?.quickSearch)) {
      onChange({
        ...filter,
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
        filter,
        handleChangeFilter,
        handleChangePage,
        handleChangeRowsPerPage,
        handleClick,
        handleQuickSearch,
        handleSelect,
        includedColumns: includedColumns,
        loading,
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
   * The total number of rows. To enable server side pagination for an unknown
   * number of items, provide `-1`.
   */
  count: PropTypes.number,
  /**
   * Table data related to filter and pagination params.
   */
  filter: PropTypes.exact({
    content: PropTypes.object,
    page: PropTypes.number,
    quickSearch: PropTypes.string,
    rowsPerPage: PropTypes.number,
  }).isRequired,
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
   * Selected data.
   */
  selected: PropTypes.array,
  /**
   * Function used to identify a table value.
   * @param {Object} value - A row in the data array
   * @returns The identifier for the given value
   */
  selector: PropTypes.func,
};
