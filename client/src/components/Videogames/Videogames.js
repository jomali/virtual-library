import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import Collection from 'components/_custom/Collection';
import VideogameDetails from './VideogameDetails';
import { columns } from './VideogamesColumns';

const generateTestData = (num) => {
  const result = [];

  for (let i = 0; i < num; i++) {
    result.push({
      id: i + 1,
      coverSmall: `${process.env.PUBLIC_URL}/assets/mass-effect-cover_small.jpg`,
      title: 'Mass Effect',
      developer: [
        {
          label: 'X360',
          value: {
            id: 1,
            name: 'BioWare',
          },
        },
        {
          label: 'ported to PS3',
          value: {
            id: 2,
            name: 'Edge of Reality',
          },
        },
        {
          label: 'ported to PC',
          value: {
            id: 3,
            name: 'Demiurge Studios',
          },
        },
      ],
      publisher: [
        {
          label: 'X360',
          value: {
            id: 1,
            name: 'Microsoft Game Studios',
          },
        },
        {
          label: 'PC/PS3',
          value: {
            id: 2,
            name: 'Electronic Arts',
          },
        },
      ],
      release: [
        {
          label: 'X360',
          value: '2007',
        },
        {
          label: 'PC',
          value: '2008',
        },
        {
          label: 'PS3',
          value: '2012',
        },
      ],
    });
  }

  return result;
};

export default function VideogamesRouter(props) {
  const match = useRouteMatch();
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="xl">
      <Switch>
        <Route path={`${match.path}/:id`}>
          <VideogameDetails />
        </Route>
        <Route path={`${match.path}`}>
          <Videogames />
        </Route>
      </Switch>
    </Container>
  );
}

function Videogames(props) {
  // const location = useLocation();
  // const params = useParams();

  // console.log('location', location);
  // console.log('params', params);

  const classes = useStyles();
  const theme = useTheme();

  const videogames = generateTestData(12);
  const videogameColumns = [
    {
      attribute: 'coverSmall',
      format: (value) => (
        <img alt={'cover'} className={classes.cover} src={value} />
      ),
      label: '',
      style: {
        maxWidth: theme.mixins.coverSmall + theme.spacing(2),
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1),
        width: theme.mixins.coverSmall + theme.spacing(2),
      },
    },

    ...columns,
  ];

  return <Collection columns={videogameColumns} data={videogames} />;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      padding: 0,
    },
  },
  cover: {
    alignSelf: 'center',
    display: 'flex',
    height: theme.mixins.coverSmall,
    padding: 0,
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));
