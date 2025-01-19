/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useApi } from "../../../components/ApiProvider";
import { bookKeyFactory } from "./bookKeyFactory";
import { Book } from "../types";

const useCreateBookMutation = (options: UseMutationOptions = {}) => {
  const api = useApi();

  return useMutation<any, any, any>({
    mutationKey: bookKeyFactory.createBook(),
    meta: {},
    mutationFn: (data: Book) => {
      const dto = {
        ...data,
        authors: [
          {
            id: "6abb37b4-f794-4ac0-b4ee-e8f98dc2ed24",
            name: "McGuire, Richard",
          },
        ],
        publisher: {
          id: "ea8a127d-06c7-4a70-b9b4-005a65dae90f",
          name: "Salamandra Graphic",
        },
        language: "es",
        edition: 1,
        rating: ((data.rating ?? 0) * 10) / 5,
      };
      return api.POST("books", dto);
    },
    ...options,
  });
};

export default useCreateBookMutation;
