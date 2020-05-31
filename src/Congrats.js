import React from "react";
import PropTypes from "prop-types";

/**
 * Functional react component for congratulatory message
 * @function
 * @param {object} props - React props
 * @returns {JSX.Element} - Rendered component(or null if `success` props is false)
 */
const Congrats = ({ success }) => {
  return (
    <div data-test="component-congrats">
      {success ? (
        <span data-test="component-text">
          Congratulations, you guessed it rigth!
        </span>
      ) : null}
    </div>
  );
};

Congrats.name = "Congrats";

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
};

export default Congrats;
