import { configureStore } from "@reduxjs/toolkit";
import fetchAllJobsReducer from "./reducers/fetchAllJobs";

export const store = configureStore({
  reducer: {
    jobsData: fetchAllJobsReducer,
  },
});
