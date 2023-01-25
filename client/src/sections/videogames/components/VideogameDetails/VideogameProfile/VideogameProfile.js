import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
import FormField, {
  AutocompleteField,
  DateField,
  TextField,
} from 'components/FormFields';
import { PROPERTIES } from 'sections/videogames';

const VideogameProfile = (props) => {
  const { developers = [], platforms = [], publishers = [], readOnly } = props;

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <FormField max={150} name={PROPERTIES.title} required type="string">
          <TextField
            // Title
            autoFocus
            label={'Title'}
            readOnly={readOnly}
            required={!readOnly}
          />
        </FormField>
      </Grid>

      <Grid xs={12}>
        <FormField name={PROPERTIES.developers}>
          <AutocompleteField
            // Developers
            freeSolo
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            label={'Developer'}
            options={developers}
            readOnly={readOnly}
            required={!readOnly}
          />
        </FormField>
      </Grid>

      <Grid xs={12}>
        <FormField name={PROPERTIES.publishers}>
          <AutocompleteField
            // Publishers
            freeSolo
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            label={'Publisher'}
            options={publishers}
            readOnly={readOnly}
            required={!readOnly}
          />
        </FormField>
      </Grid>

      <Grid xs={12}>
        <FormField name={PROPERTIES.releaseDates}>
          <DateField
            // Release dates
            label={'Initial release date'}
            readOnly={readOnly}
            required={!readOnly}
          />
        </FormField>
      </Grid>

      {/* <Grid xs={12}>
        <FormField name={PROPERTIES.platforms}>
          <AutocompleteField
            // Platforms
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            label={'Platforms'}
            multiple
            options={platforms}
            readOnly={readOnly}
            required={!readOnly}
          />
        </FormField>
      </Grid> */}

      {!readOnly ? (
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
      ) : null}
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
