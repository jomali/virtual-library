import { useQuery } from "@tanstack/react-query";
import { bookKeyFactory } from "./bookKeyFactory";
import { Books } from "../../../service/Books";

const useBookAuthorsQuery = () => {
  return useQuery({
    initialData: [],
    queryKey: bookKeyFactory.getBookAuthors(),
    queryFn: () => Books.readAuthors(),
  });
};

export default useBookAuthorsQuery;
