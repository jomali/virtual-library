import {
  messages as booksMessages,
  routes as booksRoutes,
} from 'components/Books';
import {
  messages as moviesMessages,
  routes as moviesRoutes,
} from 'components/Movies';
import {
  messages as videogamesMessages,
  routes as videogamesRoutes,
} from 'components/Videogames';

export const messages = {
  en: {
    ...booksMessages.en,
    ...moviesMessages.en,
    ...videogamesMessages.en,
  },
  es: {
    ...booksMessages.es,
    ...moviesMessages.es,
    ...videogamesMessages.es,
  },
};

export const routes = [...booksRoutes, ...moviesRoutes, ...videogamesRoutes];
