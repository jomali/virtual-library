import Typography from "@mui/material/Typography";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import IconTool from "./IconTool";
import { useIntl } from "react-intl";
import Gap from "../../Gap";

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "center",
  paddingLeft: `${theme.spacing(2)} !important`,
  paddingRight: `${theme.spacing(2)} !important`,
  position: "relative",
  ...(theme.breakpoints.up("md") && {
    justifyContent: "flex-start",
  }),
}));

const TableToolbar: React.FC<ITableToolbar> = (props) => {
  const { addTool, title } = props;

  const intl = useIntl();

  return (
    <CustomToolbar role="toolbar">
      <Typography
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        variant="h6"
      >
        {title}
      </Typography>
      <Gap />
      {addTool.visible ? (
        <IconTool
          edge="end"
          icon={<AddRoundedIcon />}
          label={intl.formatMessage({ id: "add" })}
          onClick={addTool.onClick}
        />
      ) : null}
    </CustomToolbar>
  );
};

interface Tool {
  visible?: boolean;
}

export interface ITableToolbar {
  addTool: Tool & {
    onClick: VoidFunction;
  };
  title: string;
}

export default TableToolbar;
