import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

export default function _Card(props) {
  const {
    actions,
    children,
    className,
    color = "primary",
    loading = false,
  } = props;

  const classes = useStyles();

  return (
    <Card className={clsx({ [className]: className !== null })}>
      {loading ? (
        <LinearProgress className={classes.loadingIndicator} color={color} />
      ) : (
        <div className={classes.loadingIndicator} />
      )}
      <CardContent className={classes.content}>{children}</CardContent>
      {actions ? (
        <CardActions className={classes.actions}>{actions}</CardActions>
      ) : null}
    </Card>
  );
}

_Card.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(["primary", "secondary"]),
  loading: PropTypes.bool,
};

const MIN_LOADING_INDICATOR_HEIGHT = 4;

const useStyles = makeStyles((theme) => ({
  actions: {
    padding: theme.spacing(2),
    paddingTop: 0,
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
      paddingTop: 0,
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: 0,
    padding: theme.spacing(2),
    paddingTop: `calc(${theme.spacing(
      2
    )}px - ${MIN_LOADING_INDICATOR_HEIGHT}px)`,
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
      paddingTop: `calc(${theme.spacing(
        3
      )}px - ${MIN_LOADING_INDICATOR_HEIGHT}px)`,
    },
  },
  loadingIndicator: {
    minHeight: MIN_LOADING_INDICATOR_HEIGHT,
  },
}));
