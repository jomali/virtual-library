import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { useIntl } from "react-intl";
import { Book } from "../../../types";
import { TextField } from "../../../../../components/MuiExtensions";
import Autocomplete from "@mui/material/Autocomplete";

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
              label={intl.formatMessage({ id: "books.title" })}
              readOnly={readOnly}
              required
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

      <Grid size={12}>
        <Controller
          control={control}
          name="language"
          render={({ field }) => (
            <Autocomplete
              {...field}
              getOptionLabel={(option) => {
                return option === "en" ? "Inglés" : "Español";
              }}
              options={["en", "es"]}
              renderInput={(params) => {
                console.log(`🔔 params`, params);

                return (
                  <TextField
                    {...params}
                    label={intl.formatMessage({ id: "books.language" })}
                    readOnly={readOnly}
                    required
                  />
                );
              }}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="releaseDate"
          render={({ field }) => (
            <TextField
              label={intl.formatMessage({ id: "books.releaseDate" })}
              readOnly={readOnly}
              required
              {...field}
            />
          )}
        />
      </Grid>

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
