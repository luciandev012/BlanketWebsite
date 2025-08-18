import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getBlankets } from "../../../actions/blanket";
import { getImageUrl } from "../../../helper/common";
import { toast, ToastContainer } from "react-toastify";

const cx = classNames.bind(styles);

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { pathName } = useParams();
  const blankets = useSelector((state) => state.blanket);
  const carts = useSelector((state) => state.cart);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const productDetailRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBlankets());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const productDetailElement = productDetailRef.current;
      if (productDetailElement) {
        const { bottom } = productDetailElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (bottom <= viewportHeight) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const product = blankets.find((item) => item.pathName === pathName);

  const handleAddToCart = (isGotoCart) => {
    // Dispatch an action to add the product to the cart
    // Assuming you have an action creator called addToCart
    if (carts.some((item) => item.product.id === product.id)) {
      toast.error("Sản phẩm đã có trong giỏ", { autoClose: 2000 });
    } else {
      const productToAdd = {
        product,
        quantity: 1, // Default quantity can be set here
        totalPrice: product.price * 1,
      };
      dispatch({ type: "ADD_TO_CART", payload: productToAdd });
      toast.success("Thêm sản phẩm thành công", { autoClose: 2000 });
      if (isGotoCart) {
        setTimeout(() => {
          // Navigate to the cart page if isGotoCart is true
          navigate("/cart");
        }, 2000); // 2000ms = 2 seconds
      }
    }
  };

  return (
    <div>
      {product && (
        <div ref={productDetailRef} className={cx("wrapper-product")}>
          <ToastContainer />
          <div className={cx("position-relative")}>
            <section className={cx("product-detail")}>
              <div className={cx("slides")}>
                <div className={cx("slides-wrapper")}>
                  <div className={cx("slides-thumbs")}>
                    <div className={cx("swiper")}>
                      {product.images.map((img, index) => {
                        return (
                          <div
                            key={index}
                            className={cx(
                              "slides-item",
                              index === selectedImgIndex ? "active" : ""
                            )}
                            onClick={() => setSelectedImgIndex(index)}
                          >
                            <img src={getImageUrl(img.path)} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={cx("slides-main")}>
                    <div className={cx("main-img")}>
                      <img
                        src={getImageUrl(product.images[selectedImgIndex].path)}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("view-more")}>
                  <h5>Thông tin sản phẩm</h5>
                  <div className={cx("wrapper-information-product")}>
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>
              <div className={cx("product-information")}>
                <div className={cx("title")}>
                  <h3 className={cx("product-name")}>{product.name}</h3>
                </div>
                <div className={cx("tag-box")}>
                  <div className={cx("brand")}>
                    Thương hiệu:{" "}
                    <img
                      src={getImageUrl(product.brand.brandImage.path)}
                      alt=""
                    />
                  </div>
                </div>
                <div className={cx("price-box")}>
                  <div className={cx("price")}>
                    {Number(product.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                </div>
                <div className={cx("product-attribute")}>
                  <div className={cx("parameter")}>
                    <div className={cx("parameter-name")}>Màu sắc:</div>
                    <div className={cx("parameter-value")}>{product.color}</div>
                  </div>
                  <div className={cx("parameter")}>
                    <div className={cx("parameter-name")}>Loại sản phẩm</div>
                    <div className={cx("parameter-value")}>
                      {product.productType}
                    </div>
                  </div>
                  <div className={cx("parameter")}>
                    <div className={cx("parameter-name")}>
                      Kích thước sản phẩm
                    </div>
                    <div className={cx("parameter-value")}>{product.size}</div>
                  </div>
                </div>
                <div className={cx("product-action", isHidden ? "hidden" : "")}>
                  <button
                    className={cx("btn", "btn-add-cart")}
                    onClick={() => handleAddToCart(false)}
                  >
                    Thêm vào giỏ
                  </button>
                  <button
                    className={cx("btn", "btn-buy-now")}
                    onClick={() => handleAddToCart(true)}
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
