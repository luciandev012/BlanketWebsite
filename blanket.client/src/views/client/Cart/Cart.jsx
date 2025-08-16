import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import emptyCartImage from "../../../assets/images/img-cart-empty.png";
import iconTrash from "../../../assets/images/icon-trash.png";
import { Minus, Plus } from "../../../components/Icon/Icon";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../../../helper/common";

const cx = classNames.bind(styles);

export default function Cart() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const carts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const totalPrice = carts.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);

  const handleProductQuantity = (index, quantity) => (e) => {
    e.preventDefault();
    const updatedCarts = [...carts];
    updatedCarts[index].quantity += quantity;
    updatedCarts[index].totalPrice =
      updatedCarts[index].product.price * updatedCarts[index].quantity;
    // Dispatch an action to update the cart
    dispatch({
      type: "UPDATE_CART",
      payload: updatedCarts,
    });
  };

  const handleDeleteItem = (e, id) => {
    e.preventDefault();
    const updatedCarts = carts.filter((item) => item.product.id !== id); // Filter out the item
    // Dispatch an action to update the cart
    dispatch({
      type: "UPDATE_CART",
      payload: updatedCarts,
    });
  };

  return (
    <div className={cx("cart-page")}>
      {carts.length === 0 ? (
        <div className={cx("cart-empty")}>
          <div className={cx("cart-container")}>
            <img src={emptyCartImage} />
            <h2>Không có sản phẩm trong giỏ hàng</h2>
          </div>
        </div>
      ) : (
        <div className={cx("cart-container", "cart-relative")}>
          <form
            className={cx("form-shopping-cart")}
            onSubmit={(e) => handleSubmit(e)}
          >
            <section className={cx("cart-sidebars")}>
              <div className={cx("left-side")}>
                <div className={cx("cart-product-list")}>
                  <div className={cx("title")}>Giỏ hàng</div>
                  <div className={cx("cart-top")}>
                    <div className={cx("cart-top-product")}>
                      Tất cả ({carts?.length} sản phẩm)
                    </div>
                    <div className={cx("mobile-display-none")}>Đơn giá</div>
                    <div
                      className={cx("mobile-display-none")}
                      style={{ textAlign: "center" }}
                    >
                      Số lượng
                    </div>
                    <div className={cx("mobile-display-none")}>Thành tiền</div>
                    <div className={cx("cart-top-del")}>
                      <a href="#" className={cx("trash")}>
                        <img src={iconTrash} />
                      </a>
                    </div>
                  </div>
                  <div className={cx("cart-body")}>
                    {carts.map((item, index) => (
                      <div className={cx("cart-item")} key={index}>
                        <div className={cx("item-info")}>
                          <div className={cx("product")}>
                            <a href="#" className={cx("product-image")}>
                              <img
                                src={getImageUrl(item.product.images[0].path)}
                                alt={item.product.name}
                              />
                            </a>
                            <div className={cx("product-info")}>
                              <div className={cx("product-content")}>
                                {item.product.name}
                              </div>
                              <div className={cx("product-type")}>
                                {`Màu sắc: ${item.product.color}, Kích thước: ${item.product.size}, Sản phẩm: ${item.product.productType}`}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={cx("item-price")}>
                          {item.product.price}
                        </div>
                        <div className={cx("item-quantity")}>
                          <div className={cx("quantity-container")}>
                            <button
                              className={cx("quantity-button", "decrease")}
                              onClick={handleProductQuantity(index, -1)}
                              disabled={item.quantity <= 1} // Disable if quantity is 1
                            >
                              <Minus className={cx("icon")} />
                            </button>
                            <input
                              type="number"
                              className={cx("quantity-input")}
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              className={cx("quantity-button", "increase")}
                              onClick={handleProductQuantity(index, 1)}
                              disabled={item.quantity >= 10} // Disable if quantity is 99 or more
                            >
                              <Plus className={cx("icon")} />
                            </button>
                          </div>
                        </div>
                        <div className={cx("item-price")}>
                          {item.totalPrice}
                        </div>
                        <a
                          href="#"
                          className={cx("trash")}
                          onClick={(e) => handleDeleteItem(e, item.product.id)}
                        >
                          <img src={iconTrash} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={cx("right-side")}>
                <div className={cx("box-money")}>
                  <div className={cx("total-money")}>
                    <div className={cx("total")}>
                      <span>Tổng tiền</span>
                    </div>
                    <div className={cx("fw-bold")}>
                      {totalPrice}
                      {/* <span>d</span> */}
                    </div>
                  </div>
                  <div className={cx("user-info")}>
                    <TextField
                      id="filled-basic"
                      fullWidth
                      label="Tên"
                      variant="filled"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className={cx("user-info")}>
                    <TextField
                      fullWidth
                      id="filled-basic"
                      label="Địa chỉ"
                      variant="filled"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      sx={{
                        "& .MuiInputBase-root": {
                          fontFamily: "'Arial', sans-serif", // Set font for input text
                          fontSize: "16px", // Adjust font size
                          fontStyle: "normal",
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "'Arial', sans-serif", // Set font for label
                          fontSize: "14px", // Adjust label font size
                          fontStyle: "normal",
                        },
                      }}
                    />
                  </div>
                  <div className={cx("user-info")}>
                    <TextField
                      id="filled-basic"
                      fullWidth
                      label="Số điện thoại"
                      variant="filled"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      sx={{
                        "& .MuiInputBase-root": {
                          fontFamily: "'Arial', sans-serif", // Set font for input text
                          fontSize: "16px", // Adjust font size
                          fontStyle: "normal",
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "'Arial', sans-serif", // Set font for label
                          fontSize: "14px", // Adjust label font size
                          fontStyle: "normal",
                        },
                      }}
                    />
                  </div>
                  <button className={cx("btn-buy")} type="submit">
                    Mua hàng
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
      )}
    </div>
  );
}
