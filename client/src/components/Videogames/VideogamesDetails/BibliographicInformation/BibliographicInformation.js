import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useApi } from 'components/shared/ApiProvider';
import { useConfirm } from 'components/shared/ConfirmProvider';
import BibliographicInformationLayout from './BibliographicInformationLayout';

const BibliographicInformation = ({ formRef, ...otherProps }) => {
  const api = useApi();
  const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();

  const developersQuery = useQuery(['developers'], async () => {
    const result = await api.GET('videogameDevelopers');
    return result.data;
  });

  const platformsQuery = useQuery(['platforms'], async () => {
    const result = await api.GET('videogamePlatforms');
    return result.data;
  });

  const publishersQuery = useQuery(['publishers'], async () => {
    const result = await api.GET('videogamePublishers');
    return result.data;
  });

  const handleSubmit = (value) => {
    console.log('SUBMIT', value);
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <BibliographicInformationLayout
        developers={developersQuery.data}
        platforms={platformsQuery.data}
        publishers={publishersQuery.data}
        {...otherProps}
      />
    </form>
  );
};

BibliographicInformation.propTypes = {
  readOnly: PropTypes.bool,
};

export default BibliographicInformation;
