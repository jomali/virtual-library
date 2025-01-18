import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { useIntl } from "react-intl";
import { Book } from "../../../types";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";

const PersonalNotes: React.FC<PersonalNotesProps> = (props) => {
  const { control, readOnly } = props;

  const intl = useIntl();

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <>
              <Typography component={"legend"} variant="caption">
                {intl.formatMessage({ id: "books.rating" })}
              </Typography>
              <Rating precision={0.5} readOnly={readOnly} {...field} />
            </>
          )}
        />
      </Grid>
    </Grid>
  );
};

export type PersonalNotesProps = {
  control: Control<Book, unknown>;
  errors?: FieldErrors<Book>;
  readOnly?: boolean;
};

export default PersonalNotes;
