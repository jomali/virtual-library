import { messages as bookMessages, routes as bookRoutes } from "./books";
import {
  messages as videogameMessages,
  routes as videogameRoutes,
} from "./videogames";
import { en, es } from "./locale";

/**
 * Application __messages__. Each screen defines its own messages.
 */
export const messages = {
  en: {
    ...en,
    ...bookMessages.en,
    ...videogameMessages.en,
  },
  es: {
    ...es,
    ...bookMessages.es,
    ...videogameMessages.es,
  },
};

/**
 * Application __routes__.
 */
export const routes = [...bookRoutes, ...videogameRoutes];
