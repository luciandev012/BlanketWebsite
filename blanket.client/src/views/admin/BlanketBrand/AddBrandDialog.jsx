import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogForm from "../../../components/Dialog/DialogForm";
import styles from "./BrandManagement.module.scss";
import { addBrand } from "../../../actions/brand";

const schema = yup.object({
  brandName: yup.string().required("Tên hãng không được để trống!"),
});

export default function AddBrandDialog({
  open,
  handleCloseAddDialog,
  dispatch,
  successNotify,
  errorNotify,
}) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data, e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brandName", data.brandName);
    formData.append("image", e.target.image.files[0]);
    try {
      await dispatch(addBrand(formData));
      handleCloseAddDialog();
      resetInput();
      successNotify("Thêm hãng thành công!");
    } catch (error) {
      errorNotify(error.response.data);
    }
  };

  const handleClose = () => {
    handleCloseAddDialog();
    resetInput();
  };

  const resetInput = () => {
    resetField("brandName", "");
  };

  //   const addBrandAction = (data) => async (dispatch) => {
  //     dispatch({ type: "ADD_BRAND", payload: data });
  //   };

  return (
    <DialogForm open={open} handleClose={handleClose} title="Thêm hãng">
      <form noValidate onSubmit={handleSubmit(submitForm)}>
        <div className={styles.inputControl}>
          <TextField
            required
            id="filled-basic"
            label="Tên hãng"
            variant="filled"
            fullWidth
            {...register("brandName")}
          />
          {errors.brandName && (
            <span className={styles.errorMessage} role="alert">
              {errors.brandName?.message}
            </span>
          )}
        </div>
        <div className={styles.inputControl}>
          <input
            className=""
            type="file"
            name="image"
            accept="image/png, image/jpeg, image/webp"
          />
        </div>
        <Button variant="contained" color="success" type="submit">
          Lưu
        </Button>
      </form>
    </DialogForm>
  );
}
