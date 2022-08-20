import { useIntl } from 'react-intl';

const LoremIpsum = () => {
  const intl = useIntl();

  return (
    <div className="App">
      <p>
        {intl.formatMessage(
          { id: 'greetings' },
          { file: '<code>src/App.js</code>' }
        )}
      </p>
    </div>
  );
};

export const routes = [
  {
    element: <LoremIpsum />,
    path: '/',
  },
];

export const messages = {
  en: {
    greetings: 'Edit {file} and save to reload.',
  },
  es: {
    greetings: 'Edita {file} y guarda para recargar.',
  },
};
