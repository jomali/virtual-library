import MuiTooltip, {
  TooltipProps as MuiTooltipProps,
} from "@mui/material/Tooltip";
import React from "react";

/**
 * Wrapper of Material UI __Tooltip__ component.
 *
 * - Changes default prop values.
 */
const Tooltip = React.forwardRef<React.Ref<unknown>, TooltipProps>(
  ({ arrow = true, ...otherProps }, ref) => {
    return <MuiTooltip ref={ref} arrow={arrow} {...otherProps} />;
  }
);

export type TooltipProps = MuiTooltipProps;

export default Tooltip;
