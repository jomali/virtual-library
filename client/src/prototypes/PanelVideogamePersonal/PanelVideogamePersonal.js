import React from "react";
import PropTypes from "prop-types";

export default function PanelVideogamePersonal(props) {
  const { visible = false } = props;

  if (!visible) return true;

  return <p>Personal</p>;
}

PanelVideogamePersonal.propTypes = {
  visible: PropTypes.bool,
};

