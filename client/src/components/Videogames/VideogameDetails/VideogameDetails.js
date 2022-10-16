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
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useApi } from 'components/shared/ApiProvider';
import { useConfirm } from 'components/shared/ConfirmProvider';
import EditionToolbar from 'components/shared/EditionToolbar';
import { IconButton, Tooltip } from 'components/shared/MuiCustomizations';
import { useSnackbar } from 'components/shared/SnackbarProvider';
import TabPanel from 'components/shared/TabPanel';
import VideogameNotes from './VideogameNotes';
import VideogameProfile from './VideogameProfile';
import VideogameReviews from './VideogameReviews';

const ImagePlaceholder = styled('div', {
  shouldForwardProp: (prop) => prop !== 'height',
})(({ height, theme }) => ({
  backgroundColor: 'darkgray',
  // height: height,
  height: 0,
}));

const StyledForm = styled(Form)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const VideogameDetails = (props) => {
  const { onClose, value = {} } = props;

  const api = useApi();
  const confirm = useConfirm();
  const snackbar = useSnackbar();
  const theme = useTheme();

  const [currentTab, setCurrentTab] = React.useState(0);
  const [editMode, toggleEditMode] = React.useState(!value.id);

  const formRef = React.useRef();

  const videogameQuery = useQuery(
    ['videogame', value.id],
    async () => {
      const response = await api.GET(`videogames/${value.id}`);
      return {
        ...response.data,
        developers: response.data.developers?.[0] || null,
        publishers: response.data.publishers?.[0] || null,
      };
    },
    {
      enabled: Boolean(value.id),
      initialData: { ...value },
    }
  );

  const profileMasterDataQuery = useQuery(
    ['profileMasterData'],
    async () => {
      const developersResponse = await api.GET('videogameDevelopers');
      const platformsResponse = await api.GET('videogamePlatforms');
      const publishersResponse = await api.GET('videogamePublishers');

      return {
        developers: developersResponse.data,
        platforms: platformsResponse.data,
        publishers: publishersResponse.data,
      };
    },
    {
      initialData: {
        developers: [],
        platforms: [],
        publishers: [],
      },
      onError: (error) => {
        console.error(error.message);
        snackbar.open('Unexpected error.');
      },
    }
  );

  const videogameCreateUpdateMutation = useMutation(
    (newValues) => {
      const body = {
        ...newValues,
        developers: [{ id: newValues.developers.id, tag: 'default' }],
        publishers: [{ id: newValues.publishers.id, tag: 'default' }],
      };
      console.log('->', body);
      throw new Error();
      // return api.POST(`videogames`, body);
    },
    {
      onError: (error) => {
        console.error(error);
        snackbar.open('Error creating element.', {
          variant: 'error',
        });
      },
      onSuccess: (value) => {
        snackbar.open('New element successfully created.', {
          variant: 'success',
        });
        const refresh = true;
        onClose(refresh);
      },
    }
  );

  const videogameDeleteMutation = useMutation(
    (id) => api.DELETE(`videogames/${id}`),
    {
      onError: (error) => {
        console.error(error);
        snackbar.open('Error deleting element.', {
          variant: 'error',
        });
      },
      onSuccess: (value) => {
        snackbar.open('New element successfully deleted.', {
          variant: 'success',
        });
        const refresh = true;
        onClose(refresh);
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
            <Typography>
              {value.id ? videogameQuery.data.title : 'New'}
            </Typography>
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
      <ImagePlaceholder height={400} width={375} />
      <Tabs
        aria-label="full width tabs example"
        indicatorColor="primary"
        onChange={handleChange}
        textColor="inherit"
        value={currentTab}
        variant="fullWidth"
      >
        <Tooltip title="Profile">
          <Tab
            disabled={videogameCreateUpdateMutation.isLoading}
            icon={<ViewListRoundedIcon />}
            {...a11yProps(0)}
          />
        </Tooltip>
        <Tooltip title="Notes">
          <Tab
            disabled={videogameCreateUpdateMutation.isLoading}
            icon={<PersonRoundedIcon />}
            {...a11yProps(1)}
          />
        </Tooltip>
        <Tooltip title="Reviews">
          <Tab
            disabled={videogameCreateUpdateMutation.isLoading}
            icon={<ForumRoundedIcon />}
            {...a11yProps(2)}
          />
        </Tooltip>
      </Tabs>
      <Divider />
      <Formik
        enableReinitialize
        initialValues={{ ...videogameQuery.data }}
        innerRef={formRef}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          videogameCreateUpdateMutation.mutate(values);
        }}
      >
        <StyledForm>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={currentTab}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={currentTab} index={0} dir={theme.direction}>
              <VideogameProfile
                developers={profileMasterDataQuery.data.developers}
                platforms={profileMasterDataQuery.data.platforms}
                publishers={profileMasterDataQuery.data.publishers}
                readOnly={!editMode}
              />
            </TabPanel>
            <TabPanel value={currentTab} index={1} dir={theme.direction}>
              <VideogameNotes readOnly={!editMode} />
            </TabPanel>
            <TabPanel value={currentTab} index={2} dir={theme.direction}>
              <VideogameReviews readOnly={!editMode} />
            </TabPanel>
          </SwipeableViews>
        </StyledForm>
      </Formik>
      <Divider />
      <EditionToolbar
        editMode={editMode}
        onDelete={
          value.id
            ? () => {
                confirm('Esta operación no se puede deshacer.', {
                  onSuccess: () => videogameDeleteMutation.mutate(value.id),
                });
              }
            : undefined
        }
        onSubmit={() => formRef.current?.submitForm()}
        onToggleEditMode={() => {
          if (editMode && formRef.current?.dirty) {
            console.log(
              'Los cambios no guardados se perderán. ¿Quieres continuar?'
            );
            formRef.current?.resetForm();
          }
          toggleEditMode(!editMode);
        }}
        toggable={Boolean(value.id)}
      />
    </>
  );
};

VideogameDetails.propTypes = {
  /**
   * Callback fired when the user closes the component.
   *
   * @param {*} refresh - It will be `true` to indicate that the component has
   *    made changes in the application and the table should refresh its
   *    contents
   */
  onClose: PropTypes.func,
  value: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default VideogameDetails;
