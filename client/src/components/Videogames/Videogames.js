import React from 'react';
import Paper from '@mui/material/Paper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useApi } from 'components/shared/ApiProvider';
import Collection from 'components/shared/Collection';
import { useConfirm } from 'components/shared/ConfirmProvider';
import TableProvider, {
  TableContainer,
  TableContent,
  TableToolbar,
  useTable,
} from 'components/shared/TableProvider';
import VideogamesDetails from './VideogamesDetails';

export default function Videogames() {
  const api = useApi();
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const table = useTable();

  console.log('table', table);

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
        enqueueSnackbar('Error creating new element.', {
          variant: 'error',
        });
      },
      onSuccess: (value) => {
        queryClient.resetQueries('videogames');
        enqueueSnackbar('New element successfully created.', {
          variant: 'success',
        });
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
        queryClient.resetQueries('videogames');
        enqueueSnackbar('New element successfully deleted.', {
          variant: 'success',
        });
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
        table.setLastClicked();
      }}
      open={newItem || Boolean(table.lastClicked)}
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
          value={table.lastClicked}
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
          loading={videogamesQuery.isFetching}
          onChange={table.update}
          onClick={(value) =>
            table.setLastClicked(
              table.lastClicked?.id === value.id ? undefined : value
            )
          }
          onSelect={table.setSelected}
          rows={videogamesQuery.data}
          selectable
          selected={table.selected}
          selector={(value) => value.id}
          state={table.state}
        >
          <TableContainer>
            <TableToolbar
              title="Videogames"
              addOptions={{
                onClick: () => toggleNewItem(!newItem),
              }}
            />
            <TableContent />
            {/* <TablePagination /> */}
          </TableContainer>
        </TableProvider>
      </Paper>
    </Collection>
  );
}
