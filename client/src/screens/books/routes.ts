import { ScreenRoute } from "../../types/utilityTypes";
import BookCollection from "./BookCollection";

export const routes: ScreenRoute[] = [
  {
    component: BookCollection,
    path: "/",
  },
  {
    component: BookCollection,
    path: "/books/",
  },
  {
    component: BookCollection,
    path: "/books/:id",
  },
];
