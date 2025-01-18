import React from "react";
import DetailHeader from "../../../../components/DetailHeader";
import DetailTabs from "../../../../components/DetailTabs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DetailFooter from "../../../../components/DetailFooter";
import { styled, useTheme } from "@mui/material/styles";
import BookProfile from "./BookProfile";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DetailAnimatedPanel from "../../../../components/DetailAnimatedPanel";
import { useIntl } from "react-intl";
import { AnimatePresence } from "motion/react";
import Gap from "../../../../components/Gap";
import useBookQuery from "../../queries/useBookQuery";
import useNotification from "../../../../components/NotificationProvider/useNotification";

const Form = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflowX: "clip",
}));

const StyledImage = styled("img", {
  shouldForwardProp: (prop) => prop !== "height",
})(({ height, theme }) => ({
  backgroundColor: theme.palette.background.default,
  maxHeight: height,
  minHeight: height,
  objectFit: "contain",
}));

const schema = yup.object({
  author: yup.string().required(),
  title: yup.string().required(),
});

const BookDetails: React.FC<BookDetailsProps> = (props) => {
  const { onClose, value } = props;

  const intl = useIntl();
  const notification = useNotification();
  const theme = useTheme();

  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<{
    current: number;
    direction: number;
  }>({
    current: 0,
    direction: 0,
  });

  const bookQuery = useBookQuery({ id: value.id });
  console.log(`🔔 bookQuery`, bookQuery.data);

  const onSubmit: SubmitHandler<Book> = (data) =>
    console.log(`🔔 submit`, data);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Book>({
    defaultValues: {
      author: "",
      title: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <>
      <DetailHeader onClose={onClose} title={"Book title"} />
      <StyledImage alt={`cover-art`} height={0} src={`broken-image.png`} />
      <DetailTabs
        onChange={(newValue: number) => {
          setTab((previousValue) => ({
            current: newValue,
            direction: newValue - previousValue.current,
          }));
        }}
        tabs={[
          {
            label: intl.formatMessage({ id: "books.bibliographyNotes" }),
            icon: <ViewListRoundedIcon />,
          },
          {
            label: intl.formatMessage({ id: "books.personalNotes" }),
            icon: <PersonRoundedIcon />,
          },
          {
            label: intl.formatMessage({ id: "books.reception" }),
            icon: <ForumRoundedIcon />,
          },
        ]}
        value={tab.current}
      />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence custom={tab.direction} initial={false} mode="wait">
          {tab.current === 0 ? (
            <DetailAnimatedPanel key={`tab-0`} custom={tab.direction}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  padding: theme.spacing(4, 6),
                }}
              >
                <BookProfile control={control} errors={errors} />
                <Gap />
              </Box>
            </DetailAnimatedPanel>
          ) : null}
          {tab.current === 1 ? (
            <DetailAnimatedPanel key={`tab-1`} custom={tab.direction}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  padding: theme.spacing(4, 6),
                }}
              >
                <Typography>
                  {intl.formatMessage({ id: "books.personalNotes" })}
                </Typography>
                <Gap />
              </Box>
            </DetailAnimatedPanel>
          ) : null}
          {tab.current === 2 ? (
            <DetailAnimatedPanel key={`tab-2`} custom={tab.direction}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  padding: theme.spacing(4, 6),
                }}
              >
                <Typography>
                  {intl.formatMessage({ id: "books.reception" })}
                </Typography>
                <Gap />
              </Box>
            </DetailAnimatedPanel>
          ) : null}
        </AnimatePresence>
        <DetailFooter
          editMode={editMode}
          onDelete={() => {
            console.log(`🔔 delete`);
            notification.error("Error al eliminar");
          }}
          onToggleEditMode={() => setEditMode(!editMode)}
        />
      </Form>
    </>
  );
};

export type Book = {
  author: string;
  title: string;
};

export type BookDetailsProps = {
  onClose?: VoidFunction;
  value: {
    id?: string;
  } & Record<string, unknown>;
};

export default BookDetails;
