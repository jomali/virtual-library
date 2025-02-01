import { useQuery } from "@tanstack/react-query";
import { bookKeyFactory } from "./bookKeyFactory";
import { Books } from "../../../service/Books";

const useBookQuery = (options: { id?: string }) => {
  const { id } = options;

  return useQuery({
    enabled: Boolean(id),
    queryKey: bookKeyFactory.getBook({ bookId: id ?? "" }),
    queryFn: async () => {
      const response = await Books.read(id ?? "");
      return {
        ...response,
        authors: response.authors[0], // TODO - use array of authors
        edition: String(response.edition),
        rating: ((response.rating ?? 0) * 5) / 10,
        translators: response.translators?.[0], // TODO - use array of translators
      };
    },
  });
};

export default useBookQuery;
