import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const TablePaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "background.paper",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  height: "100%",
  margin: theme.spacing(0.5),
  overflowY: "auto",
  [theme.breakpoints.up("sm")]: {
    margin: theme.spacing(1),
  },
  [theme.breakpoints.up("md")]: {
    margin: theme.spacing(2),
  },
}));

export default TablePaper;
