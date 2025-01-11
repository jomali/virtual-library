import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import { ConditionalTooltip } from "../MuiExtensions";

const DetailTabs: React.FC<IDetailTabs> = (props) => {
  const { disabled, onChange, value } = props;

  const a11yProps = (index: number) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  };

  return (
    <Tabs
      aria-label="detail tabs"
      indicatorColor="primary"
      onChange={(_event, newValue) => onChange(newValue)}
      value={value}
      variant="fullWidth"
    >
      <ConditionalTooltip title={"Profile"}>
        <Tab
          disabled={disabled}
          icon={<ViewListRoundedIcon />}
          {...a11yProps(0)}
        />
      </ConditionalTooltip>
      <ConditionalTooltip title={"Personal notes"}>
        <Tab
          disabled={disabled}
          icon={<PersonRoundedIcon />}
          {...a11yProps(1)}
        />
      </ConditionalTooltip>
      <ConditionalTooltip title={"Reception"}>
        <Tab
          disabled={disabled}
          icon={<ForumRoundedIcon />}
          {...a11yProps(2)}
        />
      </ConditionalTooltip>
    </Tabs>
  );
};

export interface IDetailTabs {
  disabled?: boolean;
  onChange: React.Dispatch<React.SetStateAction<number>>;
  value: number;
}

export default DetailTabs;
