import Videogames from "./Videogames";

export default [
  {
    path: "/",
    element: Videogames,
  },
  {
    path: "/videogames/",
    element: Videogames,
  },
  {
    path: "/videogames/:id",
    element: Videogames,
  },
];
