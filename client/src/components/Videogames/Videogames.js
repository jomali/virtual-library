import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from 'components/shared/ApiProvider';
import Collection from 'components/shared/Collection';
import TableProvider, {
  TableContainer,
  TableContent,
  TableSummary,
  useTable,
} from 'components/shared/TableProvider';

import VideogameDetails from './VideogameDetails';

export default function Videogames() {
  const api = useApi();
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();
  const table = useTable();

  const [openMenu, setOpenMenu] = React.useState(false);

  const videogamesQuery = useQuery(['videogames'], async () => {
    const result = await api.GET('videogames');
    return result.data;
  });

  const columns = [
    {
      attribute: 'title',
      label: 'Title',
    },
    {
      attribute: 'developers',
      label: 'Developer',
      options: {
        format: (value) => value[0]?.name,
      },
    },
    {
      attribute: 'publishers',
      label: 'Publisher',
      options: {
        format: (value) => value[0]?.name,
      },
    },
    // {
    //   attribute: 'releaseDates',
    //   label: 'Release date',
    // },
    {
      attribute: 'platforms',
      label: 'Platform',
      options: {
        format: (value) => value.join(', '),
      },
    },
  ];

  return (
    <Collection
      onClose={(refresh) => {
        table.setSelected();
        navigate(`/videogames`);
        if (refresh) {
          queryClient.invalidateQueries('videogames');
        }
      }}
      onOpenMenu={() => setOpenMenu(true)}
      open={Boolean(params.id)}
      sideContent={(otherParams) => (
        <VideogameDetails
          value={{
            id: Number.parseInt(params.id) || null,
            // TODO: load other values to display them while fetching the API
          }}
          {...otherParams}
        />
      )}
      title={'Videogames'}
    >
      <Paper
        sx={{
          backgroundColor: 'background.paper',
          margin: 2,
          display: 'flex',
          flexGrow: 1,
        }}
        variant="outlined"
      >
        <TableProvider
          columns={columns}
          controls={table.controls}
          count={videogamesQuery.data?.length}
          loading={videogamesQuery.isFetching}
          onSelect={(value) => {
            table.setSelected(value);
            navigate(value[0] ? `/videogames/${value[0]}` : `/videogames`);
          }}
          rows={videogamesQuery.data}
          selectable
          selected={table.selected}
          selector={(value) => value.id}
        >
          <TableContainer>
            {/* <TableToolbar
              title="Videogames"
              addOptions={{
                onClick: () => {
                  table.setSelected();
                  navigate('/videogames/new');
                },
              }}
            /> */}
            <TableContent headProps={{ topRadius: true }} />
            <TableSummary />
          </TableContainer>
        </TableProvider>
      </Paper>

      <Drawer onClose={() => setOpenMenu(false)} open={openMenu}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <Box sx={{ margin: '32px 16px' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Collection</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={'videogames'}
                label="Collection"
                onChange={(value) => console.log('value', value)}
              >
                <MenuItem value={'books'}>Books</MenuItem>
                <MenuItem value={'movies'}>Movies</MenuItem>
                <MenuItem value={'videogames'}>Videogames</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate(`/videogames/developers`)}
              >
                <ListItemText primary={'Developers'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate(`/videogames/publishers`)}
              >
                <ListItemText primary={'Publishers'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(`/videogames/platforms`)}>
                <ListItemText primary={'Platforms'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Collection>
  );
}
