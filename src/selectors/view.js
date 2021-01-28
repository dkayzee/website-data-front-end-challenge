import { createSelector } from "reselect";
import { flattenWebsiteViews } from "./chart";

const selectDate = (state) => state.date;

export const reduceWebsiteViews = createSelector(
  [selectDate, flattenWebsiteViews],
  (date, data) => {
    // array of objects {views, languages}
    return data.reduce((acc, cur) => {
      if (cur.date == date.date) return acc + Number(cur.count);
      else return acc;
    }, 0);
  }
);
