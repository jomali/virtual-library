import React from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Card } from "@mui/material";
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

  const [advancedDevelopers, setAdvancedDevelopers] = React.useState();
  const [advancedPublishers, setAdvancedPublishers] = React.useState();
  const [advancedReleaseDates, setAdvancedReleaseDates] = React.useState();

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <FormField // Title
          max={150}
          name={PROPERTIES.title}
          renderInput={(params) => (
            <TextInput
              {...params}
              autoFocus
              label={"Title"}
              readOnly={readOnly}
              required={!readOnly}
            />
          )}
          required
        />
      </Grid>

      <TaggedArrayField // Developer
        label={"Developer"}
        name={PROPERTIES.developers}
        onToggle={() => setAdvancedDevelopers(!advancedDevelopers)}
        readOnly={readOnly}
        renderInput={({ field, form, onChange, tag, ...otherParams }) => (
          <AutocompleteInput
            {...otherParams}
            freeSolo
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            onChange={(newValue, event) => {
              const newDeveloper =
                typeof newValue === "string"
                  ? { id: null, name: newValue }
                  : newValue;
              form.setFieldValue(field.name, {
                ...newDeveloper,
                tag: tag,
              });
            }}
            options={developers}
            readOnly={readOnly}
          />
        )}
        simplified={!advancedDevelopers}
      />

      <TaggedArrayField // Publisher
        label={"Publisher"}
        name={PROPERTIES.publishers}
        onToggle={() => setAdvancedPublishers(!advancedPublishers)}
        readOnly={readOnly}
        renderInput={({ field, form, onChange, tag, ...otherParams }) => (
          <AutocompleteInput
            {...otherParams}
            freeSolo
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            onChange={(newValue, event) => {
              const newPublisher =
                typeof newValue === "string"
                  ? { id: null, name: newValue }
                  : newValue;
              form.setFieldValue(field.name, {
                ...newPublisher,
                tag: tag,
              });
            }}
            options={publishers}
            readOnly={readOnly}
          />
        )}
        simplified={!advancedPublishers}
      />

      <TaggedArrayField // Release dates
        label={"Release date"}
        name={PROPERTIES.releaseDates}
        onToggle={() => setAdvancedReleaseDates(!advancedReleaseDates)}
        readOnly={readOnly}
        renderInput={({
          field,
          form,
          onChange,
          tag,
          value,
          ...otherParams
        }) => (
          <DateInput
            {...otherParams}
            label={"Release date"}
            onChange={(newValue, event) => {
              form.setFieldValue(field.name, {
                date: newValue,
                tag: tag,
              });
            }}
            readOnly={readOnly}
            sx={{ display: "flex", flexGrow: 1 }}
            value={value?.date}
          />
        )}
        simplified={!advancedReleaseDates}
      />

      <Grid xs={12}>
        <FormField // Platforms
          name={PROPERTIES.platforms}
          renderInput={(params) => (
            <AutocompleteInput
              {...params}
              filterSelectedOptions
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              label={"Platforms"}
              multiple
              options={platforms}
              readOnly={readOnly}
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
  const { label, name, onToggle, readOnly, renderInput, simplified } = props;

  const formikContext = useFormikContext();

  return (
    <>
      <Grid xs={12}>
        <Stack alignItems="center" direction="row" spacing={1}>
          <FormField
            name={`${name}[0]`}
            renderInput={(params) =>
              renderInput({
                ...params,
                disabled: params.disabled || (!readOnly && !simplified),
                label: label,
                sx: { display: "flex", flexGrow: 1 },
                tag: formikContext.values[name]?.[0].tag,
              })
            }
          />
          <div>
            <Tooltip title={"Advanced"}>
              <IconButton edge="end" onClick={onToggle}>
                <ExpandMoreRoundedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Stack>
      </Grid>
      <Collapse
        in={!simplified}
        sx={{
          borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
          marginLeft: (theme) => theme.spacing(1),
          paddingLeft: (theme) => theme.spacing(1),
          // padding: (theme) => theme.spacing(0, 1),
          ...(!simplified && {
            marginBottom: (theme) => theme.spacing(2),
          }),
        }}
      >
        {/* <Card
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            padding: (theme) => theme.spacing(1),
          }}
          variant="outlined"
        > */}
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
                  renderInput={(params) =>
                    renderInput({
                      ...params,
                      label: label,
                      size: "small",
                      sx: { width: "100%" },
                      tag: formikContext.values[name]?.[index].tag,
                    })
                  }
                  required
                />
              </Box>
              <Box sx={{ display: "flex", flexGrow: 1 }}>
                <FormField
                  max={150}
                  name={`${name}[${index}].tag`}
                  renderInput={(params) => (
                    <TextInput
                      {...params}
                      label={"Tag"}
                      readOnly={readOnly}
                      size="small"
                    />
                  )}
                />
              </Box>
              {!readOnly && (
                <Box>
                  <Tooltip title={`Remove ${label.toLocaleLowerCase()}`}>
                    <IconButton
                      edge="end"
                      onClick={() => {
                        const updatedArray = [...formikContext.values[name]];
                        updatedArray.splice(index, 1);
                        formikContext.setFieldValue(name, updatedArray);
                      }}
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Stack>
          ))}
          {!readOnly && (
            <Grid sx={{ display: "flex", justifyContent: "flex-end" }} xs={12}>
              <Button
                onClick={() => {
                  formikContext.setFieldValue(
                    `${name}[${formikContext.values[name].length}]`,
                    { tag: "" }
                  );
                }}
                variant="text"
              >
                {`Add ${label.toLocaleLowerCase()}`}
              </Button>
            </Grid>
          )}
        </Grid>
        {/* </Card> */}
      </Collapse>
    </>
  );
};

VideogameProfile.propTypes = {
  developers: PropTypes.array,
  platforms: PropTypes.array,
  publishers: PropTypes.array,
  readOnly: PropTypes.bool,
};

export default VideogameProfile;
