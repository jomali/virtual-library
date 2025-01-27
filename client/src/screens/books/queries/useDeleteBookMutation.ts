import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { useApi } from "../../../components/ApiProvider";
import { bookKeyFactory } from "./bookKeyFactory";

const useDeleteBookMutation = (
  options: MutationOptions & { bookId?: string } = {}
) => {
  const { bookId = "", onSuccess, ...otherOptions } = options;

  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation<any, any, any>({
    mutationKey: bookKeyFactory.deleteBook({ bookId }),
    meta: {},
    mutationFn: (bookId: any) => {
      return api.DELETE(["books", bookId].join("/"));
    },
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
