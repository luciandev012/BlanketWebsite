import axiosInstance from "../helper/axios";

export const getBlankets = () => axiosInstance.get("blanketproduct");
export const getLatestBlankets = () =>
  axiosInstance.get("blanketproduct/latest");
export const getBlanketById = (brandId, id) =>
  axiosInstance.get(`blanketproduct/${brandId}/${id}`);

export const addBlanket = (data) => axiosInstance.post("blanketproduct", data);

export const updateBlanket = (id, data) =>
  axiosInstance.put(`blanketproduct/${id}`, data);

export const deleteBlanket = (id) =>
  axiosInstance.delete(`blanketproduct/${id}`);
