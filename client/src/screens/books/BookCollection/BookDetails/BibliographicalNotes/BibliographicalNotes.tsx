import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { useIntl } from "react-intl";
import { Book } from "../../../types";
import { createFilterOptions } from "@mui/material/Autocomplete";
import {
  Autocomplete,
  TextField,
} from "../../../../../components/MuiExtensions";
import useBookPublishersQuery from "../../../queries/useBookPublishersQuery";

const filterPublishers = createFilterOptions<{ id?: string; name: string }>();

const BibliographicalNotes: React.FC<BibliographicalNotesProps> = (props) => {
  const { control, readOnly } = props;

  const bookPublishersQuery = useBookPublishersQuery();

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

      <Grid size={12}>
        <Controller
          control={control}
          name="publisher"
          render={({ field }) => (
            <Autocomplete
              {...field}
              filterOptions={(options, params) => {
                const filtered = filterPublishers(options, params);
                const { inputValue } = params;

                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option.name
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push(inputValue);
                }

                return filtered;
              }}
              freeSolo
              getOptionLabel={(option) => {
                // Value selected with `enter`, right from the input
                if (typeof option === "string") {
                  return `Add "${option}"`; // TODO
                }
                return option.name ?? "";
              }}
              label={intl.formatMessage({ id: "books.publisher" })}
              onChange={(_event: React.SyntheticEvent, value) => {
                field.onChange(
                  typeof value === "string" ? { id: null, name: value } : value
                );
              }}
              options={bookPublishersQuery.data ?? []}
              readOnly={readOnly}
              required
            />
          )}
        />
      </Grid>

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
              label={intl.formatMessage({ id: "books.language" })}
              onChange={(_event: React.SyntheticEvent, value) => {
                field.onChange(value);
              }}
              options={["en", "es"]}
              readOnly={readOnly}
              required
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
