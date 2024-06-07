import moment from "moment";

export const dateFormat = (date) => {
  const formattedDate = moment(date, "DD/MM/YYYY").format("DD/MM/YYYY");
  if (moment(formattedDate, "DD/MM/YYYY", true).isValid()) {
    return formattedDate;
  } else {
    return "Invalid Date";
  }
};
