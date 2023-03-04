import React from "react";

export default function NormalAlert({ msg, alerttype }) {
  return (
    <div className={`alert alert-${alerttype}`} role="alert">
      {msg}
    </div>
  );
}
