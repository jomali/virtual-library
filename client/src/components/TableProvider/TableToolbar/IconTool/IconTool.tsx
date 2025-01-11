import React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { ConditionalTooltip } from "../../../MuiExtensions";

const IconTool: React.FC<IIconTool> = (props) => {
  const { active, disabled, edge, icon, label, onClick } = props;

  return (
    <ConditionalTooltip title={disabled ? undefined : label}>
      <span>
        <IconButton disabled={disabled} edge={edge} onClick={onClick}>
          <Badge invisible={!active} variant="dot">
            {icon}
          </Badge>
        </IconButton>
      </span>
    </ConditionalTooltip>
  );
};

export interface IIconTool {
  active?: boolean;
  disabled?: boolean;
  edge?: "end" | "start";
  icon: React.ReactNode;
  label?: string;
  onClick: VoidFunction;
}

export default IconTool;
