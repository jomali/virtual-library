import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

FormContainer.propTypes = {
  /**
   * The form itself, normally `<Form />`
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
};

function FormContainer(props, ref) {
  const { className, component: Component = 'div', ...other } = props;
  const classes = useStyles();

  return (
    <Component ref={ref} className={clsx(classes.root, className)} {...other} />
  );
}

export default React.forwardRef(FormContainer);

const useStyles = makeStyles((theme) => ({
  /* Styles applied to the root element. */
  root: {
    width: '100%',
    overflowX: 'auto',
  },
}));
