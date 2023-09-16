import React from "react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";
import VideogameAssetRoundedIcon from "@mui/icons-material/VideogameAssetRounded";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "components/ApiProvider";
import Collection from "components/Collection";
import TableProvider, {
  TableContainer,
  TableContent,
  TableSummary,
  TableToolbar,
  TableToolbarOption,
  useTable,
} from "components/MuiExtensions/TableProvider";
import TablePaper from "components/TablePaper";
import VideogameDetails from "./VideogameDetails";
import { PROPERTIES } from "./videogamesConstants";

export default function Videogames() {
  const api = useApi();
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();
  const table = useTable();

  const [anchorEl, setAnchorEl] = React.useState();

  const videogamesQuery = useQuery(["videogames"], async () => {
    const result = await api.GET("videogames");
    return result.data;
  });

  const columns = [
    {
      attribute: PROPERTIES.title,
      label: "Title",
    },
    {
      attribute: PROPERTIES.developers,
      label: "Developer",
      options: {
        format: (value) => value[0]?.name,
      },
    },
    {
      attribute: PROPERTIES.publishers,
      label: "Publisher",
      options: {
        format: (value) => value[0]?.name,
      },
    },
    {
      attribute: PROPERTIES.initialReleaseDate,
      label: "Release date",
      options: {
        format: (value) => value?.date && format(new Date(value.date), "P"),
      },
    },
    {
      attribute: PROPERTIES.platforms,
      label: "Platform",
      options: {
        format: (value) => value.map((element) => element.name).join(", "),
      },
    },
  ];

  return (
    <Collection
      onClose={(refresh) => {
        table.setSelected();
        navigate(`/videogames`);
        if (refresh) {
          queryClient.invalidateQueries("videogames");
        }
      }}
      open={Boolean(params.id)}
      sideContent={(otherParams) => (
        <VideogameDetails
          value={{
            id: Number.parseInt(params.id) || null,
            // TODO: load other values to display them while fetching the API
          }}
          {...otherParams}
        />
      )}
      title={"Videogames"}
    >
      <TableProvider
        columns={columns}
        controls={table.controls}
        count={videogamesQuery.data?.length}
        loading={videogamesQuery.isFetching}
        onSelect={(value) => {
          table.setSelected(value);
          navigate(value[0] ? `/videogames/${value[0]}` : `/videogames`);
        }}
        rows={videogamesQuery.data}
        selectable
        selected={table.selected}
        selector={(value) => value.id}
      >
        <TableContainer component={TablePaper} variant="outlined">
          <TableToolbar
            addOptions={{
              label: "Add new videogame",
              onClick: () => {
                table.setSelected();
                navigate("/videogames/new");
              },
            }}
            options={[<TableToolbarOption />, <TableToolbarOption />]}
            filterOptions={{
              label: "Filter results",
              onClick: () => console.log("filter results"),
            }}
            // searchOptions={{}}
            title={"Videogames"}
            title_={() => (
              <ButtonBase
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{
                  borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                  padding: 1,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }}
              >
                <Typography component="div" id="tableTitle" variant="h6">
                  Videogames
                </Typography>
                <ArrowDropDownRoundedIcon
                  sx={{
                    marginLeft: 0.5,
                    marginRight: -0.5,
                    transition: (theme) =>
                      theme.transitions.create("transform", {
                        duration: (theme) => theme.transitions.duration.short,
                      }),
                    ...(Boolean(anchorEl) && { transform: "rotate(180deg)" }),
                  }}
                />
              </ButtonBase>
            )}
          />
          <TableContent />
          <TableSummary />
        </TableContainer>
      </TableProvider>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        id="account-menu"
        onClick={() => setAnchorEl()}
        onClose={() => setAnchorEl()}
        open={Boolean(anchorEl)}
        PaperProps={{
          elevation: 0,
          sx: {
            // backgroundColor: (theme) => theme.palette.common.black,
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.contrastText,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            // "&:before": {
            //   content: '""',
            //   display: "block",
            //   position: "absolute",
            //   top: 0,
            //   left: 14,
            //   width: 10,
            //   height: 10,
            //   // backgroundColor: (theme) => theme.palette.common.black,
            //   backgroundColor: (theme) => theme.palette.primary.main,
            //   color: (theme) => theme.palette.primary.contrastText,
            //   transform: "translateY(-50%) rotate(45deg)",
            //   zIndex: 0,
            // },
          },
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(`/videogames`)} selected>
              <ListItemIcon>
                <VideogameAssetRoundedIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="Videogames" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(`/movies`)}>
              <ListItemIcon>
                <LocalMoviesRoundedIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary={"Movies"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(`/books`)}>
              <ListItemIcon>
                <AutoStoriesRoundedIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary={"Books"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(`/videogames/developers`)}>
              <ListItemIcon />
              <ListItemText primary={"Developers"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(`/videogames/publishers`)}>
              <ListItemIcon />
              <ListItemText primary={"Publishers"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(`/videogames/platforms`)}>
              <ListItemIcon />
              <ListItemText primary={"Platforms"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Collection>
  );
}
