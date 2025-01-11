import React from "react";
import MuiTooltip, { TooltipProps } from "@mui/material/Tooltip";

/**
 * Wrapper over Material UI __Tooltip__ component.
 *
 * - If `title` prop is falsy, renders the component children with no tooltip.
 * - Makes `arrow` prop _true_ by default.
 */
const ConditionalTooltip = React.forwardRef<unknown, TooltipProps>(
  (props, ref) => {
    const { arrow = true, children, title, ...otherProps } = props;

    return title ? (
      <MuiTooltip ref={ref} arrow={arrow} title={title} {...otherProps}>
        {children}
      </MuiTooltip>
    ) : (
      children
    );
  }
);

export default ConditionalTooltip;
