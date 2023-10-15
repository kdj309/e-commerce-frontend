import React from "react";
import styles from "../css/Shimmercard.module.css";
export default function ShimmerCard({
  cardwidth = "212px",
  imgwidth="210px",
  imgheight="210px",
}) {
  return (
    <div className={`${styles.shimmercard}`} style={{ width: cardwidth }}>
      <div
        className={`${styles.img} ${styles.skeleton}`}
        style={{ width: imgwidth, height: imgheight }}
      />
      <div className={`${styles.skeleton} ${styles["skeleton-text"]}`}></div>
      <div className={`${styles.skeleton} ${styles["skeleton-text"]}`}></div>
    </div>
  );
}
