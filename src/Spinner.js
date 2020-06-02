import React from 'react';

const Spinner = () => {
  return (
    <div data-test="component-spinner" className="container">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p>Loading secret word.</p>
    </div>
  );
};

export default Spinner;
