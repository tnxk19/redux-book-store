import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../apiService";

const initialState = {
  books: [],
  loading: false,
  error: "",
};

export const getFavorites = createAsyncThunk(
  "favorite/getFavorites",
  async () => {
    const res = await api.get("/favorites");
    return res.data;
  },
);

export const removeFavorite = createAsyncThunk(
  "favorite/removeFavorite",
  async (bookId, { dispatch }) => {
    await api.delete(`/favorites/${bookId}`);

    // tải lại danh sách sau khi xóa
    dispatch(getFavorites());

    return bookId;
  },
);
export const addFavorite = createAsyncThunk(
  "favorite/addFavorite",
  async (book) => {
    await api.post("/favorites", book);
    return book;
  },
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getFavorites.pending, (state) => {
        state.loading = true;
      })

      .addCase(getFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })

      .addCase(getFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(removeFavorite.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeFavorite.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
      })

      .addCase(addFavorite.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default favoriteSlice.reducer;
