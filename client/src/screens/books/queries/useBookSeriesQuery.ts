import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../../components/ApiProvider";
import { bookKeyFactory } from "./bookKeyFactory";

const useBookSeriesQuery = () => {
  const api = useApi();

  return useQuery({
    initialData: [],
    queryKey: bookKeyFactory.getBookSeries(),
    queryFn: async () => {
      const response = await api.GET("books/series");
      return (response ?? []) as Record<string, unknown>[];
    },
  });
};

export default useBookSeriesQuery;
