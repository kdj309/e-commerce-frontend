import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllproducts } from "../admin/helper/adminapicall";

const initialState = {
  loading: false,
  products: [],
  error: "",
};
const getproducts = createAsyncThunk("getproducts", async () => {
  const data = await getAllproducts();
  return data;
});

const productsslice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getproducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getproducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(getproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.products = [];
    });
  },
});
// productsslice.
const productsreducer = productsslice.reducer;
export { getproducts };
export default productsreducer;
