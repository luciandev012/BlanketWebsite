import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands } from "../../../actions/brand";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Button } from "@mui/material";
import AddBrandDialog from "./AddBrandDialog";
import Loading from "../../../components/Loading/Loading";
//import UpdateBrandDialog from "./UpdateBrandDialog";
//import styles from "./BrandManagement.module.scss";
import { ToastContainer, toast } from "react-toastify";
import UpdateBrandDialog from "./UpdateBrandDialog";
import { getImageUrl } from "../../../helper/common";

export default function BrandManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brands = useSelector((state) => state.brand);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);

  //config table
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "brandName", headerName: "Tên hãng", width: 200 },
    {
      field: "image",
      headerName: "Ảnh",
      width: 100,
      height: 200,
      renderCell: (params) => <Avatar src={params.value} />,
    },
  ];

  const rows = brands
    ? brands.map((brand) => {
        const { id, brandName, brandImage } = brand;
        return {
          id: id,
          brandName,
          image: brandImage && getImageUrl(brandImage.path),
        };
      })
    : [];

  const handleSelected = (params) => {
    setSelectedBrand(params.row);
  };

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAdd(false);
  };

  const successNotify = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const errorNotify = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleDeleteBrand = async () => {
    try {
      dispatch(deleteBrand(selectedBrand.id));
      successNotify("Xóa hãng thành công!");
      setSelectedBrand(null);
    } catch (error) {
      errorNotify(error.response.data);
    }
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdate(false);
  };
  const handleOpenUpdateDialog = () => {
    setOpenUpdate(true);
  };

  return brands ? (
    <>
      <ToastContainer />
      <h2 style={{ marginBottom: "2rem" }}>Quản lý hãng</h2>
      <div style={{ height: 500, margin: "10px auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          onRowClick={(params) => handleSelected(params)}
        />
      </div>
      <div className="button-action">
        <Button
          className="mg-right-1"
          variant="outlined"
          color="success"
          onClick={() => handleOpenAddDialog()}
        >
          Thêm
        </Button>
        <Button
          className="mg-right-1"
          variant="outlined"
          color="secondary"
          onClick={() => handleOpenUpdateDialog()}
        >
          Sửa
        </Button>
        <Button
          className="mg-right-1"
          variant="outlined"
          color="error"
          onClick={() => handleDeleteBrand()}
        >
          Xóa
        </Button>
      </div>
      <AddBrandDialog
        open={openAdd}
        handleCloseAddDialog={handleCloseAddDialog}
        dispatch={dispatch}
        successNotify={successNotify}
        errorNotify={errorNotify}
      />
      {selectedBrand && (
        <UpdateBrandDialog
          open={openUpdate}
          handleClose={handleCloseUpdateDialog}
          dispatch={dispatch}
          brand={selectedBrand}
          successNotify={successNotify}
          errorNotify={errorNotify}
        />
      )}
    </>
  ) : (
    <Loading />
  );
}
