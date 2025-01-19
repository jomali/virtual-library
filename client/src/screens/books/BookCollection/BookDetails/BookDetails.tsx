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
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DetailAnimatedPanel from "../../../../components/DetailAnimatedPanel";
import { useIntl } from "react-intl";
import { AnimatePresence } from "motion/react";
import useBookQuery from "../../queries/useBookQuery";
import useNotification from "../../../../components/NotificationProvider/useNotification";
import { Book } from "../../types";
import PersonalNotes from "./PersonalNotes";
import useCreateBookMutation from "../../queries/useCreateBookMutation";
import useEditBookMutation from "../../queries/useEditBookMutation";
import useDeleteBookMutation from "../../queries/useDeleteBookMutation";

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
  // Required fields:
  authors: yup.string(), //.required(),
  language: yup.string(), //.required(),
  publisher: yup.string(), //.required(),
  releaseDate: yup.string().required(),
  title: yup.string().required(),
  // Optional fields:
  edition: yup.string(),
  originalTitle: yup.string(),
  rating: yup.number(),
  translators: yup.string(),
});

const BookDetails: React.FC<BookDetailsProps> = (props) => {
  const { onClose, value } = props;

  const intl = useIntl();
  const notification = useNotification();

  const [editMode, setEditMode] = React.useState<boolean>(!value.id);

  const [tab, setTab] = React.useState<{
    current: number;
    direction: number;
  }>({
    current: 0,
    direction: 0,
  });

  const bookQuery = useBookQuery({ id: value.id });

  const createBookMutation = useCreateBookMutation({
    onSuccess: () => {
      notification.success("Nuevo libro creado con éxito.");
    },
  });

  const updateBookMutation = useEditBookMutation({
    bookId: value.id,
    onSuccess: () => {
      notification.success("Libro actualizado con éxito.");
    },
  });

  const deleteBookMutation = useDeleteBookMutation({
    bookId: value.id,
    onSuccess: () => {
      notification.success("Libro eliminado con éxito.");
    },
  });

  const onSubmit: SubmitHandler<Book> = (data) => {
    createBookMutation.mutate(data);
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Book>({
    defaultValues: {
      authors: "",
      edition: "",
      language: "",
      originalTitle: "",
      publisher: "",
      rating: undefined,
      releaseDate: "",
      title: "",
      translators: "",
    },
    resolver: yupResolver(schema),
  });

  const detailTitle = React.useMemo(() => {
    if (value.id) {
      return bookQuery.data?.title ?? "";
    } else {
      return intl.formatMessage({ id: "books.newBook" });
    }
  }, [bookQuery.data, value.id]);

  React.useEffect(() => {
    if (bookQuery.data) {
      reset(bookQuery.data);
    }
  }, [bookQuery.data, reset]);

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

      <Form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence custom={tab.direction} initial={false} mode="wait">
          {tab.current === 0 ? (
            <DetailAnimatedPanel key={`tab-0`} custom={tab.direction}>
              <BookProfile
                control={control}
                errors={errors}
                readOnly={!editMode}
              />
            </DetailAnimatedPanel>
          ) : null}
          {tab.current === 1 ? (
            <DetailAnimatedPanel key={`tab-1`} custom={tab.direction}>
              <PersonalNotes
                control={control}
                errors={errors}
                readOnly={!editMode}
              />
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
          onDelete={() => {
            console.log(`🔔 delete`);
            notification.error("Error al eliminar");
          }}
          onToggleEditMode={() => setEditMode(!editMode)}
          toggable={Boolean(value.id)}
        />
      </Form>
    </>
  );
};

export type BookDetailsProps = {
  onClose?: VoidFunction;
  value: {
    id?: string;
  } & Record<string, unknown>;
};

export default BookDetails;
