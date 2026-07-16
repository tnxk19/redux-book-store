import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../service/bookSlice";
import favoriteReducer from "../service/favoriteSlice";
import bookDetailReducer from "../service/bookDetailSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    favorite: favoriteReducer,
    bookDetail: bookDetailReducer,
  },
});

export default store;