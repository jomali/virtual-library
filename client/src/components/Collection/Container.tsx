import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useParams } from "react-router";

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const Collection: React.FC<ICollection> = (props) => {
  const { children, sideContent } = props;

  const urlParams = useParams();

  const [selected, setSelected] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (urlParams.id) {
      setSelected(urlParams.id === "new" ? undefined : urlParams.id);
    }
  }, [urlParams.id]);

  return (
    <>
      <Container>{children}</Container>

      <Dialog
        aria-labelledby="detail-panel-dialog"
        fullScreen
        open={Boolean(urlParams.id)}
        slotProps={{
          paper: { elevation: 0 },
        }}
      >
        {sideContent instanceof Function
          ? sideContent({ id: selected })
          : sideContent}
      </Dialog>
    </>
  );
};

export interface ICollection {
  children: React.ReactNode;
  sideContent:
    | React.ReactNode
    | ((options: { id?: string }) => React.ReactNode);
}

export default Collection;
