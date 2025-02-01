import { useQuery } from "@tanstack/react-query";
import { bookKeyFactory } from "./bookKeyFactory";
import { Books } from "../../../service/Books";

const useBooksQuery = () => {
  return useQuery({
    queryKey: bookKeyFactory.getBooks(),
    queryFn: () => Books.readAll(),
  });
};

export default useBooksQuery;
