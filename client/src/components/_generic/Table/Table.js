import React from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import PropTypes from 'prop-types';
import TableBody from './TableBody';
import TableHead from './TableHead';

export default function _Table(props) {
  const {
    ariaLabel,
    ariaLabelSelectAll,
    ariaLabelSelectOne,
    className,
    color = 'inherit',
    columns = [],
    data = [],
    headerIsVisible = true,
    onClick,
    selected,
    size = 'medium',
  } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(15);
  // const [rowsPerPageOptions] = React.useState([15, 30, 60, 120]);
  // const [totals, setTotals] = React.useState({});

  React.useEffect(() => {
    setPage(0);
  }, [props.data]);

  const getSelected = () => {
    let result = [];
    if (Array.isArray(selected)) {
      result = selected;
    } else if (!!selected) {
      result = [selected];
    }
    return result;
  };

  return (
    <TableContainer className={className}>
      <Table aria-label={ariaLabel} size={size}>
        {headerIsVisible ? (
          <TableHead
            ariaLabelSelectAll={ariaLabelSelectAll}
            color={color}
            columns={columns}
            selected={getSelected()}
          />
        ) : null}
        <TableBody
          ariaLabelSelectOne={ariaLabelSelectOne}
          columns={columns}
          data={data}
          onClick={onClick}
          page={page}
          rowsPerPage={rowsPerPage}
          selected={getSelected()}
        />
      </Table>
    </TableContainer>
  );
}

_Table.propTypes = {
  // accessibility label
  ariaLabel: PropTypes.string,
  // accessibility label: select all checkbox
  ariaLabelSelectAll: PropTypes.string,
  // accessibility label: select individual item checkbox
  ariaLabelSelectOne: PropTypes.string,
  // style class
  className: PropTypes.string,
  // header color
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  // columns
  columns: PropTypes.arrayOf(
    PropTypes.exact({
      attribute: PropTypes.string.isRequired,

      align: PropTypes.oneOf(['center', 'left', 'right']),
      format: PropTypes.func,
      label: PropTypes.string.isRequired,
      style: PropTypes.object,
      sum: PropTypes.bool,
    })
  ),
  // data
  data: PropTypes.array,
  // indicates wether the header is visible or not
  headerIsVisible: PropTypes.bool,
  // callback when the user selects a row
  onClick: PropTypes.func,
  // selected rows
  selected: PropTypes.object,
  // margins
  size: PropTypes.oneOf(['medium', 'small']),
};
