import React from "react";
import TableProvider, {
  TableContents,
  TableToolbar,
  useTable,
} from "../../../components/TableProvider";
import { MRT_ColumnDef, MRT_RowData } from "material-react-table";
import Collection from "../../../components/Collection";
import useBooksQuery from "../queries/useBooksQuery";
import BookDetails from "./BookDetails";
import { useNavigate, useParams } from "react-router";
import Rating from "@mui/material/Rating";
import { useIntl } from "react-intl";
import TableContainer from "../../../components/TableContainer";

const BookCollection = () => {
  const books = useBooksQuery();
  const intl = useIntl();
  const navigate = useNavigate();
  const urlParams = useParams();
  const table = useTable();

  React.useEffect(() => {
    if (urlParams.id) {
      table.onSelect(urlParams.id === "new" ? {} : { [urlParams.id]: true });
    } else {
      table.onSelect({});
    }
  }, [urlParams.id]);

  const columns = React.useMemo<MRT_ColumnDef<MRT_RowData>[]>(
    () => [
      {
        accessorKey: "title",
        header: intl.formatMessage({ id: "books.title" }),
      },
      {
        accessorKey: "authors",
        header: intl.formatMessage({ id: "books.writers" }),
        Cell: ({ renderedCellValue }: any) =>
          renderedCellValue
            ?.map((element: { name: string }) => element.name)
            .join("; "),
      },
      {
        accessorKey: "publisher.name",
        header: intl.formatMessage({ id: "books.publisher" }),
      },
      {
        accessorKey: "language",
        header: intl.formatMessage({ id: "books.language" }),
        Cell: ({ renderedCellValue }) => {
          return intl.formatMessage({ id: `language.${renderedCellValue}` });
        },
      },
      {
        accessorKey: "releaseDate",
        header: intl.formatMessage({ id: "books.releaseDate" }),
      },
      {
        accessorKey: "rating",
        header: intl.formatMessage({ id: "books.rating" }),
        Cell: ({ renderedCellValue }) => {
          const rating = (renderedCellValue as number) ?? 0;
          return <Rating precision={0.5} readOnly value={(rating * 5) / 10} />;
        },
        muiTableBodyCellProps: () => ({
          sx: {
            paddingBottom: 0,
            paddingTop: 0,
          },
        }),
      },
    ],
    []
  );

  return (
    <Collection
      open={Boolean(urlParams.id)}
      sideContent={() => (
        <BookDetails
          key={Date.now()}
          id={urlParams.id === "new" ? undefined : urlParams.id}
        />
      )}
    >
      <TableProvider
        columns={columns}
        getRowKey={(row) => row.id}
        onClick={(id) =>
          urlParams.id === id ? navigate("/books") : navigate(`/books/${id}`)
        }
        rows={books.data ?? []}
        {...table}
      >
        <TableToolbar
          addTool={{
            onClick: () => {
              navigate("/books/new");
            },
            visible: true,
          }}
          title={intl.formatMessage({ id: "books.books" })}
        />
        <TableContainer>
          <TableContents />
        </TableContainer>
      </TableProvider>
    </Collection>
  );
};

export default BookCollection;
