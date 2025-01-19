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

const BookCollection = () => {
  const books = useBooksQuery();
  const intl = useIntl();
  const navigate = useNavigate();
  const urlParams = useParams();
  const table = useTable();

  const columns = React.useMemo<MRT_ColumnDef<MRT_RowData>[]>(
    () => [
      {
        accessorKey: "title",
        header: intl.formatMessage({ id: "books.title" }),
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
        Cell: (value) => {
          const rating = (value.renderedCellValue as number) ?? 0;
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
      onClose={() => {
        navigate("/books");
      }}
      open={Boolean(urlParams.id)}
      sideContent={(params) => (
        <BookDetails
          value={{ id: urlParams.id === "new" ? undefined : urlParams.id }}
          {...params}
        />
      )}
    >
      <TableProvider
        columns={columns}
        onClick={(item) => {
          navigate(`/books/${item.id}`);
        }}
        rows={books.data ?? []}
        {...table}
      >
        <TableToolbar
          addTool={{
            onClick: () => {
              table.setActiveRow(undefined);
              navigate("/books/new");
            },
            visible: true,
          }}
          title={intl.formatMessage({ id: "books.books" })}
        />
        <TableContents />
      </TableProvider>
    </Collection>
  );
};

export default BookCollection;
