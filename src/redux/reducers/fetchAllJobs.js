import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllJobsWithOffset = createAsyncThunk(
  "fetchAllJobsWithOffset",
  async (offset) => {
    // Preparing Request Options for fetch request
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Setting up the body with limit and offset
    const body = JSON.stringify({
      limit: 9,
      offset: offset,
    });

    // setting up the request options for all the fetch API options
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    // Making the API call using fetch API
    const res = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );

    const data = await res.json();

    return data.jdList;
  }
);

export const fetchAllJobsSlice = createSlice({
  name: "jobsData",
  initialState: {
    isLoading: false,
    data: [],
    // filtered: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllJobsWithOffset.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllJobsWithOffset.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, ...action.payload];
      //   state.filtered = [...state.filtered, ...action.payload];
    });
    builder.addCase(fetchAllJobsWithOffset.rejected, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
  },
});

export default fetchAllJobsSlice.reducer;
