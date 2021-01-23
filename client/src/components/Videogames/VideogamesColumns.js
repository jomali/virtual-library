import React from 'react';
import CollectionTitle from 'components/_custom/CollectionTitle';

const formatCompanyArray = (value) => {
  let result = '';

  if (value.length) {
    const selectedValue = value[0];
    result = selectedValue?.value?.name;
    if (value.length > 1) {
      result = `${result}…`;
    }
  }

  return result;
};

const formatReleaseArray = (value) => {
  let result = '';

  if (value.length) {
    result = value[0]?.value;
    if (value.length > 1) {
      result = `${result}…`;
    }
  }

  return result;
};

export const columns = [
  {
    attribute: 'title',
    format: (value) => <CollectionTitle>{value}</CollectionTitle>,
    label: 'Título',
  },
  {
    attribute: 'developer',
    format: (value) => formatCompanyArray(value),
    label: 'Desarrollador',
  },
  {
    attribute: 'publisher',
    format: (value) => formatCompanyArray(value),
    label: 'Distribuidor',
  },
  {
    attribute: 'release',
    format: (value) => formatReleaseArray(value),
    label: 'Fecha',
  },
];
