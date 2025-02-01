export type Book = {
  authors?: { id?: string; name: string } | null;
  edition?: string;
  language: "en" | "es" | string;
  originalTitle?: string;
  publisher?: { id?: string; name: string } | null;
  rating?: number;
  releaseDate: string;
  series?: { id?: string; name: string } | null;
  seriesNumber?: string;
  title: string;
  translators?: string;
};
