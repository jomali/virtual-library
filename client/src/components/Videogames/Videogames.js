import React from 'react';
import Paper from '@mui/material/Paper';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from 'components/shared/ApiProvider';
import Collection from 'components/shared/Collection';
import TableProvider, {
  TableContainer,
  TableContent,
  TableSummary,
  TableToolbar,
  useTable,
} from 'components/shared/TableProvider';
import VideogameDetails from './VideogameDetails';

export default function Videogames() {
  const api = useApi();
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();
  const table = useTable();

  const videogameQuery = useQuery(
    ['videogame', params.id],
    async () => {
      const response = await api.GET(`videogames/${params.id}`);
      return response.data;
    },
    {
      enabled: Number.isInteger(Number.parseInt(params.id)),
    }
  );

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
      onClose={() => {
        table.setSelected();
        navigate(`/videogames`);
      }}
      open={params.id}
      sideContent={(params) => (
        <VideogameDetails
          onChange={() => queryClient.resetQueries('videogames')}
          value={videogameQuery.data}
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
            <TableToolbar
              title="Videogames"
              addOptions={{
                onClick: () => {
                  table.setSelected();
                  navigate('/videogames/new');
                },
              }}
            />
            <TableContent />
            <TableSummary />
          </TableContainer>
        </TableProvider>
      </Paper>
    </Collection>
  );
}
