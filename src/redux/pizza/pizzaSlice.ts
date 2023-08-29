import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ sortBy, order, category, search, currentPage }) => {
    const res = await axios.get(
      `https://64d275adf8d60b174362151e.mockapi.io/pizzas?&page=${currentPage}&limit=8${category}${search}&sortBy=${sortBy}&order=${order}`
    );
    return res.data;
  }
);

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;