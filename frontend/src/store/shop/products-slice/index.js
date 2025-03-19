import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productsList: [],
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",

  async () => {
    console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");

    const result = await axios.get(
      "http://localhost:5005/api/shop/products/get"
    );

    console.log(result);

    return result?.data;
  }
);
const shoppingProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        // console.log(action.payload, "action.payload");

        state.isLoading = false;
        state.productsList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productsList = [];
      });
  },
});

export default shoppingProductsSlice.reducer;
