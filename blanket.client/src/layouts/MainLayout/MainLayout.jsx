import { Outlet } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const cx = classNames.bind(styles);
export default function MainLayout() {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
