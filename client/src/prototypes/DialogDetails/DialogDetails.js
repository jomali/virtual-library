import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { CustomPlaceholder } from "react-placeholder-image";
import SwipeableViews from "react-swipeable-views";
import Dialog from "components/_Dialog";
import CustomDialogTitle from "components/CustomDialogTitle";
import DialogActions from "components/DialogActions";

const useStyles = makeStyles((theme) => ({
  coverImage: {
    display: "flex",
    width: "100%",
  },
  dialog: {
    backgroundColor: theme.palette.background.default,
    padding: 0,
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
  },
  tabBar: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default function DialogDetails(props) {
  const { children, onClose, value, ...otherProps } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [activeTab, setActiveTab] = React.useState(0);

  const handleClose = () => {
    setActiveTab(0);
    onClose();
  };

  return (
    <Dialog
      {...otherProps}
      actions={React.Children.map(children, (child, index) =>
        !!child && activeTab === index ? (
          <DialogActions
            editMode={child.props.editMode}
            formId={child.props.formId}
            onDelete={child.props.onDelete}
            onEdit={child.props.onEdit}
            onSave={child.props.onSave}
          />
        ) : null
      )}
      className={classes.dialog}
      closable
      onClose={handleClose}
      PaperProps={{ className: classes.paper }}
      renderTitle={(params) => (
        <>
          {React.Children.map(children, (child, index) =>
            !!child && activeTab === index ? (
              <CustomDialogTitle
                {...params}
                editMode={child.props.editMode}
                formId={child.props.formId}
                onClose={handleClose}
                onEdit={child.props.onEdit}
                onRemove={child.props.onDelete}
                onSave={child.props.onSave}
              />
            ) : null
          )}
        </>
      )}
    >
      <div>
        <CustomPlaceholder
          className={classes.coverImage}
          width={375}
          height={200}
        />
        <AppBar className={classes.tabBar} position="sticky">
          <Tabs
            aria-label="videogame details panels"
            indicatorColor="primary"
            onChange={(event, newValue) => setActiveTab(newValue)}
            textColor="primary"
            value={activeTab}
            variant="fullWidth"
          >
            {React.Children.map(children, (child) =>
              !!child ? (
                <Tab aria-label="phone" icon={child.props.icon} />
              ) : null
            )}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          disabled
          index={activeTab}
          onChangeIndex={(index) => setActiveTab(index)}
        >
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              visible: activeTab === index,
            })
          )}
        </SwipeableViews>
      </div>
    </Dialog>
  );
}

DialogDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  value: PropTypes.object,
};
