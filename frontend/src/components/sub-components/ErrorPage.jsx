import React from 'react';

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
      </div>
    </div>
  );
};

export default ErrorPage;
