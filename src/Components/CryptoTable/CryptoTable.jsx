import React, { useEffect, useMemo, useState } from "react";
import { useRowSelect, useTable } from "react-table";
import { HiDotsVertical } from "react-icons/hi";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "./CryptoTable.module.scss";
import useWindowSize from "../../hooks/useWindowSize";
import ModalContainer from "../Shared/ModalContainer";
import MobileInfoPopup from "../Popups/MobileInfoPopup";
const CryptoTable = ({ data }) => {
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
              <p>
                <div>{parseFloat(value.toFixed(2)).toLocaleString()} </div>
                <div className={styles.progressContainer}>
                  <progress value={value} max={row.original.max_supply} />
                </div>
              </p>
            );
          },
        },
        {
          Header: " ",
          accessor: "id",
          Cell: ({ value, row }) => {
            return (
              <p>
                <HiDotsVertical />
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
            const [showPopup, setShowPopup] = useState(false);
            if (!value) return "Not Available";
            return (
              <p
                className={styles.nameCell}
                onClick={() => {
                  setShowPopup(true);
                }}
              >
                <img src={row.original.image} alt={value} />
                <div>
                  <p>{value}</p>
                  <span>{row.original.symbol}</span>
                </div>
                {showPopup && (
                  <ModalContainer>
                    <MobileInfoPopup
                      data={row.original}
                      onClose={setShowPopup}
                    />
                  </ModalContainer>
                )}
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
      ];
    }
  }
  const cols = useMemo(getColumns(), [size]);

  const tableInstance = useTable(
    { columns: cols, data: tData },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Cell: ({row}) => {
            const [checked, setChecked] = useState(false);
            useEffect(()=>{
              setChecked(false);
            },[row])
            return (
              <div>
                <span
                  className={styles.favStar}
                  onClick={() => {
                    setChecked(!checked);
                  }}
                >
                  {checked ? (
                    <AiFillStar className={styles.filledStar} />
                  ) : (
                    <AiOutlineStar />
                  )}
                </span>
              </div>
            );
          },
        },
        ...columns,
      ]);
    }
  );
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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={styles.tableRow}>
                {row.cells?.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`${styles.tableData}`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
