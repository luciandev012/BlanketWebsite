const blanket = (state = [], action) => {
  switch (action.type) {
    case "GET_BLANKETS":
      return action.payload;
    case "ADD_BLANKET":
      return [...state, action.payload];
    case "UPDATE_BLANKET":
      return state.map((blanket) =>
        blanket.id === action.payload.id ? action.payload : blanket
      );
    case "DELETE_BLANKET":
      return state.filter((blanket) => blanket.id !== action.payload);
    default:
      return state;
  }
};
export default blanket;
