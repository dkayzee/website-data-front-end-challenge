import React from "react";
import { useSelector } from "react-redux";
import { reduceWebsiteViews } from "../../selectors/view";

export const TotalViewsDisplay = () => {
  const totalViews = useSelector(reduceWebsiteViews);

  return <div>Total Views By Date: {totalViews}</div>;
};
