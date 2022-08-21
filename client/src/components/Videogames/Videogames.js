import React from 'react';
import Paper from '@mui/material/Paper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from 'components/shared/ApiProvider';
import Collection from 'components/shared/Collection';
import { useConfirm } from 'components/shared/ConfirmProvider_';
import TableProvider, {
  TableContainer,
  TableContent,
  TableToolbar,
  TablePagination,
  useTableState,
} from 'components/shared/TableProvider';
import VideogamesDetails from './VideogamesDetails';

export default function Videogames() {
  const api = useApi();
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const tableState = useTableState(50);

  const developersQuery = useQuery(['developers'], async () => {
    const result = await api.GET('videogameDevelopers');
    return result.data;
  });

  const platformsQuery = useQuery(['platforms'], async () => {
    const result = await api.GET('videogamePlatforms');
    return result.data;
  });

  const publishersQuery = useQuery(['publishers'], async () => {
    const result = await api.GET('videogamePublishers');
    return result.data;
  });

  const videogamesQuery = useQuery(['videogames'], async () => {
    const result = await api.GET('videogames');
    return result.data;
  });

  const videogamesCreateMutation = useMutation(
    (value) => api.POST('videogames', value),
    {
      onError: (error) => {
        console.error(error.message);
      },
      onSuccess: (value) => {
        queryClient.resetQueries('videogames');
        console.log('New element successfully created');
      },
    }
  );

  const videogamesDeleteMutation = useMutation(
    (id) => api.DELETE(`videogames/${id}`),
    {
      onError: (error) => {
        console.error(error.message);
      },
      onSuccess: (value) => {
        queryClient.resetQueries('videogames');
        console.log('New element successfully deleted.');
      },
    }
  );

  //   const videogamesUpdateMutation = useMutation(
  //     (value) => api.PUT(`videogames/${value.id}`, value),
  //     {
  //       onError: (error) => {
  //         console.log(error.message);
  //       },
  //       onSuccess: (value) => {
  //         queryClient.resetQueries('videogames');
  //         console.log('Element successfully updated');
  //       },
  //     }
  //   );

  const [newItem, toggleNewItem] = React.useState(false);

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
      onClose={() => {
        toggleNewItem(false);
        tableState.setLastClicked();
      }}
      open={newItem || Boolean(tableState.lastClicked)}
      sideContent={(params) => (
        <VideogamesDetails
          developers={developersQuery.data}
          onDelete={(id) => {
            confirm('Esta operación no se puede deshacer.', {
              onSuccess: () => videogamesDeleteMutation.mutate(id),
            });
          }}
          onSubmit={(newValue) => videogamesCreateMutation.mutate(newValue)}
          platforms={platformsQuery.data}
          publishers={publishersQuery.data}
          value={tableState.lastClicked}
          {...params}
        />
      )}
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
          count={videogamesQuery.data?.length}
          filter={tableState.filter}
          loading={videogamesQuery.isFetching}
          onChange={tableState.setFilter}
          onClick={tableState.setLastClicked}
          rows={videogamesQuery.data}
          selectable
        >
          <TableContainer>
            <TableToolbar
              title="Videogames"
              addOptions={{
                onClick: () => toggleNewItem(!newItem),
              }}
            />
            <TableContent />
            <TablePagination />
          </TableContainer>
        </TableProvider>
      </Paper>
    </Collection>
  );
}
