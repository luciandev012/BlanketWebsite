import React from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { getImageUrl } from "../../../helper/common";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Product = ({ product }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("product-image")}>
        <Link to={`/product/${product.pathName}`}>
          <img
            src={getImageUrl(product.images[0].path)}
            alt="Product"
            className={cx("img-front")}
          />
          <img
            src={getImageUrl(product.images[1].path)}
            alt="Product"
            className={cx("img-back")}
          />
        </Link>
      </div>
      <div className={cx("product-info")}>
        <Link
          to={`/product/${product.pathName}`}
          className={cx("product-name")}
        >
          {product.name}
        </Link>
        {/* <span className={cx("product-sku")}>CPM25205</span> */}
        <span className={cx("product-price")}>
          {Number(product.price).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
    </div>
  );
};

export default Product;
