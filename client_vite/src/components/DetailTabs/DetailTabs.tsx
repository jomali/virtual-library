import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";

import { Tooltip } from "../MuiExtensions";

type Tab = {
  disabled?: boolean;
  title: string;
  icon: React.JSX.Element;
};

export type DetailTabsProps = {
  onChange?: (newValue: number) => void;
  selected?: number;
  tabs: Tab[];
};

const DetailTabs: React.FC<DetailTabsProps> = (props) => {
  const { onChange, selected, tabs } = props;

  const a11yProps = (index: number) => {
    return {
      id: `full-width-tab-${index}`, // TODO - change
      "aria-controls": `full-width-tabpanel-${index}`, // TODO - change
    };
  };

  return (
    <Tabs
      aria-label="full width tabs example" // TODO - change
      indicatorColor="primary"
      onChange={(_, newValue) => onChange?.(newValue)}
      textColor="inherit"
      value={selected}
      variant="fullWidth"
    >
      {tabs.map((element, index) => (
        <Tooltip key={`tab-tooltip-${index}`} title={element.title}>
          <Tab
            disabled={element.disabled}
            icon={element.icon}
            {...a11yProps(index)}
          />
        </Tooltip>
      ))}
    </Tabs>
  );
};

export default DetailTabs;
