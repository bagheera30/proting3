const {
  addExpense,
  getExpense,
  deleteExpense,

  getExpenseByMonth,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
  getIncomeByMonth,
} = require("../controllers/income");
const { login, register } = require("../controllers/account");

const router = require("express").Router();

router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)

  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpense)
  .delete("/delete-expense/:id", deleteExpense)
  .post("/Login", login)
  .post("/register", register)
  .get("/get-incomeByMonth/:month", getIncomeByMonth)
  .get("/get-expenseByMonth/:month", getExpenseByMonth);

module.exports = router;
