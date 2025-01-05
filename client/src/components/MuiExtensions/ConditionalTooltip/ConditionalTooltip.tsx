import React from "react";
import MuiTooltip, { TooltipProps } from "@mui/material/Tooltip";

/**
 * Wrapper over Material UI __Tooltip__ component.
 *
 * - If `title` prop is falsy, renders the component children with no tooltip.
 */
const ConditionalTooltip = React.forwardRef<unknown, TooltipProps>(
  (props, ref) => {
    const { children, title, ...otherProps } = props;

    return title ? (
      <MuiTooltip ref={ref} title={title} {...otherProps}>
        {children}
      </MuiTooltip>
    ) : (
      children
    );
  }
);

export default ConditionalTooltip;
