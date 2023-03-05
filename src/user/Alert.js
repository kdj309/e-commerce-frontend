import React from "react";

function Alert({ alerttype, msg }) {
  return (
    <div className={`alert alert-${alerttype} m-auto`} role="alert">
      {msg}
    </div>
  );
}
export default React.memo(Alert);
