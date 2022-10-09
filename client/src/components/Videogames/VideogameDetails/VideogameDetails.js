import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import { styled, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useApi } from 'components/shared/ApiProvider';
import { useConfirm } from 'components/shared/ConfirmProvider';
import EditionToolbar from 'components/shared/EditionToolbar';
import { IconButton, Tooltip } from 'components/shared/MuiCustomizations';
import TabPanel from 'components/shared/TabPanel';
import VideogameProfile from './VideogameProfile';

const ImagePlaceholder = styled('div', {
  shouldForwardProp: (prop) => prop !== 'height',
})(({ height, theme }) => ({
  backgroundColor: 'darkgray',
  // height: height,
  height: 0,
}));

const PanelContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const VideogameDetails = (props) => {
  const { onClose, value } = props;

  console.log('X', value);

  const theme = useTheme();

  const api = useApi();
  const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();

  const [currentTab, setCurrentTab] = React.useState(0);
  const [editMode, toggleEditMode] = React.useState(!value);

  const bibliographicInformationRef = React.useRef();

  const videogamesCreateMutation = useMutation(
    (value) => api.POST('videogames', value),
    {
      onError: (error) => {
        console.error(error.message);
        enqueueSnackbar('Error creating new element.', {
          variant: 'error',
        });
      },
      onSuccess: (value) => {
        enqueueSnackbar('New element successfully created.', {
          variant: 'success',
        });
        // onChange();
      },
    }
  );

  const videogamesDeleteMutation = useMutation(
    (id) => api.DELETE(`videogames/${id}`),
    {
      onError: (error) => {
        console.error(error.message);
        enqueueSnackbar('Error deleting element.', {
          variant: 'error',
        });
      },
      onSuccess: (value) => {
        enqueueSnackbar('New element successfully deleted.', {
          variant: 'success',
        });
        // onChange();
      },
    }
  );

  const videogamesUpdateMutation = useMutation(
    (value) => api.PUT(`videogames/${value.id}`, value),
    {
      onError: (error) => {
        console.log(error.message);
      },
      onSuccess: (value) => {
        console.log('Element successfully updated');
        // onChange();
      },
    }
  );

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setCurrentTab(index);
  };

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  };

  return (
    <>
      <AppBar elevation={0} position="sticky">
        <Toolbar>
          <Fade in timeout={theme.transitions.duration.enteringScreen * 1.5}>
            <Typography>{'New'}</Typography>
          </Fade>
          <Box sx={{ flexGrow: 1 }} />
          <Fade in timeout={theme.transitions.duration.enteringScreen * 1.5}>
            <Tooltip title="Close panel">
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
          </Fade>
        </Toolbar>
      </AppBar>
      <ImagePlaceholder height={200} width={375} />
      {false ? (
        <Tabs
          aria-label="full width tabs example"
          indicatorColor="primary"
          onChange={handleChange}
          textColor="inherit"
          value={currentTab}
          variant="fullWidth"
        >
          <Tab
            disabled={false}
            icon={<ViewListRoundedIcon />}
            // label="General"
            {...a11yProps(0)}
          />
          <Tab
            disabled={false}
            icon={<PersonRoundedIcon />}
            // label="Personal"
            {...a11yProps(1)}
          />
          <Tab
            disabled={false}
            icon={<ForumRoundedIcon />}
            // label="Reviews"
            {...a11yProps(2)}
          />
        </Tabs>
      ) : null}
      <Divider />
      <PanelContent>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={currentTab}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={currentTab} index={0} dir={theme.direction}>
            <VideogameProfile
              formRef={bibliographicInformationRef}
              readOnly={!editMode}
            />
          </TabPanel>
          <TabPanel value={currentTab} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={currentTab} index={2} dir={theme.direction}>
            Item three
          </TabPanel>
        </SwipeableViews>
      </PanelContent>
      <Divider />
      <EditionToolbar
        editMode={editMode}
        onDelete={
          value
            ? (id) => {
                confirm('Esta operación no se puede deshacer.', {
                  onSuccess: () => videogamesDeleteMutation.mutate(id),
                });
              }
            : undefined
        }
        onSubmit={() => {
          switch (currentTab) {
            default:
              bibliographicInformationRef.current?.onSubmit();
          }
        }}
        onToggleEditMode={() => toggleEditMode(!editMode)}
        toggable={Boolean(value)}
      />
    </>
  );
};

VideogameDetails.propTypes = {
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  value: PropTypes.object,
};

export default VideogameDetails;
