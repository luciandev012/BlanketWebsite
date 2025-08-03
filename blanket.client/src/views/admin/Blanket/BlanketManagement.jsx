import { useDispatch, useSelector } from "react-redux";
import styles from "./BlanketManagement.module.scss";
import { useEffect, useState } from "react";
import { deleteBlanket, getBlankets } from "../../../actions/blanket";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../../../components/Loading/Loading";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import { getImageUrl } from "../../../helper/common";
import AddBlanketDialog from "./AddBlanketDialog";
import { toast, ToastContainer } from "react-toastify";
import UpdateBlanketDialog from "./UpdateBlanketDialog";

export default function AirConditionManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlankets());
  }, []);

  const blankets = useSelector((state) => state.blanket);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedBlanket, setselectedBlanket] = useState(null);
  //   const [openUpdate, setOpenUpdate] = useState(false);

  const HandleOpenDetailDialog = (id) => {
    const blanket = blankets.find((item) => item.id === id);
    setselectedBlanket(blanket);
    setOpenDetail(true);
  };

  const handleOpenUpdateDialog = (id) => {
    const blanket = blankets.find((item) => item.id === id);
    setselectedBlanket(blanket);
    setOpenUpdate(true);
  };

  const handleOpenDeleteDialog = (id) => {
    const blanket = blankets.find((item) => item.id === id);
    setselectedBlanket(blanket);
    setOpenDelete(true);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 4,
  };
  //config table
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Tên sản phẩm", width: 400 },
    { field: "description", headerName: "Thông tin sản phẩm", width: 500 },
    { field: "price", headerName: "Giá", width: 100 },
    {
      field: "image",
      headerName: "Ảnh",
      width: 100,
      height: 200,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    {
      field: "actions",
      headerName: "Thao tác",
      width: 400,
      height: 200,
      renderCell: (params) => (
        <div style={{ marginTop: "5px" }} className="button-action">
          <Button
            className="mg-right-1"
            variant="outlined"
            color="success"
            onClick={() => HandleOpenDetailDialog(params.id)}
          >
            Chi tiết
          </Button>
          <Button
            className="mg-right-1"
            variant="outlined"
            color="secondary"
            onClick={() => handleOpenUpdateDialog(params.id)}
          >
            Sửa
          </Button>
          <Button
            className="mg-right-1"
            variant="outlined"
            color="error"
            onClick={() => handleOpenDeleteDialog(params.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const rows = blankets
    ? blankets.map((blanket) => {
        const { id, name, description, price, images } = blanket;
        return {
          id: id,
          name,
          description,
          price,
          image: images && images.length > 0 ? getImageUrl(images[0].path) : "", // Assuming images is an array and we take the first image URL
          actions: id,
        };
      })
    : [];

  const handleCloseDetailDialog = () => {
    setOpenDetail(false);
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

  //   const handleDeleteBrand = async () => {
  //     try {
  //       const response = await axiosPrivate.delete(
  //         `/ringbrand/brand/${selectedBrand.id}`
  //       );
  //       dispatch(deleteBrandAction(selectedBrand.id));
  //     } catch (error) {
  //       alert(ALERT_DELETE_MESSAGE + error.message);
  //     }
  //   };

  //   const deleteBrandAction = (id) => async (dispatch) => {
  //     dispatch({ type: "DELETE_BRAND", payload: id });
  //   };
  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteBlanket(selectedBlanket.id));
      setOpenDelete(false);
      successNotify("Xóa chăn thành công!");
    } catch (error) {
      errorNotify(error.response.data);
    }
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdate(false);
  };
  //   const handleOpenUpdateDialog = () => {
  //     setOpenUpdate(true);
  //   };
  return blankets ? (
    <>
      <ToastContainer />
      <h2 style={{ marginBottom: "2rem" }}>Quản lý chăn</h2>
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
          //onRowClick={(params) => handleSelected(params)}
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
      </div>

      <Modal
        open={openDetail}
        onClose={handleCloseDetailDialog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.modalContent}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedBlanket && selectedBlanket.name}
            </Typography>
            {selectedBlanket && (
              <div className={styles.detailContainer}>
                <div className={styles.detailItem}>
                  <strong>Giá:</strong> {selectedBlanket.price}
                </div>
                <div className={styles.detailItem}>
                  <strong>Màu sắc:</strong> {selectedBlanket.color}
                </div>
                <div className={styles.detailItem}>
                  <strong>Kích thước:</strong> {selectedBlanket.size}
                </div>
                <div className={styles.detailItem}>
                  <strong>Loại sản phẩm:</strong> {selectedBlanket.productType}
                </div>
                <div className={styles.detailItem}>
                  <strong>Thông tin sản phẩm:</strong>{" "}
                  {selectedBlanket.description}
                </div>
              </div>
            )}
          </div>
          <div className={styles.modalContentRight}>
            <div className={styles.detailItem}>
              {selectedBlanket &&
              selectedBlanket.images &&
              selectedBlanket.images.length > 0
                ? selectedBlanket.images.map((img) => {
                    return (
                      <img
                        key={img.id}
                        src={getImageUrl(img.path)}
                        alt="Air Condition"
                        className={styles.airConditionImage}
                      />
                    );
                  })
                : "Không có ảnh"}
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <Box
          sx={{
            p: 4,
            background: "white",
            margin: "auto",
            mt: 10,
            width: 350,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Xác nhận xóa
          </Typography>
          <Typography gutterBottom>
            Bạn chắc chắn muốn xóa{" "}
            <b>{selectedBlanket && selectedBlanket.airConditionName}</b>?
          </Typography>
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => handleConfirmDelete()}
            >
              Xóa
            </Button>
            <Button variant="outlined" onClick={() => setOpenDelete(false)}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
      <AddBlanketDialog
        open={openAdd}
        handleClose={handleCloseAddDialog}
        dispatch={dispatch}
        successNotify={successNotify}
        errorNotify={errorNotify}
      />
      {selectedBlanket && (
        <UpdateBlanketDialog
          open={openUpdate}
          handleClose={handleCloseUpdateDialog}
          dispatch={dispatch}
          blanket={selectedBlanket}
          successNotify={successNotify}
          errorNotify={errorNotify}
        />
      )}
    </>
  ) : (
    <Loading />
  );
}
