import { useQuery } from "@tanstack/react-query";

const useBooksQuery = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: () => {
      return [
        {
          id: 1,
          author: "Druyan, Ann",
          language: "spanish",
          publisher: "National Geographic",
          releaseDate: "2020/03",
          title: "Cosmos: Mundos Posibles",
        },
        {
          id: 2,
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
