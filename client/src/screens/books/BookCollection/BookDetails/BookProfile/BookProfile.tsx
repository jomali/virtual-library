import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Book } from "../BookDetails";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";

const BookProfile: React.FC<IBookProfile> = (props) => {
  const { control } = props;

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextField fullWidth label="Title" variant="outlined" {...field} />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField fullWidth label="Author" variant="outlined" {...field} />
          )}
        />
      </Grid>
    </Grid>
  );
};

export interface IBookProfile {
  control: Control<Book, unknown>;
  errors?: FieldErrors<Book>;
}

export default BookProfile;
