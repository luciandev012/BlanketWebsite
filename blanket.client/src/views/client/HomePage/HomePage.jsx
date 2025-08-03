import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import bannerDesktop from "../../../assets/images/banner_desktop.png";
import bannerMobile from "../../../assets/images/banner_mobile.png";
import ViewAll from "../../../components/Button/ViewAll/ViewAll";
import ProductsCarousel from "../../../components/ProductsCarousel/ProductsCarousel";
import BrandSection from "../../../components/BrandSection/BrandSection";
import { useEffect, useState } from "react";
import { getLatestBlankets } from "../../../apis/blanket";
import { getBrandsWithBlankets } from "../../../apis/brand";

const cx = classNames.bind(styles);

const HomePage = () => {
  const [latestProduct, setLatestProduct] = useState([]);
  const [productsByBrand, setProductsByBrand] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const { data } = await getLatestBlankets();
        setLatestProduct(data);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };

    const fetchProductsByBrand = async () => {
      try {
        const { data } = await getBrandsWithBlankets();
        setProductsByBrand(data);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };
    fetchProductsByBrand();
    fetchLatestProducts();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("banner")}>
        <img className={cx("banner-desktop")} src={bannerDesktop} alt="" />
        <img className={cx("banner-mobile")} src={bannerMobile} alt="" />
        <div className={cx("banner-content")}>
          <h2 className={cx("banner-title")}>
            <span>Vietnamese Family Day</span>
          </h2>
          {/* <ViewAll text="Xem thêm" link="https://everon.com/trang-khuyen-mai" /> */}
        </div>
      </div>
      <section className={cx("new-product")}>
        <h2 className={cx("title")}>Sản phẩm mới</h2>
        {latestProduct.length > 0 && (
          <ProductsCarousel listProduct={latestProduct} />
        )}
        {/* <ViewAll text="Xem tất cả" link="https://everon.com/san-pham" /> */}
      </section>
      <section className={cx("brand")}>
        {productsByBrand.length > 0 &&
          productsByBrand.map((brand, index) => (
            <BrandSection key={index} brand={brand} />
          ))}
      </section>
    </div>
  );
};

export default HomePage;
