import React from "react";
import MuiTooltip from "@mui/material/Tooltip";

const Tooltip = React.forwardRef(({ arrow = true, ...otherProps }, ref) => {
  return <MuiTooltip arrow={arrow} ref={ref} {...otherProps} />;
});

Tooltip.propTypes = MuiTooltip.propTypes;

export default Tooltip;
