import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import { videogameColumns } from './columns-videogames';
import CollectionViewer from '../CollectionViewer';
import * as http from '../../share/httpRequests';

export default function CollectionVideogames() {
  const theme = useTheme();

  // Definición del estado:

  const [columns, setColumns] = React.useState([]);
  const [collection, setCollection] = React.useState([]);
  const [collectionError, setCollectionError] = React.useState(null);
  const [collectionLoading, setCollectionLoading] = React.useState(false);

  // Actualizaciones al estado:

  async function fetchData() {
    try {
      const data = await http.GET('videogames');
      const formattedData = data.map((item) => (
        {
          ...item,
          coverSmall: (<Cover fileName={item.slugifiedTitle} />),
        }
      ));
      setCollection(formattedData);
      setCollectionError(null);
      setCollectionLoading(false);
    } catch (error) {
      setCollection([]);
      setCollectionError(error);
      setCollectionLoading(false);
    }
  }

  React.useEffect(() => {
    const columnsWithCover = [
      {
        label: '',
        prop: 'coverSmall',
        style: { 
          maxWidth: theme.mixins.coverSmall, 
          paddingBottom: theme.spacing(1), 
          paddingTop: theme.spacing(1), 
          width: theme.mixins.coverSmall,
        }
      },
      ...videogameColumns,
    ];

    setColumns(columnsWithCover);
    setCollectionLoading(true);
    fetchData();
  }, []);

  // Renderizado:

  return (
    <CollectionViewer
      columns={columns}
      data={collection}
      errorMessage={collectionError}
      isLoading={collectionLoading}
    />
  );

}

function Cover(props) {
  const classes = useStyles();
  return (
    <img
      alt='Cover' // XXX
      className={classes.cover}
      src={`${process.env.PUBLIC_URL}/covers/${props.fileName}.png`}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    alignSelf: 'center',
    height: theme.mixins.coverSmall,
  },
}));
