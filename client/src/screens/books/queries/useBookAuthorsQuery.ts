import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../../components/ApiProvider";
import { bookKeyFactory } from "./bookKeyFactory";

const useBookAuthorsQuery = () => {
  const api = useApi();

  return useQuery({
    initialData: [],
    queryKey: bookKeyFactory.getBookAuthors(),
    queryFn: async () => {
      const response = await api.GET("books/authors");
      return (response.data ?? []) as Record<string, unknown>[];
    },
  });
};

export default useBookAuthorsQuery;
