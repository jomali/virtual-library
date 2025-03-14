import React from "react";
import DetailHeader from "../../../../components/DetailHeader";
import DetailTabs from "../../../../components/DetailTabs";
import Typography from "@mui/material/Typography";
import DetailFooter from "../../../../components/DetailFooter";
import { styled } from "@mui/material/styles";
import BookProfile from "./BibliographicalNotes";
// import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DetailAnimatedPanel from "../../../../components/DetailAnimatedPanel";
import { useIntl } from "react-intl";
import { AnimatePresence } from "motion/react";
import useBookQuery from "../../queries/useBookQuery";
import useNotification from "../../../../components/NotificationProvider/useNotification";
import { Book } from "../../types";
import PersonalNotes from "./PersonalNotes";
import useCreateEditBookMutation from "../../queries/useCreateEditBookMutation";
import useDeleteBookMutation from "../../queries/useDeleteBookMutation";
import { useNavigate } from "react-router";
import ConfirmDialog from "../../../../components/ConfirmDialog";

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

const BookDetails: React.FC<BookDetailsProps> = (props) => {
  const { id } = props;

  const intl = useIntl();
  const navigate = useNavigate();
  const notification = useNotification();

  const [deleteConfirmation, setDeleteConfirmation] =
    React.useState<boolean>(false);
  const [editMode, setEditMode] = React.useState<boolean>(!id);

  const [tab, setTab] = React.useState<{
    current: number;
    direction: number;
  }>({
    current: 0,
    direction: 0,
  });

  const bookQuery = useBookQuery({ id: id });

  const createEditBookMutation = useCreateEditBookMutation({
    onSuccess: (response) => {
      notification.success("Nuevo libro creado con éxito.");
      setEditMode(false);
      navigate(`/books/${response.id}`);
    },
  });

  const deleteBookMutation = useDeleteBookMutation({
    bookId: id,
    onSuccess: () => {
      notification.success("Libro eliminado con éxito.");
      onClose?.();
    },
  });

  const validationSchema = React.useMemo(
    () =>
      yup.object({
        // Required fields:
        authors: yup
          .mixed()
          .required(intl.formatMessage({ id: "validation.required" })),
        language: yup
          .string()
          .required(intl.formatMessage({ id: "validation.required" })),
        publisher: yup
          .mixed()
          .required(intl.formatMessage({ id: "validation.required" })),
        releaseDate: yup
          .string()
          .required(intl.formatMessage({ id: "validation.required" })),
        title: yup
          .string()
          .required(intl.formatMessage({ id: "validation.required" })),
        // Optional fields:
        edition: yup.string(),
        originalTitle: yup.string(),
        rating: yup.number(),
        series: yup.mixed().nullable(),
        seriesNumber: yup.string(),
        translators: yup.string(),
      }),
    [intl]
  );

  const onClose = () => {
    navigate("/books");
  };

  const onSubmit: SubmitHandler<Book> = (data) => {
    console.log(`🔔 SUBMIT`, data);
    console.log(` `);

    createEditBookMutation.mutate({
      ...data,
      id,
    });
  };

  const form = useForm<Book>({
    shouldFocusError: true,
    defaultValues: {
      authors: null,
      edition: "",
      language: "es",
      originalTitle: "",
      publisher: null,
      rating: 0,
      releaseDate: "",
      series: null,
      seriesNumber: "",
      title: "",
      translators: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const detailTitle = React.useMemo(
    () =>
      id
        ? (bookQuery.data?.title ?? "")
        : intl.formatMessage({ id: "books.newBook" }),
    [bookQuery.data, id]
  );

  React.useEffect(() => {
    if (bookQuery.data) {
      console.log(`🔔 book`, bookQuery.data);
      form.reset(bookQuery.data);
    }
  }, [bookQuery.data, form.reset]);

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = form.watch((value, { name, type }) =>
      console.log(`🔔 ${name}, ${type}:`, value)
    );
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <>
      <DetailHeader onClose={onClose} title={detailTitle} />
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
            label: intl.formatMessage({ id: "books.bibliographicalNotes" }),
            icon: <ViewListRoundedIcon />,
          },
          {
            label: intl.formatMessage({ id: "books.personalNotes" }),
            icon: <PersonRoundedIcon />,
          },
          // {
          //   label: intl.formatMessage({ id: "books.reception" }),
          //   icon: <ForumRoundedIcon />,
          // },
        ]}
        value={tab.current}
      />

      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <AnimatePresence custom={tab.direction} initial={false} mode="wait">
            {tab.current === 0 ? (
              <DetailAnimatedPanel key={`tab-0`} custom={tab.direction}>
                <BookProfile readOnly={!editMode} />
              </DetailAnimatedPanel>
            ) : null}
            {tab.current === 1 ? (
              <DetailAnimatedPanel key={`tab-1`} custom={tab.direction}>
                <PersonalNotes readOnly={!editMode} />
              </DetailAnimatedPanel>
            ) : null}
            {tab.current === 2 ? (
              <DetailAnimatedPanel key={`tab-2`} custom={tab.direction}>
                <Typography>
                  {intl.formatMessage({ id: "books.reception" })}
                </Typography>
              </DetailAnimatedPanel>
            ) : null}
          </AnimatePresence>
          <DetailFooter
            editMode={editMode}
            onDelete={() => setDeleteConfirmation(true)}
            onToggleEditMode={() => setEditMode(!editMode)}
            toggable={Boolean(id)}
          />
        </Form>
      </FormProvider>

      <ConfirmDialog
        messages={{
          description: "Esta operación no se puede deshacer.",
          title: "Advertencia",
        }}
        onAccept={() => {
          deleteBookMutation.mutate(id);
          setDeleteConfirmation(false);
        }}
        onCancel={() => setDeleteConfirmation(false)}
        open={deleteConfirmation}
      />
    </>
  );
};

export type BookDetailsProps = {
  id?: string;
};

export default BookDetails;
