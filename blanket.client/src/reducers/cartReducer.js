const cart = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "UPDATE_CART":
      return action.payload;
    case "DELETE_CART":
      return state.filter((c) => c.product.id !== action.payload);
    default:
      return state;
  }
};
export default cart;
