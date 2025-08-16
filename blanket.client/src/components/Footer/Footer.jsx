import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import logo from "../../assets/images/everon_logo_white.png";
import hotlineIcon from "../../assets/images/icon-hotline.png";
import mailIcon from "../../assets/images/icon-main.png";
import addressIcon from "../../assets/images/icon-address.png";
import facebookIcon from "../../assets/images/icon-fb-footer.png";
import instagramIcon from "../../assets/images/icon-insta-footer.png";
import youtubeIcon from "../../assets/images/icon-ytb-footer.png";
import zaloIcon from "../../assets/images/icon-zalo-footer.png";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("logo")}>
          <div className={cx("form-desktop")}>
            {/* <div className={cx("contact")}>
              <span className={cx("hotline")}>
                <img src={hotlineIcon} alt="Hotline" />
                <span>Hotline: </span>
                18001215
              </span>
            </div> */}
            {/* <div className={cx("email")}>
              <span className={cx("title")}>
                Đừng bỏ lỡ khuyến mại hấp dẫn từ Everon!
              </span>
              <div className={cx("newsletter")}>
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  name="email"
                />
                <button>Gửi thông tin</button>
              </div>
            </div> */}
          </div>
        </div>
        <div className={cx("main")}>
          <div className={cx("left")}>
            {/* <div className={cx("column")}>
              <h2>Sản phẩm</h2>
              <ul>
                <li>Bộ chăn ga</li>
                <li>Bộ chăn ga</li>
                <li>Bộ chăn ga</li>
                <li>Bộ chăn ga</li>
                <li>Bộ chăn ga</li>
              </ul>
            </div> */}
            {/* <div className={cx("column")}>
              <h2>Chính sách</h2>
              <ul>
                <li>Chính sách bảo hành</li>
                <li>Chính sách đổi trả</li>
                <li>Chính sách giao hàng</li>
                <li>Chính sách bảo mật</li>
                <li>Điều khoản và điều kiện</li>
              </ul>
            </div>
            <div className={cx("column")}>
              <h2>Về chúng tôi</h2>
              <ul>
                <li>Giới thiệu</li>
                <li>Hướng dẫn đặt hàng</li>
                <li>Hệ thống cửa hàng</li>
                <li>Tin tức</li>
                <li>Liên hệ</li>
              </ul>
            </div> */}
          </div>
          <div className={cx("right")}>
            <h2>ANAN 合同会社</h2>
            <ul>
              <li>
                <img src={addressIcon} alt="Address" />
                <span>チャン ホアイリン</span>
              </li>
              <li>
                <img src={hotlineIcon} alt="Hotline" />
                <span>080-3833-2283</span>
              </li>
              <li>
                <img src={mailIcon} alt="Email" />
                <a href="mailto:ananhigashi241218@gmail.com">
                  ananhigashi241218@gmail.com
                </a>
              </li>
            </ul>
            <div className={cx("social")}>
              <span>Kết nối với ANAN 合同会社</span>
              <div className={cx("social-icons")}>
                <a href="/">
                  <img src={facebookIcon} alt="" />
                </a>
                <a href="/">
                  <img src={instagramIcon} alt="" />
                </a>
                <a href="/">
                  <img src={youtubeIcon} alt="" />
                </a>
                <a href="/">
                  <img src={zaloIcon} alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className={cx("accordion")}>
            {/* <div className={cx("column")}>
              <h2>Sản phẩm</h2>
              <ul>
                <li>Bộ chăn ga</li>
                <li>Bộ chăn ga</li>
                <li>Bộ chăn ga</li>
                <li>Bộ chăn ga</li>
                <li>Bộ chăn ga</li>
              </ul>
            </div> */}
            <div className={cx("column")}>
              <h2>Kết nối</h2>
              <ul>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Youtube</li>
                <li>Zalo</li>
              </ul>
            </div>
          </div>

          {/* <div className={cx("form")}>
            <div className={cx("email")}>
              <span className={cx("title")}>
                Đừng bỏ lỡ khuyến mại hấp dẫn từ Everon!
              </span>
              <div className={cx("newsletter")}>
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  name="email"
                />
                <button>Gửi thông tin</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
