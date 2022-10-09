import React from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import CreditsLayout from './CreditsLayout';

const Credits = (props) => {
  const { formikRef, onSubmit, ...otherProps } = props;

  const initialValues = { title: 'lorem ipsum' };

  const validationSchema = Yup.object({});

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
        <CreditsLayout {...otherProps} />
      </Form>
    </Formik>
  );
};

Credits.propTypes = {
  formikRef: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
};

export default Credits;
