import { dashboard, expenses, transactions, trend } from "../utils/Icons";

export const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "View Transactions",
    icon: transactions,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "Pemasukan",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "Pengeluaran",
    icon: expenses,
    link: "/dashboard",
  },
];
