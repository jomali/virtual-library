import React from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import FormField, {
  AutocompleteInput,
  DateInput,
  TextInput,
} from "components/FormInputs";
import { IconButton, Tooltip } from "components/MuiExtensions";
import { PROPERTIES } from "sections/videogames";

const VideogameProfile = (props) => {
  const { developers = [], platforms = [], publishers = [], readOnly } = props;

  const formikContext = useFormikContext();
  console.log("--", formikContext.values);

  const [advancedDevelopers, setAdvancedDevelopers] = React.useState();

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <FormField // Title
          max={150}
          name={PROPERTIES.title}
          renderInput={(params) => (
            <TextInput
              autoFocus
              label={"Title"}
              readOnly={readOnly}
              required={!readOnly}
              {...params}
            />
          )}
          required
        />
      </Grid>

      <Grid xs={12}>
        <Stack alignItems="center" direction="row" spacing={1}>
          <FormField // Developers
            name={`${PROPERTIES.developers}[0]`}
            renderInput={({ field, form, onChange, ...otherParams }) => (
              <AutocompleteInput
                disabled={advancedDevelopers}
                freeSolo
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) =>
                  option.id === value?.id
                }
                label={"Developers"}
                onChange={(newValue, event) => {
                  const newDeveloper =
                    typeof newValue === "string"
                      ? { id: null, name: newValue }
                      : newValue;
                  form.setFieldValue(field.name, {
                    ...newDeveloper,
                    tag: formikContext.values[PROPERTIES.developers][0].tag,
                  });
                }}
                options={developers}
                readOnly={readOnly}
                sx={{ display: "flex", flexGrow: 1 }}
                {...otherParams}
              />
            )}
          />
          <div>
            <Tooltip title={"Avanzado"}>
              <IconButton
                edge="end"
                onClick={() => setAdvancedDevelopers(!advancedDevelopers)}
              >
                <ExpandMoreRoundedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Stack>
      </Grid>

      <TaggedArrayField
        name={PROPERTIES.developers}
        onAdd={() => setAdvancedDevelopers(false)}
        options={developers}
        readOnly={readOnly}
        simplified={!advancedDevelopers}
      />

      <Grid xs={12}>
        <FormField // Publishers
          name={PROPERTIES.publishers}
          renderInput={({ field, form, onChange, ...otherParams }) => (
            <AutocompleteInput
              freeSolo
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              label={"Publisher"}
              onChange={(newValue, event) => {
                const newPublisher =
                  typeof newValue === "string"
                    ? { id: null, name: newValue }
                    : newValue;
                form.setFieldValue(field.name, {
                  ...newPublisher,
                  tag: "main",
                });
              }}
              options={publishers}
              readOnly={readOnly}
              {...otherParams}
            />
          )}
        />
      </Grid>

      <Grid xs={12}>
        <FormField // Release dates
          name={PROPERTIES.releaseDates}
          renderInput={(params) => (
            <DateInput
              label={"Initial release date"}
              readOnly={readOnly}
              {...params}
            />
          )}
        ></FormField>
      </Grid>

      <Grid xs={12}>
        <FormField // Platforms
          name={PROPERTIES.platforms}
          renderInput={(params) => (
            <AutocompleteInput
              filterSelectedOptions
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              label={"Platforms"}
              multiple
              options={platforms}
              readOnly={readOnly}
              {...params}
            />
          )}
        />
      </Grid>

      {/* {!readOnly ? (
        <Grid xs={12}>
          <FormField max={500} name={PROPERTIES.synopsis} type="string">
            <TextField
              // Synopsis
              label={'Synopsis'}
              multiline
              readOnly={readOnly}
              rows={4}
            />
          </FormField>
        </Grid>
      ) : null} */}
    </Grid>
  );
};

const TaggedArrayField = (props) => {
  const { name, onAdd, options, readOnly, simplified } = props;
  const formikContext = useFormikContext();

  return (
    <Collapse
      in={!simplified}
      sx={{
        borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
        marginLeft: (theme) => theme.spacing(1),
        paddingLeft: (theme) => theme.spacing(1),
        ...(!simplified && {
          marginBottom: (theme) => theme.spacing(2),
        }),
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ marginTop: (theme) => theme.spacing(2) }}
      >
        {formikContext.values[name]?.map((element, index) => (
          <Stack
            key={`${name}-${index}`}
            alignItems="center"
            direction={"row"}
            spacing={1}
            sx={{
              display: "flex",
              flexGrow: 1,
              padding: (theme) => theme.spacing(0, 2),
              marginBottom: (theme) => theme.spacing(2),
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "75%",
              }}
            >
              <FormField
                name={`${name}[${index}]`}
                renderInput={({ field, form, onChange, ...otherParams }) => (
                  <AutocompleteInput
                    freeSolo
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value?.id
                    }
                    label={"Developer"}
                    onChange={(newValue, event) => {
                      const newDeveloper =
                        typeof newValue === "string"
                          ? { id: null, name: newValue }
                          : newValue;
                      form.setFieldValue(field.name, {
                        ...newDeveloper,
                        tag: formikContext.values[name][index].tag,
                      });
                    }}
                    options={options}
                    readOnly={readOnly}
                    required={!readOnly}
                    sx={{ width: "100%" }}
                    {...otherParams}
                  />
                )}
                required
              />
            </Box>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <FormField // Title
                max={150}
                name={`${name}[${index}].tag`}
                renderInput={(params) => (
                  <TextInput
                    autoFocus
                    label={"Tag"}
                    readOnly={readOnly}
                    required={!readOnly}
                    {...params}
                  />
                )}
                required
              />
            </Box>
            {!readOnly && (
              <Box>
                <Tooltip title={"Remove developer"}>
                  <IconButton edge="end">
                    <DeleteOutlineRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Stack>
        ))}
        {!readOnly && (
          <Grid sx={{ display: "flex", justifyContent: "flex-end" }} xs={12}>
            <Button onClick={onAdd} variant="text">
              Add developer
            </Button>
          </Grid>
        )}
      </Grid>
    </Collapse>
  );
};

VideogameProfile.propTypes = {
  developers: PropTypes.array,
  platforms: PropTypes.array,
  publishers: PropTypes.array,
  readOnly: PropTypes.bool,
};

export default VideogameProfile;
