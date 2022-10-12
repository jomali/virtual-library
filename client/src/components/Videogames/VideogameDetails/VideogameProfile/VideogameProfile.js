import React from 'react';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import FormField, {
  AutocompleteField,
  TextField,
} from 'components/shared/FormFields';
import CustomTextField from 'components/shared/MuiCustomizations/TextField';
import { PROPERTIES } from './videogameProfileConstants';

const VideogameProfile = (props) => {
  const { developers = [], platforms = [], publishers = [], readOnly } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
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

      {/* <Grid item xs={12}>
        <FormField name={PROPERTIES.developers}>
          <AutocompleteField
            // Developers
            freeSolo
            multiple
            options={developers.map((element) => element.name)}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label={'Developer'}
                readOnly={false} // TODO - why?
              />
            )}
          />
        </FormField>
      </Grid> */}

      {/* <Grid item xs={12}>
        <FormField name={PROPERTIES.publishers}>
          <AutocompleteField
            // Publishers
            freeSolo
            multiple
            options={publishers.map((element) => element.name)}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label={'Publisher'}
                readOnly={false} // TODO - why?
              />
            )}
          />
        </FormField>
      </Grid> */}

      {/* <Grid item xs={12}>
        <FormField name={PROPERTIES.releaseDates}></FormField>
      </Grid> */}

      {/* <Grid item xs={12}>
        <FormField name={PROPERTIES.platforms}>
          <AutocompleteField
            // Platforms
            freeSolo
            multiple
            options={platforms.map((element) => element.name)}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label={'Platforms'}
                readOnly={false} // TODO - why?
              />
            )}
          />
        </FormField>
      </Grid> */}

      {!readOnly ? (
        <Grid item xs={12}>
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
