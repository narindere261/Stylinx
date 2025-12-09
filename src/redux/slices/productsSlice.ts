// src/redux/slices/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = "https://api.escuelajs.co/api/v1";

// Fetch all products (no filters)
export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${BASE}/products`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || "Failed to fetch products");
  }
});

// Fetch with query params. params: { title, price, price_min, price_max, categoryId, limit, offset, etc. }
// This thunk sends params directly to the API (no client filtering)
export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (params = {}, thunkAPI) => {
    try {
      // axios will serialize params object into query string
      const res = await axios.get(`${BASE}/products`, { params });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch filtered products");
    }
  }
);

// Fetch categories
export const fetchCategories = createAsyncThunk("products/fetchCategories", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${BASE}/categories`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || "Failed to fetch categories");
  }
});

// inside src/redux/slices/productsSlice.js

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: number | string, thunkAPI) => {
    try {
      const res = await axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch product");
    }
  }
);


const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [],
    selectedProduct: null as any | null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProductsState: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || null;
      })

      // fetchFilteredProducts
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || null;
      })

      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        // optionally keep categories loading separately
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        // keep categories empty on error
      })
      .addCase(fetchProductById.pending, (state) => {
    state.loading = true;
    state.error = null;
    state.selectedProduct = null;
  })
  .addCase(fetchProductById.fulfilled, (state, action) => {
    state.loading = false;
    state.selectedProduct = action.payload;
  })
  .addCase(fetchProductById.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
    state.selectedProduct = null;
  });
  },
});

export const { clearProductsState } = productsSlice.actions;
export default productsSlice.reducer;
