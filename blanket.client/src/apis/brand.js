import axiosInstance from "../helper/axios";

export const getBrands = () => axiosInstance.get("brand");

export const getBrandsWithBlankets = () =>
  axiosInstance.get("brand/with-blankets");

export const addBrand = (data) => axiosInstance.post("brand", data);

export const updateBrand = (id, data) => {
  return axiosInstance.put(`brand/${id}`, data);
};

export const deleteBrand = (id) => {
  return axiosInstance.delete(`brand/${id}`);
};
