import Movies from './Movies';

export const messages = { en: {}, es: {} };

export const routes = [
  {
    element: <Movies />,
    path: '/movies',
  },
  {
    element: <Movies />,
    path: '/movies/:id',
  },
];
