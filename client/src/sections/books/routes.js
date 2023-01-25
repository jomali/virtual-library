import Books from './components';

export const routes = [
  {
    path: '/books/:id',
    element: <Books />,
  },
  {
    path: '/books/',
    element: <Books />,
  },
];
