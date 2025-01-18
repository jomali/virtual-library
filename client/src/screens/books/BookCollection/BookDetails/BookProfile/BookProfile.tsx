import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Book } from "../BookDetails";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import { useIntl } from "react-intl";

const BookProfile: React.FC<IBookProfile> = (props) => {
  const { control } = props;

  const intl = useIntl();

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextField
              autoFocus
              fullWidth
              label={intl.formatMessage({ id: "books.title" })}
              required
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.author" })}
              required
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.publisher" })}
              required
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.language" })}
              required
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.releaseDate" })}
              required
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.edition" })}
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.originalTitle" })}
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.translator" })}
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      {/* */}

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.author" })}
              required
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.publisher" })}
              required
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.language" })}
              required
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.releaseDate" })}
              required
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.edition" })}
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.originalTitle" })}
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.translator" })}
              variant="outlined"
              {...field}
            />
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
