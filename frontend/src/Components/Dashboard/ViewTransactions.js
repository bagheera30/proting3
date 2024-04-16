import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";

import IncomeItem from "../IncomeItem/IncomeItem";

function ViewTransactions() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomesByMonth,
    getExpensesByMonth,
    deleteIncome,
    deleteExpenses,
  } = useGlobalContext();

  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    getIncomesByMonth(selectedMonth);
    getExpensesByMonth(selectedMonth);
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <ViewTransactionsStyled>
      <InnerLayout>
        <h1>All Transactions</h1>

        <div className="amount-con">
          <div className="income">
            <h2>Total Pemasukan</h2>
            <p>
              {dollar} {totalIncome()}
            </p>
          </div>
          <div className="expense">
            <h2>Total Pengeluaran</h2>
            <p>
              {dollar} {totalExpenses()}
            </p>
          </div>
          <div className="balance">
            <h2>Total</h2>
            <p>
              {dollar} {totalBalance()}
            </p>
          </div>
        </div>
        <div className="data">
          <div className="incomes">
            <h2>Income List</h2>
            <select value={selectedMonth} onChange={handleMonthChange}>
              <option value="">All Months</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            {incomes.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
          <div className="expend">
            <h2>Expend List</h2>
            {expenses.map((expense) => {
              const { _id, title, amount, date, category, description, type } =
                expense;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-red)"
                  deleteItem={deleteExpenses}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ViewTransactionsStyled>
  );
}

const ViewTransactionsStyled = styled.div`
  .amount-con {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2rem;
  }

  .income,
  .expense,
  .balance {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
  }

  .income,
  .expense {
    grid-column: span 1;
  }

  .balance {
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 3.5rem;
    font-weight: 700;
  }

  .balance p {
    color: var(--color-green);
    opacity: 0.6;
    font-size: 4.5rem;
  }

  .data {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
    .incomes,
    .expend {
      font-size: 1.5rem;
    }
  }
`;

export default ViewTransactions;
