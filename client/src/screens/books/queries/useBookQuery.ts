import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../../components/ApiProvider";

const useBookQuery = (options: { id?: string }) => {
  const { id } = options;
  const api = useApi();

  return useQuery({
    enabled: Boolean(id),
    queryKey: ["books", id],
    queryFn: async () => {
      const response = await api.GET(["books", id].join("/"));
      return response.data as Record<string, unknown>;
    },
  });
};

export default useBookQuery;
