import { dashboard, expenses, table, transactions, trend } from "../utils/Icons";

export const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/dashboard",
  },

  {
    id: 5,
    title: "Laporan Tabel",
    icon: table,
    link: "/TableData",
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
