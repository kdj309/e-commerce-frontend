import React from "react";
import Slider from "react-slick";
import styles from "../css/carosuel.module.css";
import img1 from "../assets/carosauel1.webp";
import img2 from "../assets/carosauel2.webp";
import img3 from "../assets/carosauel3.webp";
import img4 from "../assets/carosauel4.webp";

function Slidercarosuel() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        <img className={styles["slick-slider-img"]} src={img1} alt=""></img>
        <img className={styles["slick-slider-img"]} src={img2} alt=""></img>
        <img className={styles["slick-slider-img"]} src={img3} alt=""></img>
        <img className={styles["slick-slider-img"]} src={img4} alt=""></img>
      </Slider>
    </div>
  );
}
export default React.memo(Slidercarosuel);
