const Expense = require("../models/ExpenseModel");
const Account = require("../models/accoundModel"); // Ubah path sesuai dengan struktur folder Anda

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date, username } = req.body;

  try {
    //validations
    if (!title || !category || !description || !date || !username) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    // Cari akun berdasarkan username
    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(404).json({ message: "Account not found!" });
    }

    const expense = new Expense({
      title,
      amount,
      category,
      description,
      date,
      account: account._id, // Gunakan ID akun yang ditemukan
    });

    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpenseByMonth = async (req, res) => {
  try {
    const { month } = req.params;

    const expenses = await Expense.aggregate([
      {
        $lookup: {
          from: "accounts",
          localField: "account",
          foreignField: "_id",
          as: "accountInfo",
        },
      },
      {
        $match: {
          $and: [
            { $expr: { $eq: [{ $month: "$date" }, parseInt(month)] } },
            { "accountInfo.username": req.user.username }, // Adjust based on your authentication logic
          ],
        },
      },
    ]).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
