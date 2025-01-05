import { useQuery } from "@tanstack/react-query";

const useBooksQuery = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: () => {
      return [
        {
          author: "Druyan, Ann",
          language: "spanish",
          publisher: "National Geographic",
          releaseDate: "2020/03",
          title: "Cosmos: Mundos Posibles",
        },
        {
          author: "VV.AA.",
          language: "english",
          publisher: "Titan Books",
          releaseDate: "2020/03",
          title: "Dragon Age: Tevinter Nights",
        },
      ];
    },
  });
};

export default useBooksQuery;
