import React, { useEffect, useState } from "react";
import styles from "./CryptoInfo.module.scss";
import { BsStar } from "react-icons/bs";
import { BiLoader } from "react-icons/bi";
import CryptoTable from "../CryptoTable/CryptoTable";
import Pagination from "../Shared/Pagination";
import Favourite from "../CryptoTable/Favourite";

const CryptoInfo = () => {
  const [cryptoData, setCryptoData] = useState();
  const [rowsPerPage, setRowsPerRage] = useState(10);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("CryptoCurrencies");
  const tabs = ["Favourites", "CryptoCurrencies"];
  const [loader, setLoader] = useState(true);

  const fetchData = async () => {
    setLoader(true);
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&amp;order=market_cap_desc&amp;per_page=${rowsPerPage}&amp;page=${page}&amp;sparkline=false&amp;price_change_percentage=24h%2C7d`
    );
    const data = await response.json();
    if (response.ok) {
      const temp = data.sort((a, b) => {
        return a.market_cap_rank - b.market_cap_rank;
      });
      setCryptoData(temp);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [rowsPerPage, page]);
  if (loader) {
    return (
      <div className="loaderContainer">
        <BiLoader />
        Loading...
      </div>
    );
  }
  return (
    <div className={styles.cryptoInfoContainer}>
      <div className={styles.infoSubContainer}>
        <div className={styles.optionContainer}>
          <div className={styles.optionButtons}>
            {tabs.map((ele) => {
              return (
                <span
                  className={`${styles.option} ${
                    ele === activeTab && styles.active
                  }`}
                  onClick={() => {
                    setActiveTab(ele);
                  }}
                >
                  {ele === "Favourites" && <BsStar />} {ele}
                </span>
              );
            })}
          </div>
          {activeTab!=="Favourites" &&<div className={styles.rowsOptionContainer}>
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
          </div>}
        </div>
        {cryptoData && (
          <div>
            {activeTab === "Favourites" ? (
              <Favourite data={cryptoData} />
            ) : (
              <CryptoTable data={cryptoData} />
            )}
          </div>
        )}
        {activeTab!=="Favourites" && <div className={styles.paginationContainer}>
          <Pagination
            siblingCount={0}
            currentPage={page}
            totalCount={10}
            onPageChange={(page) => setPage(page)}
          />
        </div>}
      </div>
    </div>
  );
};

export default CryptoInfo;
