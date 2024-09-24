import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditOffRoundedIcon from "@mui/icons-material/EditOffRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import React from "react";

import { Tooltip } from "../MuiExtensions";

export type DetailEditionToolbarProps = {
  editMode: boolean;
  onDelete: VoidFunction;
  onSubmit: VoidFunction;
  onToggleEditMode: VoidFunction;
  toggable: boolean;
};

const DetailEditionToolbar: React.FC<DetailEditionToolbarProps> = (props) => {
  const { editMode, onDelete, onSubmit, onToggleEditMode, toggable } = props;

  const theme = useTheme();

  return (
    <AppBar elevation={0} position="relative">
      <Toolbar>
        <Box
          // EDIT MODE: left actions
          sx={{
            left: (theme) => theme.spacing(3),
            position: "absolute",
            zIndex: (theme) => theme.zIndex.appBar - 1,
          }}
        >
          <Fade
            // TODO - implement animations with framer-motion
            in={toggable && editMode}
            timeout={theme.transitions.duration.standard * 2}
          >
            <Tooltip
              title="Cancel" // TODO - i18n
            >
              <IconButton
                aria-label="cancel" // TODO - i18n
                color="inherit"
                edge="start"
                onClick={() => onToggleEditMode()}
                sx={{ color: (theme) => theme.palette.grey[500] }}
              >
                <EditOffRoundedIcon />
              </IconButton>
            </Tooltip>
          </Fade>
        </Box>
        <Box
          // EDIT MODE: right actions
          sx={{
            marginRight: -1,
            position: "absolute",
            right: (theme) => theme.spacing(3),
            zIndex: (theme) => theme.zIndex.appBar - 1,
          }}
        >
          {onDelete ? (
            <Fade // TODO - implement animations with framer-motion
              in={!toggable || editMode}
              timeout={theme.transitions.duration.standard * 2}
            >
              <Button
                color="inherit"
                onClick={onDelete}
                // size="small"
                startIcon={<DeleteRoundedIcon />}
                sx={{
                  borderColor: (theme) => theme.palette.grey[500],
                  color: (theme) => theme.palette.grey[500],
                  marginRight: 2,
                }}
                variant="text"
              >
                {
                  "Delete" // TODO - i18n
                }
              </Button>
            </Fade>
          ) : null}
          {onSubmit ? (
            <Fade // TODO - implement animations with framer-motion
              in={!toggable || editMode}
              timeout={theme.transitions.duration.standard * 2}
            >
              <Button
                onClick={onSubmit}
                startIcon={<SaveRoundedIcon />}
                type="submit"
                variant="contained"
              >
                {
                  "Save" // TODO - i18n
                }
              </Button>
            </Fade>
          ) : null}
        </Box>

        <Fade
          // TODO - implement animations with framer-motion
          // !EDIT MODE: left actions
          in={toggable && !editMode}
          timeout={theme.transitions.duration.standard * 2}
        >
          <Tooltip
            title="Edit" // TODO - i18n
          >
            <IconButton
              aria-label="close-panel" // TODO - i18n
              color="inherit"
              // edge="start"
              onClick={() => onToggleEditMode()}
              sx={{
                color: (theme) => theme.palette.grey[500],
                marginRight: 1,
                zIndex: (theme) => theme.zIndex.appBar,
              }}
            >
              <EditRoundedIcon />
            </IconButton>
          </Tooltip>
        </Fade>
      </Toolbar>
    </AppBar>
  );
};

export default DetailEditionToolbar;
