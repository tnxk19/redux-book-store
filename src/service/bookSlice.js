import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";

import api from "../apiService"
export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, { getState }) => {
    const { pageNum, limit, query } = getState().book;

    let url = `/books?_page=${pageNum}&_limit=${limit}`;

    if (query) {
      url += `&q=${query}`;
    }

    const res = await api.get(url);

    return res.data;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    loading: false,
    error: "",
    pageNum: 1,
    query: "",
    limit: 10,
  },
  reducers: {
     setPageNum(state, action) {
      state.pageNum = action.payload;
    },

    setQuery(state, action) {
      state.query = action.payload;
      state.pageNum = 1;
    },
  },
    extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })

      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
        state.error = "";
      })

      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPageNum, setQuery } = bookSlice.actions;

export default bookSlice.reducer;

