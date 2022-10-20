import React from "react";
import { CgClose } from "react-icons/cg";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import styles from "./MobileInfoPopup.module.scss";
const MobileInfoPopup = ({ data, onClose }) => {
  return (
    <div className={styles.popUpContainer}>
      <div className={styles.popupHeader}>
        <div className={styles.coinName}>
          <img src={data.image} alt={data.name} />
          <p>{data.name}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(false);
          }}
          className={styles.closeBtn}
        >
          <CgClose />
        </button>
      </div>
      <div className={styles.detailsColumn}>
        <div>
          <p>Price</p>
          <p>$ {data.current_price.toLocaleString()}</p>
        </div>
        <div>
          <p>24H</p>
          <p
            className={
              data.price_change_percentage_24h_in_currency > 0
                ? styles.dropPercentage
                : styles.risePercentage
            }
          >
            {data.price_change_percentage_24h_in_currency > 0 ? (
              <VscTriangleUp />
            ) : (
              <VscTriangleDown />
            )}
            {Math.abs(data.price_change_percentage_24h_in_currency.toFixed(2))}%
          </p>
        </div>
        <div>
          <p>7D</p>
          <p
            className={
              data.price_change_percentage_7d_in_currency > 0
                ? styles.dropPercentage
                : styles.risePercentage
            }
          >
            {data.price_change_percentage_7d_in_currency > 0 ? (
              <VscTriangleUp />
            ) : (
              <VscTriangleDown />
            )}
            {Math.abs(data.price_change_percentage_7d_in_currency.toFixed(2))}%
          </p>
        </div>
      </div>
      <div className={styles.popupEntry}>
        <p>MARKET CAP</p>
        <p>$ {parseFloat(data.market_cap.toFixed(2)).toLocaleString()}</p>
      </div>
      <div className={styles.popupEntry}>
        <p>VOLUME (24H)</p>
        <p>$ {parseFloat(data.total_volume.toFixed(2)).toLocaleString()}</p>
      </div>
      <div className={styles.popupEntry}>
        <p>CIRCULATING SUPPLY</p>
        <p>
          <div>
            {parseFloat(data.circulating_supply.toFixed(2)).toLocaleString()}{" "}
            {data.symbol.toUpperCase()}
          </div>
          <div className={styles.progressContainer}>
            <progress value={data.circulating_supply} max={data.max_supply} />
          </div>
        </p>
      </div>
    </div>
  );
};

export default MobileInfoPopup;
