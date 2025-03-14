import React from "react";
import Grid from "@mui/material/Grid2";
import { useIntl } from "react-intl";
import {
  Autocomplete,
  TextField,
} from "../../../../../components/MuiExtensions";
import useBookPublishersQuery from "../../../queries/useBookPublishersQuery";
import useBookAuthorsQuery from "../../../queries/useBookAuthorsQuery";
import useBookSeriesQuery from "../../../queries/useBookSeriesQuery";
import FormField from "../../../../../components/FormField";

const BibliographicalNotes: React.FC<BibliographicalNotesProps> = (props) => {
  const { readOnly } = props;

  const bookAuthorsQuery = useBookAuthorsQuery();
  const bookPublishersQuery = useBookPublishersQuery();
  const bookSeriesQuery = useBookSeriesQuery();
  const intl = useIntl();

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <FormField
          name="title"
          renderInput={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: "books.title" })}
              readOnly={readOnly}
              // required
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <FormField
          name="authors"
          renderInput={({ field }) => (
            <Autocomplete
              {...field}
              freeSolo
              getOptionLabel={(option) => option.name}
              label={intl.formatMessage({ id: "books.writers" })}
              onChange={(_event: React.SyntheticEvent, value) => {
                field.onChange(
                  typeof value === "string" ? { id: null, name: value } : value
                );
              }}
              options={bookAuthorsQuery.data}
              readOnly={readOnly}
              // required
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <FormField
          name="publisher"
          renderInput={({ field }) => (
            <Autocomplete
              {...field}
              freeSolo
              getOptionLabel={(option) => option.name}
              label={intl.formatMessage({ id: "books.publisher" })}
              onChange={(_event: React.SyntheticEvent, value) => {
                field.onChange(
                  typeof value === "string" ? { id: null, name: value } : value
                );
              }}
              options={bookPublishersQuery.data}
              readOnly={readOnly}
              // required
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <FormField
          name="language"
          renderInput={({ field }) => (
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
              // required
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <FormField
          name="releaseDate"
          renderInput={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: "books.releaseDate" })}
              readOnly={readOnly}
              // required
            />
          )}
        />
      </Grid>

      <Grid size={9}>
        <FormField
          name="series"
          renderInput={({ field }) => (
            <Autocomplete
              {...field}
              freeSolo
              getOptionLabel={(option) => option.name}
              label={intl.formatMessage({ id: "books.series" })}
              onChange={(_event: React.SyntheticEvent, value) => {
                field.onChange(
                  typeof value === "string" ? { id: null, name: value } : value
                );
              }}
              options={bookSeriesQuery.data}
              readOnly={readOnly}
            />
          )}
        />
      </Grid>

      <Grid size={3}>
        <FormField
          name="seriesNumber"
          renderInput={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: "books.seriesNumber" })}
              readOnly={readOnly}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <FormField
          name="tags"
          renderInput={({ field }) => (
            <Autocomplete
              {...field}
              freeSolo
              getOptionLabel={(option) => option.name}
              label={intl.formatMessage({ id: "books.tags" })}
              onChange={(_event: React.SyntheticEvent, value) => {
                field.onChange(
                  typeof value === "string" ? { id: null, name: value } : value
                );
              }}
              options={bookAuthorsQuery.data}
              readOnly={readOnly}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export type BibliographicalNotesProps = {
  readOnly?: boolean;
};

export default BibliographicalNotes;
