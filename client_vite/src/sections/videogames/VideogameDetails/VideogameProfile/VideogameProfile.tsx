import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

import FormField from "../../../../components/FormInputs/FormField";

const VideogameProfile: React.FC<VideogameProfileProps> = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <FormField
          component={TextField}
          label={"Title"} // TODO - i18n
          name={"title"} // TODO - extract from types
        />
      </Grid>
      <Grid xs={12}>
        <FormField
          component={TextField}
          label={"Developer"} // TODO - i18n
          name={"developer"} // TODO - extract from types
        />
      </Grid>
      <Grid xs={12}>
        <FormField
          component={TextField}
          label={"Publisher"} // TODO - i18n
          name={"publisher"} // TODO - extract from types
        />
      </Grid>
      <Grid xs={12}>
        <FormField
          component={TextField}
          label={"Release date"} // TODO - i18n
          name={"releaseDate"} // TODO - extract from types
        />
      </Grid>
      <Grid xs={12}>
        <FormField
          component={TextField}
          label={"Platform"} // TODO - i18n
          name={"platform"} // TODO - extract from types
        />
      </Grid>
    </Grid>
  );
};

export type VideogameProfileProps = object;

export default VideogameProfile;
