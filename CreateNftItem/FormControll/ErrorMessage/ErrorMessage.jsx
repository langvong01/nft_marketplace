import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import {Alert} from "@mui/material"

const ErrorMsg = ({ errors, label }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={label}
      as= {<Alert variant="filled" severity="error" className="mt-3.5" />}
      render={({ messages }) => {
        return messages
          ? Object.entries(messages).map(([type, message]) => (
              <span key={type}>{message}</span>
            ))
          : null;
      }}
    />
  );
};

export default ErrorMsg;
