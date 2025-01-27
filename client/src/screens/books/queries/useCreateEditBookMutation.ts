import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { useApi } from "../../../components/ApiProvider";
import { bookKeyFactory } from "./bookKeyFactory";
import { Book, BookDTO } from "../types";

const useCreateEditBookMutation = (options: MutationOptions = {}) => {
  const { onSuccess, ...otherOptions } = options;

  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation<any, any, any>({
    mutationKey: bookKeyFactory.createEditBook(),
    meta: {},
    mutationFn: (data: Book & { id?: string }) => {
      const dto = {
        ...data,
        authors: [data.authors],
        publisher: data.publisher,
        language: data.language,
        edition: 1,
        rating: ((data.rating ?? 0) * 10) / 5,
      };

      // console.log(`🔔 data`, data);
      // console.log(`🔔 dto`, dto);
      // throw new Error();

      if (data.id) {
        // TODO: EDIT book
      } else {
        return api.POST("books", dto);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: bookKeyFactory.getBooks() });
      onSuccess?.(data);
    },
    ...otherOptions,
  });
};

type MutationOptions = Omit<UseMutationOptions, "onSuccess"> & {
  onSuccess?: (response: BookDTO) => Promise<unknown> | unknown;
};

export default useCreateEditBookMutation;
