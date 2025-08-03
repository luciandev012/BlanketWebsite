import styles from "./AdminLayout.module.scss";
import { Outlet } from "react-router-dom";
import classNames from "classnames/bind";
import Navigation from "./Navigation";
import SideContent from "./SideContent";
import "./admin.css";

const cx = classNames.bind(styles);

export default function AdminLayout() {
  return (
    <>
      <Navigation />
      <div id="layoutSidenav">
        <SideContent />
        <div className={cx("main")}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
