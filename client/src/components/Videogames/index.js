import VideogameDevelopers from './VideogameDevelopers';
import VideogamePlatforms from './VideogamePlatforms';
import VideogamePublishers from './VideogamePublishers';
import Videogames from './Videogames';

export const messages = { en: {}, es: {} };

export const routes = [
  {
    path: '/',
    element: <Videogames />,
  },
  {
    path: '/videogames/developers',
    element: <VideogameDevelopers />,
  },
  {
    path: '/videogames/platforms',
    element: <VideogamePlatforms />,
  },
  {
    path: '/videogames/publishers',
    element: <VideogamePublishers />,
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
