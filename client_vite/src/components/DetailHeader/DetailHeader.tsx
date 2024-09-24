import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

import { Tooltip } from "../MuiExtensions";

export type DetailHeaderProps = {
  onClose: VoidFunction;
  title?: string;
};

const DetailHeader: React.FC<DetailHeaderProps> = (props) => {
  const { onClose, title } = props;

  return (
    <AppBar elevation={0} position="sticky">
      <Toolbar>
        <Typography>
          {
            title ?? "New" // TODO - i18n
          }
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip
          title="Close panel" // TODO - i18n
        >
          <IconButton
            edge="end"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
              zIndex: (theme) => theme.zIndex.appBar,
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default DetailHeader;
