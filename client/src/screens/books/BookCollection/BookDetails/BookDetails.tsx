import React from "react";
import DetailHeader from "../../../../components/DetailHeader";
import DetailTabs from "../../../../components/DetailTabs";
import Divider from "@mui/material/Divider";
import DetailFooter from "../../../../components/DetailFooter";
import { styled } from "@mui/material/styles";
import BookProfile from "./BookProfile";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Form = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
}));

const Gap = styled("span")(() => ({
  display: "flex",
  flexGrow: 1,
}));

const schema = yup.object({
  author: yup.string().required(),
  title: yup.string().required(),
});

const BookDetails: React.FC<IBookDetails> = (props) => {
  const { onClose } = props;

  const [currentTab, setCurrentTab] = React.useState<number>(0);

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
      <DetailTabs onChange={setCurrentTab} value={currentTab} />
      <Divider />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <BookProfile control={control} errors={errors} />
        <Gap />
        <DetailFooter onDelete={() => console.log(`🔔 delete`)} />
      </Form>
    </>
  );
};

export type Book = {
  author: string;
  title: string;
};

export interface IBookDetails {
  onClose?: VoidFunction;
}

export default BookDetails;
