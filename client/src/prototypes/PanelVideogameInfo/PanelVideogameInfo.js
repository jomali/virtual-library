import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import EventNoteRoundedIcon from "@material-ui/icons/EventNoteRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "components/_Box";
import CustomTextField from "components/CustomTextField";
import DialogRelease from "components/DialogRelease";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexGrow: 1,
  },
  fieldTitle: {
    fontSize: "1.5rem",
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function PanelVideogameInfo(props) {
  const {
    data = {
      developers: [],
      platforms: [],
      publishers: [],
    },
    editMode = false,
    formId,
    onSave,
    value,
    visible = false,
  } = props;

  const classes = useStyles();

  const [fieldTitle, setFieldTitle] = React.useState("");
  const [fieldDeveloper, setFieldDeveloper] = React.useState("");
  const [fieldPublisher, setFieldPublisher] = React.useState("");
  const [fieldPlatform, setFieldPlatform] = React.useState("");
  const [fieldSeries, setFieldSeries] = React.useState("");
  const [fieldSeriesNumber, setFieldSeriesNumber] = React.useState("");
  const [fieldTags, setFieldTags] = React.useState("");
  const [releaseDialogIsOpen, setReleaseDialogIsOpen] = React.useState(false);

  const findElement = (element, target) => {
    let result = "";
    if (element && Array.isArray(target)) {
      result = target.find((a) => a.id === element.id);
    }
    return result;
  };

  const getReleaseString = () => {
    return "2020-04-19";
  };

  React.useEffect(() => {
    if (value) {
      setFieldTitle(value.title);
      setFieldDeveloper(findElement(value.developer, data.developers));
      setFieldPublisher(findElement(value.publisher, data.publishers));
      setFieldPlatform(findElement(value.platform, data.platforms));
    }
  }, [data, value]);

  return visible ? (
    <>
      <form className={classes.container} id={formId} onSubmit={onSave}>
        <Box className={classes.container} margin={2} spacing={2}>
          {/* Title */}
          <CustomTextField
            InputProps={{ className: classes.fieldTitle }}
            label="Título"
            onChange={(event) => setFieldTitle(event.target.value)}
            readOnly={!editMode}
            value={fieldTitle}
          />
          {/* Developer */}
          <MultipleField
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => setFieldDeveloper(newValue)}
            options={data.developers}
            readOnly={!editMode}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label="Desarrollador"
                readOnly={!editMode}
                variant="filled"
              />
            )}
            value={fieldDeveloper}
          />
          {/* Publisher */}
          <MultipleField
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => setFieldPublisher(newValue)}
            options={data.publishers}
            readOnly={!editMode}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label="Distribuidora"
                readOnly={!editMode}
                variant="filled"
              />
            )}
            value={fieldPublisher}
          />
          {/* Platform */}
          <MultipleField
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => setFieldPlatform(newValue)}
            options={data.platforms}
            readOnly={!editMode}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label="Plataforma"
                readOnly={!editMode}
                variant="filled"
              />
            )}
            value={fieldPlatform}
          />
          {/* Release */}
          <CustomTextField
            InputProps={{
              endAdornment: editMode ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="abrir diálogo de fechas"
                    onClick={() => setReleaseDialogIsOpen(true)}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    <EventNoteRoundedIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
              readOnly: true,
            }}
            label="Fecha de publicación"
            readOnly={!editMode}
            value={getReleaseString()}
          />
          {/* Series */}
          <CustomTextField
            label="Serie"
            onChange={(event) => setFieldSeries(event.target.value)}
            readOnly={!editMode}
            value={fieldSeries}
          />
          {/* Series number*/}
          <CustomTextField
            label="Número"
            onChange={(event) => setFieldSeriesNumber(event.target.value)}
            readOnly={!editMode}
            value={fieldSeriesNumber}
          />
          {/* Tags*/}
          <MultipleField
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => setFieldTags(newValue)}
            options={data.tags}
            readOnly={!editMode}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label="Etiquetas"
                readOnly={!editMode}
                variant="filled"
              />
            )}
            value={fieldTags}
          />
        </Box>
      </form>
      {value ? (
        <DialogRelease
          onAccept={(params) => console.log(params)} // TODO
          onClose={() => setReleaseDialogIsOpen(false)}
          open={releaseDialogIsOpen}
          title={"Fecha de publicación"}
          value={value.release}
        />
      ) : null}
    </>
  ) : null;
}

function MultipleField(props) {
  const { options, readOnly, ...otherProps } = props;
  return (
    <Autocomplete
      {...otherProps}
      disableClearable={readOnly}
      freeSolo
      options={readOnly ? [] : options}
    />
  );
}
