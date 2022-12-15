import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers/root.reducer";

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});

export default store;
