import React from "react";

export type ScreenRoute = {
  component: () => React.JSX.Element;
  path: string;
};
