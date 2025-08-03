import * as api from "../apis/blanket";

export const getBlankets = () => async (dispatch) => {
  const { data } = await api.getBlankets();
  dispatch({ type: "GET_BLANKETS", payload: data });
};

export const addBlanket = (model) => async (dispatch) => {
  const { data } = await api.addBlanket(model);
  dispatch({ type: "ADD_BLANKET", payload: data });
};

export const updateBlanket = (id, model) => async (dispatch) => {
  const { data } = await api.updateBlanket(id, model);
  dispatch({ type: "UPDATE_BLANKET", payload: data });
};

export const deleteBlanket = (id) => async (dispatch) => {
  await api.deleteBlanket(id);
  dispatch({ type: "DELETE_BLANKET", payload: id });
};
