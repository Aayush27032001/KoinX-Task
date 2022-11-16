import React, { memo, useEffect, useMemo, useState } from "react";
import { useRowSelect, useTable } from "react-table";
import { BiLoader } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import useWindowSize from "../../hooks/useWindowSize";
import ModalContainer from "../Shared/ModalContainer";
import MobileInfoPopup from "../Popups/MobileInfoPopup";
import styles from "./Favourite.module.scss";

const CustomRow = memo(({ coinId, isLast, setLoading, cols, isFirst, loading }) => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchDetails = async () => {
      if(isFirst){
        setLoading(true);
      }
      const resp = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      const data = await resp.json();
      setData(data);
      if (isLast) {
        setLoading(false);
      }
    };
    fetchDetails();
  }, []);
  if (loading&&isFirst) {
    return (
      <div className="loaderContainer">
        <BiLoader />
        Loading...
      </div>
    );
  }
  if (!data) {
    return null;
  }

  return (
    <tr role="row" className={styles.tableRow}>
      {cols.map((ele,i) => {
        if (ele.accessor === "id") {
          return <td key={i}></td>;
        }
        if (ele.accessor === "name" || ele.accessor === "market_cap_rank") {
          return (
            <td key={i} role="cell" className={styles.tableData}>
              {ele.Cell({
                value: data[ele.accessor],
                row: { original: { image: data.image.small } },
              })}
            </td>
          );
        }
        if (ele.accessor === "circulating_supply") {
          return (
            <td key={i}>
              {ele.Cell({
                value: data.market_data[`${ele.accessor}`],
                row: {
                  original: { max_supply: data.market_data.max_supply },
                },
              })}
            </td>
          );
        }
        return (
          <td key={i} role="cell" className={styles.tableData}>
            {ele.Cell({ value: data.market_data[`${ele.accessor}`].usd })}
          </td>
        );
      })}
    </tr>
  );
});

const Favourite = ({ data }) => {
  const tData = useMemo(() => data, [data]);
  const size = useWindowSize();
  function getColumns() {
    if (size > 476) {
      return () => [
        {
          Header: "#",
          accessor: "market_cap_rank",
          Cell: ({ value }) => {
            return <p className={styles.indexValues}>{value}</p>;
          },
        },
        {
          Header: "NAME",
          accessor: "name",
          Cell: ({ value, row }) => {
            if (!value) return "Not Available";
            return (
              <p className={styles.nameCell}>
                <img src={row.original.image} alt={value} />
                {value}
                <span>{row.original.symbol}</span>
              </p>
            );
          },
        },
        {
          Header: "PRICE",
          accessor: "current_price",
          Cell: ({ value }) => {
            if (!value) return "Not Available";
            return <p>$ {parseFloat(value.toFixed(2)).toLocaleString()}</p>;
          },
        },
        {
          Header: "24H",
          accessor: "price_change_percentage_24h_in_currency",
          Cell: ({ value }) => {
            if (!value) return "Not Available";
            return (
              <p
                className={
                  value > 0 ? styles.dropPercentage : styles.risePercentage
                }
              >
                {value > 0 ? <VscTriangleUp /> : <VscTriangleDown />}
                {Math.abs(value.toFixed(2))}%
              </p>
            );
          },
        },
        {
          Header: "7D",
          accessor: "price_change_percentage_7d_in_currency",
          Cell: ({ value }) => {
            if (!value) return "Not Available";
            return (
              <p
                className={
                  value > 0 ? styles.dropPercentage : styles.risePercentage
                }
              >
                {value > 0 ? <VscTriangleUp /> : <VscTriangleDown />}
                {Math.abs(value.toFixed(2))}%
              </p>
            );
          },
        },
        {
          Header: "MARKET CAP",
          accessor: "market_cap",
          Cell: ({ value }) => {
            if (!value) return "Not Available";
            return <p>$ {parseFloat(value.toFixed(2)).toLocaleString()}</p>;
          },
        },
        {
          Header: "VOLUME(24H)",
          accessor: "total_volume",
          Cell: ({ value }) => {
            if (!value) return "Not Available";
            return <p>$ {parseFloat(value.toFixed(2)).toLocaleString()}</p>;
          },
        },
        {
          Header: "CIRCULATING SUPPLY",
          accessor: "circulating_supply",
          Cell: ({ value, row }) => {
            if (!value) return "Not Available";
            return (
              <p style={{ textAlign: "end", paddingRight: "1rem" }}>
                <div>{parseFloat(value.toFixed(2)).toLocaleString()} </div>
                <div className={styles.progressContainer}>
                  <progress value={value} max={row.original.max_supply} />
                </div>
              </p>
            );
          },
        },
      ];
    } else {
      return () => [
        {
          Header: "#",
          accessor: "market_cap_rank",
          Cell: ({ value }) => {
            return <p>{value}</p>;
          },
        },
        {
          Header: "NAME",
          accessor: "name",
          Cell: ({ value, row }) => {
            if (!value) return "Not Available";
            return (
              <div className={styles.nameCell}>
                <img src={row.original.image} alt={value} />
                <div>
                  <p>{value}</p>
                  <span>{row.original.symbol}</span>
                </div>
              </div>
            );
          },
        },
        {
          Header: "PRICE",
          accessor: "current_price",
          Cell: ({ value }) => {
            if (!value) return "Not Available";
            return <p>$ {parseFloat(value.toFixed(2)).toLocaleString()}</p>;
          },
        },
        {
          Header: "24H",
          accessor: "price_change_percentage_24h_in_currency",
          Cell: ({ value }) => {
            if (!value) return "Not Available";
            return (
              <p
                className={
                  value > 0 ? styles.dropPercentage : styles.risePercentage
                }
              >
                {value > 0 ? <VscTriangleUp /> : <VscTriangleDown />}
                {Math.abs(value.toFixed(2))}%
              </p>
            );
          },
        },
      ];
    }
  }
  const cols = useMemo(getColumns(), [size]);

  const tableInstance = useTable(
    { columns: cols, data: tData },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [...columns]);
    }
  );
  const [loading, setLoading] = useState(true);
  
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  
  return (
    <div className={styles.cryptoTableContainer}>
      <table {...getTableProps()} className={styles.table}>
        <thead className={styles.tableHeader}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers?.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className={`${styles.tableHead} ${
                    column.Header === "NAME" ? styles.alignStart : ""
                  }`}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={styles.tableBody}>
          {JSON.parse(localStorage.favCoins ?? JSON.stringify([]))
            .sort((a, b) => a[1] - b[1])
            .map((row, i, rows) => {
              return (
                <CustomRow
                  key={row[0]}
                  coinId={row[0]}
                  isLast={rows.length === i + 1 ? true : false}
                  isFirst={i===0 ? true : false}
                  setLoading={setLoading}
                  cols={cols}
                  loading={loading}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Favourite;
