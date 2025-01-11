import { messages as bookMessages, routes as bookRoutes } from "./books";
import {
  messages as videogameMessages,
  routes as videogameRoutes,
} from "./videogames";

export const messages = {
  en: {
    ...bookMessages.en,
    ...videogameMessages.en,
  },
  es: {
    ...bookMessages.es,
    ...videogameMessages.es,
  },
};

export const routes = [...bookRoutes, ...videogameRoutes];
