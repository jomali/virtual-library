import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
// import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import CollectionScreen from "components/CollectionScreen";
import { api, useHttp } from "components/ContextAPI";
import DialogDetails from "components/DialogDetails";
import PanelVideogameInfo from "components/PanelVideogameInfo";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function ScreenVideogames() {
  const http = useHttp();
  const classes = useStyles();

  const [developers, setDevelopers] = React.useState([]);
  const [editInfoPanel, setEditInfoPanel] = React.useState(false);
  const [, setIsLoading] = React.useState(false);
  const [platforms, setPlatforms] = React.useState([]);
  const [selected, setSelected] = React.useState();
  const [videogames, setVideogames] = React.useState([]);

  const columns = [
    {
      attribute: "title",
      format: (value) => (
        <Typography className={classes.title} variant="subtitle1">
          {value}
        </Typography>
      ),
      label: "Título",
    },
    {
      attribute: "developer",
      format: (value) => (value ? value.name : ""),
      label: "Desarrollador",
    },
    {
      attribute: "publisher",
      format: (value) => (value ? value.name : ""),
      label: "Distribuidora",
    },
    {
      attribute: "platform",
      format: (value) => (value ? value.name : ""),
      label: "Plataforma",
    },
  ];

  React.useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        setDevelopers(await http.GET(api.developers()));
        setPlatforms(await http.GET(api.platforms()));
        setVideogames(await http.GET(api.videogames()));
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    initializeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CollectionScreen
        columns={columns}
        data={videogames}
        onSearch={() => null}
        onSelect={(newValue) => setSelected(newValue)}
        selected={selected ? selected.id : undefined}
      />
      <DialogDetails
        onClose={() => setSelected()}
        onRemove={() => console.log("delete")}
        onSave={(params) => console.log(params)}
        open={!!selected}
        title={selected ? selected.title : "Nueva entrada"}
      >
        <PanelVideogameInfo
          data={{
            developers,
            platforms,
            publishers: developers,
          }}
          editMode={editInfoPanel}
          formId="form-general"
          icon={<ListRoundedIcon />}
          onEdit={(editMode) => {
            setEditInfoPanel(editMode);
            if (!editMode) {
              setSelected({ ...selected });
            }
          }}
          onRemove={() => console.log("delete")}
          onSave={(params) => {
            if (!params.target) {
              console.log(params);
            }
            // TODO
            setEditInfoPanel(false);
          }}
          value={selected}
        />
        {/* <PanelVideogamePersonal
          formId="form-personal"
          icon={<FaceRoundedIcon />}
          value={selected}
        />
        <PanelVideogamePersonal
          formId="form-reception"
          icon={<ForumRoundedIcon />}
          value={selected}
        /> */}
      </DialogDetails>
    </>
  );
}
