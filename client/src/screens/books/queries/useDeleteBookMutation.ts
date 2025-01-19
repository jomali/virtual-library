/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useApi } from "../../../components/ApiProvider";
import { bookKeyFactory } from "./bookKeyFactory";

const useDeleteBookMutation = (
  options: UseMutationOptions & {
    bookId?: string;
  } = {}
) => {
  const { bookId = "", ...otherOptions } = options;
  const api = useApi();

  return useMutation({
    mutationKey: bookKeyFactory.deleteBook({ bookId }),
    meta: {},
    mutationFn: (data: any) => {
      const dto = { ...data }; // TODO
      console.log(`🔔 dto`, dto);

      return api.POST("/videogames/adfadfasdg", dto);
    },
    ...otherOptions,
  });
};

export default useDeleteBookMutation;
