import React from "react";
import Nav from "./Nav";
import Slidercarosuel from "./Slidercarosuel";
import styles from "../css/Base.module.css";

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
      <div className="container-fluid">
        <div className={`jumbotron bg-light text-dark ${styles.titlediv}`}>
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className={`footer ${styles["bg-main"]} mt-auto py-3`}>
        <div className="container-fluid text-white text-center py-3">
          <h4 className={styles["text-main"]}>
            E commerce clone Using MERN Stack
          </h4>
          <button className={`btn btn-danger btn-lg`}>Made with Love ❤</button>
        </div>
        <hr />
        <div className="container">
          <span className="text-muted">
            An Amazing <span className="text-white">Myntra</span> clone
          </span>
        </div>
      </footer>
    </div>
  );
}
