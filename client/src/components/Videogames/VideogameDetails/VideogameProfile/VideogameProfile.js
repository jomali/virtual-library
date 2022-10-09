import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Formik, Form } from 'formik';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useApi } from 'components/shared/ApiProvider';
import { PROPERTIES } from './videogameProfileConstants';
import VideogameProfileLayout from './VideogameProfileLayout';

const VideogameProfile = (props) => {
  const { formikRef, onSubmit, ...otherProps } = props;

  const api = useApi();
  const snackbar = useSnackbar();

  const initialValues = {};

  const validationSchema = Yup.object({
    [PROPERTIES.developers]: Yup.array(),
    [PROPERTIES.platforms]: Yup.array(),
    [PROPERTIES.publishers]: Yup.array(),
    [PROPERTIES.title]: Yup.string().required(),
  });

  const profileMasterDataQuery = useQuery(
    ['profileMasterData'],
    async () => {
      const developersResponse = await api.GET('videogameDevelopers');
      const platformsResponse = await api.GET('videogamePlatforms');
      const publishersResponse = await api.GET('videogamePublishers');

      return {
        developers: developersResponse.data,
        platforms: platformsResponse.data,
        publishers: publishersResponse.data,
      };
    },
    {
      initialData: {
        developers: [],
        platforms: [],
        publishers: [],
      },
      onError: (error) => {
        console.error(error.message);
        snackbar.enqueueSnackbar('Unexpected error.');
      },
    }
  );

  return (
    <Formik
      initialValues={initialValues}
      innerRef={formikRef}
      onSubmit={async (values, actions) => {
        await onSubmit(values);
        actions.setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      <Form>
        <VideogameProfileLayout
          developers={profileMasterDataQuery.data.developers}
          platforms={profileMasterDataQuery.data.platforms}
          publishers={profileMasterDataQuery.data.publishers}
          {...otherProps}
        />
      </Form>
    </Formik>
  );
};

VideogameProfile.propTypes = {
  formikRef: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
};

export default VideogameProfile;
