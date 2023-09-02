import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Rating from "@mui/material/Rating";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import FormField from "components/FormInputs";
import { PROPERTIES } from "sections/videogames";

const VideogameNotes = (props) => {
  const { readOnly } = props;

  return <p>Notes.</p>;

  // return (
  //   <Grid container spacing={2}>
  //     <Grid xs={12}>
  //       <FormField name={PROPERTIES.rating}>
  //         <Rating precision={0.5} readOnly={readOnly} value={3.5} />
  //       </FormField>
  //     </Grid>

  //     <Grid xs={12}>
  //       <FormField name={PROPERTIES.personalCollection}>
  //         <FormGroup>
  //           <FormControlLabel
  //             control={<Switch />}
  //             label="Personal collection"
  //             sx={{ margin: 0 }}
  //           />
  //         </FormGroup>
  //       </FormField>
  //     </Grid>
  //   </Grid>
  // );
};

export default VideogameNotes;
