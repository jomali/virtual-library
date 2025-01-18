import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ConditionalTooltip } from "../MuiExtensions";
import { useIntl } from "react-intl";
import Gap from "../Gap";

const DetailHeader: React.FC<IDetailHeader> = (props) => {
  const { onClose, title } = props;

  const intl = useIntl();

  return (
    <AppBar elevation={0} position="sticky">
      <Toolbar>
        <Typography>{title}</Typography>
        <Gap />
        {onClose ? (
          <ConditionalTooltip title={intl.formatMessage({ id: "close" })}>
            <IconButton edge="end" onClick={onClose}>
              <CloseRoundedIcon />
            </IconButton>
          </ConditionalTooltip>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export interface IDetailHeader {
  onClose?: VoidFunction;
  title: string;
}

export default DetailHeader;
