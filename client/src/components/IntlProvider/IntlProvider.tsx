import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";

const IntlProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const defaultLocale = "es";

  return (
    <ReactIntlProvider
      defaultLocale={defaultLocale}
      locale={defaultLocale}
      messages={{}}
      {...props}
    />
  );
};

export default IntlProvider;
