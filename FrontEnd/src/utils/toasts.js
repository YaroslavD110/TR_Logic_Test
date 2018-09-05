import React from "react";
import { toast } from "react-toastify";

// Wrapper for error toast
export const errorToast = text =>
  toast.error(
    () => (
      <div className="toast-content">
        <i className="material-icons">error</i> {text}
      </div>
    ),
    {
      className: "toast-wrapper" // Set custom class name
    }
  );

// Wrapper for info toast
export const infoToast = text =>
  toast.info(
    () => (
      <div className="toast-content">
        <i className="material-icons">done</i> {text}
      </div>
    ),
    {
      className: "toast-wrapper" // Set custom class name
    }
  );
