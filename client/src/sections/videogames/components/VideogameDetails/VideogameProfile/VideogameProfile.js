import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import PropTypes from "prop-types";
import FormField, {
  AutocompleteInput,
  DateInput,
  TextInput,
} from "components/FormInputs";
import { PROPERTIES } from "sections/videogames";

const VideogameProfile = (props) => {
  const { developers = [], platforms = [], publishers = [], readOnly } = props;

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
        <FormField // Developers
          name={PROPERTIES.developers}
          renderInput={(params) => (
            <AutocompleteInput
              freeSolo
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              label={"Developers"}
              options={developers}
              readOnly={readOnly}
              {...params}
            />
          )}
        />
      </Grid>

      <Grid xs={12}>
        <FormField // Publishers
          name={PROPERTIES.publishers}
          renderInput={(params) => (
            <AutocompleteInput
              freeSolo
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              label={"Publisher"}
              options={publishers}
              readOnly={readOnly}
              {...params}
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

VideogameProfile.propTypes = {
  developers: PropTypes.array,
  platforms: PropTypes.array,
  publishers: PropTypes.array,
  readOnly: PropTypes.bool,
};

export default VideogameProfile;
