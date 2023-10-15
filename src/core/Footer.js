import React from "react";
import styles from "../css/Footer.module.css";
import { Link } from "react-router-dom";
import { BsTwitter, BsFacebook, BsYoutube, BsInstagram } from "react-icons/bs";
import {useLocation} from 'react-router-dom'
export default function Footer() {
  let location = useLocation();

  return (
    <footer className={`${styles.footer} mt-3 py-3 ${location.pathname.includes("/products")?styles.mobileresponsive:""}`}>
      <div className={`container ${styles.footerContainer} mt-3`}>
        <div className={`d-flex flex-column ${styles.footerInput} gap-2`}>
          <h4>Myntra</h4>
          <input placeholder="Enter your email" type="email" name="" id="" />
          <button className="btn btn-dark rounded-pill border my-2">
            Subscribe
          </button>
        </div>
        <div className="d-flex flex-column gap-2">
          <h4>Contact Us</h4>
          <p>Phone : 9958349933</p>
          <a href="mailto:karthik.joshi103@gmail.com">
            karthik.joshi103@gmail.com
          </a>
          <div>Get In Touch</div>
          <div className={`${styles.socialMediaWrapper}`}>
            <a href="https://www.facebook.com/myntra">
              <BsFacebook fontSize={24} />
            </a>
            <a href="https://twitter.com/myntra">
              <BsTwitter fontSize={24} />
            </a>
            <a href="https://www.youtube.com/user/myntradotcom">
              <BsYoutube fontSize={24} />
            </a>
            <a href="https://www.instagram.com/myntra">
              <BsInstagram fontSize={24} />
            </a>
          </div>
        </div>
        <div className="d-flex flex-column gap-2">
          <h4>Terms and conditions</h4>
          <Link to="/">About Us</Link>
          <Link to="/">Services</Link>
          <Link to="/">Get In Touch</Link>
        </div>
        <div className="d-flex flex-column gap-2">
          <h4>Links</h4>
          <Link to="/products/Men">Men</Link>
          <Link to="/products/Women">Women</Link>
          <Link to="/products/Audio Gadgets">Audio Gadgets</Link>
          <Link to="/products/Jewellery">Jewellers</Link>
          <Link to="/products/Accessories">Acceriories</Link>
        </div>
      </div>
    </footer>
  );
}
