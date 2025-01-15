import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import Button from "@mui/material/Button";
import { useIntl } from "react-intl";

const DetailFooter: React.FC<IDetailFooter> = (props) => {
  const { onDelete } = props;

  const intl = useIntl();

  return (
    <AppBar elevation={0} position="relative">
      <Toolbar
        sx={{
          justifyContent: "flex-end",
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
      >
        <Button
          onClick={onDelete}
          startIcon={<DeleteRoundedIcon />}
          variant="text"
        >
          {intl.formatMessage({ id: "delete" })}
        </Button>

        <Button
          startIcon={<SaveRoundedIcon />}
          type="submit"
          variant="contained"
        >
          {intl.formatMessage({ id: "save" })}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export interface IDetailFooter {
  onDelete: VoidFunction;
}

export default DetailFooter;
