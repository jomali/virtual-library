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
      const response = (await api.GET(["books", id].join("/"))) as {
        data: BookDTO;
      };
      const result: Book = {
        ...response.data,
        authors: response.data.authors[0]?.name, // TODO
        edition: String(response.data.edition),
        publisher: response.data.publisher,
        rating: ((response.data.rating ?? 0) * 5) / 10,
        translators: response.data.translators?.[0]?.name, // TODO
      };

      return result;
    },
  });
};

export default useBookQuery;
