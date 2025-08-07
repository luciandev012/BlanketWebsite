import { useRoutes } from "react-router-dom";
import HomePage from "./views/client/HomePage/HomePage";
import MainLayout from "./layouts/MainLayout/MainLayout";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import BrandManagement from "./views/admin/BlanketBrand/BrandManagement";
import BlanketManagement from "./views/admin/Blanket/BlanketManagement";
import ProductDetail from "./views/client/ProductDetail/ProductDetail";
import Cart from "./views/client/Cart/Cart";

export default function Route() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "product-list",
          //element: <ProductList />,
        },
        {
          path: "product/:pathName",
          element: <ProductDetail />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "brand-management",
          element: <BrandManagement />,
        },
        {
          path: "blanket-management",
          element: <BlanketManagement />,
        },
      ],
    },
  ]);
}
