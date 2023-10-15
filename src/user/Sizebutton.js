import React from "react";
import styles from "../css/size.module.css";
export default function Sizebutton({
  size,
  value,
  onClickHandler,
  // setisClicked,
}) {
  return (
    <div className={`border border-dark ${styles.button}`}>
      <input
        onChange={(e) => {
          onClickHandler(e.target.value);
          // setisClicked(true);
        }}
        required
        type="radio"
        id={value}
        name="sizevalue"
        value={size}
      />
      <label className="btn btn-default" htmlFor={value}>
        {value}
      </label>
    </div>
  );
}
