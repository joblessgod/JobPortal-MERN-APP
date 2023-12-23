import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPublicCategories = createAsyncThunk(
  'publiccategories/fetchPublicCategories',
  async () => {
    try {
      const apiUrl = `/api/auth/getallcategory`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const publiccategoryListSlice = createSlice({
  name: "publiccategoryLists",
  initialState: {
    publiccategories: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicCategories.fulfilled, (state, action) => {
        state.publiccategories = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPublicCategories.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export default publiccategoryListSlice.reducer;
