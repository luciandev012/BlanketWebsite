import { Link, Outlet } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useScrollToTop from "./useScrollToTop";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlankets } from "../../actions/blanket";
import { getImageUrl } from "../../helper/common";

const cx = classNames.bind(styles);
export default function MainLayout() {
  useScrollToTop();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dispatch = useDispatch();
  const blankets = useSelector((state) => state.blanket);
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(getBlankets());
  }, [dispatch]);

  useEffect(() => {
    if (keyword.trim() !== "") {
      const results = blankets.filter((blanket) =>
        blanket.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [keyword, blankets]);

  const activeSearch = () => {
    setIsSearchActive(true);
  };

  const handleNavigate = () => {
    setIsSearchActive(false);
    setKeyword("");
  };

  return (
    <div className={cx("wrapper")}>
      <div
        style={{ display: isSearchActive ? "block" : "" }}
        className={cx("overlay-body")}
      ></div>
      <Header activeSearch={activeSearch} />
      <div className={cx("search-box", isSearchActive ? "active" : "")}>
        <a
          onClick={() => handleNavigate()}
          href="#"
          className={cx("btn-close")}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                d="M36 12L12 36"
                stroke="#292929"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 12L36 36"
                stroke="#292929"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </a>
        <div className={cx("search-wrapper")}>
          <div className={cx("search-form")}>
            <input
              type="text"
              className={cx("search-input")}
              placeholder="Tìm kiếm sản phẩm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className={cx("search-btn")}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6667 25.3333C20.5577 25.3333 25.3333 20.5577 25.3333 14.6667C25.3333 8.77563 20.5577 4 14.6667 4C8.77563 4 4 8.77563 4 14.6667C4 20.5577 8.77563 25.3333 14.6667 25.3333Z"
                  stroke="#05472A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M28 27.9992L22.2 22.1992"
                  stroke="#05472A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <div className={cx("search-suggestions")}>
            {keyword && searchResults.length > 0
              ? searchResults.map((result, index) => (
                  <div key={index} className={cx("suggestion__item")}>
                    <Link
                      to={`/product/${result.pathName}`}
                      className={cx("suggestion__image")}
                      onClick={() => handleNavigate()}
                    >
                      <img
                        src={getImageUrl(result.images[0].path)}
                        alt={result.name}
                      />
                    </Link>
                    <div className={cx("suggestion__content")}>
                      <Link
                        to={`/product/${result.pathName}`}
                        className={cx("suggestion__name")}
                        onClick={() => handleNavigate()}
                      >
                        {result.name}
                      </Link>
                      <div className={cx("suggestion__price")}>
                        <div className={cx("price-sale")}>
                          {result.price}
                          <span className={cx("dong")}>đ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : keyword && (
                  <div className={cx("no-results")}>
                    Không tìm thấy sản phẩm
                  </div>
                )}
          </div>
        </div>
      </div>
      <div className={cx("container")}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
