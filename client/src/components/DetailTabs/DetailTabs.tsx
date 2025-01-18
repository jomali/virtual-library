import React from "react";
import Tab from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { ConditionalTooltip } from "../MuiExtensions";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

/**
 * It sets as `top` the height of the __Toolbar__ component:
 *
 * ```
 * mixins: Object
 *   toolbar: Object
 *     minHeight: 56
 *     \@media (min-width:0px): Object
 *       \@media (orientation: landscape): Object
 *         minHeight: 48
 *     \@media (min-width:600px): Object
 *       minHeight: 64
 * ```
 */
const Container = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  position: "sticky",
  top: "56px",
  zIndex: theme.zIndex.appBar - 1,
  "@media (min-width:0px)": {
    "@media (orientation: landscape)": {
      top: "48px",
    },
  },
  [theme.breakpoints.up("sm")]: {
    top: "64px",
  },
}));

const DetailTabs: React.FC<DetailTabsProps> = (props) => {
  const { disabled, onChange, tabs = [], value, ...otherProps } = props;

  const a11yProps = (index: number) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  };

  return (
    <Container>
      <Tabs
        aria-label="detail tabs"
        indicatorColor="primary"
        onChange={(_event, newValue) => onChange(newValue)}
        textColor="inherit"
        value={value}
        variant="fullWidth"
        {...otherProps}
      >
        {tabs.map((element, index) => (
          <ConditionalTooltip key={`tab-${index}`} title={element.label}>
            <Tab
              disabled={disabled}
              icon={element.icon}
              {...a11yProps(index)}
            />
          </ConditionalTooltip>
        ))}
      </Tabs>
      <Divider />
    </Container>
  );
};

export type DetailTabsProps = {
  disabled?: boolean;
  onChange:
    | React.Dispatch<React.SetStateAction<number>>
    | ((newValue: number) => void);
  tabs: {
    label: string;
    icon: React.ReactElement;
  }[];
  value: number;
} & Omit<TabsProps, "onChange">;

export default DetailTabs;
