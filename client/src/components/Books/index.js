import Books from './Books';

export const messages = { en: {}, es: {} };

export const routes = [
  {
    element: <Books />,
    path: '/books',
  },
  {
    element: <Books />,
    path: '/books/:id',
  },
];
