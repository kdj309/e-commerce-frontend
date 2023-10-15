import React from "react";
import Nav from "./Nav";
import Slidercarosuel from "./Slidercarosuel";
import styles from "../css/Base.module.css";
import Footer from "./Footer";

export default function Base({
  title = "My Title",
  description = "Be exclusive, Be Devine, Be yourself",
  className = styles.defaultstyle,
  showcarosuel = true,
  children,
}) {
  document.body.style = "background: #343a40;";

  return (
    <div>
      <Nav />
      {showcarosuel && <Slidercarosuel />}
      <div className={`container-fluid ${styles.paddingcontrol}`}>
        <div className={`jumbotron bg-light text-dark ${styles.titlediv}`}>
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <Footer/>
    </div>
  );
}
