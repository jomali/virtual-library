import { HttpRequest } from "./HttpRequest";

export type BookDTO = {
  authors: BookAuthorDTO[];
  edition: number;
  id: string;
  language: "en" | "es";
  originalTitle?: string;
  publisher: BookPublisherDTO;
  rating?: number;
  releaseDate: string;
  series?: BookSeriesDTO;
  seriesNumber?: number;
  tags?: BookTagDTO[];
  title: string;
  translators?: BookTranslatorDTO[];
};

export type BookAuthorDTO = {
  id: string;
  name: string;
};

export type BookPublisherDTO = {
  id: string;
  name: string;
};

export type BookSeriesDTO = {
  id: string;
  name: string;
};

export type BookTagDTO = {
  id: string;
  name: string;
};

export type BookTranslatorDTO = {
  id: string;
  name: string;
};

export class Books {
  private static BASE_URL = `${import.meta.env.VITE_HOST}/api/books` as const;

  public static create = (bookDTO: BookDTO) => {
    return HttpRequest.POST(this.BASE_URL, bookDTO);
  };

  public static read = (id: string) => {
    return HttpRequest.GET([this.BASE_URL, id].join("/")) as Promise<BookDTO>;
  };

  public static readAll = () => {
    return HttpRequest.GET(this.BASE_URL) as Promise<BookDTO[]>;
  };

  public static readAuthors = () => {
    return HttpRequest.GET([this.BASE_URL, "authors"].join("/")) as Promise<
      BookAuthorDTO[]
    >;
  };

  public static readPublishers = () => {
    return HttpRequest.GET([this.BASE_URL, "publishers"].join("/")) as Promise<
      BookPublisherDTO[]
    >;
  };

  public static readSeries = () => {
    return HttpRequest.GET([this.BASE_URL, "series"].join("/")) as Promise<
      BookSeriesDTO[]
    >;
  };

  public static update = (bookDTO: BookDTO) => {
    return HttpRequest.PUT([this.BASE_URL, bookDTO.id].join("/"), bookDTO);
  };

  public static delete = (id: string) => {
    return HttpRequest.DELETE([this.BASE_URL, id].join("/"));
  };
}
