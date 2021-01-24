import React from "react";
import styles from "./Chart.module.css";

// TODO: Implement
export const ChartHeader = ({ text, title = "Title" }) => {
  return (
    <fieldset className={styles.header}>
      <legend className={styles.header__label}>{title}</legend>
      <h1 className={styles.header__text}>{text}</h1>
    </fieldset>
  );
};
