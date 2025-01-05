import { ScreenRoute } from "../../types/utilityTypes";
import VideogameCollection from "./VideogameCollection";

export const routes: ScreenRoute[] = [
  {
    component: VideogameCollection,
    path: "/videogames/",
  },
  {
    component: VideogameCollection,
    path: "/videogames/:id",
  },
];
