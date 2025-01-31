import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../../components/ApiProvider";
import { bookKeyFactory } from "./bookKeyFactory";

const useBookPublishersQuery = () => {
  const api = useApi();

  return useQuery({
    initialData: [],
    queryKey: bookKeyFactory.getBookPublishers(),
    queryFn: async () => {
      const response = await api.GET("books/publishers");
      return (response ?? []) as Record<string, unknown>[];
    },
  });
};

export default useBookPublishersQuery;
