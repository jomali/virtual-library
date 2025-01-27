import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../../components/ApiProvider";
import { Book, BookDTO } from "../types";
import { bookKeyFactory } from "./bookKeyFactory";

const useBookQuery = (options: { id?: string }) => {
  const { id } = options;
  const api = useApi();

  return useQuery({
    enabled: Boolean(id),
    queryKey: bookKeyFactory.getBook({ bookId: id ?? "" }),
    queryFn: async () => {
      const response = (await api.GET(["books", id].join("/"))) as BookDTO;
      const result: Book = {
        ...response,
        authors: response.authors[0], // TODO
        edition: String(response.edition),
        publisher: response.publisher,
        rating: ((response.rating ?? 0) * 5) / 10,
        translators: response.translators?.[0]?.name, // TODO
      };

      return result;
    },
  });
};

export default useBookQuery;
