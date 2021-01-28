import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "../features/chart/chartSlice";
import languageReducer from "../features/language/languageSlice";
import dateReducer from "../features/dataDisplay/dateSlice";

export default configureStore({
  reducer: {
    chart: chartReducer,
    language: languageReducer,
    date: dateReducer,
  },
});
