import { combineReducers } from "@reduxjs/toolkit";
import brandReducer from "./brandReducer.js";
import blanketReducer from "./blanketReducer.js";
import cartReducer from "./cartReducer.js";

const allReducers = combineReducers({
  brand: brandReducer,
  blanket: blanketReducer,
  cart: cartReducer,
});

export default allReducers;
