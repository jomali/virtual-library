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

const BookCollection = () => {
  const books = useBooksQuery();
  const navigate = useNavigate();
  const params = useParams();
  const table = useTable();

  console.log(`🔔 params`, params);

  const columns = React.useMemo<MRT_ColumnDef<MRT_RowData>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "author",
        header: "Author",
      },
      {
        accessorKey: "releaseDate",
        header: "Release date",
      },
      {
        accessorKey: "publisher",
        header: "Publisher",
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
      sideContent={() => <BookDetails />}
    >
      <TableProvider
        columns={columns}
        onClick={() => {
          navigate(`/books/${13}`);
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
