import React from "react";

function ImageHelper({
  product,
  style,
  className,
  parentclassname = `rounded border p-1 my-1 d-flex justify-content-center align-items-center`,
  parentstyle = { boxShadow: "rgba(0, 0, 0, 0.2) 0px 18px 50px -10px" },
}) {
  const imageurl = product._id
  ? `https://eelicate.sirv.com/Images/product${product._id}.webp?format=webp`
  : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className={parentclassname} style={parentstyle}>
      <img
        data-src={imageurl}
        alt={product.name}
        style={style}
        className={`Sirv rounded ${className && className}`}
      />
    </div>
  );
}

export default ImageHelper;
