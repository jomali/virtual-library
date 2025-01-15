import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";

const IntlProvider: React.FC<IIntlProvider> = (props) => {
  const { messages, ...otherProps } = props;
  const defaultLocale = "es";

  return (
    <ReactIntlProvider
      defaultLocale={defaultLocale}
      locale={defaultLocale}
      messages={messages[defaultLocale]}
      {...otherProps}
    />
  );
};

export interface IIntlProvider {
  children: React.ReactNode;
  messages: {
    en: Record<string, string>;
    es: Record<string, string>;
  };
}

export default IntlProvider;
