import React from "react";
import Base from "./Base";
import mencategory from "../assets/categorymen.png";
import wommencategory from "../assets/categorywomen.png";
import audiogadgets from "../assets/categoryaudiogadjets.png";
import accessories from "../assets/categoryaccessories.png";
import jewellery from "../assets/categoryjewllery.jpg";
import winterimg1 from "../assets/winterimg1.jpeg";
import winterimg2 from "../assets/winterimg2.webp";
import collectionbannner1 from "../assets/collectionbanner1.jpg";
import collectionbannner2 from "../assets/collectionbanner2.webp";
import collectionbannner3 from "../assets/collectionbanner3.webp";
import collectionbannner4 from "../assets/collectionbanner4.webp";
import fashionbanner1 from "../assets/fashionbanner1.webp";
import fashionbanner2 from "../assets/fashionbanner2.webp";
import fashionbanner3 from "../assets/fashionbanner3.webp";
import styles from "../css/MainHome.module.css";
import { Link, useHistory } from "react-router-dom";
export default function MainHome() {
  const history = useHistory();
  return (
    <Base title="Welcome to PlanetShop" className={styles.primary_heading}>
      <h3 className={`${styles.primary_heading}`}>
        SHOP BY <span className={`${styles.hollowtext}`}>CATEGORY</span>
      </h3>
      <div className={`${styles.categorycontainer}`}>
        <Link to="/products/Men">
          <img src={mencategory} alt="mencategory" />
          <h4>Men</h4>
        </Link>
        <Link to="/products/Women">
          <img src={wommencategory} alt="womencategory" />
          <h4>Women</h4>
        </Link>
        <Link to="/products/Audio Gadgets">
          <img src={audiogadgets} alt="audiogadgetscategory" />
          <h4>Audio Gadgets</h4>
        </Link>
        <Link to="/products/Accessories">
          <img src={accessories} alt="accessoriescategory" />
          <h4>Accessories</h4>
        </Link>
        <Link to="/products/Jewellery">
          <img src={jewellery} alt="jewellerycategory" />
          <h4>Jewellery</h4>
        </Link>
      </div>
      <div className={`${styles.winterbannercontainer}`}>
        <div className="container d-flex justify-content-evenly">
          <div className={styles.winterbanner}>
            <img src={winterimg1} alt="winterone" />
            <img src={winterimg2} alt="wintertwo" />
          </div>
          <div className={`${styles.winterbannertextdiv}`}>
            <h2 className="display-4 fw-bold">WINTER</h2>
            <h2 className={`display-4 fw-bold ${styles.hollowtext}`}>
              COLLECTION 2023
            </h2>
            <p>This Collection features timeless jackets in long cropped</p>
            <p>cushioned wool reversible flex shearlings and tradtional wool</p>
            <p>find the style that works for you</p>
            <button
              className={`${styles.winterbanner_ctabtn}`}
              onClick={() => history.push("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
      <div className={styles.collectionBannerContainer}>
        <div className={styles.collectionBannerHeaderWrapper}>
          <div className={styles.collectionBannerHeader}>
            {" "}
            <h3 className="fw-bolder">COLLECTION</h3>
            <h3>HIGHLIGHTS</h3>
          </div>
          <button
            className={styles.collectionBannerContainer_ctabtn}
            onClick={() => {
              history.push("/products");
            }}
          >
            SEE ALL
          </button>
        </div>
        <div className={styles.collectionbannerimgContainer}>
          <img
            className="rounded-start"
            src={collectionbannner1}
            alt="collectionone"
          />
          <img src={collectionbannner2} alt="collectiontwo" />
          <img src={collectionbannner4} alt="collectionfour" />
          <img
            className="rounded-end"
            src={collectionbannner3}
            alt="collectionthree"
          />
        </div>
      </div>
      <div className={styles.fashionbannerwrapper}>
        <div className={`${styles.fashionbannerheader}`}>
          <h3 className="display-3">Everyday Wardrobe</h3>
          <p>
            Don't make fashion own you, but you decide what you are, what you
            want to express by the way you dress and the way to live
          </p>
        </div>
        <div className={styles.fashionbanner_img_container}>
          <img src={fashionbanner1} className="active" alt="fashionbannerone" />
          <img src={fashionbanner2} alt="fashionbannertwo" />
          <img src={fashionbanner3} alt="fashionbannerthree" />
        </div>
      </div>
    </Base>
  );
}
