import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import clsx from "clsx";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  action: {
    color: fade(theme.palette.text.primary, 0.7),
    top: -theme.spacing(1),
    marginBottom: -theme.spacing(2),
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: -theme.spacing(1),
  },
  footerActions: {
    position: "absolute",
    zIndex: -10,
  },
  footerActionsForeground: {
    zIndex: 10,
  },
}));

export default function DialogActions(props) {
  const { children, editMode, formId, onDelete, onEdit, onSave } = props;

  const classes = useStyles();
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <>
      <div className={classes.content}>{children}</div>
      <div className={classes.footer}>
        <div
          className={clsx({
            [classes.footerActions]: true,
            [classes.footerActionsForeground]: !editMode,
          })}
        >
          <Zoom
            in={!editMode}
            style={{
              transitionDelay: `${!editMode ? transitionDuration.exit : 0}ms`,
            }}
            timeout={transitionDuration}
          >
            <Tooltip placement="top" title="Editar">
              <IconButton
                className={classes.action}
                onClick={() => onEdit(true)}
              >
                <EditRoundedIcon />
              </IconButton>
            </Tooltip>
          </Zoom>
        </div>
        <Zoom
          in={editMode}
          style={{
            transitionDelay: `${!editMode ? 0 : transitionDuration.exit}ms`,
          }}
          timeout={transitionDuration}
        >
          <Tooltip placement="top" title="Eliminar">
            <IconButton className={classes.action} onClick={onDelete}>
              <DeleteRoundedIcon />
            </IconButton>
          </Tooltip>
        </Zoom>
        <Zoom
          in={editMode}
          style={{
            transitionDelay: `${!editMode ? 0 : transitionDuration.exit}ms`,
          }}
          timeout={transitionDuration}
        >
          <Tooltip placement="top" title="Guardar">
            <IconButton
              className={classes.action}
              form={formId}
              onClick={onSave}
              type="submit"
            >
              <SaveRoundedIcon />
            </IconButton>
          </Tooltip>
        </Zoom>
        <Zoom
          in={editMode}
          style={{
            transitionDelay: `${!editMode ? 0 : transitionDuration.exit}ms`,
          }}
          timeout={transitionDuration}
        >
          <Tooltip placement="top" title="Cancelar">
            <IconButton
              className={classes.action}
              onClick={() => onEdit(false)}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Tooltip>
        </Zoom>
      </div>
    </>
  );
}

DialogActions.propTypes = {
  children: PropTypes.node,
  editMode: PropTypes.bool,
  formId: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
};
