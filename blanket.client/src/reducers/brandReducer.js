const brand = (state = [], action) => {
  switch (action.type) {
    case "GET_BRANDS":
      return action.payload;
    case "ADD_BRAND":
      return [...state, action.payload];
    case "UPDATE_BRAND":
      return state.map((brand) =>
        brand.id === action.payload.id ? action.payload : brand
      );
    case "DELETE_BRAND":
      return state.filter((brand) => brand.id !== action.payload);
    default:
      return state;
  }
};
export default brand;
