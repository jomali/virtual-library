export type Book = {
  authors?: string;
  edition?: string;
  language: "en" | "es" | string;
  originalTitle?: string;
  publisher?: { id?: string; name: string } | null;
  rating?: number;
  releaseDate: string;
  title: string;
  translators?: string;
};

export type BookDTO = {
  authors: { id?: string; name: string }[];
  edition: number;
  id: string;
  language: "en" | "es";
  originalTitle?: string;
  publisher: { id?: string; name: string };
  rating?: number;
  releaseDate: string;
  title: string;
  translators?: { id?: string; name: string }[];
};
