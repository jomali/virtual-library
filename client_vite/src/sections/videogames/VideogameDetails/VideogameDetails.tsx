import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { Form, Formik } from "formik";
import React from "react";

import DetailEditionToolbar from "../../../components/DetailEditionToolbar";
import DetailHeader from "../../../components/DetailHeader";
import DetailTabs from "../../../components/DetailTabs";
import { Videogame } from "../Videogames.types";
import VideogameProfile from "./VideogameProfile";

const StyledForm = styled(Form)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const VideogameDetails: React.FC<VideogameDetailsProps> = (props) => {
  const { onClose, value } = props;

  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [currentTab, setCurrentTab] = React.useState<number>(0);

  const videogameCreateUpdateMutation = { isLoading: false };

  return (
    <>
      <DetailHeader onClose={onClose} title={value?.title} />
      <DetailTabs
        onChange={(newValue) => setCurrentTab(newValue)}
        selected={currentTab}
        tabs={[
          {
            title: "Profile", // TODO - i18n
            icon: <ViewListRoundedIcon />,
          },
          {
            title: "Personal notes", // TODO - i18n
            icon: <PersonRoundedIcon />,
          },
          {
            title: "Reception", // TODO - i18n
            icon: <ForumRoundedIcon />,
          },
        ].map((element) => ({
          ...element,
          disabled: videogameCreateUpdateMutation.isLoading,
        }))}
      />
      <Divider />
      <Formik
        enableReinitialize
        initialValues={{}}
        onSubmit={(values) => console.log(`🔔 submit`, values)}
      >
        <StyledForm>
          <VideogameProfile />
        </StyledForm>
      </Formik>
      <Divider />
      <DetailEditionToolbar
        editMode={editMode}
        onDelete={() => console.log(`🔔 delete`)}
        onSubmit={() => console.log(`🔔 submit`)}
        onToggleEditMode={() => setEditMode(!editMode)}
        toggable={true}
      />
    </>
  );
};

export type VideogameDetailsProps = {
  onClose: VoidFunction;
  value?: Partial<Videogame>;
};

export default VideogameDetails;
