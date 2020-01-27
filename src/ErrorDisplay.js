import React from 'react';

const ErrorDisplay = ({ error }) => <h3>
  Yikes! an error occurred while loading available images. Code: { error.code }
</h3>

export default ErrorDisplay