import { useQuery } from "@tanstack/react-query";
import { bookKeyFactory } from "./bookKeyFactory";
import { Books } from "../../../service/Books";

const useBookPublishersQuery = () => {
  return useQuery({
    initialData: [],
    queryKey: bookKeyFactory.getBookPublishers(),
    queryFn: () => Books.readPublishers(),
  });
};

export default useBookPublishersQuery;
