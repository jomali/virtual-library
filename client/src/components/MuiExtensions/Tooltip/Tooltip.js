import React from "react";
import MuiTooltip from "@mui/material/Tooltip";

/**
 * Customization of Material UI __Tooltip__ component.
 *
 * - Changes default prop values.
 */
const Tooltip = React.forwardRef(({ arrow = true, ...otherProps }, ref) => {
  return <MuiTooltip ref={ref} arrow={arrow} {...otherProps} />;
});

Tooltip.propTypes = MuiTooltip.propTypes;

export default Tooltip;
