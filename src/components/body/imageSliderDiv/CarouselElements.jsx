import React from "react";
import { TshirtIcon } from "../../../assets/icons/img/products/data";
import "./carouselElement.css";

const CarouselElements = ({ adGridInfo }) => {
  return (
    <div className="image-slider-div mb-5">
      <div className=" flex justify-center items-start">
        <div className="slider-info-div flex-col  space-y-6">
          <div className="slider-info-header text-4xl font-semibold">
            <h1>{adGridInfo.header}</h1>
          </div>
          <div className="slider-info-description">
            <span className="">{adGridInfo.description}</span>
          </div>
          <button className="Btn3">Shop Now</button>
        </div>
        <div className="slider-img-cntr">
          <img
            src={adGridInfo.image}
            className=" slider-img"
            style={{ height: "25px" }}
          />
          <div className="slider-img-shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default CarouselElements;
