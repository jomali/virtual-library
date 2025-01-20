import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { useApi } from "../../../components/ApiProvider";
import { bookKeyFactory } from "./bookKeyFactory";
import { Book, BookDTO } from "../types";

const useCreateBookMutation = (options: MutationOptions = {}) => {
  const { onSuccess, ...otherOptions } = options;

  const api = useApi();
  const queryClient = useQueryClient();

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
        publisher: data.publisher,
        language: data.language,
        edition: 1,
        rating: ((data.rating ?? 0) * 10) / 5,
      };
      console.log(`🔔 data`, data);
      console.log(`🔔 dto`, dto);
      throw new Error();
      return api.POST("books", dto);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: bookKeyFactory.all() });
      onSuccess?.(data);
    },
    ...otherOptions,
  });
};

type MutationOptions = Omit<UseMutationOptions, "onSuccess"> & {
  onSuccess?: (response: BookDTO) => Promise<unknown> | unknown;
};

export default useCreateBookMutation;
