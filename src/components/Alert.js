import React, { useState, useEffect } from "react";

function Alert({ type, msg, removeAlert, list }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <div>
      <div class={`alert alert-${type}`} role="alert">
        {msg}
      </div>
    </div>
  );
}

export default Alert;
