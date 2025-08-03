import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import allReducers from "./reducers/index.js";
import { thunk } from "redux-thunk";

const baseUrl =
  document.getElementsByTagName("base")[0]?.getAttribute("href") || "/";
const store = createStore(allReducers, applyMiddleware(thunk));

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={baseUrl}>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </BrowserRouter>
);
