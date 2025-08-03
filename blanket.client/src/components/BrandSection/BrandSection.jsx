import React from "react";
import classNames from "classnames/bind";
import styles from "./BrandSection.module.scss";
import ProductsCarousel from "../ProductsCarousel/ProductsCarousel";
import ViewAll from "../Button/ViewAll/ViewAll";
import { getImageUrl } from "../../helper/common";

const cx = classNames.bind(styles);

const BrandSection = ({ brand }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("label")}>
        <span>{brand.brandName || "Everon"}</span>
      </div>
      <div className={cx("image")}>
        <img src={getImageUrl(brand.brandImage.path)} alt="" />
      </div>
      <div className={cx("products")}>
        <ProductsCarousel
          breakpoint0={2}
          breakpoint768={2}
          breakpoint1024={4}
          listProduct={brand.blankets}
        />
      </div>
      {/* <ViewAll text="Khám phá thêm" link={'https://everon.com/san-pham'} /> */}
    </div>
  );
};

export default BrandSection;
