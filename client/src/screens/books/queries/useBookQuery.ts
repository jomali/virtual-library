import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../../components/ApiProvider";
import { Book, BookDTO } from "../types";

const useBookQuery = (options: { id?: string }) => {
  const { id } = options;
  const api = useApi();

  return useQuery({
    enabled: Boolean(id),
    queryKey: ["books", id],
    queryFn: async () => {
      const response = (await api.GET(["books", id].join("/"))) as {
        data: BookDTO;
      };
      const result: Book = {
        ...response.data,
        authors: response.data.authors[0]?.name,
        edition: String(response.data.edition),
        publisher: response.data.publisher.name,
        rating: ((response.data.rating ?? 0) * 5) / 10,
        translators: response.data.translators?.[0]?.name, // TODO
      };

      return result;
    },
  });
};

export default useBookQuery;
