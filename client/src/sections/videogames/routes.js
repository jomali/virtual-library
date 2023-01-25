import Videogames from './components';

export const routes = [
  {
    path: '/',
    element: <Videogames />,
  },
  {
    path: '/videogames/:id',
    element: <Videogames />,
  },
  {
    path: '/videogames/',
    element: <Videogames />,
  },
];
