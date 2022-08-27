import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import EditionToolbar from 'components/shared/EditionToolbar';
import TabPanel from 'components/shared/TabPanel';
import InfoForm from './InfoForm';

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

export default function VideogamesDetails({
  onClose,
  onDelete,
  onSubmit,
  value,
  ...otherProps
}) {
  const theme = useTheme();

  const initialFields = React.useMemo(
    () => ({
      developers: [],
      id: null,
      platforms: [],
      publishers: [],
      releaseDates: [],
      synopsis: '',
      title: '',
    }),
    []
  );

  const [currentTab, setCurrentTab] = React.useState(0);
  const [editMode, toggleEditMode] = React.useState(!value);
  const [fields, setFields] = React.useState(initialFields);

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

  React.useEffect(() => {
    if (value) {
      setFields({
        ...fields,
        developers: value.developers,
        id: value.id,
        platforms: value.platforms,
        publishers: value.publishers,
        // releaseDates: value.releaseDate,
        synopsis: value.synopsis,
        title: value.title,
      });
    } else {
      setFields(initialFields);
    }
  }, [initialFields, value]);

  const noTabs = true;

  return (
    <>
      <AppBar elevation={0} position="sticky">
        <Toolbar>
          <Fade in timeout={theme.transitions.duration.enteringScreen * 1.5}>
            <Typography>{value ? value.title : 'New'}</Typography>
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
      {!noTabs ? (
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
            <InfoForm
              fields={fields}
              onChange={(newValue) => setFields(newValue)}
              readOnly={!editMode}
              {...otherProps}
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
        onDelete={onDelete}
        onSubmit={onSubmit}
        onToggleEditMode={() => toggleEditMode(!editMode)}
        toggable={Boolean(value)}
      />
    </>
  );
}
