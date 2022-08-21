import React from 'react';
// import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
// import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
// import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import { styled, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import SwipeableViews from 'react-swipeable-views';
import PanelHeader from 'components/shared/PanelHeader';
import TabPanel from 'components/shared/TabPanel';
import InfoForm from './InfoForm';

const ImagePlaceholder = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
}));

const VideogamesDetails = (props) => {
  const { onClose, onDelete, onSubmit, value, ...otherProps } = props;

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
  const [editMode, toggleEditMode] = React.useState(false);
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

  return (
    <>
      <AppBar position="sticky">
        <PanelHeader
          editMode={editMode || !value}
          label={value ? value.title : 'New'}
          onClose={onClose}
          onDelete={value ? onDelete : null}
          onSubmit={() => onSubmit(fields)}
          onToggleEditMode={(newValue) => toggleEditMode(newValue)}
          toggable={Boolean(value)}
        />
      </AppBar>
      <ImagePlaceholder height={200} width={375} />
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
          // icon={<ViewListRoundedIcon />}
          label="General"
          {...a11yProps(0)}
        />
        {/* <Tab
          disabled={false}
          // icon={<PersonRoundedIcon />}
          label="Personal"
          {...a11yProps(1)}
        />
        <Tab
          disabled={false}
          // icon={<ForumRoundedIcon />}
          label="Reviews"
          {...a11yProps(2)}
        /> */}
      </Tabs>
      <Divider />
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={currentTab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={currentTab} index={0} dir={theme.direction}>
          <InfoForm
            fields={fields}
            onChange={(newValue) => setFields(newValue)}
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
    </>
  );
};

export default VideogamesDetails;
