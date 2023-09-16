import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "components/MuiExtensions";

const TableToolbarOption = React.forwardRef((props, ref) => {
  const { disabled, icon, label, onClick, ...otherProps } = props;

  return (
    <Tooltip title={label}>
      <IconButton
        ref={ref}
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
        {...otherProps}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
});

TableToolbarOption.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default TableToolbarOption;
