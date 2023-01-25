import { messages as bookMessages, routes as bookRoutes } from './books';
import { messages as movieMessages, routes as movieRoutes } from './movies';
import {
  messages as videogameMessages,
  routes as videogameRoutes,
} from './videogames';

export const messages = {
  en: {
    ...bookMessages.en,
    ...movieMessages.en,
    ...videogameMessages.en,
  },
  es: {
    ...bookMessages.es,
    ...movieMessages.es,
    ...videogameMessages.es,
  },
};

export const routes = [
  // the first routes take precedence
  ...videogameRoutes,
  // the other routes of the app
  ...bookRoutes,
  ...movieRoutes,
];
