import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ConditionalTooltip } from "../MuiExtensions";

const DetailTabs: React.FC<IDetailTabs> = (props) => {
  const { disabled, onChange, tabs = [], value } = props;

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
      {tabs.map((element, index) => (
        <ConditionalTooltip key={`tab-${index}`} title={element.label}>
          <Tab disabled={disabled} icon={element.icon} {...a11yProps(index)} />
        </ConditionalTooltip>
      ))}
    </Tabs>
  );
};

export interface IDetailTabs {
  disabled?: boolean;
  onChange: React.Dispatch<React.SetStateAction<number>>;
  tabs: {
    label: string;
    icon: React.ReactElement;
  }[];
  value: number;
}

export default DetailTabs;
