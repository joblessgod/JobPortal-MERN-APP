import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectUser } from '../user/userSlice';

// Define an async thunk for fetching jobs
export const fetchCategories = createAsyncThunk("categoryLists/fetchCategories", async (_, { getState }) => {
  try {
    // Get the user from the user slice using the selector
    const currentUser = selectUser(getState());

    // If the user is available, construct the API URL accordingly
    if (currentUser) {
      const userId = currentUser._id;
      console.log("User ID:", userId);
      const apiUrl = `/api/auth/getcategory/${userId}`;
  console.log(userId)
      // Fetch data from the API endpoint
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Check if the API call was successful
      if (data.success === false) {
        throw new Error("Failed to fetch categories");
      }

      // Return the fetched Categories
      return data;
    } else {
      console.log("User not available");
      return []; // Return an empty array if the user is not available
    }
  } catch (error) {
    throw error;
  }
});



const categoryListSlice = createSlice({
  name: "categoryLists",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
   
   /* addJob: (state, action) => {
      state.jobs.push(action.payload);
    },*/
    updateCategory: (state, action) => {
      const categoryIndex = state.categories.findIndex(
        (categories) => categories._id === action.payload._id
      );
      state.categories[categoryIndex] = action.payload;
    },
    deleteCategory: (state, action) => {
      const deletedCategoryId = action.payload;
      state.categories = state.categories.filter((categories) => categories._id !== deletedCategoryId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export const {
  updateCategory,
  deleteCategory,
} = categoryListSlice.actions;
export default categoryListSlice.reducer;
