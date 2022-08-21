import Videogames from './Videogames';

export const messages = { en: {}, es: {} };

export const routes = [
  {
    path: '/',
    element: <Videogames />,
  },
  {
    path: '/videogames/',
    element: <Videogames />,
  },
  {
    path: '/videogames/:id',
    element: <Videogames />,
  },
];
