import React from "react";
import styles from "./Card.module.scss";
const Card = ({ img, alt, header, info }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardImage}>
        <img src={img} alt={alt} />
      </div>
      <div className={styles.infoContainer}>
        <p>{header}</p>
        <p>{info}</p>
      </div>
    </div>
  );
};

export default Card;
