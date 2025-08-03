import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import logo from "../../assets/images/everon_logo.png";
import Dropdown from "./Dropdown/Dropdown";
import {
  AccountIcon,
  CartIcon,
  ChevronDownIcon,
  SearchIcon,
  WishlistIcon,
} from "../Icon/Icon";

const cx = classNames.bind(styles);

const Header = () => {
  const [menuIsActive, setMenuActive] = useState(false);
  const [burgerIsActive, setBurgerActive] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);
  const [resetMenuTrigger, setResetMenuTrigger] = useState(true);

  useEffect(() => {
    if (burgerIsActive) {
      document.body.classList.add("not-scroll");
    } else {
      document.body.classList.remove("not-scroll");
    }

    const handleResize = () => setIsMobile(window.innerWidth <= 1199);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("not-scroll");
    };
  }, [burgerIsActive]);

  return (
    <>
      <header className={cx("wrapper", "active")}>
        <div className={cx("container")}>
          <div className={cx("logo")}>
            <img src={logo} alt="" />
          </div>
          <nav className={cx("nav", { active: burgerIsActive })}>
            <ul>
              <li
                className={cx("menu-item", { active: menuIsActive })}
                onMouseEnter={() => !isMobile && setMenuActive(true)}
                onMouseLeave={() => !isMobile && setMenuActive(false)}
              >
                <span onClick={() => isMobile && setShowMegaMenu(true)}>
                  Sản phẩm
                  <ChevronDownIcon />
                </span>
                <Dropdown
                  onClickBack={() => setShowMegaMenu(false)}
                  showMiniMenu={showMegaMenu}
                  resetMenuTrigger={resetMenuTrigger}
                  className={cx("dropdown", { showMegaMenu })}
                />
              </li>
            </ul>
          </nav>
          <div className={cx("right-icon")}>
            <div className={cx("search")}>
              <SearchIcon className={cx("search-icon")} />
            </div>
            <div className={cx("wishlist")}>
              <WishlistIcon className={cx("wishlist-icon")} />
            </div>
            <div className={cx("account")}>
              <AccountIcon className={cx("account-icon")} />
            </div>
            <div className={cx("cart")}>
              <CartIcon className={cx("cart-icon")} />
              <span className={cx("cart-count")}>0</span>
            </div>
            <div
              className={cx("burger-icon", { active: burgerIsActive })}
              onClick={() => {
                setBurgerActive((prev) => !prev);
                setMenuActive((prev) => !prev);
                setShowMegaMenu(false);
                setResetMenuTrigger((prev) => !prev);
                console.log(resetMenuTrigger);
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>
      {menuIsActive && <div className={cx("menu-overlay")}></div>}
    </>
  );
};

export default Header;
