import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { bookKeyFactory } from "./bookKeyFactory";
import { Books } from "../../../service/Books";

const useDeleteBookMutation = (
  options: MutationOptions & { bookId?: string } = {}
) => {
  const { bookId = "", onSuccess, ...otherOptions } = options;

  const queryClient = useQueryClient();

  return useMutation<any, any, any>({
    mutationKey: bookKeyFactory.deleteBook({ bookId }),
    meta: {},
    mutationFn: (bookId) => Books.delete(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeyFactory.getBooks() });
      onSuccess?.();
    },
    ...otherOptions,
  });
};

type MutationOptions = Omit<UseMutationOptions, "onSuccess"> & {
  onSuccess?: () => Promise<unknown> | unknown;
};

export default useDeleteBookMutation;
