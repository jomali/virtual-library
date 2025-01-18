import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../../components/ApiProvider";

const useBooksQuery = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await api.GET("books");
      return response.data as Record<string, unknown>[];
    },
  });
};

export default useBooksQuery;
