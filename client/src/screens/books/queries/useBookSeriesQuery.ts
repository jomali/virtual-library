import { useQuery } from "@tanstack/react-query";
import { bookKeyFactory } from "./bookKeyFactory";
import { Books } from "../../../service/Books";

const useBookSeriesQuery = () => {
  return useQuery({
    initialData: [],
    queryKey: bookKeyFactory.getBookSeries(),
    queryFn: () => Books.readSeries(),
  });
};

export default useBookSeriesQuery;
