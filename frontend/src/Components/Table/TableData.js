import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const allTransactions = [...incomes, ...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  console.log(allTransactions);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1 style={{ marginBottom: "20px" }}>Semua Transaksi</h1>
        <span> </span>
        <div className="stats-con">
          <div className="amount-con">
            <div className="income">
              <h2>Total Pemasukan</h2>
              <p>Rp. {totalIncome()}</p>
            </div>
            <div className="expense">
              <h2>Total Pengeluaran</h2>
              <p>Rp. {totalExpenses()}</p>
            </div>
            <div className="balance">
              <h2>Total</h2>
              <p>Rp. {totalBalance()}</p>
            </div>
          </div>
        </div>
        <div className="transaction-table" style={{ marginTop: "20px" }}>
          <h2 style={{ marginBottom: "10px" }}>Laporan</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.category}</td>
                  <td>{transaction.timestamp}</td>
                  <AmountTd type={transaction.type}>
                    Rp. {transaction.amount}
                  </AmountTd>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const AmountTd = styled.td`
  color: ${(props) => (props.type === "income" ? "green" : "red")};
`;

const DashboardStyled = styled.div`
  .stats-con {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .amount-con {
      display: flex;
      justify-content: space-between;
      .income,
      .expense,
      .balance {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        p {
          font-size: 3.5rem;
          font-weight: 700;
        }
      }
    }
  }
  .transaction-table {
    margin-top: 2rem;
    table {
      width: 100%;
      border-collapse: collapse;
      thead {
        background: #f5f5f5;
        th {
          padding: 1rem;
          border-bottom: 1px solid #ccc;
        }
      }
      tbody {
        tr {
          td {
            padding: 1rem;
            border-bottom: 1px solid #ccc;
          }
        }
      }
    }
  }
`;

export default Dashboard;
