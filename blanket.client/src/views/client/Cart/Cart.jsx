import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import emptyCartImage from "../../../assets/images/img-cart-empty.png";
import iconTrash from "../../../assets/images/icon-trash.png";
import { Minus, Plus } from "../../../components/Icon/Icon";

const cx = classNames.bind(styles);

export default function Cart() {
  return (
    <div className={cx("cart-page")}>
      {/* <div className={cx("cart-empty")}>
        <div className={cx("cart-container")}>
          <img src={emptyCartImage} />
          <h2>Không có sản phẩm trong giỏ hàng</h2>
        </div>
      </div> */}
      <div className={cx("cart-container", "cart-relative")}>
        <form className={cx("form-shopping-cart")}>
          <section className={cx("cart-sidebars")}>
            <div className={cx("left-side")}>
              <div className={cx("cart-product-list")}>
                <div className={cx("title")}>Giỏ hàng</div>
                <div className={cx("cart-top")}>
                  <div className={cx("cart-top-product")}>
                    Tất cả (1 sản phẩm)
                  </div>
                  <div>Đơn giá</div>
                  <div>Số lượng</div>
                  <div>Thành tiền</div>
                  <div className={cx("cart-top-del")}>
                    <a href="#" className={cx("trash")}>
                      <img src={iconTrash} />
                    </a>
                  </div>
                </div>
                <div className={cx("cart-body")}>
                  <div className={cx("cart-item")}>
                    <div className={cx("item-info")}>
                      <div className={cx("product")}>
                        <a href="#" className={cx("product-image")}>
                          <img
                            src="../../../assets/images/everon_logo.png"
                            alt="product name"
                          />
                        </a>
                        <div className={cx("product-info")}>
                          <div className={cx("product-content")}>
                            Cam chuong
                          </div>
                          <div className={cx("product-type")}>Mau sac....</div>
                        </div>
                      </div>
                    </div>
                    <div className={cx("item-price")}>1.183.000d</div>
                    <div className={cx("item-quantity")}>
                      <div className={cx("quantity-container")}>
                        <button className={cx("quantity-button", "decrease")}>
                          <Minus className={cx("icon")} />
                        </button>
                        <input
                          type="number"
                          className={cx("quantity-input")}
                          value="1"
                          readOnly
                        />
                        <button className={cx("quantity-button", "increase")}>
                          <Plus className={cx("icon")} />
                        </button>
                      </div>
                    </div>
                    <div className={cx("item-price")}>1.183.000d</div>
                    <a href="#" className={cx("trash")}>
                      <img src={iconTrash} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("right-side")}>
              <div className={cx("box-money")}>
                <div className={cx("total-money")}>
                  <div className={cx("total")}>
                    <span>Tổng tiền</span>
                  </div>
                  <div className={cx("fw-bold")}>1.183.000</div>
                  <span>d</span>
                </div>
                <button className={cx("btn-buy")}>Mua hàng</button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
