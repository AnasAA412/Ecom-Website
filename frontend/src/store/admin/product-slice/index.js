import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const addProduct = "http://localhost:5005/api/admin/products/add";
const fetchAllProducts = "http://localhost:5005/api/admin/products/get";
//const editProduct = `http://localhost:5005/api/admin/products/edit/${id}`;
//const deleteProduct = "http://localhost:5005/api/admin/products/delete/:id";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewProduct",
  async (formData) => {
    const result = await axios.post(addProduct, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result?.data;
  }
);
export const fetchAllProduct = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(fetchAllProducts);
    return result?.data;
  }
);
export const editaProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5005/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const deleteaProduct = createAsyncThunk(
  "/products/addnewProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5005/api/admin/products/delete/${id}`
    );
    return result?.data;
  }
);
const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
