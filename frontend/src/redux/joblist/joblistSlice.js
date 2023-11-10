
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobLists: null,
  error: null,
  
};

const jobListsSlice = createSlice({
  name: "joblists",
  initialState,
  reducers: {
    setJobLists: (state, action) => {
      state.jobLists = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setJobLists, setError } = jobListsSlice.actions;

export default jobListsSlice.reducer;
