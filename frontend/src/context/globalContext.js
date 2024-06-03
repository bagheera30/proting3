import React, { useContext, useEffect, useId, useState } from "react";

import {
  doc,
  collection,
  addDoc,
  getDocs,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
// Impor konfigurasi Firebase Firestore

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    setUserId(userIdFromLocalStorage);
  }, [userId]);

  //calculate incomes

  const addIncome = async (income) => {
    const { am, category } = income;

    try {
      const incomeCollectionRef = doc(db, "transaksi", userId, "income");

      await setDoc(incomeCollectionRef, {
        uid: userId,
        list: 1,
        amount: parseInt(am),
        category: category,
        timestamp: serverTimestamp(),
      });

      console.log("Data successfully added to the 'income' collection.");
      getIncomes(); // Call the getIncomes() function after adding data
    } catch (error) {
      console.error("Error adding document: ", error);
      setError(error.message); // Set error message if an error occurs
    }
  };
  const getIncomes = async () => {
    try {
      // Ganti dengan data pengguna yang sesuai
      console.log(userId);
      const querySnapshot = await getDocs(
        collection(db, "transaksi", userId, "income")
      );
      const incomes = [];

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log("income: ", doc.id, " => ", doc.data());
          incomes.push(doc.data());
        });
      } else {
        console.log("No income documents found.");
      }

      setIncomes(incomes);
      console.log(incomes);
    } catch (error) {
      console.error("Error getting income documents: ", error);
    }
  };

  const deleteIncome = async (currentUser, id) => {
    try {
      const incomeDocRef = doc(db, "transaksi", currentUser.uid, "income", id);
      await deleteDoc(incomeDocRef);
      console.log("Income document with ID: ", id, " deleted successfully");
      getIncomes(currentUser);
    } catch (error) {
      console.error("Error deleting income document: ", error);
    }
  };

  const formatCurrency = (amount) => {
    const formattedAmount = amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    // Menambahkan simbol mata uang secara manual
    return `Rp${formattedAmount}`;
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (expense) => {
    const { am, category, timestamp } = expense;

    try {
      const expenseCollectionRef = collection(
        doc(db, "transaksi", userId),
        "expends"
      );

      const parsedTimestamp = new Date(timestamp).getTime();

      await addDoc(expenseCollectionRef, {
        uid: userId,
        list: -1,
        amount: parseInt(am),
        category: category,
        timestamp: parsedTimestamp,
      });

      console.log("Data berhasil ditambahkan ke koleksi 'expenses'.");
      getExpenses(); // Panggil fungsi getExpenses() setelah menambahkan data
    } catch (error) {
      console.error("Error adding document: ", error);
      setError(error.message); // Atur pesan kesalahan jika terjadi kesalahan
    }
  };
  const getExpenses = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "transaksi", userId, "expends")
      );
      const expends = [];
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const timestamp = data.timestamp;
          const date = new Date(timestamp.seconds * 1000);
          const formattedDate = date.toLocaleDateString("en-GB"); // Ubah sesuai preferensi format tanggal Anda
          const newData = { ...data, timestamp: formattedDate };

          console.log(doc.id, " => ", newData);
          expends.push(newData);
        });
        console.log(expends);

        setExpenses(expends);
      } else {
        console.log("No income documents found.");
      }
    } catch (error) {
      console.error("Error getting income documents: ", error);
    }
  };
  const deleteExpense = async (currentUser, id) => {
    try {
      const expenseDocRef = doc(
        db,
        "transaksi",
        currentUser.uid,
        "expense",
        id
      );
      await deleteDoc(expenseDocRef);
      console.log("Expense document with ID: ", id, " deleted successfully");
      getExpenses(currentUser);
    } catch (error) {
      console.error("Error deleting expense document: ", error);
    }
  };

  const totalExpenses = () => {
    let totalExpenses = 0;
    if (expenses) {
      expenses.forEach((expense) => {
        totalExpenses = totalExpenses + expense.amount;
      });
    }
    return totalExpenses;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
