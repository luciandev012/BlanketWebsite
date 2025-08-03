import React, { useEffect } from "react";
import DialogForm from "../../../components/Dialog/DialogForm";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import styles from "./BrandManagement.module.scss";
import Button from "@mui/material/Button";
import { updateBrand } from "../../../actions/brand";

const schema = yup.object({
  brandName: yup.string().required("Tên hãng không được để trống!"),
});

export default function UpdateBrandDialog({
  open,
  handleClose,
  dispatch,
  brand,
  successNotify,
  errorNotify,
}) {
  const submitForm = async (data, e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brandName", data.brandName);
    if (e.target.image.files[0]) {
      formData.append("image", e.target.image.files[0]);
    }
    try {
      await dispatch(updateBrand(brand.id, formData));
      handleClose();
      successNotify("Cập nhật hãng thành công");
    } catch (error) {
      console.log(error);

      errorNotify(error.response.data);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const setInput = () => {
    setValue("brandName", brand.brandName);
  };
  useEffect(() => {
    brand && setInput();
  }, [open]);

  return (
    <DialogForm open={open} handleClose={handleClose} title="Sửa hãng">
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
