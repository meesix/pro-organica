import React from "react";

const Image = ({ image, label = "Proorganica image", styles = "" }) => {
  return <img alt={label} src={image} className={styles} />;
};

export default Image;
