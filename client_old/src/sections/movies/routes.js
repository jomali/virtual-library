import Movies from "./components";

export const routes = [
  {
    path: "/movies/:id",
    element: <Movies />,
  },
  {
    path: "/movies/",
    element: <Movies />,
  },
];
