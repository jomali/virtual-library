import React from "react";
import TableProvider, {
  TableContents,
  TableToolbar,
  useTable,
} from "../../../components/TableProvider";
import { MRT_ColumnDef, MRT_RowData } from "material-react-table";
import Collection from "../../../components/Collection";
import useBooksQuery from "./useBooksQuery";
import BookDetails from "./BookDetails";
import { useNavigate, useParams } from "react-router";
import Rating from "@mui/material/Rating";

const BookCollection = () => {
  const books = useBooksQuery();
  const navigate = useNavigate();
  const params = useParams();
  const table = useTable();

  const columns = React.useMemo<MRT_ColumnDef<MRT_RowData>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "publisher.name",
        header: "Publisher",
      },
      {
        accessorKey: "language",
        header: "Language",
      },
      {
        accessorKey: "releaseDate",
        header: "Release date",
      },
      {
        accessorKey: "rating",
        header: "Rating",
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
      open={Boolean(params.id)}
      sideContent={(params) => <BookDetails {...params} />}
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
            onClick: () => console.log(`🔔 add`),
            visible: true,
          }}
          title="Books"
        />
        <TableContents />
      </TableProvider>
    </Collection>
  );
};

export default BookCollection;
