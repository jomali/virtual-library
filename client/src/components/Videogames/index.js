import Videogames from './Videogames';

export const routes = [
  {
    path: '/videogames/',
    element: <Videogames />,
  },
  {
    path: '/videogames/:id',
    element: <Videogames />,
  },
];
