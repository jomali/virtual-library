import React from 'react';
import Grid from '@mui/material/Grid';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import { FormField, TextField } from 'components/shared/FormFields';

const CreditsLayout = (props) => {
  const { readOnly } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormField name="title">
          <TextField
            // Title
            autoFocus
            label={'Title'}
            readOnly={readOnly}
          />
        </FormField>
      </Grid>
    </Grid>
  );
};

CreditsLayout.propTypes = {};

export default CreditsLayout;
