import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import { TextField } from 'components/shared/FormFields';

const InfoForm = (props) => {
  const {
    developers = [],
    fields,
    onChange,
    platforms = [],
    publishers = [],
  } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          // Title
          label={'Title'}
          onChange={(event) =>
            onChange({
              ...fields,
              title: event.target.value,
            })
          }
          value={fields.title}
        />
      </Grid>

      <Grid item xs={12}>
        <Autocomplete
          // Developer
          filterSelectedOptions
          freeSolo
          getOptionLabel={(value) =>
            typeof value === 'object' ? value.name : value
          }
          id="developer"
          limitTags={2}
          multiple
          onChange={(event, newValue) =>
            onChange({
              ...fields,
              developers: newValue.map((element) =>
                typeof element === 'string' ? { name: element } : element
              ),
            })
          }
          options={developers}
          renderInput={(params) => <TextField {...params} label="Developer" />}
          value={fields.developers}
        />
      </Grid>

      <Grid item xs={12}>
        <Autocomplete
          // Publisher
          filterSelectedOptions
          freeSolo
          getOptionLabel={(value) => value.name}
          id="publisher"
          limitTags={2}
          multiple
          onChange={(event, newValue) =>
            onChange({
              ...fields,
              publishers: newValue.map((element) =>
                typeof element === 'string' ? { name: element } : element
              ),
            })
          }
          options={publishers}
          renderInput={(params) => <TextField {...params} label="Publisher" />}
          value={fields.publishers}
        />
      </Grid>

      {/* <Grid item xs={12}>
        <Stack alignItems="center" direction="row" spacing={1}>
          <MobileDatePicker
            // Release date
            onChange={(newValue) =>
              onChange({ ...fields, releaseDates: [{ date: newValue }] })
            }
            renderInput={(params) => (
              <TextField {...params} label="Release date" />
            )}
            value={fields.releaseDates[0]?.date}
          />
        </Stack>
      </Grid> */}

      <Grid item xs={12}>
        <Autocomplete
          // Platforms
          filterSelectedOptions
          getOptionLabel={(value) => value.name}
          id="platforms"
          limitTags={2}
          multiple
          options={platforms}
          renderInput={(params) => <TextField {...params} label="Platforms" />}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          // Synopsis
          label="Synopsis"
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
};

export default InfoForm;