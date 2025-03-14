import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import HeadphonesRoundedIcon from "@mui/icons-material/HeadphonesRounded";
import { styled } from "@mui/material/styles";
import { ConditionalTooltip } from "../MuiExtensions";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5, 0),
    border: "1px solid transparent",
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: "1px solid transparent",
    },
  },
  [`& .${toggleButtonGroupClasses.selected}`]: {
    backgroundColor: "#202020",
    border: `1px solid ${theme.palette.divider}`,
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.firstButton}`]:
    {
      marginTop: 0,
    },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginBottom: 0,
    },
}));

const AppMenu: React.FC<AppMenuProps> = () => {
  const [view, setView] = React.useState("list");

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    if (nextView) {
      setView(nextView);
    }
  };

  return (
    <StyledToggleButtonGroup
      exclusive
      onChange={handleChange}
      orientation="vertical"
      value={view}
    >
      <ConditionalTooltip placement="right" title={"Libros"}>
        <ToggleButton aria-label="list" value="list">
          <AutoStoriesRoundedIcon />
        </ToggleButton>
      </ConditionalTooltip>

      <ConditionalTooltip placement="right" title={"Videojuegos"}>
        <ToggleButton aria-label="module" value="module">
          <SportsEsportsRoundedIcon />
        </ToggleButton>
      </ConditionalTooltip>

      <ConditionalTooltip placement="right" title={"Música"}>
        <ToggleButton aria-label="quilt" value="quilt">
          <HeadphonesRoundedIcon />
        </ToggleButton>
      </ConditionalTooltip>
    </StyledToggleButtonGroup>
  );
};

export type AppMenuProps = object;

export default AppMenu;
