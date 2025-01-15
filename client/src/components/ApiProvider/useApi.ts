import React from "react";
import { ApiContext, IApi } from "./ApiProvider";

export default () => React.useContext<IApi>(ApiContext);
