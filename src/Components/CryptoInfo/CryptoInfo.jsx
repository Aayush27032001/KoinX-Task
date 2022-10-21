import React, { useEffect, useState } from "react";
import styles from "./CryptoInfo.module.scss";
import star from "../../assets/Star.svg";
import CryptoTable from "../CryptoTable/CryptoTable";
import Pagination from "../Shared/Pagination";

const CryptoInfo = () => {
  const [cryptoData, setCryptoData] = useState();
  const [rowsPerPage, setRowsPerRage] = useState(10);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&amp;order=market_cap_desc&amp;per_page=${rowsPerPage}&amp;page=${page}&amp;sparkline=false&amp;price_change_percentage=24h%2C7d`
    );
    const data = await response.json();
    if (response.ok) {
      const temp = data.sort((a, b) => {
        return a.market_cap_rank - b.market_cap_rank;
      });
      setCryptoData(temp);
    }
  };

  useEffect(() => {
    fetchData();
  }, [rowsPerPage, page]);

  return (
    <div className={styles.cryptoInfoContainer}>
      <div className={styles.infoSubContainer}>
        <h2>Top 100 Cryptocurrencies by Market Cap</h2>
        <div className={styles.optionContainer}>
          <div className={styles.optionButtons}>
            <span className={styles.option}>
              <img src={star} alt="icon" /> Favourites
            </span>
            <span className={`${styles.option} ${styles.active}`}>
              CryptoCurrencies
            </span>
            <span className={styles.option}>DeFi</span>
            <span className={styles.option}>NFTs & Collectibles</span>
          </div>
          <div className={styles.rowsOptionContainer}>
            show rows
            <select
              name=""
              id=""
              defaultValue={rowsPerPage}
              onChange={(e) => {
                setRowsPerRage(e.target.value);
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div>{cryptoData && <CryptoTable data={cryptoData} />}</div>
        <div className={styles.paginationContainer}>
          <Pagination
            siblingCount={0}
            currentPage={page}
            totalCount={10}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default CryptoInfo;
