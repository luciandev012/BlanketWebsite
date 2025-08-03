import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Dropdown.module.scss";
import iconArrowRight from "../../../assets/images/icon-arrow-right.png";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../../actions/brand";
const cx = classNames.bind(styles);

const data = [
  {
    brand: "Everon",
    catalog: [
      {
        name: "Theo sản phẩm",
        category: [
          {
            name: "Bộ chăn ga Everon",
            link: "#",
          },
          {
            name: "Chăn và vỏ chăn",
            link: "#",
          },
          {
            name: "Ga",
            link: "#",
          },
          {
            name: "Vỏ gối",
            link: "#",
          },
          {
            name: "Bộ chăn ga Artemis",
            link: "#",
          },
          {
            name: "Chăn ga gối trẻ em",
            link: "#",
          },
        ],
      },
      {
        name: "Theo chất liệu",
        category: [
          {
            name: "Cotton",
            link: "#",
          },
          {
            name: "Bamboo",
            link: "#",
          },
          {
            name: "Modal",
            link: "#",
          },
          {
            name: "Tencel",
            link: "#",
          },
          {
            name: "Hanji Modal",
            link: "#",
          },
        ],
      },
    ],
  },
  {
    brand: "Hanvico",
    catalog: [
      {
        name: "Theo sản phẩm",
        category: [
          {
            name: "Bộ chăn ga Hanvico",
            link: "#",
          },
          {
            name: "Chăn và vỏ chăn",
            link: "#",
          },
          {
            name: "Ga",
            link: "#",
          },
          {
            name: "Vỏ gối",
            link: "#",
          },
          {
            name: "Bộ chăn ga Artemis",
            link: "#",
          },
          {
            name: "Chăn ga gối trẻ em",
            link: "#",
          },
        ],
      },
      {
        name: "Theo chất liệu",
        category: [
          {
            name: "Cotton",
            link: "#",
          },
          {
            name: "Bamboo",
            link: "#",
          },
          {
            name: "Modal",
            link: "#",
          },
          {
            name: "Tencel",
            link: "#",
          },
          {
            name: "Hanji Modal",
            link: "#",
          },
        ],
      },
    ],
  },
  {
    brand: "Vạn Thành",
    catalog: [
      {
        name: "Theo sản phẩm",
        category: [
          {
            name: "Bộ chăn ga",
            link: "#",
          },
          {
            name: "Chăn và vỏ chăn",
            link: "#",
          },
          {
            name: "Ga",
            link: "#",
          },
          {
            name: "Vỏ gối",
            link: "#",
          },
          {
            name: "Bộ chăn ga Artemis",
            link: "#",
          },
          {
            name: "Chăn ga gối trẻ em",
            link: "#",
          },
        ],
      },
      {
        name: "Theo chất liệu",
        category: [
          {
            name: "Cotton",
            link: "#",
          },
          {
            name: "Bamboo",
            link: "#",
          },
          {
            name: "Modal",
            link: "#",
          },
          {
            name: "Tencel",
            link: "#",
          },
          {
            name: "Hanji Modal",
            link: "#",
          },
        ],
      },
    ],
  },
  {
    brand: "Sông Hồng",
    catalog: [
      {
        name: "Theo sản phẩm",
        category: [
          {
            name: "Bộ chăn ga Sông Hồng",
            link: "#",
          },
          {
            name: "Chăn và vỏ chăn",
            link: "#",
          },
          {
            name: "Ga",
            link: "#",
          },
          {
            name: "Vỏ gối",
            link: "#",
          },
          {
            name: "Bộ chăn ga Artemis",
            link: "#",
          },
          {
            name: "Chăn ga gối trẻ em",
            link: "#",
          },
        ],
      },
      {
        name: "Theo chất liệu",
        category: [
          {
            name: "Cotton",
            link: "#",
          },
          {
            name: "Bamboo",
            link: "#",
          },
          {
            name: "Modal",
            link: "#",
          },
          {
            name: "Tencel",
            link: "#",
          },
          {
            name: "Hanji Modal",
            link: "#",
          },
        ],
      },
    ],
  },
  {
    brand: "Liên Á",
    catalog: [
      {
        name: "Theo sản phẩm",
        category: [
          {
            name: "Bộ chăn ga",
            link: "#",
          },
          {
            name: "Chăn và vỏ chăn",
            link: "#",
          },
          {
            name: "Ga",
            link: "#",
          },
          {
            name: "Vỏ gối",
            link: "#",
          },
          {
            name: "Bộ chăn ga Artemis",
            link: "#",
          },
          {
            name: "Chăn ga gối trẻ em",
            link: "#",
          },
        ],
      },
      {
        name: "Theo chất liệu",
        category: [
          {
            name: "Cotton",
            link: "#",
          },
          {
            name: "Bamboo",
            link: "#",
          },
          {
            name: "Modal",
            link: "#",
          },
          {
            name: "Tencel",
            link: "#",
          },
          {
            name: "Hanji Modal",
            link: "#",
          },
        ],
      },
    ],
  },
];

const Dropdown = ({ className, onClickBack, resetMenuTrigger }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
    const handleResize = () => setIsMobile(window.innerWidth <= 1199);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setActiveIndex(0);
    }
  }, [isMobile]);

  useEffect(() => {
    if (resetMenuTrigger) {
      setActiveIndex(-1);
    }
  }, [resetMenuTrigger]);

  return (
    <div className={className ? cx("wrapper", className) : cx("wrapper")}>
      <ul className={cx("list")}>
        <li className={cx("back")} onClick={onClickBack}>
          <p>Quay lại</p>
        </li>
        {brands.length > 0 &&
          brands.map((item, index) => (
            <li
              key={index}
              className={cx("item", {
                active: !isMobile && activeIndex === index,
              })}
              onMouseEnter={() => !isMobile && setActiveIndex(index)}
            >
              <a
                href={isMobile ? "#" : item.link}
                onClick={(e) => {
                  setActiveIndex(index);
                  e.preventDefault();
                }}
              >
                {item.brandName}
                <img src={iconArrowRight} alt="" className={cx("icon-arrow")} />
              </a>
              <div
                className={cx("sub-list", {
                  active: activeIndex === index,
                  showSubMenu: activeIndex === index,
                })}
              >
                {isMobile && (
                  <div className={cx("header")}>
                    <p
                      className={cx("back")}
                      onClick={() => setActiveIndex(-1)}
                    >
                      Quay lại
                    </p>
                    <a href={item.link} className={cx("brand-name")}>
                      {item.brandName}
                    </a>
                  </div>
                )}

                {/* <div className={cx("item-wrapper")}>
                  {item.catalog.map((catalog, catalogIndex) => (
                    <ul key={catalogIndex} className={cx("products")}>
                      <li className={cx("sub-item")}>
                        <h4>
                          <a href={catalog.link}>{catalog.name}</a>
                        </h4>
                        <ul className={cx("category")}>
                          {catalog.category.map((cat, catIndex) => (
                            <li key={catIndex} className={cx("cat-item")}>
                              <a href={cat.link}>{cat.name}</a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  ))}
                </div> */}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dropdown;
