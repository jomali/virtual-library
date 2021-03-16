import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import Div100vh from "react-div-100vh";
import Table from "components/_Table";
import CustomFab from "components/CustomFab";
import MainAppBar from "components/MainAppBar";

const PAPER_RADIUS_MULTIPLIER = 3;

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      padding: 0,
    },
  },
  paperBody: {
    display: "flex",
    flexGrow: 1,
  },
  paperBorder: {
    borderRadius: theme.shape.borderRadius * PAPER_RADIUS_MULTIPLIER,
    [theme.breakpoints.down("xs")]: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: theme.shape.borderRadius * PAPER_RADIUS_MULTIPLIER,
      borderTopRightRadius: theme.shape.borderRadius * PAPER_RADIUS_MULTIPLIER,
    },
  },
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function CollectionScreen(props) {
  const { columns, data, onSelect, selected } = props;

  const classes = useStyles();

  return (
    <Div100vh className={classes.root}>
      <MainAppBar title="Ludoteca" />
      <Container className={classes.body} maxWidth="xl">
        <Paper className={clsx(classes.paperBody, classes.paperBorder)}>
          <Table
            className={classes.paperBorder}
            columns={columns}
            data={data}
            onClick={onSelect}
            selected={selected}
          />
        </Paper>
      </Container>
      <CustomFab />
    </Div100vh>
  );
}

CollectionScreen.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  selected: PropTypes.any, // TODO - adjust
};
