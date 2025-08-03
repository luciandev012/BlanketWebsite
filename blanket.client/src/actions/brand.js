import * as api from "../apis/brand.js";

export const getBrands = () => async (dispatch) => {
  const { data } = await api.getBrands();
  dispatch({ type: "GET_BRANDS", payload: data });
};

export const addBrand = (brand) => async (dispatch) => {
  const { data } = await api.addBrand(brand);

  dispatch({ type: "ADD_BRAND", payload: data });
};

export const updateBrand = (id, brand) => async (dispatch) => {
  const { data } = await api.updateBrand(id, brand);
  dispatch({ type: "UPDATE_BRAND", payload: data });
};

export const deleteBrand = (id) => async (dispatch) => {
  await api.deleteBrand(id);
  dispatch({ type: "DELETE_BRAND", payload: id });
};
