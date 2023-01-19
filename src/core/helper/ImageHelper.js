import React from "react";
import api from "../../backend/Api";


function ImageHelper({ product, imagesize = '300px', cartimage = false }) {
    const imageurl = product
        ? `${api}/product/photo/${product._id}`
        : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
    return (
        <div className="rounded border border-success p-2 my-2">
            <img
                src={imageurl}
                alt="photo"
                style={{ width: cartimage ? '250px' : imagesize, height: cartimage ? '250px' : imagesize }}
                className="mb-3 rounded"
            />
        </div>
    );
};

export default ImageHelper;
