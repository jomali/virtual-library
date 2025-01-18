import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import { useIntl } from "react-intl";
import { Book } from "../../../types";

const BibliographicalNotes: React.FC<BibliographicalNotesProps> = (props) => {
  const { control, readOnly } = props;

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
              // readOnly={readOnly}
              required
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid>

      {/* <Grid size={12}>
        <Controller
          control={control}
          name="authors"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.authors" })}
              required
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid> */}

      {/* <Grid size={12}>
        <Controller
          control={control}
          name="publisher"
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
      </Grid> */}

      {/* <Grid size={12}>
        <Controller
          control={control}
          name="language"
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
      </Grid> */}

      {/* <Grid size={12}>
        <Controller
          control={control}
          name="releaseDate"
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
      </Grid> */}

      {/* <Grid size={12}>
        <Controller
          control={control}
          name="edition"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.edition" })}
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid> */}

      {/* <Grid size={12}>
        <Controller
          control={control}
          name="originalTitle"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.originalTitle" })}
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid> */}

      {/* <Grid size={12}>
        <Controller
          control={control}
          name="translators"
          render={({ field }) => (
            <TextField
              fullWidth
              label={intl.formatMessage({ id: "books.translators" })}
              variant="outlined"
              {...field}
            />
          )}
        />
      </Grid> */}
    </Grid>
  );
};

export type BibliographicalNotesProps = {
  control: Control<Book, unknown>;
  errors?: FieldErrors<Book>;
  readOnly?: boolean;
};

export default BibliographicalNotes;
