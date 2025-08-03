import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import DialogForm from "../../../components/Dialog/DialogForm";
import styles from "./BlanketManagement.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faXmark } from "@fortawesome/free-solid-svg-icons";
import { updateBlanket } from "../../../actions/blanket";

const schema = yup.object({
  name: yup.string().required("Tên chăn không được để trống!"),
  price: yup
    .number()
    .typeError("Giá phải là một số")
    .required("Giá không được để trống!")
    .positive("Giá phải là số dương"),
  size: yup.string().required("Màu sắc không được để trống!"),
  color: yup.string().required("Màu sắc không được để trống!"),
});

export default function UpdateBlanketDialog({
  open,
  handleClose,
  dispatch,
  blanket,
  successNotify,
  errorNotify,
}) {
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [brand, setBrand] = useState(null);

  const brands = useSelector((state) => state.brand);

  useEffect(() => {
    blanket && setInput();
  }, [blanket]);

  //   useEffect(() => {
  //     setBrand(brands[0]?.id);
  //   }, [brands]);

  const submitForm = async (data, e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("size", data.size);
    formData.append("color", data.color);
    formData.append("description", data.description);
    formData.append("productType", data.productType);
    formData.append("brandId", brand);
    imgs.forEach((img) => {
      formData.append("images", img);
    });
    try {
      console.log("formData", formData);

      await dispatch(updateBlanket(blanket.id, formData));
      handleClose();
      successNotify("Sửa chăn thành công!");
      resetInput();
    } catch (error) {
      errorNotify(error.response.data);
    }
  };

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    setImgs(selectedFilesArray);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages(imagesArray);
  };

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };

  const setInput = () => {
    setValue("name", blanket.name);
    setValue("price", blanket.price);
    setValue("size", blanket.size);
    setValue("color", blanket.color);
    setValue("description", blanket.description);
    setValue("productType", blanket.productType);
    setBrand(blanket.brandId);
    setImgs([]);
  };

  const resetInput = () => {
    resetField("name", "");
    resetField("price", "");
    resetField("size", "");
    resetField("description", "");
    resetField("color", "");
    resetField("productType", "");
  };
  return (
    blanket && (
      <DialogForm
        open={open}
        handleClose={handleClose}
        title="Sửa chăn"
        width="lg"
      >
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <div className={styles.formContainer}>
            <div className={styles.textInput}>
              <div className={styles.inputControl}>
                <TextField
                  required
                  id="filled-basic"
                  label="Tên chăn"
                  variant="filled"
                  fullWidth
                  {...register("name")}
                />
                {errors.name && (
                  <span className={styles.errorMessage} role="alert">
                    {errors.name?.message}
                  </span>
                )}
              </div>
              <div className={styles.inputControl}>
                <TextField
                  required
                  id="filled-basic"
                  label="Mô tả"
                  variant="filled"
                  multiline
                  rows={4}
                  fullWidth
                  {...register("description")}
                />
                {errors.description && (
                  <span className={styles.errorMessage} role="alert">
                    {errors.description?.message}
                  </span>
                )}
              </div>
              <div className={styles.inputControl}>
                <TextField
                  required
                  id="filled-basic"
                  label="Kích thước"
                  variant="filled"
                  {...register("size")}
                />
                {errors.size && (
                  <span className={styles.errorMessage} role="alert">
                    {errors.size.message}
                  </span>
                )}
              </div>
              <div className={styles.inputControl}>
                <TextField
                  required
                  id="filled-basic"
                  label="Màu sắc"
                  variant="filled"
                  {...register("color")}
                />
                {errors.color && (
                  <span className={styles.errorMessage} role="alert">
                    {errors.color?.message}
                  </span>
                )}
              </div>

              <div className={styles.inputControl}>
                <TextField
                  required
                  id="filled-basic"
                  label="Giá"
                  variant="filled"
                  {...register("price")}
                />
                {errors.price && (
                  <span className={styles.errorMessage} role="alert">
                    {errors.price?.message}
                  </span>
                )}
              </div>
              <div className={styles.inputControl}>
                <TextField
                  required
                  id="filled-basic"
                  label="Loại sản phẩm"
                  variant="filled"
                  {...register("productType")}
                />
              </div>
              <div className={styles.inputControl}>
                <FormControl sx={{ width: "50%" }}>
                  <InputLabel id="demo-multiple-name-label">
                    Hẵng chăn ga
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={brand}
                    onChange={handleChangeBrand}
                    input={<OutlinedInput label="Hãng chăn ga" />}
                  >
                    {brands &&
                      brands.map((brand) => {
                        return (
                          <MenuItem key={brand.id} value={brand.id}>
                            {brand.brandName}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className={styles.imageInput}>
              <div className="card-body">
                <div className="form-group">
                  <label className="fs-14 text-black fw-medium lh-20">
                    Chọn ảnh
                  </label>
                  <div className="file-upload-wrap file-upload-layout-2">
                    <input
                      className="multi file-upload-input"
                      multiple
                      type="file"
                      name="images"
                      onChange={onSelectFile}
                      accept="image/png, image/jpeg, image/webp"
                    />
                    <span className="file-upload-text d-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={faImages}
                        style={{ marginRight: "5px" }}
                      />{" "}
                      Thả file hoặc click để đăng ảnh.
                    </span>
                  </div>
                </div>
                <div className="images">
                  {selectedImages &&
                    selectedImages.map((image, index) => {
                      return (
                        <div key={index} className="image">
                          <div
                            style={{ margin: "0 auto", width: "fit-content" }}
                          >
                            <img src={image} height="200" alt="upload" />
                          </div>
                          <button
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={(event) => {
                              event.preventDefault();
                              setSelectedImages(
                                selectedImages.filter((e) => e !== image)
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faXmark} color="red" />
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <Button
            className={styles.clearfix}
            variant="contained"
            color="success"
            type="submit"
          >
            Lưu
          </Button>
        </form>
      </DialogForm>
    )
  );
}
