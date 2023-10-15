import React from "react";
import styles from "../css/productDetailShimmer.module.css";
export default function ProductDetailShimmerCard() {
  return (
    <div className={`${styles.shimmercard}`}>
      <div>
        <div className={`${styles.img} ${styles.skeleton}`}></div>
      </div>
      <div>
        <div className={`${styles.skeleton} ${styles["skeleton-text"]}`}></div>
        <div className={`${styles.skeleton} ${styles["skeleton-text"]}`}></div>
        <div className={`${styles.skeleton} ${styles["skeleton-text"]}`}></div>
      </div>
    </div>
  );
}
