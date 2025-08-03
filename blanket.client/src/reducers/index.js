import { combineReducers } from "@reduxjs/toolkit";
import brandReducer from "./brandReducer.js";
import blanketReducer from "./blanketReducer.js";

const allReducers = combineReducers({
  brand: brandReducer,
  blanket: blanketReducer,
});

export default allReducers;
