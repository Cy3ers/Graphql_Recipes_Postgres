import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div className="error-container">
      <div className="error-content">
        <h2 className="error-header">Error</h2>
        <h4 className="error-subheader">Oops! Page not found</h4>
        <p className="reload" onClick={refreshPage}>
          Try Again?
        </p>
        <p>Or</p>
        <Link className="reload" to="/">
          Back to the homepage?
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
