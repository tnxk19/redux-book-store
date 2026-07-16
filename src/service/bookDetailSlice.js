import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apiService";

const initialState = {
  book: null,
  loading: false,
  error: "",
};

export const getBookDetail = createAsyncThunk(
  "bookDetail/getBookDetail",
  async (bookId) => {
    const res = await api.get(`/books/${bookId}`);
    return res.data;
  }
);

const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getBookDetail.pending, (state) => {
        state.loading = true;
      })

      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
        state.error = "";
      })

      .addCase(getBookDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookDetailSlice.reducer;