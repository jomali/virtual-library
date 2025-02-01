import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { bookKeyFactory } from "./bookKeyFactory";
import { Book } from "../types";
import { BookDTO, Books } from "../../../service/Books";

const useCreateEditBookMutation = (options: MutationOptions = {}) => {
  const { onSuccess, ...otherOptions } = options;

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
        edition: 1, // TODO
        rating: ((data.rating ?? 0) * 10) / 5,
      } as BookDTO;

      // console.log(`🔔 data`, data);
      // console.log(`🔔 dto`, dto);
      // throw new Error();

      if (data.id) {
        return Books.update(dto);
      } else {
        return Books.create(dto);
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
