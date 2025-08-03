import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductsCarousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProductsCarousel.css";

import Product from "./Product/Product";

const cx = classNames.bind(styles);

const ProductsCarousel = ({
  breakpoint0,
  breakpoint768,
  breakpoint1024,
  listProduct,
}) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={16}
      navigation={true}
      loop={true}
      className={cx("swiper")}
      breakpoints={{
        0: {
          slidesPerView: breakpoint0 || 1,
        },
        768: {
          slidesPerView: breakpoint768 || 2,
        },
        1024: {
          slidesPerView: breakpoint1024 || 4,
        },
      }}
    >
      {listProduct &&
        listProduct.map((product, index) => (
          <SwiperSlide key={index} className={cx("swiper-slide")}>
            <Product product={product} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ProductsCarousel;
